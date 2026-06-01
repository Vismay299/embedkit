"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ProjectProgressBizProps {
  projectName?: string;
  progress?: number;
  color?: string;
}

export default function ProjectProgressBizWidget({
  projectName = "Q2 Revenue Growth",
  progress = 45,
  color = "#2563eb",
}: ProjectProgressBizProps) {
  const [pct, setPct] = useLocalStorage<number>(
    `embedkit-project-biz-${projectName}`,
    progress
  );

  const clampedPct = Math.min(100, Math.max(0, pct));

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "28px",
      background: "linear-gradient(135deg, #ffffff, #f8fafc)",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      minWidth: "260px",
      maxWidth: "440px",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <div style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "4px",
          }}>
            Business Initiative
          </div>
          <div style={{ fontWeight: 700, fontSize: "18px", color: "#0f172a" }}>
            {projectName}
          </div>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: `${color}10`,
          fontSize: "22px",
        }}>
          📈
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        width: "100%",
        height: "12px",
        background: "#f1f5f9",
        borderRadius: "6px",
        overflow: "hidden",
        marginBottom: "14px",
      }}>
        <div style={{
          width: `${clampedPct}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          borderRadius: "6px",
          transition: "width 0.3s ease",
        }} />
      </div>

      {/* Percentage display with stepper */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
          <span style={{ fontSize: "32px", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>
            {clampedPct}%
          </span>
          <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>
            complete
          </span>
        </div>
        <div style={{
          background: `${color}10`,
          borderRadius: "8px",
          padding: "6px 12px",
          fontSize: "13px",
          fontWeight: 600,
          color,
        }}>
          {clampedPct >= 100 ? "Achieved ✅" : `${100 - clampedPct}% to goal`}
        </div>
      </div>

      {/* Stepper controls */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "12px",
      }}>
        <button
          onClick={() => setPct((p: number) => Math.max(0, p - 5))}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1.5px solid #cbd5e1",
            background: "#f8fafc",
            color: "#334155",
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
            e.currentTarget.style.background = "#f1f5f9";
            e.currentTarget.style.borderColor = "#94a3b8";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#f8fafc";
            e.currentTarget.style.borderColor = "#cbd5e1";
          }}
          aria-label="Decrease 5%"
        >
          −
        </button>
        <span style={{
          fontSize: "15px",
          fontWeight: 600,
          color: "#475569",
          minWidth: "36px",
          textAlign: "center",
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
          marginBottom: "14px",
          accentColor: color,
          cursor: "pointer",
          height: "6px",
          borderRadius: "3px",
        }}
      />

      {/* Milestone dots */}
      <div style={{
        display: "flex",
        gap: "6px",
        justifyContent: "center",
      }}>
        {[0, 25, 50, 75, 100].map((milestone) => (
          <div key={milestone} style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: clampedPct >= milestone ? color : "#e2e8f0",
            transition: "background 0.3s ease",
          }} />
        ))}
      </div>
    </div>
  );
}
