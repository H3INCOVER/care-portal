import Link from "next/link";
import { getFacilities } from "@/lib/facilities";

type Facility = {
  facilityId: string;
  name: string;
  slug: string;
  prefecture?: string;
  city?: string;
  ward?: string;
  area?: string;
  type?: string;
  icon?: string;
  desc?: string;
  tags?: string[] | string;
  address?: string;
  tel?: string;
  isPublished?: boolean;
};

type PageProps = {
  searchParams?: Promise<{
    type?: string;
    city?: string;
    area?: string;
    keyword?: string;
    page?: string;
  }>;
};

const typeStyles: Record<string, { icon: string; badge: string }> = {
  訪問介護: {
    icon: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700",
  },
  居宅介護支援: {
    icon: "bg-amber-100 text-amber-700",
    badge: "bg-amber-50 text-amber-700",
  },
  通所介護: {
    icon: "bg-orange-100 text-orange-700",
    badge: "bg-orange-50 text-orange-700",
  },
  訪問看護: {
    icon: "bg-sky-100 text-sky-700",
    badge: "bg-sky-50 text-sky-700",
  },
  福祉用具貸与: {
    icon: "bg-violet-100 text-violet-700",
    badge: "bg-violet-50 text-violet-700",
  },
  住宅型有料老人ホーム: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
  },
  介護老人福祉施設: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
  },
  介護老人保健施設: {
    icon: "bg-sky-100 text-sky-700",
    badge: "bg-sky-50 text-sky-700",
  },
  小規模多機能型居宅介護: {
    icon: "bg-orange-100 text-orange-700",
    badge: "bg-orange-50 text-orange-700",
  },
  認知症対応型共同生活介護: {
    icon: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700",
  },
  特定施設入居者生活介護: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
  },
  介護予防支援: {
    icon: "bg-amber-100 text-amber-700",
    badge: "bg-amber-50 text-amber-700",
  },
  訪問入浴介護: {
    icon: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700",
  },
  通所リハビリテーション: {
    icon: "bg-orange-100 text-orange-700",
    badge: "bg-orange-50 text-orange-700",
  },
  短期入所生活介護: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
  },
  短期入所療養介護: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
  },
  地域密着型介護老人福祉施設: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
  },
  介護医療院: {
    icon: "bg-sky-100 text-sky-700",
    badge: "bg-sky-50 text-sky-700",
  },
  "定期巡回・随時対応型訪問介護看護": {
    icon: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700",
  },
  地域密着型通所介護: {
    icon: "bg-orange-100 text-orange-700",
    badge: "bg-orange-50 text-orange-700",
  },
  軽費老人ホーム: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
  },
  サービス付き高齢者向け住宅: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
  },
  "介護老人福祉施設（ユニット型）": {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
  },
  "特定施設入居者生活介護（ユニット型）": {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
  },
};

const serviceCategoryMapping: Record<string, string[]> = {
  "訪問サービス": [
    "訪問介護",
    "訪問看護",
    "訪問入浴介護",
    "定期巡回・随時対応型訪問介護看護"
  ],
  "通所サービス": [
    "通所介護",
    "地域密着型通所介護",
    "通所リハビリテーション"
  ],
  "居宅・相談": [
    "居宅介護支援",
    "居宅介護支援事業所",
    "介護予防支援",
    "介護予防支援事業所",
    "小規模多機能型居宅介護"
  ],
  "入居・施設": [
    "介護老人福祉施設",
    "介護老人福祉施設（ユニット型）",
    "地域密着型介護老人福祉施設",
    "地域密着型特別養護老人ホーム",
    "介護老人保健施設",
    "介護医療院",
    "認知症対応型共同生活介護",
    "特定施設入居者生活介護",
    "特定施設入居者生活介護（ユニット型）",
    "軽費老人ホーム",
    "住宅型有料老人ホーム",
    "サービス付き高齢者向け住宅"
  ],
  "短期入所": [
    "短期入所生活介護",
    "短期入所生活介護（ユニット型）",
    "短期入所療養介護",
    "短期入所生活介護・療養介護（ショートステイ）",
    "短期入所生活介護・療養介護（ショートステイ）（ユニット型）"
  ],
  "福祉用具": [
    "福祉用具貸与"
  ]
};

const defaultStyle = {
  icon: "bg-gray-100 text-gray-700",
  badge: "bg-gray-50 text-gray-700",
};

