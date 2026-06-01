import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#0D9488] text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-xl">◆</span>
            <span>embedkit</span>
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/pricing" className="hover:underline underline-offset-4">
              Pricing
            </Link>
            <Link
              href="/auth/login"
              className="bg-white text-[#0D9488] px-4 py-1.5 rounded-md hover:bg-orange-50 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
