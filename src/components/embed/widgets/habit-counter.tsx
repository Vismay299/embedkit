"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface HabitCounterProps {
  habitName?: string;
  goal?: number;
  // Accepted for backward compatibility with server config but not used for state
  streak?: number;
}

interface HabitData {
  streak: number;
  lastCheckinDate: string; // YYYY-MM-DD
  goal: number;
}

function getTodayString(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function HabitCounterWidget({
  habitName = "Read Daily",
  goal = 30,
}: HabitCounterProps) {
  const storageKey = `embedkit-habit-${habitName}`;
  const defaultData: HabitData = { streak: 0, lastCheckinDate: "", goal };

  const [habitData, setHabitData] = useLocalStorage<HabitData>(
    storageKey,
    defaultData,
  );
  const [animating, setAnimating] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Mark hydrated after first render (client-side only)
  useEffect(() => {
    setHydrated(true);
  }, []);

  // On hydration, validate streak based on date
  useEffect(() => {
    if (!hydrated) return;

    const today = getTodayString();
    const yesterday = getYesterdayString();
    const { lastCheckinDate } = habitData;

    // If already checked in today, nothing to do
    if (lastCheckinDate === today) return;

    // If last checkin was yesterday, streak is valid — keep it
    if (lastCheckinDate === yesterday) return;

    // First visit or broken chain — reset streak to 0
    if (lastCheckinDate === "" || lastCheckinDate < yesterday) {
      if (habitData.streak !== 0) {
        setHabitData((prev) => ({ ...prev, streak: 0 }));
      }
    }
  }, [hydrated]); // Only run once after hydration

  // Sync goal if it changes from props
  useEffect(() => {
    if (hydrated && habitData.goal !== goal) {
      setHabitData((prev) => ({ ...prev, goal }));
    }
  }, [goal, hydrated]);

  const handleCheckin = useCallback(() => {
    const today = getTodayString();
    if (habitData.lastCheckinDate === today) return;

    setHabitData((prev) => ({
      ...prev,
      streak: prev.streak + 1,
      lastCheckinDate: today,
      goal,
    }));

    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);
  }, [habitData.lastCheckinDate, goal, setHabitData]);

  const { streak } = habitData;
  const isCheckedInToday = hydrated && habitData.lastCheckinDate === getTodayString();
  const pct = Math.min(100, (streak / goal) * 100);
  const goalReached = streak >= goal;

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px",
        background: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        minWidth: "220px",
        maxWidth: "400px",
      }}
    >
      {/* Header: habit name + fire icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #f59e0b, #ef4444)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          🔥
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>
            {habitName}
          </div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            {goalReached ? "Goal reached! 🎉" : "Current streak"}
          </div>
        </div>
      </div>

      {/* Streak count with scale animation */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "6px",
          marginBottom: "14px",
        }}
      >
        <span
          style={{
            fontSize: "40px",
            fontWeight: 800,
            color: goalReached ? "#22c55e" : "#f59e0b",
            lineHeight: 1,
            transform: animating ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            display: "inline-block",
          }}
        >
          {streak}
        </span>
        <span
          style={{
            fontSize: "14px",
            color: "#6b7280",
            fontWeight: 500,
          }}
        >
          {streak === 1 ? "day" : "days"}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#fef3c7",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background:
              goalReached
                ? "#22c55e"
                : "linear-gradient(90deg, #f59e0b, #ef4444)",
            borderRadius: "4px",
            transition: "width 0.5s ease",
          }}
        />
      </div>

      {/* Goal text */}
      <div
        style={{
          marginTop: "8px",
          fontSize: "12px",
          color: "#9ca3af",
          textAlign: "right",
          marginBottom: "20px",
        }}
      >
        Goal: {goal} days
      </div>

      {/* Check-in button */}
      <button
        onClick={handleCheckin}
        disabled={isCheckedInToday}
        style={{
          width: "100%",
          padding: "12px 0",
          borderRadius: "10px",
          border: "none",
          fontWeight: 600,
          fontSize: "15px",
          cursor: isCheckedInToday ? "default" : "pointer",
          fontFamily: "inherit",
          background: isCheckedInToday ? "#dcfce7" : "#0D9488",
          color: isCheckedInToday ? "#166534" : "#ffffff",
          transition: "all 0.15s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
        onMouseOver={
          isCheckedInToday
            ? undefined
            : (e) => {
                e.currentTarget.style.background = "#0F766E";
              }
        }
        onMouseOut={
          isCheckedInToday
            ? undefined
            : (e) => {
                e.currentTarget.style.background = "#0D9488";
              }
        }
      >
        {isCheckedInToday ? (
          <>
            Already done!{" "}
            <span style={{ color: "#22c55e", fontSize: "16px" }}>✓</span>
          </>
        ) : (
          "✓ Done Today"
        )}
      </button>
    </div>
  );
}