function normalizeTags(tags: string[] | string | undefined) {
  if (Array.isArray(tags)) return tags;

  return String(tags || "")
    .split("|")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function createFacilitiesHref(
  type: string,
  city: string,
  area: string,
  keyword?: string,
  page?: number,
) {
  const params = new URLSearchParams();

  if (type && type !== "すべて") {
    params.set("type", type);
  }

  if (city && city !== "すべて") {
    params.set("city", city);
  }

  if (area && area !== "すべて") {
    params.set("area", area);
  }

  if (keyword && keyword.trim() !== "") {
    params.set("keyword", keyword);
  }

  if (page && page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query ? `/facilities?${query}` : "/facilities";
}

function getPageRange(current: number, total: number) {
  const range: (number | string)[] = [];
  const delta = 2; // Show 2 pages around current page

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }
  return range;
}

function displayArea(area?: string, city?: string) {
  if (!area) return "エリア未掲載";
  if (!city) return area;

  return area.replace(city, "");
}

export default async function FacilitiesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const facilities = (await getFacilities()) as Facility[];

  const selectedType = params?.type || "すべて";
  const selectedCity = params?.city || "すべて";
  const selectedArea = params?.area || "すべて";
  const keyword = params?.keyword || "";

  // 選択中の大分類（category）を自動解決する
  let selectedCategory = "すべて";
  if (selectedType !== "すべて") {
    if (selectedType === "その他" || [
      "訪問サービス",
      "通所サービス",
      "居宅・相談",
      "入居・施設",
      "短期入所",
      "福祉用具"
    ].includes(selectedType)) {
      selectedCategory = selectedType;
    } else {
      const foundCategory = Object.keys(serviceCategoryMapping).find((key) =>
        serviceCategoryMapping[key].includes(selectedType),
      );
      selectedCategory = foundCategory || "その他";
    }
  }

  // 動的ページタイトルの決定
  const locationName = selectedArea !== "すべて" ? selectedArea : (selectedCity !== "すべて" ? selectedCity : "");
  let pageTitle = "介護事業所を探す";
  if (locationName && selectedType !== "すべて") {
    pageTitle = `${locationName}の${selectedType}事業所`;
  } else if (locationName) {
    pageTitle = `${locationName}の介護事業所`;
  } else if (selectedType !== "すべて") {
    pageTitle = `${selectedType}の事業所`;
  }

  // 動的一覧見出しの決定
  let listTitle = "介護事業所一覧";
  if (locationName && selectedType !== "すべて") {
    listTitle = `${locationName}の${selectedType}事業所一覧`;
  } else if (locationName) {
    listTitle = `${locationName}の介護事業所一覧`;
  } else if (selectedType !== "すべて") {
    listTitle = `${selectedType}の事業所一覧`;
  }

  const publishedFacilities = facilities.filter(
    (facility) => facility.isPublished,
  );

  const types = [
    "訪問サービス",
    "通所サービス",
    "居宅・相談",
    "入居・施設",
    "短期入所",
    "福祉用具",
    "その他"
  ];

  const cities = Array.from(
    new Set(
      publishedFacilities.map((facility) => facility.city).filter(Boolean),
    ),
  ) as string[];

  const areas = Array.from(
    new Set(
      publishedFacilities
        .filter((facility) => {
          if (selectedCity === "すべて") return false;
          return facility.city === selectedCity;
        })
        .map((facility) => facility.area)
        .filter(Boolean),
    ),
  ) as string[];

  const rawFilteredFacilities = publishedFacilities.filter((facility) => {
    let matchType = false;
    if (selectedType === "すべて") {
      matchType = true;
    } else if (selectedType === "その他") {
      const allMappedTypes = Object.values(serviceCategoryMapping).flat();
      matchType = !allMappedTypes.includes(facility.type || "");
    } else if (selectedType in serviceCategoryMapping) {
      matchType = serviceCategoryMapping[selectedType].includes(facility.type || "");
    } else {
      // 既存のURLクエリの互換性維持
      matchType = facility.type === selectedType;
    }

    const matchCity =
      selectedCity === "すべて" || facility.city === selectedCity;

    const matchArea =
      selectedArea === "すべて" || facility.area === selectedArea;

    const target = `
      ${facility.name}
      ${facility.address}
      ${facility.area}
      ${facility.city}
      ${facility.ward}
      ${facility.tags}
      ${facility.type}
    `.toLowerCase();

    const matchKeyword =
      keyword === "" || target.includes(keyword.toLowerCase());

    return matchType && matchCity && matchArea && matchKeyword;
  });

  const cityOrder = ["福岡市", "北九州市", "春日市", "大野城市", "太宰府市"];
  const filteredFacilities = [...rawFilteredFacilities].sort((a, b) => {
    // 1. 市区町村の比較
    const aCityIndex = cityOrder.indexOf(a.city || "");
    const bCityIndex = cityOrder.indexOf(b.city || "");
    const aOrder = aCityIndex !== -1 ? aCityIndex : 9999;
    const bOrder = bCityIndex !== -1 ? bCityIndex : 9999;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    if ((a.city || "") !== (b.city || "")) {
      return (a.city || "").localeCompare(b.city || "", "ja");
    }

    // 2. 区・エリアの比較
    const aZone = a.ward || a.area || "";
    const bZone = b.ward || b.area || "";

    const fukuokaWards = ["東区", "博多区", "中央区", "南区", "城南区", "早良区", "西区"];
    const kitakyushuWards = ["門司区", "小倉北区", "小倉南区", "若松区", "八幡東区", "八幡西区", "戸畑区"];

    let aZoneOrder = 9999;
    let bZoneOrder = 9999;

    if (a.city === "福岡市" && b.city === "福岡市") {
      const aIndex = fukuokaWards.indexOf(a.ward || "");
      const bIndex = fukuokaWards.indexOf(b.ward || "");
      aZoneOrder = aIndex !== -1 ? aIndex : 9999;
      bZoneOrder = bIndex !== -1 ? bIndex : 9999;
    } else if (a.city === "北九州市" && b.city === "北九州市") {
      const aIndex = kitakyushuWards.indexOf(a.ward || "");
      const bIndex = kitakyushuWards.indexOf(b.ward || "");
      aZoneOrder = aIndex !== -1 ? aIndex : 9999;
      bZoneOrder = bIndex !== -1 ? bIndex : 9999;
    }

    if (aZoneOrder !== bZoneOrder) {
      return aZoneOrder - bZoneOrder;
    }

    if (aZone !== bZone) {
      return aZone.localeCompare(bZone, "ja");
    }

    // 3. 事業所名の日本語自然比較
    return (a.name || "").localeCompare(b.name || "", "ja");
  });

  // ページ番号の解決とバリデーション
  let currentPage = 1;
  if (params?.page) {
    const parsedPage = parseInt(String(params.page), 10);
    if (!isNaN(parsedPage) && parsedPage > 0) {
      currentPage = parsedPage;
    }
  }

  const ITEMS_PER_PAGE = 20;
  const totalCount = filteredFacilities.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFacilities = filteredFacilities.slice(startIndex, endIndex);

  const displayStartIndex = totalCount > 0 ? startIndex + 1 : 0;
  const displayEndIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalCount);

  const countLabel = totalCount === 0
    ? "0 件"
    : (displayStartIndex === displayEndIndex
        ? `全 ${totalCount} 件中 ${displayStartIndex} 件を表示`
        : `全 ${totalCount} 件中 ${displayStartIndex}〜${displayEndIndex} 件を表示`
      );

  return (
    <main id="top" className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <nav
              aria-label="パンくず"
              className="flex flex-wrap items-center gap-2 text-sm text-gray-500"
            >
              <Link
                href="/"
                className="hover:text-emerald-700 transition"
              >
                TOP
              </Link>
              
              <span className="text-gray-300">＞</span>
              
              {selectedCity === "すべて" && selectedCategory === "すべて" ? (
                <span className="text-gray-900 font-medium">介護事業所を探す</span>
              ) : (
                <Link
                  href={createFacilitiesHref("すべて", "すべて", "すべて", keyword)}
                  className="hover:text-emerald-700 transition"
                >
                  介護事業所を探す
                </Link>
              )}

              {selectedCity !== "すべて" && (
                <>
                  <span className="text-gray-300">＞</span>
                  {selectedArea === "すべて" && selectedCategory === "すべて" ? (
                    <span className="text-gray-900 font-medium">{selectedCity}</span>
                  ) : (
                    <Link
                      href={createFacilitiesHref(selectedType, selectedCity, "すべて", keyword)}
                      className="hover:text-emerald-700 transition"
                    >
                      {selectedCity}
                    </Link>
                  )}
                </>
              )}

              {selectedArea !== "すべて" && (
                <>
                  <span className="text-gray-300">＞</span>
                  {selectedCategory === "すべて" ? (
                    <span className="text-gray-900 font-medium">{selectedArea}</span>
                  ) : (
                    <Link
                      href={createFacilitiesHref(selectedType, selectedCity, selectedArea, keyword)}
                      className="hover:text-emerald-700 transition"
                    >
                      {selectedArea}
                    </Link>
                  )}
                </>
              )}

              {selectedCategory !== "すべて" && (
                <>
                  <span className="text-gray-300">＞</span>
                  {selectedType === selectedCategory ? (
                    <span className="text-gray-900 font-medium">{selectedCategory}</span>
                  ) : (
                    <Link
                      href={createFacilitiesHref(selectedCategory, selectedCity, selectedArea, keyword)}
                      className="hover:text-emerald-700 transition"
                    >
                      {selectedCategory}
                    </Link>
                  )}
                </>
              )}

              {selectedType !== "すべて" && selectedType !== selectedCategory && (
                <>
                  <span className="text-gray-300">＞</span>
                  <span className="text-gray-900 font-medium">{selectedType}</span>
                </>
              )}
            </nav>

            <p className="mt-4 text-xs font-semibold text-emerald-700">
              福岡県内の介護事業所を探す
            </p>

            <h1 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {pageTitle}
            </h1>

            <form action="/facilities" method="GET" className="mt-4">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  name="keyword"
                  defaultValue={keyword}
                  placeholder="事業所名・エリア・住所で検索"
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm md:text-base shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />

                {selectedType !== "すべて" && (
                  <input type="hidden" name="type" value={selectedType} />
                )}

                {selectedCity !== "すべて" && (
                  <input type="hidden" name="city" value={selectedCity} />
                )}

                {selectedArea !== "すべて" && (
                  <input type="hidden" name="area" value={selectedArea} />
                )}

                <button
                  type="submit"
                  className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm md:text-base text-white font-semibold shadow-sm transition hover:bg-emerald-700 whitespace-nowrap"
                >
                  検索
                </button>
              </div>
            </form>

            <p className="mt-3 text-xs md:text-sm text-gray-600 leading-relaxed">
              福岡県内の介護事業所情報を掲載しています。
              サービス種別やエリアを確認しながら、
              ご家族やご本人に合った事業所探しにお役立てください。
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5">
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-700">
              サービス種別
            </p>

            <div className="flex flex-col gap-3">
              {/* 第1階層：大分類 */}
              <div className="flex flex-wrap gap-2">
                <Link
                  href={createFacilitiesHref(
                    "すべて",
                    selectedCity,
                    selectedArea,
                    keyword,
                  )}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === "すべて"
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-emerald-400 hover:text-emerald-700"
                  }`}
                >
                  すべて
                </Link>

                {types.map((cat) => (
                  <Link
                    key={cat}
                    href={createFacilitiesHref(
                      cat,
                      selectedCity,
                      selectedArea,
                      keyword,
                    )}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      selectedCategory === cat
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-emerald-400 hover:text-emerald-700"
                    }`}
                  >
                    {cat}
                  </Link>
                ))}
              </div>

              {/* 第2階層：具体的なサービス種別 */}
              {selectedCategory !== "すべて" && selectedCategory !== "その他" && serviceCategoryMapping[selectedCategory] && (
                <div className="pl-4 border-l-2 border-emerald-100 flex flex-wrap gap-2">
                  <Link
                    href={createFacilitiesHref(
                      selectedCategory,
                      selectedCity,
                      selectedArea,
                      keyword,
                    )}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      selectedType === selectedCategory
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-emerald-400 hover:text-emerald-700"
                    }`}
                  >
                    {selectedCategory}すべて
                  </Link>

                  {serviceCategoryMapping[selectedCategory].map((subType) => (
                    <Link
                      key={subType}
                      href={createFacilitiesHref(
                        subType,
                        selectedCity,
                        selectedArea,
                        keyword,
                      )}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        selectedType === subType
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:border-emerald-400 hover:text-emerald-700"
                      }`}
                    >
                      {subType}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-gray-700">市区町村</p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={createFacilitiesHref(
                  selectedType,
                  "すべて",
                  "すべて",
                  keyword,
                )}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selectedCity === "すべて"
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-emerald-400 hover:text-emerald-700"
                }`}
              >
                すべて
              </Link>

              {cities.map((city) => (
                <Link
                  key={city}
                  href={createFacilitiesHref(
                    selectedType,
                    city,
                    "すべて",
                    keyword,
                  )}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selectedCity === city
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-emerald-400 hover:text-emerald-700"
                  }`}
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>

          {selectedCity !== "すべて" && (
            <div>
              <p className="mb-3 text-sm font-semibold text-gray-700">
                エリア
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={createFacilitiesHref(
                    selectedType,
                    selectedCity,
                    "すべて",
                    keyword,
                  )}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selectedArea === "すべて"
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-emerald-400 hover:text-emerald-700"
                  }`}
                >
                  すべて
                </Link>

                {areas.map((area) => (
                  <Link
                    key={area}
                    href={createFacilitiesHref(
                      selectedType,
                      selectedCity,
                      area,
                      keyword,
                    )}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      selectedArea === area
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-emerald-400 hover:text-emerald-700"
                    }`}
                  >
                    {displayArea(
                      area,
                      publishedFacilities.find(
                        (facility) => facility.area === area,
                      )?.city,
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {filteredFacilities.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-lg font-semibold text-gray-900">
              条件に一致する事業所が見つかりませんでした。
            </p>
            <p className="mt-2 text-gray-600">
              キーワードやサービス種別、エリアを変更して再度お試しください。
            </p>

            <Link
              href="/facilities"
              className="mt-4 inline-flex text-emerald-700 font-semibold"
            >
              条件をリセットする
            </Link>
          </div>
        ) : (
          <div>
            {/* 一覧見出しと件数表示 */}
            <div className="mt-8 mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  {listTitle}
                </h2>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{countLabel}</span>
              </div>
            </div>

            <div className="grid gap-5">
              {paginatedFacilities.map((facility) => {
              const styles = typeStyles[facility.type || ""] || defaultStyle;
              const tags = normalizeTags(facility.tags);

              return (
                <Link
                  key={facility.facilityId}
                  href={`/facilities/${facility.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <article className="p-5 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-5">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${styles.icon}`}
                      >
                        {facility.icon || "🏠"}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${styles.badge}`}
                          >
                            {facility.type || "サービス種別未設定"}
                          </span>

                          <span className="text-sm text-gray-500">
                            {displayArea(facility.area, facility.city)}
                          </span>
                        </div>

                        <h2 className="mt-3 text-xl md:text-2xl font-bold text-gray-900 leading-snug group-hover:text-emerald-700 transition-colors">
                          {facility.name}
                        </h2>

                        <p className="mt-3 text-gray-600 leading-relaxed">
                          {facility.desc ||
                            "事業所の詳しい情報は詳細ページをご確認ください。"}
                        </p>

                        {tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
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

                        <div className="mt-5 pt-5 border-t border-gray-100 grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
                          <div>
                            <p className="text-sm text-gray-500">所在地</p>
                            <p className="mt-1 font-medium text-gray-900">
                              {facility.address || "所在地未掲載"}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">電話番号</p>
                            <p className="mt-1 font-semibold text-gray-900">
                              {facility.tel || "未掲載"}
                            </p>
                          </div>

                          <span className="text-emerald-700 font-semibold text-sm whitespace-nowrap">
                            詳細を見る →
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {/* ページネーション UI */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1.5 text-sm">
              {/* 前へボタン */}
              {currentPage > 1 ? (
                <Link
                  href={createFacilitiesHref(selectedType, selectedCity, selectedArea, keyword, currentPage - 1)}
                  className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:border-emerald-500 hover:text-emerald-700 transition font-medium"
                >
                  前へ
                </Link>
              ) : (
                <span className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-400 cursor-not-allowed">
                  前へ
                </span>
              )}

              {/* 各ページ番号 */}
              {getPageRange(currentPage, totalPages).map((p, idx) => {
                if (p === "...") {
                  return (
                    <span key={`dots-${idx}`} className="px-2 text-gray-400 font-semibold">
                      ...
                    </span>
                  );
                }

                const pageNum = p as number;
                const isCurrent = pageNum === currentPage;

                return (
                  <Link
                    key={`page-${pageNum}`}
                    href={createFacilitiesHref(selectedType, selectedCity, selectedArea, keyword, pageNum)}
                    className={`rounded-xl px-3.5 py-2 font-medium transition ${
                      isCurrent
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "border border-gray-300 bg-white text-gray-700 hover:border-emerald-500 hover:text-emerald-700"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}

              {/* 次へボタン */}
              {currentPage < totalPages ? (
                <Link
                  href={createFacilitiesHref(selectedType, selectedCity, selectedArea, keyword, currentPage + 1)}
                  className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:border-emerald-500 hover:text-emerald-700 transition font-medium"
                >
                  次へ
                </Link>
              ) : (
                <span className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-400 cursor-not-allowed">
                  次へ
                </span>
              )}
            </div>
          )}
          </div>
        )}
      </section>

      <a
        href="#top"
        className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg transition hover:bg-emerald-800"
        aria-label="ページ上部へ戻る"
      >
        ↑
      </a>
    </main>
  );
}