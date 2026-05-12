import Link from "next/link";
import { getFacilities } from "@/lib/facilities";

function displayArea(area: string | undefined) {
  if (!area) return "エリア未掲載";

  return area.replace("福岡市", "");
}

export default async function HomePage() {
  const facilities = await getFacilities();

  const publishedFacilities = facilities
    .filter(
      (facility) =>
        facility.isPublished === true || facility.isPublished === "true",
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

  const areas = Array.from(
    new Set(
      publishedFacilities.map((facility) => facility.area).filter(Boolean),
    ),
  );

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
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-4 text-white font-semibold hover:bg-emerald-800 transition"
            >
              介護事業所をさがす
            </Link>

            <Link
              href="/contact/edit"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-4 text-gray-800 font-semibold hover:border-emerald-300 transition"
            >
              掲載情報の修正・追加掲載
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-200">
            現在の掲載件数：{publishedFacilities.length}件
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
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
            className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition"
          >
            一覧を見る →
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {serviceTypes.map((type) => (
            <Link
              key={type}
              href={`/facilities?type=${encodeURIComponent(type)}`}
              className="rounded-2xl border border-gray-200 bg-white px-5 py-4 font-semibold text-gray-800 hover:border-emerald-300 hover:bg-emerald-50 transition"
            >
              {type}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 border-t border-gray-200">
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
          {areas.map((area) => (
            <Link
              key={area}
              href={`/facilities?area=${encodeURIComponent(area)}`}
              className="rounded-2xl border border-gray-200 bg-white px-5 py-4 font-semibold text-gray-800 hover:border-emerald-300 hover:bg-emerald-50 transition"
            >
              {displayArea(area)}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 border-t border-gray-200">
        <div className="flex items-end gap-6">
          <div>
            <p className="text-sm font-semibold text-emerald-700">
              Latest Facilities
            </p>

            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
              新着事業所
            </h2>
          </div>

          <Link
            href="/facilities"
            className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition"
          >
            一覧を見る →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {latestFacilities.map((facility) => (
            <Link
              key={facility.facilityId}
              href={`/facilities/${facility.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white p-5 hover:border-emerald-300 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">
                  {facility.icon || "🏠"}
                </div>

                <div>
                  <p className="text-sm text-gray-500">{facility.type}</p>

                  <p className="mt-1 text-sm text-gray-500">
                    {displayArea(facility.area)}
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
          className="mt-8 inline-flex md:hidden text-sm font-semibold text-emerald-700 hover:underline"
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
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-4 font-semibold text-emerald-700 hover:bg-emerald-50 transition"
          >
            掲載情報について問い合わせる
          </Link>
        </div>
      </section>
    </main>
  );
}
