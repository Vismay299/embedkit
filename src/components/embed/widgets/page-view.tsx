"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface PageViewProps {
  label?: string;
  maxViews?: number; // 0 = unlimited
}

interface PageViewData {
  count: number;
  lastVisit: number;
}

const DEBOUNCE_MS = 5000;

export default function PageViewWidget({ label = "Views", maxViews = 0 }: PageViewProps) {
  const storageKey = `embedkit-pageview-${label}`;
  const [data, setData] = useState<PageViewData>({ count: 0, lastVisit: 0 });
  const [bouncing, setBouncing] = useState(false);
  const initialized = useRef(false);

  // Hydrate + auto-increment on mount (debounced: 5s between loads)
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let current: PageViewData = { count: 0, lastVisit: 0 };
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) current = JSON.parse(stored);
    } catch {}

    const now = Date.now();
    if (
      (current.lastVisit === 0 || now - current.lastVisit > DEBOUNCE_MS) &&
      !(maxViews > 0 && current.count >= maxViews)
    ) {
      current = { count: current.count + 1, lastVisit: now };
      try { window.localStorage.setItem(storageKey, JSON.stringify(current)); } catch {}
      setBouncing(true);
    }
    setData(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clear bounce after 300ms
  useEffect(() => {
    if (!bouncing) return;
    const t = setTimeout(() => setBouncing(false), 300);
    return () => clearTimeout(t);
  }, [bouncing]);

  const persist = useCallback(
    (newData: PageViewData) => {
      setData(newData);
      try { window.localStorage.setItem(storageKey, JSON.stringify(newData)); } catch {}
    },
    [storageKey],
  );

  const handleReset = useCallback(() => persist({ count: 0, lastVisit: 0 }), [persist]);

  const isLimitReached = maxViews > 0 && data.count >= maxViews;
  const amber = "#d97706";

  const card: React.CSSProperties = {
    fontFamily: "system-ui, -apple-system, sans-serif",
    padding: "20px 24px",
    background: "#ffffff",
    borderRadius: "12px",
    border: `1px solid ${isLimitReached ? "#f59e0b" : "#e5e7eb"}`,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    minWidth: "160px",
    maxWidth: "280px",
    textAlign: "center",
    transition: "border-color 0.3s ease",
  };

  return (
    <div style={card}>
      {/* Icon + label */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
        <span style={{ fontSize: "18px" }}>{isLimitReached ? "🔒" : "👁️"}</span>
        <span style={{ fontSize: "14px", fontWeight: 600, color: isLimitReached ? amber : "#6b7280" }}>
          {label}
        </span>
      </div>

      {/* Count */}
      <div
        style={{
          fontSize: "36px",
          fontWeight: 800,
          color: isLimitReached ? amber : "#111827",
          lineHeight: 1.2,
          fontVariantNumeric: "tabular-nums",
          marginBottom: "4px",
          display: "inline-block",
          animation: bouncing ? "embedkit-bounce 0.3s ease" : "none",
        }}
      >
        {data.count.toLocaleString()}
      </div>

      {/* Subtitle */}
      <div style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "12px" }}>
        {isLimitReached ? (
          <span style={{ color: amber, fontWeight: 500 }}>Views limit reached</span>
        ) : maxViews > 0 ? (
          `+1 on refresh · ${data.count}/${maxViews}`
        ) : (
          "+1 on refresh"
        )}
      </div>

      {/* Reset button */}
      {data.count > 0 && (
        <button
          onClick={handleReset}
          style={{
            background: "none", border: "none", color: "#9ca3af", fontSize: "12px",
            cursor: "pointer", fontFamily: "inherit", textDecoration: "underline", padding: 0,
          }}
        >
          Reset
        </button>
      )}

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
