import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FlowState | Deep Work Timer",
  description: "An aesthetic Pomodoro timer and task manager built for focused developers. Experience high-productivity sessions in a distraction-free environment.",
  manifest: "/manifest.json",
  openGraph: {
    title: "FlowState | Deep Work Timer",
    description: "The ultimate minimalist productivity utility for developers.",
    url: "https://flowstate.app",
    siteName: "FlowState",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowState | Deep Work Timer",
    description: "Deep work sessions, simplified.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased h-full`} suppressHydrationWarning>
      <body className="h-full bg-background text-on-surface flex justify-center">
        {/* Mobile App Container Constraint for Desktop Viewing */}
        <div className="w-full max-w-md h-full relative flex flex-col overflow-hidden bg-background shadow-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
