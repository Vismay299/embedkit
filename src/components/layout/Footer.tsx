import Link from "next/link";

const freeWidgets = [
  { name: "Days Calculator", href: "/time" },
  { name: "Weeks Calculator", href: "/time-weeks" },
  { name: "Fahrenheit to Celsius", href: "/convert/fahrenheit" },
  { name: "Celsius to Fahrenheit", href: "/convert/celsius" },
  { name: "Centimeters to Inches", href: "/convert" },
  { name: "Focus Timer", href: "/free-widgets/timer" },
  { name: "Pomodoro Timer", href: "/free-widgets/pomodoro" },
];

const companyLinks = [
  { name: "Blog", href: "/blog" },
  { name: "Submit Feedback", href: "mailto:feedback@embedkit.co" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                E
              </div>
              <span className="font-bold text-lg">embedkit</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Embed live widgets into Notion in 30 seconds. No code required.
            </p>
            <p className="text-gray-500 text-xs">
              Questions?{" "}
              <a href="mailto:support@embedkit.co" className="text-blue-400 hover:text-blue-300 transition-colors">
                support@embedkit.co
              </a>
            </p>
          </div>

          {/* Free Widgets */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Free Tools
            </h3>
            <ul className="space-y-2">
              {freeWidgets.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
          <p>© 2026 embedkit</p>
        </div>
      </div>
    </footer>
  );
}
