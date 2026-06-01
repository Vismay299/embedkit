"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ProjectProgressProps {
  projectName?: string;
  progress?: number;
  color?: string;
}

export default function ProjectProgressWidget({
  projectName = "My Project",
  progress = 65,
  color = "#0D9488",
}: ProjectProgressProps) {
  const [pct, setPct] = useLocalStorage<number>(
    `embedkit-project-progress-${projectName}`,
    progress
  );

  const clampedPct = Math.min(100, Math.max(0, pct));

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
      background: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      minWidth: "220px",
      maxWidth: "400px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          background: `${color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}>
          📊
        </div>
        <span style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>
          {projectName}
        </span>
      </div>
      <div style={{ width: "100%", height: "10px", background: "#f3f4f6", borderRadius: "5px", overflow: "hidden" }}>
        <div style={{
          width: `${clampedPct}%`,
          height: "100%",
          background: color,
          borderRadius: "5px",
          transition: "width 0.3s ease",
          boxShadow: `0 0 8px ${color}40`,
        }} />
      </div>

      {/* Stepper controls */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        marginTop: "14px",
      }}>
        <button
          onClick={() => setPct((p: number) => Math.max(0, p - 5))}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1.5px solid #d1d5db",
            background: "#f9fafb",
            color: "#374151",
            fontSize: "18px",
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
          aria-label="Decrease 5%"
        >
          −
        </button>
        <span style={{
          fontSize: "22px",
          fontWeight: 800,
          color: "#111827",
          minWidth: "48px",
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
        }}>
          {clampedPct}%
        </span>
        <button
          onClick={() => setPct((p: number) => Math.min(100, p + 5))}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1.5px solid",
            borderColor: color,
            background: color,
            color: "#ffffff",
            fontSize: "18px",
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
          aria-label="Increase 5%"
        >
          +
        </button>
      </div>

      {/* Range slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={clampedPct}
        onChange={(e) => setPct(Number(e.target.value))}
        style={{
          width: "100%",
          marginTop: "12px",
          accentColor: color,
          cursor: "pointer",
          height: "6px",
          borderRadius: "3px",
        }}
      />

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        fontSize: "13px",
        color: "#6b7280",
      }}>
        <span style={{ fontWeight: 500 }}>{clampedPct}% complete</span>
        <span>{clampedPct >= 100 ? "Done! 🎉" : `${100 - clampedPct}% remaining`}</span>
      </div>
    </div>
  );
}
