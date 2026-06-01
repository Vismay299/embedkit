"use client";

import { useState, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface PageViewProps {
  label?: string;
}

export default function PageViewWidget({ label = "Views" }: PageViewProps) {
  const [viewCount, setViewCount] = useLocalStorage<number>(
    `embedkit-pageview-${label}`,
    0
  );

  const [bouncing, setBouncing] = useState(false);

  const handleIncrement = useCallback(() => {
    setViewCount((c: number) => c + 1);
    setBouncing(true);
    setTimeout(() => setBouncing(false), 300);
  }, [setViewCount]);

  const handleReset = useCallback(() => {
    setViewCount(0);
  }, [setViewCount]);

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "20px 24px",
      background: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      minWidth: "160px",
      maxWidth: "280px",
      textAlign: "center",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        marginBottom: "8px",
      }}>
        <span style={{ fontSize: "18px" }}>👁️</span>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280" }}>{label}</span>
      </div>
      <div style={{
        fontSize: "36px",
        fontWeight: 800,
        color: "#111827",
        lineHeight: 1.2,
        fontVariantNumeric: "tabular-nums",
        marginBottom: "4px",
        display: "inline-block",
        animation: bouncing ? "embedkit-bounce 0.3s ease" : "none",
      }}>
        {viewCount.toLocaleString()}
      </div>
      <div style={{
        fontSize: "11px",
        color: "#9ca3af",
        marginBottom: "12px",
      }}>
        total page views
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <button
          onClick={handleIncrement}
          style={{
            width: "100%",
            maxWidth: "160px",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#0D9488",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#0F766E";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#0D9488";
          }}
        >
          +1 View
        </button>
        {viewCount > 0 && (
          <button
            onClick={handleReset}
            style={{
              background: "none",
              border: "none",
              color: "#9ca3af",
              fontSize: "12px",
              cursor: "pointer",
              fontFamily: "inherit",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            Reset
          </button>
        )}
      </div>

      {/* Inject keyframe animation for bounce */}
      <style>{`
        @keyframes embedkit-bounce {
          0% { transform: scale(1); }
          30% { transform: scale(1.2); }
          60% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
