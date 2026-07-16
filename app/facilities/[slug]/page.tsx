import Link from "next/link";
import { notFound } from "next/navigation";
import { getFacilities } from "@/lib/facilities";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function normalizeTags(tags: string[] | string | undefined) {
  if (Array.isArray(tags)) return tags;

  return String(tags || "")
    .split("|")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function createGoogleMapUrl(address: string | undefined, name: string) {
  const query = address ? `${name} ${address}` : name;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query,
  )}`;
}

export async function generateStaticParams() {
  const facilities = await getFacilities();

  return facilities.map((facility) => ({
    slug: facility.slug,
  }));
}

export default async function FacilityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const facilities = await getFacilities();

  const facility = facilities.find((item) => item.slug === slug);

  if (!facility) {
    notFound();
  }

  const tags = normalizeTags(facility.tags);
  const googleMapUrl = createGoogleMapUrl(facility.address, facility.name);

  const relatedFacilities =
    facility.companyName && facility.companyId
      ? facilities.filter(
          (item) =>
            item.companyId === facility.companyId &&
            item.facilityId !== facility.facilityId &&
            item.isPublished === true,
        )
      : [];

  const nearbyFacilities = facilities
    .filter(
      (item) =>
        item.facilityId !== facility.facilityId &&
        item.area === facility.area &&
        item.isPublished === true,
    )
    .sort((a, b) => {
      if (a.type === facility.type && b.type !== facility.type) return -1;
      if (a.type !== facility.type && b.type === facility.type) return 1;
      return 0;
    })
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <nav
            aria-label="パンくず"
            className="flex flex-wrap items-center gap-2 text-sm"
          >
            <Link
              href="/"
              className="text-gray-500 hover:text-emerald-700 transition link-interactive"
            >
              TOP
            </Link>

            <span className="text-gray-300">＞</span>

            <Link
              href="/facilities"
              className="text-gray-500 hover:text-emerald-700 transition link-interactive"
            >
              介護事業所を探す
            </Link>

            {facility.area && (
              <>
                <span className="text-gray-300">＞</span>

                <Link
                  href={`/facilities?area=${encodeURIComponent(facility.area)}`}
                  className="text-gray-500 hover:text-emerald-700 transition link-interactive"
                >
                  {facility.city ? facility.area.replace(facility.city, "") : facility.area}
                </Link>
              </>
            )}

            <span className="text-gray-300">＞</span>

            <span className="text-gray-900 font-medium">{facility.name}</span>
          </nav>

          <div className="mt-6 flex flex-col md:flex-row md:items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl shrink-0">
              {facility.icon || "🏠"}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                  {facility.type || "サービス種別未設定"}
                </span>

                {facility.area && (
                  <span className="text-sm text-gray-500">{facility.area}</span>
                )}
              </div>

              <h1 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                {facility.name}
              </h1>

              <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed">
                {facility.desc ||
                  "事業所の詳しい情報は、掲載情報をご確認ください。"}
              </p>

              {tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-bold text-gray-900">基本情報</h2>

              <div className="mt-6 divide-y divide-gray-100">
                {facility.officeNumber && (
                  <div className="grid gap-1 py-4 md:grid-cols-[160px_1fr]">
                    <p className="text-sm font-semibold text-gray-500">
                      事業所番号
                    </p>
                    <p className="text-gray-900 font-medium">
                      {facility.officeNumber}
                    </p>
                  </div>
                )}

                {facility.companyName && (
                  <div className="grid gap-1 py-4 md:grid-cols-[160px_1fr]">
                    <p className="text-sm font-semibold text-gray-500">
                      運営法人
                    </p>
                    <p className="text-gray-900 font-medium">
                      {facility.companyName}
                    </p>
                  </div>
                )}

                <div className="grid gap-1 py-4 md:grid-cols-[160px_1fr]">
                  <p className="text-sm font-semibold text-gray-500">
                    サービス種別
                  </p>
                  <p className="text-gray-900 font-medium">
                    {facility.type || "未掲載"}
                  </p>
                </div>

                <div className="grid gap-1 py-4 md:grid-cols-[160px_1fr]">
                  <p className="text-sm font-semibold text-gray-500">所在地</p>
                  <div>
                    <p className="text-gray-900 font-medium">
                      {facility.address || "未掲載"}
                    </p>

                    {facility.address && (
                      <a
                        href={googleMapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex text-sm font-semibold text-emerald-700 hover:underline link-interactive"
                      >
                        Googleマップで見る →
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid gap-1 py-4 md:grid-cols-[160px_1fr]">
                  <p className="text-sm font-semibold text-gray-500">
                    電話番号
                  </p>
                  <p className="text-gray-900 font-semibold">
                    {facility.tel || "未掲載"}
                  </p>
                </div>

                <div className="grid gap-1 py-4 md:grid-cols-[160px_1fr]">
                  <p className="text-sm font-semibold text-gray-500">
                    営業時間
                  </p>
                  <p className="text-gray-900 font-medium">
                    {facility.hours || "公式情報をご確認ください"}
                  </p>
                </div>

                <div className="grid gap-1 py-4 md:grid-cols-[160px_1fr]">
                  <p className="text-sm font-semibold text-gray-500">
                    対応エリア
                  </p>
                  <p className="text-gray-900 font-medium">
                    {facility.serviceArea || facility.area || "未掲載"}
                  </p>
                </div>

                {facility.updatedAt && (
                  <div className="grid gap-1 py-4 md:grid-cols-[160px_1fr]">
                    <p className="text-sm font-semibold text-gray-500">
                      最終更新日
                    </p>
                    <p className="text-gray-900 font-medium">
                      {facility.updatedAt}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {nearbyFacilities.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      同じエリアの事業所
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                      {facility.area}周辺の事業所も確認できます。
                    </p>
                  </div>

                  <Link
                    href={`/facilities?area=${encodeURIComponent(
                      facility.area || "",
                    )}`}
                    className="hidden md:inline-flex text-sm font-semibold text-emerald-700 hover:underline link-interactive"
                  >
                    一覧で見る →
                  </Link>
                </div>

                <div className="mt-5 grid gap-3">
                  {nearbyFacilities.map((item) => (
                    <Link
                      key={item.facilityId}
                      href={`/facilities/${item.slug}`}
                      className="rounded-xl border border-gray-200 p-4 hover:border-emerald-300 hover:bg-emerald-50/40 transition active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.type}｜{item.area}
                          </p>
                        </div>

                        <span className="text-sm font-semibold text-emerald-700 whitespace-nowrap">
                          詳細 →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/facilities?area=${encodeURIComponent(
                    facility.area || "",
                  )}`}
                  className="mt-5 inline-flex md:hidden text-sm font-semibold text-emerald-700 hover:underline link-interactive"
                >
                  一覧で見る →
                </Link>
              </section>
            )}

            {relatedFacilities.length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="text-xl font-bold text-gray-900">
                  同じ法人の事業所
                </h2>

                <div className="mt-5 grid gap-3">
                  {relatedFacilities.map((item) => (
                    <Link
                      key={item.facilityId}
                      href={`/facilities/${item.slug}`}
                      className="rounded-xl border border-gray-200 p-4 hover:border-emerald-300 hover:bg-emerald-50/40 transition active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1"
                    >
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.type}｜{item.area}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-lg font-bold text-gray-900">お問い合わせ</h2>

              <div className="mt-5 space-y-3">
                {facility.tel && (
                  <a
                    href={`tel:${facility.tel}`}
                    className="btn-primary w-full px-5 py-3"
                  >
                    電話する
                  </a>
                )}

                {facility.website && (
                  <a
                    href={facility.website}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary w-full px-5 py-3"
                  >
                    公式サイトを見る
                  </a>
                )}

                {facility.address && (
                  <a
                    href={googleMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary w-full px-5 py-3"
                  >
                    地図を見る
                  </a>
                )}

                <Link
                  href={`/contact/edit?facility=${facility.slug}`}
                  className="btn-secondary w-full px-5 py-3"
                >
                  掲載情報の修正・追加掲載
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm leading-relaxed text-amber-900">
                掲載情報は公開情報等をもとに作成しています。最新の情報は、各事業所へ直接ご確認ください。
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
