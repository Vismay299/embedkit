function calculateProgress() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  
  const dayOfWeek = now.getDay(); // 0=Sun
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  // Life progress - assume 80 years
  const birthYear = 1990;
  const lifeStart = new Date(birthYear, 0, 1);
  const lifeEnd = new Date(birthYear + 80, 0, 1);

  const pctBetween = (from: Date, to: Date) =>
    Math.max(0, Math.min(100, ((now.getTime() - from.getTime()) / (to.getTime() - from.getTime())) * 100));

  return {
    life: Math.round(pctBetween(lifeStart, lifeEnd) * 10) / 10,
    year: Math.round(pctBetween(startOfYear, endOfYear) * 10) / 10,
    month: Math.round(pctBetween(startOfMonth, endOfMonth) * 10) / 10,
    week: Math.round(pctBetween(startOfWeek, endOfWeek) * 10) / 10,
    day: Math.round(pctBetween(startOfDay, endOfDay) * 10) / 10,
  };
}

function ProgressRow({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>{label}</span>
        <span style={{ fontSize: "13px", fontWeight: 700, color }}>{pct}%</span>
      </div>
      <div style={{ width: "100%", height: "6px", background: "#f3f4f6", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`,
          height: "100%",
          background: color,
          borderRadius: "3px",
          transition: "width 0.5s ease",
        }} />
      </div>
    </div>
  );
}

export default function LifeProgressWidget() {
  const progress = calculateProgress();
  const rows = [
    { label: "🏠 Life", pct: progress.life, color: "#8b5cf6" },
    { label: "📅 Year", pct: progress.year, color: "#3b82f6" },
    { label: "🗓️ Month", pct: progress.month, color: "#10b981" },
    { label: "📆 Week", pct: progress.week, color: "#f59e0b" },
    { label: "🌅 Day", pct: progress.day, color: "#ef4444" },
  ];

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
      background: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      minWidth: "240px",
      maxWidth: "400px",
    }}>
      <div style={{
        fontWeight: 700,
        fontSize: "16px",
        color: "#111827",
        marginBottom: "16px",
        textAlign: "center",
      }}>
        ⏳ Time Progress
      </div>
      {rows.map((row) => (
        <ProgressRow key={row.label} label={row.label} pct={row.pct} color={row.color} />
      ))}
    </div>
  );
}
