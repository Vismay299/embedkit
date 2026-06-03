"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface KPIWidgetProps {
  metricName?: string;
  value?: string;
  change?: number;
}

export default function KPIWidgetWidget({
  metricName = "Revenue",
  value = "$12,450",
  change = 12.5,
}: KPIWidgetProps) {
  const [currentValue] = useLocalStorage<string>(`embedkit-kpi-${metricName}`, value);
  const [currentChange] = useLocalStorage<number>(`embedkit-kpi-change-${metricName}`, change);

  const isPositive = currentChange >= 0;
  const sparkData = [35, 42, 38, 55, 48, 62, 58, 72, 68, 78, 85, currentChange > 0 ? 92 : 70];
  const max = Math.max(...sparkData);
  const min = Math.min(...sparkData);
  const range = max - min || 1;

  // Generate SVG sparkline
  const width = 160;
  const height = 40;
  const points = sparkData
    .map((v, i) => {
      const x = (i / (sparkData.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
      background: "#ffffff",
      borderRadius: "16px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      minWidth: "260px",
      maxWidth: "340px",
    }}>
      {/* Header */}
      <div style={{
        fontSize: "12px",
        fontWeight: 600,
        color: "#6b7280",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: "8px",
      }}>
        {metricName}
      </div>

      {/* Value + Change */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "16px" }}>
        <span style={{
          fontSize: "32px",
          fontWeight: 800,
          color: "#111827",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}>
          {currentValue}
        </span>
        <span style={{
          fontSize: "14px",
          fontWeight: 600,
          color: isPositive ? "#10b981" : "#ef4444",
          display: "inline-flex",
          alignItems: "center",
          gap: "2px",
        }}>
          {isPositive ? "↑" : "↓"} {Math.abs(currentChange)}%
        </span>
      </div>

      {/* Sparkline */}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
        <defs>
          <linearGradient id={`kpi-grad-${metricName}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.3" />
            <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <polygon
          points={`0,${height} ${points} ${width},${height}`}
          fill={`url(#kpi-grad-${metricName})`}
        />
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={isPositive ? "#10b981" : "#ef4444"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Footer */}
      <div style={{
        fontSize: "11px",
        color: "#9ca3af",
        marginTop: "8px",
      }}>
        vs. previous period
      </div>
    </div>
  );
}
