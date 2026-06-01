"use client";

import { useState, useEffect } from "react";

export default function PomodoroTimerPage() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    if (!isRunning || seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setIsRunning(false);
          if (!isBreak) {
            setSessions((prev) => prev + 1);
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, seconds, isBreak]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const startBreak = () => {
    setIsBreak(true);
    setSeconds(5 * 60);
    setIsRunning(true);
  };

  const startFocus = () => {
    setIsBreak(false);
    setSeconds(25 * 60);
    setIsRunning(true);
  };

  const reset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setSeconds(25 * 60);
    setSessions(0);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pomodoro Timer</h1>
        <p className="text-sm text-gray-500 mb-8">
          {isBreak ? "☕ Break Time" : "🎯 Focus Time"} · Sessions: {sessions}
        </p>
        <div className="text-7xl font-mono font-bold text-gray-900 mb-8 tabular-nums">
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          {seconds === 0 ? (
            isBreak ? (
              <button
                onClick={startFocus}
                className="px-6 py-3 rounded-lg bg-[#FF6B00] text-white font-semibold hover:bg-[#E55D00] transition-colors"
              >
                Start Focus
              </button>
            ) : (
              <button
                onClick={startBreak}
                className="px-6 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
              >
                Take a Break
              </button>
            )
          ) : (
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-6 py-3 rounded-lg bg-[#FF6B00] text-white font-semibold hover:bg-[#E55D00] transition-colors"
            >
              {isRunning ? "Pause" : "Resume"}
            </button>
          )}
          <button
            onClick={reset}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
