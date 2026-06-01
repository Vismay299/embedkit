"use client";

import { useState } from "react";
import Link from "next/link";
import { WidgetCard } from "@/components/widgets/WidgetCard";
import { widgets, widgetCategories, getWidgetsByCategory } from "@/lib/widgets-data";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredWidgets = getWidgetsByCategory(activeCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#FFF5EB] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 max-w-4xl mx-auto">
            Supercharge Your Notion Pages with{" "}
            <span className="text-[#FF6B00]">Professional Widgets</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            All the widgets you need to run your business: time tracking, project progress,
            metrics, payments, and more — in one simple platform. Perfect for freelancers and
            website owners.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="#widgets"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[#FF6B00] text-white font-semibold hover:bg-[#E55D00] transition-colors"
            >
              Explore Widgets
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-[#FF6B00] text-[#FF6B00] font-semibold hover:bg-[#FF6B00]/5 transition-colors"
            >
              View Examples
            </Link>
          </div>

          {/* Benefits */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { icon: "⚡", title: "Save Time", desc: "Ready-to-use widgets, no coding required" },
              { icon: "💰", title: "Save Money", desc: "No need to hire developers" },
              { icon: "✨", title: "Professional Look", desc: "Polished designs that convert" },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="text-3xl mb-2">{benefit.icon}</div>
                <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PageVault Banner */}
      <section className="bg-[#1a1a2e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-4xl">🔒</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">
                Turn Any Notion Page into a Secure, Sellable Digital Product
              </h2>
              <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                <li>✓ Protect access with secure email or payment gates</li>
                <li>✓ Sell and deliver from one simple dashboard</li>
                <li>✓ Professional, branded links that build trust and credibility</li>
              </ul>
            </div>
            <Link
              href="/page-vault"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[#FF6B00] text-white font-semibold hover:bg-[#E55D00] transition-colors whitespace-nowrap"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Widget Marketplace */}
      <section id="widgets" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Categories</h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {widgetCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-[#FF6B00] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.icon} {cat.name}
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
                  <h3 className="text-xl font-bold text-gray-900 capitalize mb-6">{cat.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {catWidgets.map((widget) => (
                      <WidgetCard key={widget.id} widget={widget} />
                    ))}
                    {/* "Your [Category]" suggestion card */}
                    <div className="rounded-xl border-2 border-dashed border-gray-300 p-5 flex flex-col items-center justify-center text-center h-full min-h-[220px]">
                      <span className="text-3xl mb-2">💡</span>
                      <h4 className="font-semibold text-gray-700">Your {cat.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Tell us what you are looking for!</p>
                      <span className="mt-3 inline-block px-4 py-2 rounded-lg bg-[#FF6B00] text-white text-sm font-medium">
                        Submit Now
                      </span>
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
            <div className="rounded-xl border-2 border-dashed border-gray-300 p-5 flex flex-col items-center justify-center text-center h-full min-h-[220px]">
              <span className="text-3xl mb-2">💡</span>
              <h4 className="font-semibold text-gray-700">Your Widget</h4>
              <p className="text-xs text-gray-500 mt-1">Tell us what you are looking for!</p>
              <span className="mt-3 inline-block px-4 py-2 rounded-lg bg-[#FF6B00] text-white text-sm font-medium">
                Submit Now
              </span>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Start building your own widgets</h2>
          <div className="mt-6 flex gap-4 justify-center">
            <Link
              href="#widgets"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[#FF6B00] text-white font-semibold hover:bg-[#E55D00] transition-colors"
            >
              Explore Widgets
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-[#FF6B00] text-[#FF6B00] font-semibold hover:bg-[#FF6B00]/5 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
