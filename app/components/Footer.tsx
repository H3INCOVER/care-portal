import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white py-16 mt-auto border-t border-brand-border">
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left Column: Portal details and H3 Incover Network cards */}
          <div className="md:col-span-6 lg:col-span-7 space-y-8">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 font-black text-white group mb-4">
                <div className="w-[34px] h-[34px] rounded-full bg-white text-brand-black grid place-items-center text-xs font-bold tracking-wider group-hover:bg-brand-red group-hover:text-white transition-colors duration-200">
                  H3
                </div>
                <div className="flex flex-col">
                  <span className="text-sm tracking-wide">オール介護ポータル</span>
                </div>
              </Link>

              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                掲載情報は公開情報等をもとに作成しています。
                <br />
                最新の情報は、各事業所へ直接ご確認ください。
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs text-gray-500 font-black tracking-widest uppercase block">
                【H3 Incover Network】
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://h3incover.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-red/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="text-xs font-black text-white mb-1 flex items-center gap-1.5">
                    <span>🏠</span> H3 Incover 公式サイト
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium leading-snug">
                    H3 Incoverの事業紹介・制作実績・お問い合わせ
                  </div>
                </a>

                <a
                  href="https://info.h3incover.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-red/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="text-xs font-black text-white mb-1 flex items-center gap-1.5">
                    <span>📰</span> H3 Incover INFO
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium leading-snug">
                    AI・Web・営業・介護を実践しながら学ぶ情報メディア
                  </div>
                </a>

                <a
                  href="https://portal.h3incover.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-red/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="text-xs font-black text-white mb-1 flex items-center gap-1.5">
                    <span>🏥</span> 介護制度ポータル
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium leading-snug">
                    介護制度・補助金・加算を探せる情報サイト
                  </div>
                </a>

                <a
                  href="https://h3incover.com/care/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-red/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="text-xs font-black text-white mb-1 flex items-center gap-1.5">
                    <span>💻</span> 介護ホームページサービス
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium leading-snug">
                    介護事業所向けホームページ制作サービス
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Center Column: Navigation */}
          <div className="flex flex-col gap-4 md:col-span-3 lg:col-span-2">
            <span className="text-xs text-gray-500 font-black tracking-widest uppercase">
              Navigation
            </span>
            <div className="flex flex-col gap-3 text-sm font-semibold text-gray-300">
              <Link href="/" className="hover:text-white transition-colors duration-200 self-start">
                ホーム
              </Link>
              <Link href="/care-news" className="hover:text-white transition-colors duration-200 self-start">
                制度一覧
              </Link>
              <Link href="/facilities" className="hover:text-white transition-colors duration-200 self-start">
                介護事業所を探す
              </Link>
              <Link href="/contact/edit" className="hover:text-white transition-colors duration-200 self-start">
                掲載情報の修正
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors duration-200 self-start">
                お問い合わせ
              </Link>
            </div>
          </div>

          {/* Right Column: Legal */}
          <div className="flex flex-col gap-4 md:col-span-3 lg:col-span-3">
            <span className="text-xs text-gray-500 font-black tracking-widest uppercase">
              Legal
            </span>
            <div className="flex flex-col gap-3 text-sm font-semibold text-gray-300">
              <Link href="/privacy" className="hover:text-white transition-colors duration-200 self-start">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-200 self-start">
                利用規約
              </Link>
              <Link href="/about" className="hover:text-white transition-colors duration-200 self-start">
                運営者情報
              </Link>
              <a
                href="https://info.h3incover.com/legal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200 self-start"
              >
                特定商取引法に基づく表記
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-semibold">
          <div>© 2026 H3 Incover</div>
          <div className="flex gap-4">
            <Link href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
