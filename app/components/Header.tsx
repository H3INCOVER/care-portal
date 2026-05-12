import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-gray-900">
          オール介護ポータル
        </Link>

        <nav className="flex items-center gap-4 text-sm font-semibold">
          <Link href="/facilities" className="text-gray-700 hover:text-emerald-700">
            介護事業所を探す
          </Link>

          <Link href="/contact/edit" className="text-gray-700 hover:text-emerald-700">
            掲載情報の修正
          </Link>
        </nav>
      </div>
    </header>
  )
}