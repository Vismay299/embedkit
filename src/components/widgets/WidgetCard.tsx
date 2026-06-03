import Link from "next/link";
import Image from "next/image";
import { WidgetDefinition } from "@/types";
import { cn } from "@/lib/utils";

// Fallback icons if SVG doesn't load
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
        "group block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:shadow-lg hover:border-[#0D9488]/30",
        isComingSoon && "opacity-70 pointer-events-none"
      )}
    >
      {/* Preview area with SVG */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg h-32 mb-4 flex items-center justify-center overflow-hidden">
        {widget.previewUrl ? (
          <Image
            src={widget.previewUrl}
            alt={widget.name}
            width={120}
            height={80}
            className="object-contain transition-transform group-hover:scale-110"
          />
        ) : (
          <span className="text-5xl">{widgetIcons[widget.icon] || "🔲"}</span>
        )}
        {widget.isNew && !isComingSoon && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            NEW
          </span>
        )}
        {isComingSoon && (
          <div className="absolute inset-0 bg-gray-200/70 flex items-center justify-center backdrop-blur-sm">
            <span className="text-sm font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm">
              COMING SOON
            </span>
          </div>
        )}
        {isPartner && (
          <span className="absolute bottom-2 left-2 bg-[#0D9488]/10 text-[#0D9488] text-xs font-medium px-2 py-0.5 rounded">
            PARTNER
          </span>
        )}
      </div>

      {/* Info */}
      <h3 className="font-semibold text-gray-900 group-hover:text-[#0D9488] transition-colors text-sm">
        {widget.name}
      </h3>
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{widget.description}</p>
    </Link>
  );
}
