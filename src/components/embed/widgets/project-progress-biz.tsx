interface ProjectProgressBizProps {
  projectName?: string;
  progress?: number;
  color?: string;
}

export default function ProjectProgressBizWidget({ projectName = "Q2 Revenue Growth", progress = 45, color = "#2563eb" }: ProjectProgressBizProps) {
  const pct = Math.min(100, Math.max(0, progress));
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

      {/* Large progress ring-style display */}
      <div style={{
        width: "100%",
        height: "12px",
        background: "#f1f5f9",
        borderRadius: "6px",
        overflow: "hidden",
        marginBottom: "14px",
      }}>
        <div style={{
          width: `${pct}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          borderRadius: "6px",
          transition: "width 0.6s ease",
        }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
          <span style={{ fontSize: "32px", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>
            {pct}%
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
          {pct >= 100 ? "Achieved ✅" : `${100 - pct}% to goal`}
        </div>
      </div>

      {/* Milestone dots */}
      <div style={{
        display: "flex",
        gap: "6px",
        marginTop: "16px",
        justifyContent: "center",
      }}>
        {[0, 25, 50, 75, 100].map((milestone) => (
          <div key={milestone} style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: pct >= milestone ? color : "#e2e8f0",
            transition: "background 0.3s ease",
          }} />
        ))}
      </div>
    </div>
  );
}
