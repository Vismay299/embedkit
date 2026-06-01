import Link from "next/link";

export default function PageVaultPage() {
  return (
    <div>
      <section className="bg-[#1E1B4B] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="text-5xl mb-6 block">🔒</span>
          <h1 className="text-4xl font-bold">
            Turn Any Notion Page into a Secure, Sellable Digital Product
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Protect your Notion content with email gates or payment walls. Sell digital products
            directly from Notion with professional, branded links.
          </p>
          <Link
            href="/auth/login"
            className="mt-8 inline-flex items-center px-8 py-3 rounded-lg bg-[#0D9488] text-white font-semibold hover:bg-[#0F766E] transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🔐",
              title: "Secure Access Gates",
              desc: "Add email verification or payment gates to any Notion page. Only authorized users get access.",
            },
            {
              icon: "💰",
              title: "Sell Digital Products",
              desc: "Set a price and accept payments through Stripe. Your Notion page becomes a sellable product instantly.",
            },
            {
              icon: "🔗",
              title: "Branded Links",
              desc: "Share professional, branded URLs that build trust. Track views and conversions from your dashboard.",
            },
          ].map((feature) => (
            <div key={feature.title} className="text-center p-8 rounded-xl border border-gray-200">
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="font-semibold text-gray-900 text-lg">{feature.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ready to start selling?</h2>
          <p className="mt-2 text-gray-600">Create your first gated Notion page in minutes.</p>
          <div className="mt-6 flex gap-4 justify-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[#0D9488] text-white font-semibold hover:bg-[#0F766E] transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
