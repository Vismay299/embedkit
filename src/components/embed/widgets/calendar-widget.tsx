"use client";

import { useState, useMemo } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export default function CalendarWidget() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(today.getDate());

  const daysInMonth = useMemo(() => getDaysInMonth(currentYear, currentMonth), [currentYear, currentMonth]);
  const firstDay = useMemo(() => getFirstDayOfMonth(currentYear, currentMonth), [currentYear, currentMonth]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDate(null);
  };

  const isToday = (day: number) =>
    day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
      background: "#ffffff",
      borderRadius: "16px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      width: "320px",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "16px",
      }}>
        <button
          onClick={prevMonth}
          style={{
            background: "#f3f4f6",
            border: "none",
            borderRadius: "8px",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            fontSize: "16px",
            color: "#374151",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ‹
        </button>
        <span style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>
          {MONTHS[currentMonth]} {currentYear}
        </span>
        <button
          onClick={nextMonth}
          style={{
            background: "#f3f4f6",
            border: "none",
            borderRadius: "8px",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            fontSize: "16px",
            color: "#374151",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "8px" }}>
        {DAYS.map((d) => (
          <div key={d} style={{
            textAlign: "center",
            fontSize: "11px",
            fontWeight: 600,
            color: "#9ca3af",
            padding: "4px 0",
          }}>
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
        {days.map((day, i) => (
          <button
            key={i}
            onClick={() => day && setSelectedDate(day)}
            disabled={!day}
            style={{
              width: "100%",
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              border: "none",
              fontSize: "13px",
              fontWeight: isToday(day!) ? 700 : 400,
              cursor: day ? "pointer" : "default",
              background: isToday(day!) && selectedDate === day
                ? "#2563eb"
                : selectedDate === day
                ? "#eff6ff"
                : isToday(day!)
                ? "#dbeafe"
                : "transparent",
              color: isToday(day!) && selectedDate === day
                ? "#ffffff"
                : isToday(day!)
                ? "#2563eb"
                : day
                ? "#374151"
                : "transparent",
              transition: "all 0.15s ease",
            }}
          >
            {day || ""}
          </button>
        ))}
      </div>

      {/* Selected date info */}
      {selectedDate && (
        <div style={{
          marginTop: "12px",
          padding: "10px 12px",
          background: "#f9fafb",
          borderRadius: "10px",
          fontSize: "12px",
          color: "#6b7280",
          textAlign: "center",
        }}>
          {MONTHS[currentMonth]} {selectedDate}, {currentYear}
          {isToday(selectedDate) && (
            <span style={{ marginLeft: "8px", color: "#2563eb", fontWeight: 600 }}>Today</span>
          )}
        </div>
      )}
    </div>
  );
}
