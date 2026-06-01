"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate?: string;
}

function calcTimeLeft(target: Date): { days: number; hours: number; minutes: number; seconds: number; total: number } {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  };
}

export default function CountdownTimerWidget({ targetDate = "2026-12-31" }: CountdownTimerProps) {
  const target = new Date(targetDate + "T23:59:59");
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const isExpired = timeLeft.total <= 0;

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
      background: "linear-gradient(135deg, #0F172A, #1E293B)",
      borderRadius: "12px",
      border: "1px solid #334155",
      boxShadow: "0 4px 20px rgba(15,23,42,0.4)",
      minWidth: "280px",
      maxWidth: "420px",
      textAlign: "center",
    }}>
      <div style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "16px", fontWeight: 500 }}>
        {isExpired ? "🎉 Event reached!" : `Countdown to ${target.toLocaleDateString()}`}
      </div>
      {isExpired ? (
        <div style={{ fontSize: "48px" }}>🎊</div>
      ) : (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Mins" },
            { value: timeLeft.seconds, label: "Secs" },
          ].map((unit) => (
            <div key={unit.label} style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "10px 8px",
              minWidth: "58px",
            }}>
              <div style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "#f1f5f9",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}>
                {String(unit.value).padStart(2, "0")}
              </div>
              <div style={{
                fontSize: "11px",
                color: "#64748b",
                marginTop: "4px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
