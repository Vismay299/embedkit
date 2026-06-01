"use client";

import { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ProgressBarProps {
  title?: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  color?: string;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function parseDateSafe(dateStr: string): number | null {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
  const ts = new Date(dateStr + "T00:00:00").getTime();
  return isNaN(ts) ? null : ts;
}

export default function ProgressBarWidget({
  title: initialTitle = "Progress",
  startDate: initialStart = "2026-01-01",
  endDate: initialEnd = "2026-12-31",
  color = "#0D9488",
}: ProgressBarProps) {
  // Persist config in localStorage so user can override via query params
  const [title] = useLocalStorage<string>("embedkit-progressbar-title", initialTitle);
  const [startDate] = useLocalStorage<string>("embedkit-progressbar-start", initialStart);
  const [endDate] = useLocalStorage<string>("embedkit-progressbar-end", initialEnd);

  // Current timestamp, updated every 60 seconds
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const percent = useMemo(() => {
    const start = parseDateSafe(startDate);
    const end = parseDateSafe(endDate);
    if (start === null || end === null) return 0;
    const range = end - start;
    if (range <= 0) return end < start ? 0 : 100;
    const elapsed = now - start;
    return Math.min(100, Math.max(0, Math.round((elapsed / range) * 100)));
  }, [startDate, endDate, now]);

  const isComplete = percent >= 100;
  const isNotStarted = percent <= 0;
  const statusLabel = isComplete ? "Completed" : isNotStarted ? "Not started" : "";

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "20px 24px",
        background: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        minWidth: "200px",
        maxWidth: "400px",
      }}
    >
      {/* Header: icon + title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        <span style={{ fontSize: "18px", lineHeight: 1 }}>📊</span>
        <span style={{ fontWeight: 600, fontSize: "15px", color: "#111827" }}>
          {title}
        </span>
        {statusLabel && (
          <span
            style={{
              marginLeft: "auto",
              fontSize: "12px",
              fontWeight: 500,
              color: isComplete ? "#059669" : "#6b7280",
              background: isComplete ? "#d1fae5" : "#f3f4f6",
              padding: "2px 8px",
              borderRadius: "10px",
            }}
          >
            {statusLabel}
          </span>
        )}
      </div>

      {/* Progress bar + percentage */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "8px",
            background: "#f3f4f6",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percent}%`,
              height: "100%",
              background: color,
              borderRadius: "4px",
              transition: "width 0.5s ease",
              boxShadow: `0 0 6px ${color}30`,
            }}
          />
        </div>
        <span
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: color,
            minWidth: "48px",
            textAlign: "right",
            lineHeight: 1,
          }}
        >
          {percent}%
        </span>
      </div>

      {/* Date range */}
      <div
        style={{
          fontSize: "13px",
          color: "#6b7280",
          textAlign: "center",
        }}
      >
        {formatDate(startDate)} – {formatDate(endDate)}
      </div>
    </div>
  );
}
