import { getWidgetBySlug } from "@/lib/widgets-data";

// This route renders widget iframes for embedding in Notion
export default async function WidgetEmbedPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const widget = getWidgetBySlug(slug);

  if (!widget) {
    return (
      <div style={{ padding: "20px", fontFamily: "system-ui", textAlign: "center" }}>
        <p>Widget not found</p>
      </div>
    );
  }

  // Extract config from query params
  const config: Record<string, string> = {};
  widget.configSchema.forEach((field) => {
    const val = sp[field.key];
    config[field.key] = typeof val === "string" ? val : String(field.default);
  });

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: "16px",
        background: "white",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        minWidth: "200px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <span style={{ fontSize: "20px" }}>📊</span>
        <span style={{ fontWeight: 600, fontSize: "14px", color: "#111827" }}>
          {config.projectName || widget.name}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#f3f4f6",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${config.progress || 65}%`,
            height: "100%",
            background: config.color || "#0D9488",
            borderRadius: "4px",
            transition: "width 0.5s ease",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "8px",
          fontSize: "12px",
          color: "#6b7280",
        }}
      >
        <span>{config.progress || 65}% complete</span>
        <span>{widget.name}</span>
      </div>
    </div>
  );
}
