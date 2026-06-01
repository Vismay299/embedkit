"use client";

import { useState } from "react";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { UserWidget } from "@/types";

// Mock user widgets for demo
const mockWidgets: (UserWidget & { visibility: boolean })[] = [
  {
    id: "uw-001",
    userId: "user-1",
    widgetId: "project-progress",
    name: "Q2 Project Progress",
    config: { projectName: "Q2 Launch", progress: 72, color: "#0D9488" },
    embedToken: "tok_abc123",
    viewsCount: 342,
    createdAt: "2026-05-15T10:30:00Z",
    updatedAt: "2026-06-01T14:20:00Z",
    visibility: true,
  },
  {
    id: "uw-002",
    userId: "user-1",
    widgetId: "habit-counter",
    name: "Daily Reading Habit",
    config: { habitName: "Read Daily", goal: 30 },
    embedToken: "tok_def456",
    viewsCount: 128,
    createdAt: "2026-05-20T08:15:00Z",
    updatedAt: "2026-05-30T09:45:00Z",
    visibility: true,
  },
  {
    id: "uw-003",
    userId: "user-1",
    widgetId: "button",
    name: "Newsletter Signup",
    config: { label: "Subscribe", url: "https://example.com", color: "#F97316" },
    embedToken: "tok_ghi789",
    viewsCount: 56,
    createdAt: "2026-06-01T16:00:00Z",
    updatedAt: "2026-06-01T16:00:00Z",
    visibility: false,
  },
];

function CopyEmbedButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const embedUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/embed/${slug}`;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(embedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = embedUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
        copied
          ? "bg-[#0D9488] text-white"
          : "bg-[#F97316]/10 text-[#F97316] hover:bg-[#F97316]/20"
      )}
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

export default function DashboardPage() {
  const [widgets, setWidgets] = useState(mockWidgets);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const handleToggleVisibility = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, visibility: !w.visibility } : w))
    );
  };

  const handleDelete = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your widgets and account</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-[#0D9488] text-white text-sm font-semibold hover:bg-[#0F766E] transition-colors"
        >
          + New Widget
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Widgets", value: String(widgets.filter((w) => w.visibility).length), icon: "🔲" },
          { label: "Total Views", value: String(widgets.reduce((sum, w) => sum + w.viewsCount, 0)), icon: "👁️" },
          { label: "Plan", value: "Free", icon: "📋" },
          { label: "Views Remaining", value: "100", icon: "⏳" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Widgets List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Your Widgets</h2>

          {/* List/Grid toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                viewMode === "list"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <svg className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              List
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                viewMode === "grid"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <svg className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              Grid
            </button>
          </div>
        </div>

        {widgets.length === 0 ? (
          /* Empty State */
          <div className="p-8 text-center">
            <span className="text-4xl block mb-3">📦</span>
            <p className="text-gray-500 text-sm mb-1">You haven&apos;t created any widgets yet.</p>
            <p className="text-gray-400 text-xs mb-4">
              Create your first widget to get started with embedding in Notion.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-[#0D9488] text-white text-sm font-semibold hover:bg-[#0F766E] transition-colors"
            >
              Browse Widgets
            </Link>
          </div>
        ) : viewMode === "list" ? (
          /* List View — Table */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">
                    #
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Visibility
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Embed Options
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {widgets.map((widget, index) => (
                  <tr key={widget.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4 text-sm text-gray-500 font-medium">
                      {index + 1}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleVisibility(widget.id)}
                        className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20",
                          widget.visibility ? "bg-[#0D9488]" : "bg-gray-300"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                            widget.visibility ? "translate-x-6" : "translate-x-1"
                          )}
                        />
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{widget.name}</p>
                        <p className="text-xs text-gray-400">
                          {widget.viewsCount} views
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <CopyEmbedButton slug={widget.widgetId} />
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {formatDate(widget.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDelete(widget.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid View */
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {widgets.map((widget, index) => (
              <div
                key={widget.id}
                className="rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium text-gray-400">#{index + 1}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleVisibility(widget.id)}
                      className={cn(
                        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none",
                        widget.visibility ? "bg-[#0D9488]" : "bg-gray-300"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
                          widget.visibility ? "translate-x-[18px]" : "translate-x-[2px]"
                        )}
                      />
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{widget.name}</h3>
                <p className="text-xs text-gray-400 mt-1">
                  {widget.viewsCount} views · {formatDate(widget.createdAt)}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <CopyEmbedButton slug={widget.widgetId} />
                  <button
                    onClick={() => handleDelete(widget.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Billing */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Billing</h2>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Free Plan</p>
              <p className="text-sm text-gray-500">2 widgets · 100 views/month</p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center px-4 py-2 rounded-lg border border-[#0D9488] text-[#0D9488] text-sm font-semibold hover:bg-[#0D9488]/5 transition-colors"
            >
              Upgrade Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
