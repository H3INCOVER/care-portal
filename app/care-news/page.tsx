"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { careNewsCards } from "@/data/care-news-cards";

const typeOptions = ["すべて", "補助金", "助成金", "加算"] as const;
const regionOptions = [
  "すべて",
  "全国",
  "福岡県",
  "福岡市",
  "北九州市",
] as const;
const themeOptions = [
  "すべて",
  "記録・情報共有",
  "採用・人材",
  "設備・環境整備",
  "業務負担",
  "収益・運営",
] as const;

const problemOptions = [
  "記録に時間がかかる",
  "人が足りない",
  "情報共有・連携が大変",
  "採用が難しい",
  "設備を見直したい",
  "収支・加算を整理したい",
];

function getRegionTargets(region: string) {
  if (region === "すべて") return null;
  if (region === "全国") return ["全国"];
  if (region === "福岡県") return ["全国", "福岡県"];
  if (region === "福岡市") return ["全国", "福岡県", "福岡市"];
  if (region === "北九州市") return ["全国", "福岡県", "北九州市"];
  return null;
}

export default function CareNewsPage() {
  const [keyword, setKeyword] = useState("");
  const [selectedType, setSelectedType] =
    useState<(typeof typeOptions)[number]>("すべて");
  const [selectedRegion, setSelectedRegion] =
    useState<(typeof regionOptions)[number]>("すべて");
  const [selectedTheme, setSelectedTheme] =
    useState<(typeof themeOptions)[number]>("すべて");
  const [selectedProblem, setSelectedProblem] = useState<string>("");

  const filteredCards = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    const regionTargets = getRegionTargets(selectedRegion);

    return careNewsCards
      .filter((card) => {
        const matchesKeyword =
          q === "" ||
          [card.title, card.plainSummary, ...card.themes, ...card.problemTags]
            .join(" ")
            .toLowerCase()
            .includes(q);

        const matchesType =
          selectedType === "すべて" || card.type === selectedType;

        const matchesRegion =
          !regionTargets ||
          card.regions.some((region) => regionTargets.includes(region));

        const matchesTheme =
          selectedTheme === "すべて" || card.themes.includes(selectedTheme);

        const matchesProblem =
          selectedProblem === "" || card.problemTags.includes(selectedProblem);

        return (
          matchesKeyword &&
          matchesType &&
          matchesRegion &&
          matchesTheme &&
          matchesProblem
        );
      })
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
  }, [keyword, selectedType, selectedRegion, selectedTheme, selectedProblem]);

  const loosenToProblemOnly = () => {
    setKeyword("");
    setSelectedType("すべて");
    setSelectedRegion("すべて");
    setSelectedTheme("すべて");
  };

  const resetAll = () => {
    setKeyword("");
    setSelectedType("すべて");
    setSelectedRegion("すべて");
    setSelectedTheme("すべて");
    setSelectedProblem("");
  };

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-zinc-900">
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-16 md:pt-24">
        <p className="mb-4 text-sm font-bold tracking-[0.24em] text-red-700">
          CARE SYSTEM DISCOVERY β
        </p>

        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
          制度・支援情報一覧
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-700 md:text-lg">
          制度名や困りごとから、次に確認する情報を探せます。
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10">
        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:p-8">
          <h2 className="text-2xl font-black">制度名から探す</h2>

          <div className="mt-5">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="制度名・補助金名・加算名を入力"
              className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-base outline-none transition focus:border-red-700"
            />
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-3">
            <FilterGroup title="種類">
              {typeOptions.map((type) => (
                <FilterButton
                  key={type}
                  active={selectedType === type}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </FilterButton>
              ))}
            </FilterGroup>

            <FilterGroup title="地域">
              {regionOptions.map((region) => (
                <FilterButton
                  key={region}
                  active={selectedRegion === region}
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </FilterButton>
              ))}
            </FilterGroup>

            <FilterGroup title="テーマ">
              {themeOptions.map((theme) => (
                <FilterButton
                  key={theme}
                  active={selectedTheme === theme}
                  onClick={() => setSelectedTheme(theme)}
                >
                  {theme}
                </FilterButton>
              ))}
            </FilterGroup>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10">
        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-black">困りごとから探す</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                制度名が分からない場合は、近い困りごとを選んでください。
              </p>
            </div>

            {selectedProblem && (
              <button
                onClick={() => setSelectedProblem("")}
                className="text-left text-sm font-bold text-red-700 underline underline-offset-4"
              >
                困りごとを解除
              </button>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {problemOptions.map((problem) => (
              <button
                key={problem}
                onClick={() => setSelectedProblem(problem)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-bold transition",
                  selectedProblem === problem
                    ? "border-red-700 bg-red-700 text-white"
                    : "border-zinc-300 bg-zinc-50 text-zinc-800 hover:border-red-700",
                ].join(" ")}
              >
                {problem}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-black">制度・支援情報一覧</h2>
            <p className="mt-2 text-sm text-zinc-600">
              新しく追加したものから順に表示しています。
            </p>
          </div>

          <button
            onClick={resetAll}
            className="text-left text-sm font-bold text-zinc-700 underline underline-offset-4"
          >
            条件をすべて解除
          </button>
        </div>

        {filteredCards.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-8">
            <p className="text-lg font-black">該当する情報がありません。</p>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              条件を少し緩めると、関係しそうな制度が見つかる場合があります。
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {selectedProblem && (
                <button
                  onClick={loosenToProblemOnly}
                  className="rounded-full bg-red-700 px-5 py-3 text-sm font-bold text-white"
                >
                  条件を緩める
                </button>
              )}

              <button
                onClick={resetAll}
                className="rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-bold text-zinc-800"
              >
                すべて解除
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredCards.map((card) => (
              <article
                key={card.id}
                className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:p-7"
              >
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-red-700 px-3 py-1 text-xs font-bold text-white">
                    {card.type}
                  </span>

                  {card.regions.map((region) => (
                    <span
                      key={region}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700"
                    >
                      {region}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-black tracking-tight">
                  {card.title}
                </h3>

                <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-700">
                  {card.plainSummary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {card.problemTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedProblem(tag)}
                      className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-bold text-zinc-700 hover:border-red-700"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    href={`/care-news/${card.id}`}
                    className="inline-flex items-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                  >
                    詳しく見る
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="text-2xl font-black">このページについて</h2>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-zinc-700">
            このページは、制度を詳しく読む前に「自分の事業所に関係がありそうか」を整理するためのページです。
            申請可否や算定可否を判断するものではありません。実際に確認する際は、必ず公式情報や自治体の案内をご確認ください。
          </p>

          <div className="mt-6">
            <Link
              href="/care-news/about"
              className="text-sm font-bold text-red-700 underline underline-offset-4"
            >
              作った意図と使い方を見る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-black text-zinc-700">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full border px-4 py-2 text-sm font-bold transition",
        active
          ? "border-zinc-900 bg-zinc-900 text-white"
          : "border-zinc-300 bg-zinc-50 text-zinc-800 hover:border-red-700",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
