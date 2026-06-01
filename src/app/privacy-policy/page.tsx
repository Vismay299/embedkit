export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose text-gray-700 space-y-4">
        <p><strong>Last updated:</strong> January 2026</p>
        <h2 className="text-xl font-semibold mt-8">1. Information We Collect</h2>
        <p>We collect information you provide directly to us, including your name, email address, and payment information when you create an account or subscribe to our services.</p>
        <h2 className="text-xl font-semibold mt-8">2. How We Use Your Information</h2>
        <p>We use your information to provide, maintain, and improve our services, process payments, and communicate with you about your account.</p>
        <h2 className="text-xl font-semibold mt-8">3. Data Security</h2>
        <p>We implement industry-standard security measures to protect your data. All payment information is processed securely through Stripe.</p>
        <h2 className="text-xl font-semibold mt-8">4. Contact</h2>
        <p>For privacy-related questions, contact us at support@widgetly.co.</p>
      </div>
    </div>
  );
}
