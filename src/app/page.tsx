/**
 * FlowState | Core Application Component
 * 
 * This component manages the primary timer logic and interactive task list.
 * It utilizes a hybrid rendering strategy:
 * - Server-side rendering for the initial layout and structure.
 * - Client-side hydration for dynamic state (Timer, Zustand).
 * - Custom 'isMounted' hook to prevent hydration mismatches from localStorage.
 */
"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Check, Plus, Trash2 } from "lucide-react";

export default function FlowState() {
  const [isMounted, setIsMounted] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  
  // Zustand Store
  const { tasks, addTask, toggleTask, deleteTask } = useStore();

  // Timer State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"Focus" | "Break">("Focus");

  // Handle Hydration safely
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Auto-switch mode or play sound
      const nextTime = mode === "Focus" ? 5 * 60 : 25 * 60;
      setMode(mode === "Focus" ? "Break" : "Focus");
      setTimeLeft(nextTime);
    }
    return () => clearInterval(interval as NodeJS.Timeout);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "Focus" ? 25 * 60 : 5 * 60);
  };
  const setTimerMode = (newMode: "Focus" | "Break") => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === "Focus" ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    addTask(taskInput.trim());
    setTaskInput("");
  };

  // Prevent SSR Hydration Mismatch
  if (!isMounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="flex-1 flex flex-col h-full bg-background overflow-y-auto w-full px-6 pt-12 pb-24 font-sans text-text-primary">
      
      {/* Header */}
      <div className="flex justify-center mb-8">
        <h1 className="text-xl font-bold tracking-widest uppercase opacity-80">FlowState</h1>
      </div>

      {/* Timer Section */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center mb-12 relative"
      >
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setTimerMode("Focus")}
            className={`text-sm tracking-widest font-medium transition-colors ${mode === "Focus" ? "text-primary" : "text-text-secondary hover:text-text-primary"}`}
          >
            FOCUS
          </button>
          <span className="text-surface-hover">|</span>
          <button 
            onClick={() => setTimerMode("Break")}
            className={`text-sm tracking-widest font-medium transition-colors ${mode === "Break" ? "text-primary" : "text-text-secondary hover:text-text-primary"}`}
          >
            BREAK
          </button>
        </div>

        {/* The Massive Digits */}
        <div className="text-[6rem] font-bold tracking-tighter leading-none mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
          {formatTime(timeLeft)}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button 
            onClick={resetTimer}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-surface text-text-secondary hover:text-text-primary transition-all active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button 
            onClick={toggleTimer}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-primary text-white shadow-[0_0_30px_rgba(244,63,94,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
          </button>

          <div className="w-12 h-12" /> {/* Empty div for balance */}
        </div>
      </motion.div>

      {/* Task List Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 w-full max-w-sm mx-auto flex flex-col"
      >
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-medium">Today&apos;s Tasks</h2>
          <span className="text-xs text-text-secondary font-medium tracking-wider">{tasks.filter(t => t.completed).length} / {tasks.length}</span>
        </div>

        <form onSubmit={handleAddTask} className="mb-6 relative">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="What are you working on?"
            className="w-full bg-surface border-none rounded-xl py-4 pl-4 pr-12 text-sm text-text-primary placeholder:text-text-secondary focus:ring-1 focus:ring-primary shadow-sm"
          />
          <button 
            type="submit" 
            disabled={!taskInput.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-text-secondary hover:text-primary disabled:opacity-50 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        <div className="flex flex-col gap-3 pb-8">
          <AnimatePresence>
            {tasks.length === 0 && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center text-text-secondary text-sm mt-4 italic"
              >
                No tasks yet. Create one to enter flow state.
              </motion.p>
            )}
            
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                layout
                className={`app-card p-4 flex items-center justify-between group transition-all ${task.completed ? 'opacity-50' : 'opacity-100'}`}
              >
                <div className="flex items-center gap-4 flex-1 overflow-hidden">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-full border flex flex-shrink-0 items-center justify-center transition-colors ${
                      task.completed ? 'bg-primary border-primary' : 'border-text-secondary bg-transparent'
                    }`}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                  <span className={`text-sm truncate transition-all ${task.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                    {task.text}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-1 rounded opacity-0 group-hover:opacity-100 text-text-secondary hover:text-primary transition-all md:opacity-100" // On mobile hover doesn't work well, but we make it visible on md, or we can make it slightly visible on mobile or triggered by swipe. For simplicity, we just make it always visible with low opacity on non-hover soon. Wait, let's make opacity-100 for touch devices or just 50% opacity by default.
                  style={{ opacity: 0.5 }}
                >
                  <Trash2 className="w-4 h-4 hover:text-primary transition-colors" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

    </div>
  );
}
