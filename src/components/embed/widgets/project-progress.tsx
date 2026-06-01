interface ProjectProgressProps {
  projectName?: string;
  progress?: number;
  color?: string;
}

export default function ProjectProgressWidget({ projectName = "My Project", progress = 65, color = "#0D9488" }: ProjectProgressProps) {
  const pct = Math.min(100, Math.max(0, progress));
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
          width: `${pct}%`,
          height: "100%",
          background: color,
          borderRadius: "5px",
          transition: "width 0.6s ease",
          boxShadow: `0 0 8px ${color}40`,
        }} />
      </div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        fontSize: "13px",
        color: "#6b7280",
      }}>
        <span style={{ fontWeight: 500 }}>{pct}% complete</span>
        <span>{pct >= 100 ? "Done! 🎉" : `${100 - pct}% remaining`}</span>
      </div>
    </div>
  );
}
