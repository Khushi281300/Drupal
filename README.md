# FlowState ⎯ Deep Work productivity timer

FlowState is a minimalist, high-performance Pomodoro and task management application designed for deep concentration and peak productivity. Built with a **mobile-first browser experience** in mind, it bridges the gap between web applications and native mobile utilities.

### ⎯ Core Philosophy
Most productivity tools suffer from feature-creep and cluttered interfaces. FlowState strips away the noise, leaving a premium, glassmorphic environment that prioritizes the user's focus.

### ⎯ Technical Features
- **High-Fidelity Timer Engine:** Engineered with React hooks for precise countdown management and seamless mode transitions (Focus vs Break).
- **Infinite Workflows:** Create, manage, and persist a daily task list that stays with you even after browser restarts.
- **Physics-Based Design:** Motion-driven UI implemented with **Framer Motion**, featuring physics-based entrance and exit animations for a tactile, "app-like" feel.
- **Advanced State Persistence:** Integrated **Zustand** state synchronization with `localStorage`, ensuring zero data loss across sessions.
- **Hydration-Resilient Architecture:** Custom-built synchronization logic to ensure stable Next.js hydration without SSR mismatch errors.

### ⎯ Technology Stack
- **Framework:** Next.js 15 (App Router)
- **State:** Zustand
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS + Glassmorphism Utilities
- **Icons:** Lucide React
- **Language:** TypeScript

### ⎯ Development & Principles
This project was developed with a focus on **Responsive Heuristics**. It uses a mobile-constrained desktop layout to ensure that when viewed on a mobile device, the experience is indistinguishable from a native application.

### ⎯ Setup & Execution
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` to enter your flow state.

---
*Created as a technical demonstration for high-performance React engineering.*
