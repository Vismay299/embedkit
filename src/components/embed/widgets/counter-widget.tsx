"use client";

import { useState } from "react";

interface CounterWidgetProps {
  label?: string;
  initialValue?: number;
}

export default function CounterWidget({ label = "Count", initialValue = 0 }: CounterWidgetProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
      background: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      minWidth: "180px",
      maxWidth: "300px",
      textAlign: "center",
    }}>
      <div style={{
        fontSize: "13px",
        fontWeight: 600,
        color: "#6b7280",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: "12px",
      }}>
        {label}
      </div>
      <div style={{
        fontSize: "48px",
        fontWeight: 800,
        color: "#111827",
        lineHeight: 1,
        marginBottom: "20px",
        fontVariantNumeric: "tabular-nums",
      }}>
        {count}
      </div>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          onClick={() => setCount(c => c - 1)}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            border: "2px solid #e5e7eb",
            background: "#f9fafb",
            color: "#374151",
            fontSize: "22px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#f3f4f6";
            e.currentTarget.style.borderColor = "#d1d5db";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#f9fafb";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }}
        >
          −
        </button>
        <button
          onClick={() => setCount(c => c + 1)}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            border: "2px solid #0D9488",
            background: "#0D9488",
            color: "#ffffff",
            fontSize: "22px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#0F766E";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#0D9488";
          }}
        >
          +
        </button>
      </div>
      {count !== initialValue && (
        <button
          onClick={() => setCount(initialValue)}
          style={{
            marginTop: "12px",
            background: "none",
            border: "none",
            color: "#9ca3af",
            fontSize: "12px",
            cursor: "pointer",
            fontFamily: "inherit",
            textDecoration: "underline",
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
}
