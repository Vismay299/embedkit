import { notFound } from "next/navigation";
import Link from "next/link";
import { getWidgetBySlug, widgets } from "@/lib/widgets-data";

export function generateStaticParams() {
  return widgets.map((w) => ({ slug: w.slug }));
}

export default async function WidgetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const widget = getWidgetBySlug(slug);

  if (!widget) {
    notFound();
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FFF5EB] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {widget.isNew && (
              <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full mb-4">
                NEW
              </span>
            )}
            {widget.isComingSoon && (
              <span className="inline-block bg-gray-400 text-white text-xs font-bold px-3 py-0.5 rounded-full mb-4">
                COMING SOON
              </span>
            )}
            {widget.isPartner && (
              <span className="inline-block bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold px-3 py-0.5 rounded-full mb-4">
                PARTNER WIDGET
              </span>
            )}
            <h1 className="text-4xl font-bold text-gray-900">{widget.name}</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              {widget.description}
            </p>
            <Link
              href="/auth/login"
              className="mt-6 inline-flex items-center px-6 py-3 rounded-lg bg-[#FF6B00] text-white font-semibold hover:bg-[#E55D00] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Our {widget.name.toLowerCase()} features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900">Project tracking</h3>
            <p className="text-sm text-gray-500 mt-2">
              Track and visualize your progress with beautiful displays embedded in Notion.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900">Embed on Notion page</h3>
            <p className="text-sm text-gray-500 mt-2">
              Simply copy the embed URL and paste it into your Notion page. Works instantly.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900">Customize Your Widget</h3>
            <p className="text-sm text-gray-500 mt-2">
              Adjust colors, labels, and settings to match your brand and needs.
            </p>
          </div>
        </div>

        {/* Customization config if available */}
        {widget.configSchema.length > 0 && (
          <div className="mt-12 p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Configuration Options</h3>
            <div className="space-y-3">
              {widget.configSchema.map((field) => (
                <div key={field.key} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700 w-32">{field.label}</span>
                  <span className="text-sm text-gray-500">{field.type}</span>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    default: {String(field.default)}
                  </code>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently asked questions</h2>
        <div className="space-y-3">
          {[
            { q: `How can I create a ${widget.name.toLowerCase()} for my notion page?`, a: "Simply sign up for an account, select this widget, customize it to your liking, and copy the embed URL into Notion." },
            { q: "Will my data be secure in the widget?", a: "Yes! All widget data is encrypted and stored securely. We never share your data with third parties." },
            { q: "Can I use this widget on mobile devices?", a: "Widgets work on all Notion-supported platforms including iOS, Android, and desktop." },
            { q: "How do I provide feedback on the widget?", a: "We love feedback! Email us at support@widgetly.co or use the feedback form in your dashboard." },
          ].map((faq, i) => (
            <details
              key={i}
              className="group border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <summary className="font-medium text-gray-900 cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <span className="text-gray-400 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-xl font-bold text-gray-900">Start building your own widgets</h2>
          <div className="mt-4 flex gap-4 justify-center">
            <Link
              href="/"
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
