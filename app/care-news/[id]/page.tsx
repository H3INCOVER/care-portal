import Link from "next/link";
import { notFound } from "next/navigation";
import { careNewsCards } from "@/data/care-news-cards";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return careNewsCards.map((card) => ({
    id: card.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const card = careNewsCards.find((item) => item.id === id);

  if (!card) {
    return {
      title: "制度情報が見つかりません",
    };
  }

  return {
    title: `${card.title}｜介護制度発見レイヤー β`,
    description: card.plainSummary,
  };
}

export default async function CareNewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  const card = careNewsCards.find((item) => item.id === id);

  if (!card) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-zinc-900">
      <section className="mx-auto max-w-4xl px-5 pb-10 pt-10 md:pt-14">
        <Link
          href="/care-news"
          className="text-sm font-bold text-red-700 underline underline-offset-4"
        >
          ← 一覧に戻る
        </Link>

        <div className="mt-8 flex flex-wrap gap-2">
          <span className="rounded-full bg-red-700 px-3 py-1 text-xs font-bold text-white">
            {card.type}
          </span>

          {card.regions.map((region) => (
            <span
              key={region}
              className="rounded-full bg-white px-3 py-1 text-xs font-bold text-zinc-700"
            >
              {region}
            </span>
          ))}
        </div>

        <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-6xl">
          {card.title}
        </h1>

        <p className="mt-6 text-lg leading-9 text-zinc-700">
          {card.plainSummary}
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-16">
        <div className="grid gap-5">
          <DetailBlock number="01" title="一言でいうと">
            <p>{card.plainSummary}</p>
          </DetailBlock>

          <DetailBlock number="02" title="まず言葉をほどく">
            <p className="font-bold text-zinc-900">{card.keywordExplanation}</p>

            {card.deepExplanation.length > 0 && (
              <div className="mt-5 grid gap-4">
                {card.deepExplanation.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            )}

            {card.examples.length > 0 && (
              <div className="mt-6 rounded-2xl bg-red-50 p-5">
                <p className="mb-3 text-sm font-black text-red-700">
                  たとえば、こういうものです
                </p>

                <ul className="grid gap-2">
                  {card.examples.map((example) => (
                    <li key={example} className="flex gap-2">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-red-700" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </DetailBlock>

          <DetailBlock number="03" title="どんな困りごとと関係する？">
            <p>{card.forWhom}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {card.problemTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </DetailBlock>

          <DetailBlock number="04" title="仮に進むと何が変わる可能性がある？">
            <p>{card.whatCanHappen}</p>
          </DetailBlock>

          <DetailBlock number="05" title="なぜこの制度がある？">
            <p>{card.policyIntent}</p>
          </DetailBlock>

          <DetailBlock number="06" title="最初の5分だけやるなら">
            <ol className="grid gap-3">
              {card.firstStep.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </DetailBlock>

          <DetailBlock number="07" title="確認するときの観点">
            <ul className="grid gap-3">
              {card.checkPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-700" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </DetailBlock>

          <DetailBlock number="08" title="深掘り">
            <p>
              詳しく確認する場合は、必ず公式情報を確認してください。
              このページは、読む前の整理と確認観点をつかむためのものです。
            </p>

            <div className="mt-5">
              <a
                href={card.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-zinc-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                {card.sourceName}を見る
              </a>
            </div>
          </DetailBlock>

          <DetailBlock number="09" title="注意">
            <p>{card.caution}</p>
          </DetailBlock>
        </div>
      </section>
    </main>
  );
}

function DetailBlock({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm font-black tracking-[0.2em] text-red-700">
          {number}
        </span>
        <h2 className="text-2xl font-black tracking-tight">{title}</h2>
      </div>

      <div className="text-base leading-8 text-zinc-700">{children}</div>
    </section>
  );
}
