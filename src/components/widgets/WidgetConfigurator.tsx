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
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors";

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
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2",
          value ? "bg-blue-600" : "bg-gray-200"
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

  return (
    <input
      type="text"
      value={String(value)}
      onChange={(e) => onChange(field.key, e.target.value)}
      className={inputClasses}
    />
  );
}

export function WidgetConfigurator({ widget }: WidgetConfiguratorProps) {
  const initialConfig = useMemo(() => getDefaultConfig(widget.configSchema), [widget.configSchema]);
  const [config, setConfig] = useState<ConfigValues>(initialConfig);
  const [copied, setCopied] = useState(false);

  const handleConfigChange = (key: string, value: string | number | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const embedUrl = useMemo(
    () => buildEmbedUrl(widget.slug, config, widget.configSchema),
    [widget.slug, config, widget.configSchema]
  );

  const fullEmbedUrl = `https://embedkit-wheat.vercel.app${embedUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullEmbedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = fullEmbedUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline mb-2 inline-block"
        >
          ← Back to Widgets
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Configure: {widget.name}</h1>
        <p className="mt-1 text-gray-500">{widget.description}</p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: Config Panel */}
        <div className="lg:w-[420px] shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            {/* Widget-specific config fields */}
            {widget.configSchema.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Widget Settings
                </h3>
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

            {/* Embed URL */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Embed URL
              </h3>
              <div className="bg-gray-900 text-green-400 rounded-lg p-3 font-mono text-xs break-all mb-2">
                {fullEmbedUrl}
              </div>
              <button
                onClick={handleCopy}
                className={cn(
                  "w-full py-2.5 rounded-lg font-semibold text-sm transition-colors",
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                )}
              >
                {copied ? "✓ Copied!" : "Copy Embed URL"}
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Paste this URL into Notion using{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">/embed</code>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="flex-1 min-w-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Live Preview
            </h3>
            <div className="flex items-center justify-center min-h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-8">
              <iframe
                src={embedUrl}
                title={`${widget.name} preview`}
                className="w-full h-[480px] border-0 rounded-lg shadow-lg"
                style={{ maxWidth: "600px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
