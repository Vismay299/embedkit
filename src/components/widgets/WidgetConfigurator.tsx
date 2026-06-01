"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { WidgetDefinition, WidgetConfigField } from "@/types";
import { cn } from "@/lib/utils";

type ConfigValues = Record<string, string | number | boolean>;

interface WidgetConfiguratorProps {
  widget: WidgetDefinition;
}

function getDefaultConfig(schema: WidgetConfigField[]): ConfigValues {
  const config: ConfigValues = {};
  schema.forEach((field) => {
    config[field.key] = field.default;
  });
  return config;
}

// Resolve the embed URL with query params
function buildEmbedUrl(slug: string, config: ConfigValues, schema: WidgetConfigField[]): string {
  const params = new URLSearchParams();
  schema.forEach((field) => {
    const val = config[field.key];
    if (val !== undefined && val !== "" && val !== field.default) {
      params.set(field.key, String(val));
    }
  });
  const qs = params.toString();
  return `/embed/${slug}${qs ? `?${qs}` : ""}`;
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: WidgetConfigField;
  value: string | number | boolean;
  onChange: (key: string, value: string | number | boolean) => void;
}) {
  const inputClasses =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] focus:outline-none transition-colors";

  if (field.type === "select" && field.options) {
    return (
      <select
        value={String(value)}
        onChange={(e) => onChange(field.key, e.target.value)}
        className={inputClasses}
      >
        {field.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "toggle") {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={!!value}
        onClick={() => onChange(field.key, !value)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2",
          value ? "bg-[#0D9488]" : "bg-gray-200"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform",
            value ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    );
  }

  if (field.type === "color") {
    return (
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={String(value)}
          onChange={(e) => onChange(field.key, e.target.value)}
          className="h-9 w-12 cursor-pointer rounded border border-gray-300 bg-white p-0.5"
        />
        <input
          type="text"
          value={String(value)}
          onChange={(e) => onChange(field.key, e.target.value)}
          className={cn(inputClasses, "flex-1 font-mono text-xs")}
          placeholder="#000000"
        />
      </div>
    );
  }

  if (field.type === "number") {
    return (
      <input
        type="number"
        value={value as number}
        onChange={(e) => onChange(field.key, e.target.value === "" ? "" : Number(e.target.value))}
        className={inputClasses}
      />
    );
  }

  if (field.type === "date") {
    return (
      <input
        type="date"
        value={String(value)}
        onChange={(e) => onChange(field.key, e.target.value)}
        className={inputClasses}
      />
    );
  }

  // text (default)
  return (
    <input
      type="text"
      value={String(value)}
      onChange={(e) => onChange(field.key, e.target.value)}
      className={inputClasses}
    />
  );
}

// Simple inline widget preview
function WidgetPreview({
  widget,
  config,
  theme,
  showTitle,
  showDate,
  alignment,
  bgColor,
  titleColor,
  timeColor,
  dateColor,
}: {
  widget: WidgetDefinition;
  config: ConfigValues;
  theme: "light" | "dark";
  showTitle: boolean;
  showDate: boolean;
  alignment: "left" | "center" | "right";
  bgColor: string;
  titleColor: string;
  timeColor: string;
  dateColor: string;
}) {
  const isDark = theme === "dark";
  const textAlign =
    alignment === "left" ? "left" : alignment === "center" ? "center" : "right";

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: "20px",
        background: bgColor,
        borderRadius: "12px",
        border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
        minWidth: "220px",
        maxWidth: "320px",
        textAlign: textAlign as React.CSSProperties["textAlign"],
        color: isDark ? "#f9fafb" : "#111827",
      }}
    >
      {/* Title */}
      {showTitle && (
        <div
          style={{
            fontWeight: 700,
            fontSize: "16px",
            marginBottom: "8px",
            color: titleColor,
          }}
        >
          {config.projectName || config.label || config.metricName || widget.name}
        </div>
      )}

      {/* Date */}
      {showDate && (
        <div
          style={{
            fontSize: "11px",
            color: dateColor,
            marginBottom: "10px",
            opacity: 0.8,
          }}
        >
          {dateStr}
        </div>
      )}

      {/* Widget content - progress bar style */}
      {(config.progress !== undefined || config.value !== undefined) && (
        <div style={{ marginBottom: "8px" }}>
          <div
            style={{
              width: "100%",
              height: "10px",
              background: isDark ? "#374151" : "#f3f4f6",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.min(100, Math.max(0, Number(config.progress || config.value || 0)))}%`,
                height: "100%",
                background: String(config.color || "#0D9488"),
                borderRadius: "5px",
                transition: "width 0.4s ease",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "6px",
              fontSize: "11px",
              color: isDark ? "#9ca3af" : "#6b7280",
            }}
          >
            <span>{config.progress || config.value || 0}%</span>
            <span>{widget.name}</span>
          </div>
        </div>
      )}

      {/* Time display */}
      <div
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: timeColor,
          marginTop: "4px",
        }}
      >
        {timeStr}
      </div>

      {/* Metric display (KPI style) */}
      {config.metricName && (
        <div style={{ marginTop: "8px" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: timeColor,
            }}
          >
            {String(config.value || "$0")}
          </div>
          {config.change !== undefined && (
            <span
              style={{
                fontSize: "13px",
                color: Number(config.change) >= 0 ? "#10b981" : "#ef4444",
              }}
            >
              {Number(config.change) >= 0 ? "↑" : "↓"} {Math.abs(Number(config.change))}%
            </span>
          )}
        </div>
      )}

      {/* Streak counter */}
      {config.streak !== undefined && (
        <div style={{ marginTop: "8px" }}>
          <span style={{ fontSize: "36px", fontWeight: 700, color: timeColor }}>
            {config.streak}
          </span>
          <span style={{ fontSize: "13px", color: isDark ? "#9ca3af" : "#6b7280", marginLeft: "4px" }}>
            day streak
          </span>
        </div>
      )}

      {/* Button preview */}
      {config.url !== undefined && (
        <div
          style={{
            display: "inline-block",
            marginTop: "8px",
            padding: "8px 20px",
            borderRadius: "8px",
            background: String(config.color || "#0D9488"),
            color: "white",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          {String(config.label || "Click Me")}
        </div>
      )}

      {/* Countdown */}
      {config.targetDate && (
        <div style={{ marginTop: "8px", fontSize: "13px", color: isDark ? "#d1d5db" : "#4b5563" }}>
          Counting down to {String(config.targetDate)}
        </div>
      )}

      {/* Empty state for widgets with no config */}
      {widget.configSchema.length === 0 && (
        <div
          style={{
            padding: "12px",
            borderRadius: "8px",
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            fontSize: "13px",
            color: isDark ? "#9ca3af" : "#6b7280",
          }}
        >
          {widget.name} preview
        </div>
      )}
    </div>
  );
}

export function WidgetConfigurator({ widget }: WidgetConfiguratorProps) {
  const initialConfig = useMemo(() => getDefaultConfig(widget.configSchema), [widget.configSchema]);
  const [config, setConfig] = useState<ConfigValues>(initialConfig);

  // UI Options state
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showTitle, setShowTitle] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("left");

  // Colors state
  const [bgColor, setBgColor] = useState("#ffffff");
  const [titleColor, setTitleColor] = useState("#111827");
  const [timeColor, setTimeColor] = useState("#0D9488");
  const [dateColor, setDateColor] = useState("#6b7280");

  // Tab state
  const [activeTab, setActiveTab] = useState<"style" | "colors">("style");

  const handleConfigChange = (key: string, value: string | number | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const embedUrl = useMemo(
    () => buildEmbedUrl(widget.slug, config, widget.configSchema),
    [widget.slug, config, widget.configSchema]
  );

  const inputClasses =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] focus:outline-none transition-colors";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5";
  const sectionTitleClasses = "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-[#0D9488] hover:underline mb-2 inline-block"
        >
          ← Back to Widgets
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Configure: {widget.name}</h1>
        <p className="mt-1 text-gray-500">{widget.description}</p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: UI Options Panel */}
        <div className="lg:w-[420px] shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            {/* Widget Title */}
            <div>
              <label className={labelClasses}>Title of your Widget</label>
              <input
                type="text"
                value={String(config.projectName || config.label || config.metricName || config.habitName || widget.name)}
                onChange={(e) => {
                  // Find the first text field in configSchema to update
                  const textField = widget.configSchema.find((f) => f.type === "text")?.key;
                  if (textField) {
                    handleConfigChange(textField, e.target.value);
                  }
                }}
                className={inputClasses}
                placeholder="Widget Title"
              />
            </div>

            {/* Widget-specific config fields */}
            {widget.configSchema.length > 0 && (
              <div>
                <h3 className={sectionTitleClasses}>Widget Settings</h3>
                <div className="space-y-4">
                  {widget.configSchema.map((field) => (
                    <div key={field.key}>
                      <label className={labelClasses}>{field.label}</label>
                      <FieldRenderer
                        field={field}
                        value={config[field.key] ?? field.default}
                        onChange={handleConfigChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* UI Options Tabs */}
            <div>
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("style")}
                  className={cn(
                    "pb-2.5 px-4 text-sm font-medium border-b-2 transition-colors -mb-px",
                    activeTab === "style"
                      ? "border-[#0D9488] text-[#0D9488]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  )}
                >
                  Style
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("colors")}
                  className={cn(
                    "pb-2.5 px-4 text-sm font-medium border-b-2 transition-colors -mb-px",
                    activeTab === "colors"
                      ? "border-[#0D9488] text-[#0D9488]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  )}
                >
                  Colors
                </button>
              </div>

              {activeTab === "style" && (
                <div className="space-y-4">
                  {/* Theme */}
                  <div>
                    <label className={labelClasses}>Theme</label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value as "light" | "dark")}
                      className={inputClasses}
                    >
                      <option value="light">☀️ Light</option>
                      <option value="dark">🌙 Dark</option>
                    </select>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showTitle}
                        onChange={(e) => setShowTitle(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-[#0D9488] focus:ring-[#0D9488]"
                      />
                      <span className="text-sm text-gray-700">Show Title</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showDate}
                        onChange={(e) => setShowDate(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-[#0D9488] focus:ring-[#0D9488]"
                      />
                      <span className="text-sm text-gray-700">Show Date</span>
                    </label>
                  </div>

                  {/* Alignment */}
                  <div>
                    <label className={labelClasses}>Alignment</label>
                    <div className="flex gap-2">
                      {(["left", "center", "right"] as const).map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setAlignment(a)}
                          className={cn(
                            "flex-1 py-2 px-3 text-sm font-medium rounded-lg border transition-colors",
                            alignment === a
                              ? "border-[#0D9488] bg-[#0D9488]/5 text-[#0D9488]"
                              : "border-gray-300 text-gray-600 hover:border-gray-400"
                          )}
                        >
                          {a.charAt(0).toUpperCase() + a.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "colors" && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClasses}>Widget Background</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-9 w-12 cursor-pointer rounded border border-gray-300 bg-white p-0.5"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className={cn(inputClasses, "flex-1 font-mono text-xs")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Title Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={titleColor}
                        onChange={(e) => setTitleColor(e.target.value)}
                        className="h-9 w-12 cursor-pointer rounded border border-gray-300 bg-white p-0.5"
                      />
                      <input
                        type="text"
                        value={titleColor}
                        onChange={(e) => setTitleColor(e.target.value)}
                        className={cn(inputClasses, "flex-1 font-mono text-xs")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Time / Value Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={timeColor}
                        onChange={(e) => setTimeColor(e.target.value)}
                        className="h-9 w-12 cursor-pointer rounded border border-gray-300 bg-white p-0.5"
                      />
                      <input
                        type="text"
                        value={timeColor}
                        onChange={(e) => setTimeColor(e.target.value)}
                        className={cn(inputClasses, "flex-1 font-mono text-xs")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Date / Subtitle Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={dateColor}
                        onChange={(e) => setDateColor(e.target.value)}
                        className="h-9 w-12 cursor-pointer rounded border border-gray-300 bg-white p-0.5"
                      />
                      <input
                        type="text"
                        value={dateColor}
                        onChange={(e) => setDateColor(e.target.value)}
                        className={cn(inputClasses, "flex-1 font-mono text-xs")}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Create Widget Button */}
            <Link
              href={embedUrl}
              target="_blank"
              className="block w-full text-center py-3 px-4 rounded-xl bg-[#0D9488] text-white font-semibold hover:bg-[#0F766E] transition-colors shadow-sm"
            >
              Create Widget →
            </Link>

            {/* Embed URL */}
            <div>
              <h3 className={sectionTitleClasses}>Embed URL</h3>
              <div className="bg-gray-900 text-green-400 rounded-lg p-3 font-mono text-xs break-all">
                {`https://embedkit-wheat.vercel.app${embedUrl}`}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Copy this URL and paste it into Notion using <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">/embed</code>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="flex-1 min-w-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Preview:
            </h3>
            <div className="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-2xl border border-gray-200 p-8">
              <div className="scale-100">
                <WidgetPreview
                  widget={widget}
                  config={config}
                  theme={theme}
                  showTitle={showTitle}
                  showDate={showDate}
                  alignment={alignment}
                  bgColor={bgColor}
                  titleColor={titleColor}
                  timeColor={timeColor}
                  dateColor={dateColor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
