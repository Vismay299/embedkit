"use client";

import { useState, useEffect } from "react";

interface WorldClockProps {
  timezone?: string;
}

const TIMEZONE_MAP: Record<string, string> = {
  "UTC": "UTC",
  "America/New_York": "America/New_York",
  "America/Chicago": "America/Chicago",
  "America/Denver": "America/Denver",
  "America/Los_Angeles": "America/Los_Angeles",
  "Europe/London": "Europe/London",
  "Europe/Paris": "Europe/Paris",
  "Europe/Berlin": "Europe/Berlin",
  "Asia/Tokyo": "Asia/Tokyo",
  "Asia/Shanghai": "Asia/Shanghai",
  "Asia/Kolkata": "Asia/Kolkata",
  "Asia/Dubai": "Asia/Dubai",
  "Australia/Sydney": "Australia/Sydney",
  "Pacific/Auckland": "Pacific/Auckland",
};

function formatTime(date: Date, tz: string): { time: string; dateStr: string; offset: string } {
  try {
    const opts: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: tz,
    };
    const dateOpts: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: tz,
    };

    const time = new Intl.DateTimeFormat("en-US", opts).format(date);
    const dateStr = new Intl.DateTimeFormat("en-US", dateOpts).format(date);

    const utcOffset = date.getTimezoneOffset();
    // Simple offset calculation
    const sign = utcOffset <= 0 ? "+" : "-";
    const absOff = Math.abs(utcOffset);
    const offset = `UTC${sign}${String(Math.floor(absOff / 60)).padStart(2, "0")}:${String(absOff % 60).padStart(2, "0")}`;

    return { time, dateStr, offset };
  } catch {
    return { time: "--:--:--", dateStr: "Invalid timezone", offset: "UTC" };
  }
}

export default function WorldClockWidget({ timezone = "UTC" }: WorldClockProps) {
  const tz = TIMEZONE_MAP[timezone] || timezone;
  const [now, setNow] = useState(new Date());
  const { time, dateStr } = formatTime(now, tz);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
      background: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      minWidth: "220px",
      maxWidth: "340px",
      textAlign: "center",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        marginBottom: "12px",
      }}>
        <span style={{ fontSize: "20px" }}>🌍</span>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280" }}>{tz}</span>
      </div>
      <div style={{
        fontSize: "36px",
        fontWeight: 800,
        color: "#111827",
        lineHeight: 1.2,
        fontVariantNumeric: "tabular-nums",
        marginBottom: "6px",
      }}>
        {time}
      </div>
      <div style={{
        fontSize: "13px",
        color: "#6b7280",
        fontWeight: 500,
      }}>
        {dateStr}
      </div>
    </div>
  );
}
