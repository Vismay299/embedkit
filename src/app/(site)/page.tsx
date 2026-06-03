"use client";

import { useState } from "react";
import Link from "next/link";
import { WidgetCard } from "@/components/widgets/WidgetCard";
import { widgets, widgetCategories, getWidgetsByCategory, getCategoryIcon } from "@/lib/widgets-data";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredWidgets = getWidgetsByCategory(activeCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">22 widgets ready to embed</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 max-w-4xl mx-auto leading-tight">
            Embed live widgets into Notion in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">30 seconds</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Progress bars, counters, timers, and buttons that actually work. No code required.
            Just paste the embed URL and watch your Notion pages come alive.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="#widgets"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
            >
              Browse Widgets
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              View Pricing
            </Link>
          </div>

          {/* Use Cases */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { 
                icon: "📊", 
                title: "Track sprint progress", 
                desc: "Show completion % that updates in real-time" 
              },
              { 
                icon: "👁️", 
                title: "Monitor page views", 
                desc: "Count visitors with auto-incrementing counters" 
              },
              { 
                icon: "⏱️", 
                title: "Count down to launch", 
                desc: "Live countdown timers for any date" 
              },
            ].map((benefit) => (
              <div key={benefit.title} className="text-left p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PageVault Banner */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-3xl">
              🔐
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                NEW FEATURE
              </div>
              <h2 className="text-2xl font-bold mb-2">
                PageVault: Turn Notion Pages into Sellable Products
              </h2>
              <p className="text-indigo-200 text-sm max-w-2xl">
                Password-protect your Notion pages, sell access with Stripe, and track everything from one dashboard. Perfect for creators selling templates, courses, or premium content.
              </p>
            </div>
            <Link
              href="/page-vault"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-indigo-900 font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap shadow-lg"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* Widget Marketplace */}
      <section id="widgets" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">All Widgets</h2>
          <span className="text-sm text-gray-500">{widgets.length} widgets available</span>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {widgetCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {getCategoryIcon(cat.icon)} {cat.name}
            </button>
          ))}
        </div>

        {/* Widget Grid by Category (when "All") or filtered */}
        {activeCategory === "all" ? (
          widgetCategories
            .filter((c) => c.id !== "all")
            .map((cat) => {
              const catWidgets = getWidgetsByCategory(cat.id);
              if (catWidgets.length === 0) return null;
              return (
                <div key={cat.id} className="mb-12">
                  <h3 className="text-xl font-bold text-gray-900 capitalize mb-6 flex items-center gap-2">
                    <span>{getCategoryIcon(cat.icon)}</span>
                    {cat.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {catWidgets.map((widget) => (
                      <WidgetCard key={widget.id} widget={widget} />
                    ))}
                    {/* "Your [Category]" suggestion card */}
                    <div className="rounded-xl border-2 border-dashed border-gray-300 p-5 flex flex-col items-center justify-center text-center h-full min-h-[220px] bg-gradient-to-br from-gray-50 to-white">
                      <span className="text-3xl mb-2">💡</span>
                      <h4 className="font-semibold text-gray-700">Your {cat.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Tell us what you are looking for!</p>
                      <a
                        href={`mailto:feedback@embedkit.co?subject=Widget Request: ${cat.name}`}
                        className="mt-3 inline-block px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                      >
                        Submit Now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredWidgets.map((widget) => (
              <WidgetCard key={widget.id} widget={widget} />
            ))}
            <div className="rounded-xl border-2 border-dashed border-gray-300 p-5 flex flex-col items-center justify-center text-center h-full min-h-[220px] bg-gradient-to-br from-gray-50 to-white">
              <span className="text-3xl mb-2">💡</span>
              <h4 className="font-semibold text-gray-700">Your Widget</h4>
              <p className="text-xs text-gray-500 mt-1">Tell us what you are looking for!</p>
              <a
                href="mailto:feedback@embedkit.co?subject=Widget Request"
                className="mt-3 inline-block px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Submit Now
              </a>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Ready to embed?</h2>
          <p className="text-gray-600 mb-8">Pick a widget, customize it, and paste the URL into Notion.</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="#widgets"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
            >
              Browse Widgets
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
