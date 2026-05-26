import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-4xl px-4 py-14">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-10">
          <h1 className="text-3xl font-bold text-gray-900">運営者情報</h1>

          <div className="mt-8 divide-y divide-gray-100 text-gray-700">
            <div className="grid gap-2 py-4 md:grid-cols-[160px_1fr]">
              <p className="font-semibold text-gray-500">サイト名</p>
              <p className="font-medium text-gray-900">
                オール介護ポータル
              </p>
            </div>

            <div className="grid gap-2 py-4 md:grid-cols-[160px_1fr]">
              <p className="font-semibold text-gray-500">運営者</p>
              <p className="font-medium text-gray-900">H3INCOVER</p>
            </div>

            <div className="grid gap-2 py-4 md:grid-cols-[160px_1fr]">
              <p className="font-semibold text-gray-500">内容</p>
              <p className="leading-relaxed">
                介護事業所情報の掲載、掲載情報の修正受付、介護事業所向けWebサイト制作支援等を行っています。
              </p>
            </div>

            <div className="grid gap-2 py-4 md:grid-cols-[160px_1fr]">
              <p className="font-semibold text-gray-500">お問い合わせ</p>
              <p className="leading-relaxed">
                掲載情報の修正・追加掲載に関するお問い合わせは、
                <Link href="/contact/edit" className="text-emerald-700 hover:underline font-semibold">
                  専用フォーム
                </Link>
                よりご連絡ください。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}