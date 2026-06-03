"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface TimeEntry {
  id: number;
  taskName: string;
  startTime: number;
  endTime: number | null;
  duration: number; // ms
}

interface TimeTrackerState {
  entries: TimeEntry[];
  nextId: number;
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export default function TimeTrackerWidget() {
  const [state, setState] = useLocalStorage<TimeTrackerState>("embedkit-time-tracker", {
    entries: [],
    nextId: 1,
  });
  const [activeTask, setActiveTask] = useState("");
  const [runningId, setRunningId] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  // Tick every second when running
  useEffect(() => {
    if (runningId === null || startTime === null) return;
    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [runningId, startTime]);

  const startTimer = () => {
    const task = activeTask.trim() || "Untitled Task";
    const now = Date.now();
    const newEntry: TimeEntry = {
      id: state.nextId,
      taskName: task,
      startTime: now,
      endTime: null,
      duration: 0,
    };
    setState((prev) => ({
      entries: [newEntry, ...prev.entries],
      nextId: prev.nextId + 1,
    }));
    setRunningId(newEntry.id);
    setStartTime(now);
    setElapsed(0);
    setActiveTask("");
  };

  const stopTimer = () => {
    if (runningId === null || startTime === null) return;
    const now = Date.now();
    const duration = now - startTime;
    setState((prev) => ({
      ...prev,
      entries: prev.entries.map((e) =>
        e.id === runningId ? { ...e, endTime: now, duration } : e
      ),
    }));
    setRunningId(null);
    setStartTime(null);
    setElapsed(0);
  };

  const deleteEntry = (id: number) => {
    if (runningId === id) {
      setRunningId(null);
      setStartTime(null);
      setElapsed(0);
    }
    setState((prev) => ({
      ...prev,
      entries: prev.entries.filter((e) => e.id !== id),
    }));
  };

  const totalMs = state.entries.reduce((sum, e) => {
    if (e.id === runningId) return sum + elapsed;
    return sum + e.duration;
  }, 0);

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
      background: "#ffffff",
      borderRadius: "16px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      minWidth: "320px",
      maxWidth: "400px",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <span style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>⏱️ Time Tracker</span>
        <span style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#6b7280",
          background: "#f3f4f6",
          padding: "4px 8px",
          borderRadius: "6px",
        }}>
          Total: {formatDuration(totalMs)}
        </span>
      </div>

      {/* Input + Controls */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          type="text"
          value={activeTask}
          onChange={(e) => setActiveTask(e.target.value)}
          placeholder="Task name..."
          disabled={runningId !== null}
          onKeyDown={(e) => { if (e.key === "Enter" && runningId === null) startTimer(); }}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: "10px",
            border: "2px solid #e5e7eb",
            fontSize: "14px",
            outline: "none",
            background: runningId !== null ? "#f9fafb" : "#ffffff",
            color: "#111827",
          }}
        />
        {runningId === null ? (
          <button
            onClick={startTimer}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "none",
              background: "#10b981",
              color: "white",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Start
          </button>
        ) : (
          <button
            onClick={stopTimer}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "none",
              background: "#ef4444",
              color: "white",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Stop
          </button>
        )}
      </div>

      {/* Running indicator */}
      {runningId !== null && (
        <div style={{
          padding: "12px",
          background: "#f0fdf4",
          borderRadius: "10px",
          border: "1px solid #bbf7d0",
          marginBottom: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#166534" }}>
              {state.entries.find((e) => e.id === runningId)?.taskName}
            </div>
            <div style={{ fontSize: "11px", color: "#16a34a" }}>Running...</div>
          </div>
          <span style={{ fontSize: "18px", fontWeight: 800, color: "#166534", fontVariantNumeric: "tabular-nums" }}>
            {formatDuration(elapsed)}
          </span>
        </div>
      )}

      {/* Entries */}
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        {state.entries
          .filter((e) => e.id !== runningId)
          .slice(0, 10)
          .map((entry) => (
            <div key={entry.id} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #f3f4f6",
            }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}>{entry.taskName}</div>
                <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                  {new Date(entry.startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280", fontVariantNumeric: "tabular-nums" }}>
                  {formatDuration(entry.duration)}
                </span>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#d1d5db",
                    fontSize: "16px",
                    padding: "2px",
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.color = "#ef4444"; }}
                  onMouseOut={(e) => { e.currentTarget.style.color = "#d1d5db"; }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        {state.entries.length === 0 && runningId === null && (
          <div style={{ textAlign: "center", padding: "20px", color: "#9ca3af", fontSize: "13px" }}>
            No entries yet. Start tracking!
          </div>
        )}
      </div>
    </div>
  );
}
