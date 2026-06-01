interface PageViewProps {
  label?: string;
}

export default function PageViewWidget({ label = "Views" }: PageViewProps) {
  // Simulate a deterministic view count using a hash of common inputs
  const viewCount = 1423;

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
      }}>
        {viewCount.toLocaleString()}
      </div>
      <div style={{
        fontSize: "11px",
        color: "#9ca3af",
        marginTop: "4px",
      }}>
        total page views
      </div>
    </div>
  );
}
