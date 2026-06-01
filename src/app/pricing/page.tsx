"use client";

import { useState } from "react";
import Link from "next/link";
import { pricingPlans, pricingFeatures } from "@/lib/pricing-data";
import { cn, formatPrice } from "@/lib/utils";
import type { PricingTier } from "@/types";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const tiers: PricingTier[] = ["free", "basic", "pro", "ultimate"];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFF5EB] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Notion Widgets Pricing</h1>
          <p className="mt-4 text-gray-600">Choose a plan that works best for you!</p>

          {/* Billing toggle */}
          <div className="mt-6 inline-flex items-center gap-2 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-colors",
                !isYearly ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-colors",
                isYearly ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
              )}
            >
              Yearly{" "}
              <span className="text-[#FF6B00] font-semibold">Save up to 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {pricingPlans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice / 12 : plan.monthlyPrice;
            const annualTotal = isYearly ? plan.yearlyPrice : plan.monthlyPrice * 12;

            return (
              <div
                key={plan.tier}
                className={cn(
                  "rounded-2xl border-2 p-6 flex flex-col bg-white",
                  plan.tier === "pro"
                    ? "border-[#FF6B00] shadow-lg shadow-[#FF6B00]/10"
                    : "border-gray-200"
                )}
              >
                <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
                <div className="mt-3">
                  <span className="text-3xl font-bold">{formatPrice(price)}</span>
                  <span className="text-gray-500">/ month</span>
                </div>
                {isYearly && plan.tier !== "free" && (
                  <p className="text-xs text-gray-400 mt-1">
                    Billed ${annualTotal} annually
                  </p>
                )}
                {plan.tier === "free" && (
                  <p className="text-xs text-gray-400 mt-1">$0 / month</p>
                )}

                <ul className="mt-6 space-y-3 flex-1">
                  {plan.widgets > 0 && (
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span>✓</span> {plan.widgets} widgets
                    </li>
                  )}
                  {plan.apps > 0 && (
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span>✓</span> {plan.apps} apps
                    </li>
                  )}
                  {plan.removeBranding && (
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span>✓</span> Removed Branding
                    </li>
                  )}
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span>✓</span> {plan.viewsPerMonth.toLocaleString()} views per month
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span>✓</span> {plan.widgetTypes} widget types
                  </li>
                  {plan.embedOnWebsite && (
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span>✓</span> Embed widgets on website
                    </li>
                  )}
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span>✓</span> {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.tier === "free" ? "/auth/login" : `/auth/login?plan=${plan.tier}`}
                  className={cn(
                    "mt-6 block text-center py-3 rounded-lg font-semibold transition-colors",
                    plan.tier === "pro"
                      ? "bg-[#FF6B00] text-white hover:bg-[#E55D00]"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  )}
                >
                  {plan.tier === "free" ? "Get Started" : "Subscribe"}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <table className="w-full text-sm border-collapse">
          <caption className="text-lg font-bold text-gray-900 mb-6 text-left">
            Pricing plan comparison
          </caption>
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 text-left text-gray-500 font-medium w-1/3"></th>
              {tiers.map((tier) => (
                <th key={tier} className="py-3 text-center font-bold text-gray-900 uppercase text-xs">
                  {tier} PLAN
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-3 font-semibold text-gray-700">Features</td>
              {tiers.map((tier) => (
                <td key={tier} className="py-3 text-center"></td>
              ))}
            </tr>
            {pricingFeatures.map((feature) => (
              <tr key={feature.key} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 text-gray-700">{feature.name}</td>
                {tiers.map((tier) => {
                  const val = feature.values[tier];
                  if (typeof val === "boolean") {
                    return (
                      <td key={tier} className="py-3 text-center">
                        {val ? (
                          <span className="text-green-600">✓ Included</span>
                        ) : (
                          <span className="text-gray-400">Not included in {tier}</span>
                        )}
                      </td>
                    );
                  }
                  return (
                    <td key={tier} className="py-3 text-center text-gray-600">
                      {tier} includes: {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
