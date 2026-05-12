import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div>
            <p className="text-lg font-bold text-gray-900">
              オール介護ポータル
            </p>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500">
              掲載情報は公開情報等をもとに作成しています。
              <br />
              最新の情報は、各事業所へ直接ご確認ください。
            </p>
          </div>

          <nav className="grid gap-3 text-sm font-semibold text-gray-700 sm:grid-cols-2 md:justify-items-start">
            <Link href="/facilities" className="hover:text-emerald-700">
              介護事業所を探す
            </Link>

            <Link href="/contact/edit" className="hover:text-emerald-700">
              掲載情報の修正
            </Link>

            <Link href="/privacy" className="hover:text-emerald-700">
              プライバシーポリシー
            </Link>

            <Link href="/terms" className="hover:text-emerald-700">
              利用規約
            </Link>

            <Link href="/about" className="hover:text-emerald-700">
              運営者情報
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-5">
          <p className="text-xs text-gray-400">
            © H3INCOVER. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
