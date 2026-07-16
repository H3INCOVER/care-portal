import Link from "next/link";
import { getFacilities } from "@/lib/facilities";

function displayArea(area: string | undefined, city: string | undefined) {
  if (!area) return "エリア未掲載";
  if (!city) return area;

  return area.replace(city, "");
}

export default async function HomePage() {
  const facilities = await getFacilities();

  const publishedFacilities = facilities
    .filter(
      (facility) =>
        facility.isPublished === true,
    )
    .sort((a, b) => {
      const dateA = new Date(
        a.updatedAt || a.createdAt || "2000-01-01",
      ).getTime();
      const dateB = new Date(
        b.updatedAt || b.createdAt || "2000-01-01",
      ).getTime();

      return dateB - dateA;
    });

  const latestFacilities = publishedFacilities.slice(0, 3);

  const serviceTypes = Array.from(
    new Set(
      publishedFacilities.map((facility) => facility.type).filter(Boolean),
    ),
  );

  const cities = Array.from(
    new Set(
      publishedFacilities.map((facility) => facility.city).filter(Boolean),
    ),
  );

  // 市区町村ごとの掲載件数を集計 (isPublished === true のデータのみ)
  const cityCounts = publishedFacilities.reduce((acc, facility) => {
    const city = facility.city;
    if (city) {
      acc[city] = (acc[city] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // 市区町村の優先表示順を制御するソートロジック
  const cityOrder = ["福岡市", "北九州市", "春日市", "大野城市"];
  const sortedCities = cities.sort((a, b) => {
    const indexA = cityOrder.indexOf(a);
    const indexB = cityOrder.indexOf(b);
    
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b, "ja");
  });

  const homeServices = [
    "居宅介護支援",
    "訪問介護",
    "通所介護",
    "訪問看護",
    "福祉用具貸与"
  ];

  const facilityServices = [
    "介護老人福祉施設",
    "介護老人保健施設",
    "認知症対応型共同生活介護",
    "特定施設入居者生活介護",
    "小規模多機能型居宅介護",
    "住宅型有料老人ホーム"
  ];

  const homeServicesList = homeServices.filter(type => serviceTypes.includes(type));
  const facilityServicesList = facilityServices.filter(type => serviceTypes.includes(type));

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        <div className="absolute inset-0">
          <img src="/hero.jpg/" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <p className="text-sm font-semibold text-emerald-200">
            地域の介護事業所情報ポータル
          </p>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
            オール介護ポータル
          </h1>

          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-white/90 font-medium drop-shadow-sm">
            介護事業所の基本情報を、サービス種別やエリアから探せるポータルサイトです。
            現在は福岡市内の事業所情報を中心に掲載しています。
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/facilities"
              className="btn-primary px-6 py-4"
            >
              介護事業所をさがす
            </Link>

            <Link
              href="/contact/edit"
              className="btn-secondary px-6 py-4"
            >
              掲載情報の修正・追加掲載
            </Link>
          </div>

          <div className="mt-8 border-t border-white/10 pt-4">
            <p className="text-sm font-semibold text-emerald-200">
              福岡県内 {publishedFacilities.length.toLocaleString()}事業所掲載
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-300">
              {sortedCities.map((city) => (
                <span key={city} className="whitespace-nowrap">
                  {city} {cityCounts[city]?.toLocaleString() || 0}件
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ① エリアから探す（最優先配置） */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-emerald-700">
              Search by Area
            </p>

            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
              エリアから探す
            </h2>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {sortedCities.map((city) => (
            <Link
              key={city}
              href={`/facilities?city=${encodeURIComponent(city)}`}
              className="rounded-2xl border border-gray-200 bg-white px-5 py-4 font-semibold text-gray-800 hover:border-emerald-300 hover:bg-emerald-50 transition active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1"
            >
              {city}
            </Link>
          ))}
        </div>
      </section>

      {/* ② サービス種別から探す（第2優先、グループ分け適用） */}
      <section className="max-w-6xl mx-auto px-4 py-14 border-t border-gray-200">
        <div className="flex items-end gap-6">
          <div>
            <p className="text-sm font-semibold text-emerald-700">
              Search by Service
            </p>

            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
              サービス種別から探す
            </h2>
          </div>

          <Link
            href="/facilities"
            className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1"
          >
            一覧を見る →
          </Link>
        </div>

        <div className="mt-8 space-y-8">
          {homeServicesList.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 border-l-4 border-emerald-600 pl-3">
                在宅サービス
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {homeServicesList.map((type) => (
                  <Link
                    key={type}
                    href={`/facilities?type=${encodeURIComponent(type)}`}
                    className="rounded-2xl border border-gray-200 bg-white px-5 py-4 font-semibold text-gray-800 hover:border-emerald-300 hover:bg-emerald-50 transition active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1"
                  >
                    {type}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {facilityServicesList.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 border-l-4 border-emerald-600 pl-3">
                入居施設・その他
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {facilityServicesList.map((type) => {
                  let displayLabel = type;
                  if (type === "介護老人福祉施設") displayLabel = "介護老人福祉施設（特養）";
                  if (type === "介護老人保健施設") displayLabel = "介護老人保健施設（老健）";
                  if (type === "認知症対応型共同生活介護") displayLabel = "認知症対応型共同生活介護（グループホーム）";
                  
                  return (
                    <Link
                      key={type}
                      href={`/facilities?type=${encodeURIComponent(type)}`}
                      className="rounded-2xl border border-gray-200 bg-white px-5 py-4 font-semibold text-gray-800 hover:border-emerald-300 hover:bg-emerald-50 transition active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1"
                    >
                      {displayLabel}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ③ 最近追加した事業所 */}
      <section className="max-w-6xl mx-auto px-4 py-14 border-t border-gray-200">
        <div className="flex items-end gap-6">
          <div>
            <p className="text-sm font-semibold text-emerald-700">
              Latest Facilities
            </p>

            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
              最近追加した事業所
            </h2>
          </div>

          <Link
            href="/facilities"
            className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1"
          >
            一覧を見る →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {latestFacilities.map((facility) => (
            <Link
              key={facility.facilityId}
              href={`/facilities/${facility.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white p-5 hover:border-emerald-300 hover:shadow-md transition active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">
                  {facility.icon || "🏠"}
                </div>

                <div>
                  <p className="text-sm text-gray-500">{facility.type}</p>

                  <p className="mt-1 text-sm text-gray-500">
                    {displayArea(facility.area, facility.city)}
                  </p>
                </div>
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900 leading-snug group-hover:text-emerald-700 transition-colors">
                {facility.name}
              </h3>

              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                {facility.desc || "事業所の詳細情報をご確認ください。"}
              </p>

              <span className="mt-5 inline-flex text-sm font-semibold text-emerald-700">
                詳細を見る →
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/facilities"
          className="mt-8 inline-flex md:hidden text-sm font-semibold text-emerald-700 hover:underline link-interactive"
        >
          一覧を見る →
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 border-t border-gray-200">
        <div className="rounded-3xl bg-emerald-700 px-6 py-10 md:px-10 md:py-14 text-white">
          <p className="text-sm font-semibold text-emerald-100">
            For Facility Owners
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
            掲載情報の修正・追加掲載について
          </h2>

          <p className="mt-6 max-w-3xl text-emerald-50 leading-relaxed">
            掲載情報の修正や追加掲載をご希望の事業所様は、
            専用フォームよりお問い合わせください。
            内容確認後、順次対応いたします。
          </p>

          <Link
            href="/contact/edit"
            className="mt-8 inline-flex items-center justify-center rounded-full border border-transparent bg-white px-6 py-4 font-semibold text-emerald-700 transition active:scale-[0.98] hover:bg-emerald-50 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            掲載情報について問い合わせる
          </Link>
        </div>
      </section>
    </main>
  );
}
