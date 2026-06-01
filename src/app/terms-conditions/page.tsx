export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
      <div className="prose text-gray-700 space-y-4">
        <p><strong>Last updated:</strong> January 2026</p>
        <h2 className="text-xl font-semibold mt-8">1. Acceptance of Terms</h2>
        <p>By accessing and using Widgetly, you agree to be bound by these Terms and Conditions.</p>
        <h2 className="text-xl font-semibold mt-8">2. Subscription and Payments</h2>
        <p>Paid plans are billed monthly or annually. You may cancel at any time, with access continuing until the end of the billing period.</p>
        <h2 className="text-xl font-semibold mt-8">3. Widget Usage</h2>
        <p>Widgets may be embedded on Notion pages and websites according to your plan limits. View counts are reset monthly.</p>
        <h2 className="text-xl font-semibold mt-8">4. Contact</h2>
        <p>For questions about these terms, contact us at support@widgetly.co.</p>
      </div>
    </div>
  );
}
