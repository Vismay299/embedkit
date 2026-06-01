interface HabitCounterProps {
  habitName?: string;
  streak?: number;
}

export default function HabitCounterWidget({ habitName = "Read Daily", streak = 12 }: HabitCounterProps) {
  const maxStreak = Math.max(streak, 30);
  const pct = Math.min(100, (streak / maxStreak) * 100);
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
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #f59e0b, #ef4444)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
        }}>
          🔥
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>{habitName}</div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>Current streak</div>
        </div>
      </div>
      <div style={{
        display: "flex",
        alignItems: "baseline",
        gap: "6px",
        marginBottom: "14px",
      }}>
        <span style={{ fontSize: "40px", fontWeight: 800, color: "#f59e0b", lineHeight: 1 }}>
          {streak}
        </span>
        <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: 500 }}>
          {streak === 1 ? "day" : "days"}
        </span>
      </div>
      <div style={{ width: "100%", height: "8px", background: "#fef3c7", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`,
          height: "100%",
          background: "linear-gradient(90deg, #f59e0b, #ef4444)",
          borderRadius: "4px",
          transition: "width 0.5s ease",
        }} />
      </div>
      <div style={{ marginTop: "8px", fontSize: "12px", color: "#9ca3af", textAlign: "right" }}>
        Goal: {maxStreak} days
      </div>
    </div>
  );
}
