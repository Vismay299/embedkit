"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ProgressBarProps {
  label?: string;
  value?: number;
  color?: string;
}

export default function ProgressBarWidget({ label = "Progress", value = 75, color = "#0D9488" }: ProgressBarProps) {
  const [pct, setPct] = useLocalStorage<number>(
    `embedkit-progress-${label}`,
    value
  );

  const clampedPct = Math.min(100, Math.max(0, pct));

  const handleBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newPct = Math.round((clickX / rect.width) * 100);
      setPct(Math.min(100, Math.max(0, newPct)));
    },
    [setPct]
  );

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "20px 24px",
      background: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      minWidth: "200px",
      maxWidth: "400px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{ fontWeight: 600, fontSize: "14px", color: "#374151" }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setPct((p: number) => Math.max(0, p - 1))}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "1.5px solid #d1d5db",
              background: "#f9fafb",
              color: "#374151",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
              padding: 0,
              transition: "all 0.15s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#f3f4f6";
              e.currentTarget.style.borderColor = "#9ca3af";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#f9fafb";
              e.currentTarget.style.borderColor = "#d1d5db";
            }}
            aria-label="Decrease progress"
          >
            −
          </button>
          <span style={{ fontSize: "14px", fontWeight: 700, color, minWidth: "36px", textAlign: "center" }}>
            {clampedPct}%
          </span>
          <button
            onClick={() => setPct((p: number) => Math.min(100, p + 1))}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "1.5px solid color",
              borderColor: color,
              background: color,
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
              padding: 0,
              transition: "all 0.15s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = "0.85";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            aria-label="Increase progress"
          >
            +
          </button>
        </div>
      </div>
      <div
        onClick={handleBarClick}
        style={{
          width: "100%",
          height: "8px",
          background: "#f3f4f6",
          borderRadius: "4px",
          overflow: "hidden",
          cursor: "pointer",
        }}
        title="Click to set progress"
      >
        <div style={{
          width: `${clampedPct}%`,
          height: "100%",
          background: color,
          borderRadius: "4px",
          transition: "width 0.3s ease",
          boxShadow: `0 0 6px ${color}30`,
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}
