import Link from "next/link";
import { WidgetDefinition } from "@/types";
import { cn } from "@/lib/utils";

// Simple inline SVG icons for widget previews
const widgetIcons: Record<string, string> = {
  BarChart3: "📊",
  Gauge: "📈",
  CheckSquare: "✅",
  TrendingUp: "📈",
  PlusCircle: "➕",
  Eye: "👁️",
  Clock: "⏰",
  Calendar: "📅",
  Timer: "⏱️",
  Globe: "🌍",
  CreditCard: "💳",
  MousePointerClick: "🖱️",
  ThumbsUp: "👍",
  Heart: "❤️",
  CloudSun: "⛅",
  Sun: "☀️",
  Cloud: "☁️",
  Zap: "⚡",
  CalendarDays: "📆",
  ListTodo: "📋",
  Quote: "💬",
  Briefcase: "💼",
  LayoutGrid: "🔲",
};

interface WidgetCardProps {
  widget: WidgetDefinition;
}

export function WidgetCard({ widget }: WidgetCardProps) {
  const isComingSoon = widget.isComingSoon;
  const isPartner = widget.isPartner;

  return (
    <Link
      href={isComingSoon ? "#" : `/widget/${widget.slug}`}
      className={cn(
        "group block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:shadow-lg hover:border-[#FF6B00]/30",
        isComingSoon && "opacity-70 pointer-events-none"
      )}
    >
      {/* Preview area */}
      <div className="relative bg-gray-50 rounded-lg h-32 mb-4 flex items-center justify-center overflow-hidden">
        <span className="text-5xl">{widgetIcons[widget.icon] || "🔲"}</span>
        {widget.isNew && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            NEW
          </span>
        )}
        {isComingSoon && (
          <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-500 bg-white px-3 py-1 rounded-full">
              COMING SOON
            </span>
          </div>
        )}
        {isPartner && (
          <span className="absolute bottom-2 left-2 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-medium px-2 py-0.5 rounded">
            PARTNER WIDGET
          </span>
        )}
      </div>

      {/* Info */}
      <h3 className="font-semibold text-gray-900 group-hover:text-[#FF6B00] transition-colors text-sm">
        {widget.name}
      </h3>
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{widget.description}</p>
    </Link>
  );
}
