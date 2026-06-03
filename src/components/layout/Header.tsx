import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg transition-shadow">
              E
            </div>
            <span className="font-bold text-lg text-gray-900">embedkit</span>
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
              Blog
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-sm"
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
