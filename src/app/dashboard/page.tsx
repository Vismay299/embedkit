import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your widgets and account</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-[#FF6B00] text-white text-sm font-semibold hover:bg-[#E55D00] transition-colors"
        >
          + New Widget
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Widgets", value: "0", icon: "🔲" },
          { label: "Total Views", value: "0", icon: "👁️" },
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

      {/* Widgets list */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Your Widgets</h2>
        </div>
        <div className="p-8 text-center">
          <span className="text-4xl block mb-3">📦</span>
          <p className="text-gray-500 text-sm mb-4">You haven&apos;t created any widgets yet.</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-[#FF6B00] text-white text-sm font-semibold hover:bg-[#E55D00] transition-colors"
          >
            Browse Widgets
          </Link>
        </div>
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
              className="inline-flex items-center px-4 py-2 rounded-lg border border-[#FF6B00] text-[#FF6B00] text-sm font-semibold hover:bg-[#FF6B00]/5 transition-colors"
            >
              Upgrade Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
