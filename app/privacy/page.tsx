export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-4xl px-4 py-14">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-10">
          <h1 className="text-3xl font-bold text-gray-900">
            プライバシーポリシー
          </h1>

          <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
            <p>
              オール介護ポータル（以下「当サイト」）では、お問い合わせ等により取得した個人情報を、適切に管理いたします。
            </p>

            <section>
              <h2 className="font-bold text-gray-900">個人情報の利用目的</h2>
              <p className="mt-2">
                取得した情報は、お問い合わせへの対応、掲載情報の確認・修正、サービス改善のために利用します。
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">第三者提供について</h2>
              <p className="mt-2">
                法令に基づく場合を除き、本人の同意なく第三者へ個人情報を提供することはありません。
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">外部サービスについて</h2>
              <p className="mt-2">
                当サイトでは、地図表示や外部リンク等に外部サービスを利用する場合があります。
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">お問い合わせ</h2>
              <p className="mt-2">
                個人情報の取り扱いに関するお問い合わせは、当サイトのお問い合わせフォームよりご連絡ください。
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}