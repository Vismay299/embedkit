interface ProgressBarProps {
  label?: string;
  value?: number;
  color?: string;
}

export default function ProgressBarWidget({ label = "Progress", value = 75, color = "#0D9488" }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
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
        <span style={{ fontSize: "14px", fontWeight: 700, color }}>{pct}%</span>
      </div>
      <div style={{ width: "100%", height: "8px", background: "#f3f4f6", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`,
          height: "100%",
          background: color,
          borderRadius: "4px",
          transition: "width 0.5s ease",
          boxShadow: `0 0 6px ${color}30`,
        }} />
      </div>
    </div>
  );
}
