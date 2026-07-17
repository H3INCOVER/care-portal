import Link from "next/link";

export const metadata = {
  title: "制度・支援情報一覧を作った理由｜オール介護ポータル",
  description: "制度名が分からなくても困りごとや地域から探せる、制度・支援情報一覧を作った目的や使い方を説明する専用ページです。",
};

export default function CareNewsAboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-zinc-900">
      <section className="mx-auto max-w-4xl px-5 py-10 md:py-14">
        {/* パンくずリスト */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold text-zinc-500">
          <Link href="/" className="hover:text-red-700 transition-colors duration-200 link-interactive">
            ホーム
          </Link>
          <span>/</span>
          <Link href="/care-news" className="hover:text-red-700 transition-colors duration-200 link-interactive">
            制度・支援情報一覧
          </Link>
          <span>/</span>
          <span className="text-zinc-800">制度・支援情報一覧を作った理由</span>
        </nav>

        {/* メインコンテンツ */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-10 shadow-sm">
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 md:text-4xl">
            制度・支援情報一覧を作った理由
          </h1>

          <div className="mt-8 space-y-8 text-zinc-700 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-zinc-900 border-l-4 border-red-700 pl-3">
                背景と目的
              </h2>
              <p>
                介護に携わる方や事業者様が利用できる公的な制度や支援情報は多岐にわたりますが、「制度の名前そのものが分からないと検索できない」「自分の状況に適用できるか分からない」といった課題が多く存在します。
              </p>
              <p>
                そこで当サイトでは、**制度名が分からなくても、困りごと・支援の種類・地域・テーマから直感的に探せる仕組み**を提供したいと考え、この一覧ページを作成いたしました。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold text-zinc-900 border-l-4 border-red-700 pl-3">
                使い方
              </h2>
              <ol className="list-decimal list-inside space-y-3 font-medium text-zinc-800">
                <li>
                  <span className="font-bold text-zinc-950">制度名または困りごとから探す:</span> 検索窓にキーワードを入力するか、該当する困りごとタグを選択します。
                </li>
                <li>
                  <span className="font-bold text-zinc-950">地域・種類・テーマで絞り込む:</span> 適用地域や支援の種類（補助金・助成金など）で対象を絞り込みます。
                </li>
                <li>
                  <span className="font-bold text-zinc-950">詳細ページで概要を確認する:</span> 概要や「たとえばこういうもの」という具体例を読み解くことができます。
                </li>
                <li>
                  <span className="font-bold text-zinc-950">最後に必ず公式情報を確認する:</span> 制度の内容や募集状況は常に更新されるため、詳細ページ内のリンクから公式案内の最新情報を確認します。
                </li>
              </ol>
            </section>

            <section className="rounded-2xl bg-zinc-50 border border-zinc-200 p-5 space-y-3 text-sm text-zinc-600">
              <p className="font-bold text-zinc-900 text-base">⚠️ ご利用にあたっての重要な注意点</p>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>当ページに掲載されている情報は、官公庁等の公開情報を整理・紹介したものです。</li>
                <li>当サイトは、各制度の申請可否や適用対象であるかを判断・決定するページではありません。</li>
                <li>制度の内容、補助額、要件、および募集状況は、変更・終了される可能性があります。</li>
                <li>実際に利用・申請を検討される際は、国・自治体・公式案内等の**最新かつ一次情報**を必ず直接ご確認ください。</li>
              </ul>
            </section>
          </div>

          <div className="mt-10 border-t border-zinc-100 pt-6 flex justify-between">
            <Link
              href="/care-news"
              className="text-sm font-bold text-red-700 hover:text-red-800 underline underline-offset-4 link-interactive"
            >
              ← 制度・支援情報一覧に戻る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
