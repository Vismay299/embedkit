"use client";

import { useState, useEffect, useCallback } from "react";

interface LifeProgressProps {
  title?: string;
  birthDate?: string;
  timezone?: string;
  showLife?: boolean;
  showYear?: boolean;
  showMonth?: boolean;
  showWeek?: boolean;
  showDay?: boolean;
}

interface ProgressData { life: number; year: number; month: number; week: number; day: number; }
interface TimeParts { year: number; month: number; day: number; weekday: number; hours: number; minutes: number; }

const LS_KEY = "embedkit-life-progress-config";

function validateTimezone(tz: string): string {
  try { Intl.DateTimeFormat("en-US", { timeZone: tz }); return tz; }
  catch { return "UTC"; }
}

function getLocalParts(date: Date, tz: string): TimeParts {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(date);
  const map: Record<string, string> = {};
  for (const p of parts) {
    if (p.type !== "literal") map[p.type] = p.value;
  }
  const jsWeekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(map.weekday || "Mon");
  return {
    year: parseInt(map.year || "2024"),
    month: parseInt(map.month || "1"),
    day: parseInt(map.day || "1"),
    weekday: (jsWeekday + 6) % 7, // Monday=0
    hours: parseInt(map.hour || "0"),
    minutes: parseInt(map.minute || "0"),
  };
}

function formatTime(date: Date, tz: string): string {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
  return fmt.format(date);
}

function calculateProgress(date: Date, tz: string, birthDateStr: string): ProgressData {
  const p = getLocalParts(date, tz);

  // --- Life (birth to +80 years) ---
  const [by, bm, bd] = birthDateStr.split("-").map(Number);
  const birthMs = Date.UTC(by, bm - 1, bd);
  const lifeEndMs = Date.UTC(by + 80, bm - 1, bd);
  const nowMs = Date.UTC(p.year, p.month - 1, p.day, p.hours, p.minutes);
  const life = clampPct(nowMs, birthMs, lifeEndMs);

  // --- Year ---
  const yearStartMs = Date.UTC(p.year, 0, 1);
  const yearEndMs = Date.UTC(p.year + 1, 0, 1);
  const year = clampPct(nowMs, yearStartMs, yearEndMs);

  // --- Month ---
  const monthStartMs = Date.UTC(p.year, p.month - 1, 1);
  const monthEndMs = Date.UTC(p.year, p.month, 1);
  const month = clampPct(nowMs, monthStartMs, monthEndMs);

  // --- Week (Mon=start) ---
  const monDay = p.day - p.weekday;
  const weekStartMs = Date.UTC(p.year, p.month - 1, monDay);
  const weekEndMs = weekStartMs + 7 * 86400000;
  const week = clampPct(nowMs, weekStartMs, weekEndMs);

  // --- Day ---
  const dayStartMs = Date.UTC(p.year, p.month - 1, p.day);
  const dayEndMs = dayStartMs + 86400000;
  const day = clampPct(nowMs, dayStartMs, dayEndMs);

  return { life, year, month, week, day };
}

function clampPct(now: number, start: number, end: number): number {
  const range = end - start;
  if (range <= 0) return 0;
  return Math.round(Math.max(0, Math.min(100, ((now - start) / range) * 100)) * 10) / 10;
}

function ProgressRow({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>{label}</span>
        <span style={{ fontSize: "13px", fontWeight: 700, color }}>{pct}%</span>
      </div>
      <div style={{ width: "100%", height: "6px", background: "#f3f4f6", borderRadius: "3px", overflow: "hidden" }}>
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            borderRadius: "3px",
            transition: "width 0.5s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function LifeProgressWidget(props: LifeProgressProps) {
  const initialBirth = props.birthDate || "1990-01-01";
  const initialTimezone = validateTimezone(props.timezone || "America/New_York");

  // Local-storage–backed state (hydrated client-side only)
  const [birthDate, setBirthDate] = useState(initialBirth);
  const [timezone, setTimezone] = useState(initialTimezone);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.birthDate && /^\d{4}-\d{2}-\d{2}$/.test(saved.birthDate))
          setBirthDate(saved.birthDate);
        if (saved.timezone) setTimezone(validateTimezone(saved.timezone));
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever values change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ birthDate, timezone }));
    } catch { /* ignore */ }
  }, [birthDate, timezone, hydrated]);

  // Current progress state
  const [progress, setProgress] = useState<ProgressData>(() =>
    calculateProgress(new Date(), timezone, birthDate)
  );
  const [timeDisplay, setTimeDisplay] = useState("");

  const tick = useCallback(() => {
    const now = new Date();
    setProgress(calculateProgress(now, timezone, birthDate));
    setTimeDisplay(formatTime(now, timezone));
  }, [timezone, birthDate]);

  useEffect(() => {
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [tick]);

  const title = props.title || "Life, Year, Month, Week and Day Progress";
  const showLife = props.showLife !== false;
  const showYear = props.showYear !== false;
  const showMonth = props.showMonth !== false;
  const showWeek = props.showWeek !== false;
  const showDay = props.showDay !== false;

  const rows: { label: string; pct: number; color: string; show: boolean }[] = [
    { label: "🏠 Life", pct: progress.life, color: "#8b5cf6", show: showLife },
    { label: "📅 Year", pct: progress.year, color: "#3b82f6", show: showYear },
    { label: "🗓️ Month", pct: progress.month, color: "#10b981", show: showMonth },
    { label: "📆 Week", pct: progress.week, color: "#f59e0b", show: showWeek },
    { label: "🌅 Day", pct: progress.day, color: "#ef4444", show: showDay },
  ];

  const visibleRows = rows.filter((r) => r.show);

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px",
        background: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        minWidth: "240px",
        maxWidth: "400px",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: "16px",
          color: "#111827",
          marginBottom: "4px",
          textAlign: "center",
        }}
      >
        {title}
      </div>
      {timeDisplay && (
        <div
          style={{
            fontSize: "13px",
            color: "#6b7280",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          {timeDisplay}
        </div>
      )}
      {visibleRows.length === 0 && (
        <div style={{ textAlign: "center", color: "#9ca3af", fontSize: "13px", padding: "12px 0" }}>
          No progress bars enabled
        </div>
      )}
      {visibleRows.map((row) => (
        <ProgressRow key={row.label} label={row.label} pct={row.pct} color={row.color} />
      ))}
    </div>
  );
}
