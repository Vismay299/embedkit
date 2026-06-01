"use client";

import { useState, useEffect } from "react";

function getWordTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hour12 = hours % 12 || 12;

  const hourWords = [
    "twelve", "one", "two", "three", "four",
    "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve"
  ];

  const nextHour = hourWords[(hour12 % 12) + 1];

  if (minutes === 0) return `It's ${hourWords[hour12]} o'clock`;
  if (minutes === 15) return `It's quarter past ${hourWords[hour12]}`;
  if (minutes === 30) return `It's half past ${hourWords[hour12]}`;
  if (minutes === 45) return `It's quarter to ${nextHour}`;
  if (minutes < 30) return `It's ${minutes} past ${hourWords[hour12]}`;
  return `It's ${60 - minutes} to ${nextHour}`;
}

export default function WordClockWidget() {
  const [timePhrase, setTimePhrase] = useState("");

  useEffect(() => {
    setTimePhrase(getWordTime(new Date()));
    const interval = setInterval(() => {
      setTimePhrase(getWordTime(new Date()));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!timePhrase) return null;

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
      background: "linear-gradient(135deg, #1e1b4b, #312e81)",
      borderRadius: "12px",
      border: "1px solid #4338ca",
      boxShadow: "0 4px 20px rgba(49,46,129,0.3)",
      minWidth: "220px",
      maxWidth: "400px",
      textAlign: "center",
    }}>
      <div style={{ fontSize: "32px", marginBottom: "12px" }}>🕐</div>
      <div style={{
        fontSize: "20px",
        fontWeight: 700,
        color: "#e0e7ff",
        lineHeight: 1.5,
        letterSpacing: "0.02em",
        textTransform: "lowercase",
      }}>
        {timePhrase}
      </div>
      <div style={{
        marginTop: "12px",
        fontSize: "13px",
        color: "#a5b4fc",
        fontVariantNumeric: "tabular-nums",
      }}>
        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
}
