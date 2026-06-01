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
  { name: "Partner - beeSnap", href: "#" },
  { name: "Partner - amacos", href: "#" },
  { name: "Blog", href: "/blog" },
  { name: "Submit Bugs or Feature Request", href: "mailto:feedback@embedkit.co" },
  { name: "Advertise with us", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#1E1B4B] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <span className="text-xl">◆</span>
              <span>embedkit</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Widgets made with ❤ by embedkit. If you have any questions, please email us at{" "}
              <a href="mailto:support@embedkit.co" className="text-[#0D9488] hover:underline">
                support@embedkit.co
              </a>
              .
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <Link href="#" className="hover:text-white">Twitter</Link>
              <Link href="#" className="hover:text-white">YouTube</Link>
            </div>
          </div>

          {/* Free Widgets */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              FREE WIDGETS
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
              COMPANY
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
              Terms and Conditions
            </Link>
          </div>
          <p>embedkit © 2026</p>
        </div>
      </div>
    </footer>
  );
}
