"use client";

export default function WidgetLoading() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "200px",
      padding: "40px",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          border: "4px solid #e0e7ff",
          borderTop: "4px solid #3b82f6",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }} />
        <p style={{
          fontSize: "14px",
          color: "#6b7280",
          fontWeight: 500,
          margin: 0,
        }}>
          Loading widget...
        </p>
      </div>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
