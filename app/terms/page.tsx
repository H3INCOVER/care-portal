export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-4xl px-4 py-14">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-10">
          <h1 className="text-3xl font-bold text-gray-900">利用規約</h1>

          <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
            <p>
              本規約は、オール介護ポータル（以下「当サイト」）の利用条件を定めるものです。
            </p>

            <section>
              <h2 className="font-bold text-gray-900">掲載情報について</h2>
              <p className="mt-2">
                当サイトに掲載する情報は、公開情報等をもとに作成しています。情報の正確性・最新性を保証するものではありません。
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">最新情報の確認</h2>
              <p className="mt-2">
                サービス内容、所在地、電話番号、営業時間等の最新情報は、各事業所へ直接ご確認ください。
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">免責事項</h2>
              <p className="mt-2">
                当サイトの利用により生じた損害について、当サイト運営者は責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">禁止事項</h2>
              <p className="mt-2">
                当サイトの情報を無断で転載、複製、営業利用する行為を禁止します。
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}