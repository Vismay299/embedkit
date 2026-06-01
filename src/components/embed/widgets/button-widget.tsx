"use client";

interface ButtonWidgetProps {
  label?: string;
  url?: string;
  color?: string;
}

export default function ButtonWidget({ label = "Click Me", url = "https://", color = "#0D9488" }: ButtonWidgetProps) {
  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
      background: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      minWidth: "180px",
      maxWidth: "400px",
      textAlign: "center",
    }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "14px 32px",
          background: color,
          color: "#ffffff",
          borderRadius: "10px",
          fontWeight: 700,
          fontSize: "16px",
          textDecoration: "none",
          cursor: "pointer",
          border: "none",
          transition: "all 0.2s ease",
          boxShadow: `0 2px 8px ${color}40`,
          letterSpacing: "0.02em",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = `0 4px 12px ${color}60`;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = `0 2px 8px ${color}40`;
        }}
      >
        {label}
      </a>
    </div>
  );
}
