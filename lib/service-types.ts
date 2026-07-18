// サービス種別共通マスター (Service Types Master)

export interface ServiceTypeStyle {
  icon: string; // 一覧・詳細ページ等で表示するアイコン用CSSクラス
  badge: string; // バッジ用CSSクラス
  symbol?: string; // 絵文字等のシンボル
}

// サービス種別のスタイル定義 (一覧と詳細ページで共通利用)
export const typeStyles: Record<string, ServiceTypeStyle> = {
  訪問介護: {
    icon: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700",
    symbol: "🚗",
  },
  居宅介護支援: {
    icon: "bg-amber-100 text-amber-700",
    badge: "bg-amber-50 text-amber-700",
    symbol: "📋",
  },
  居宅介護支援事業所: {
    icon: "bg-amber-100 text-amber-700",
    badge: "bg-amber-50 text-amber-700",
    symbol: "📋",
  },
  通所介護: {
    icon: "bg-orange-100 text-orange-700",
    badge: "bg-orange-50 text-orange-700",
    symbol: "☀️",
  },
  訪問看護: {
    icon: "bg-sky-100 text-sky-700",
    badge: "bg-sky-50 text-sky-700",
    symbol: "🩺",
  },
  福祉用具貸与: {
    icon: "bg-violet-100 text-violet-700",
    badge: "bg-violet-50 text-violet-700",
    symbol: "♿",
  },
  住宅型有料老人ホーム: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏠",
  },
  介護老人福祉施設: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏢",
  },
  "介護老人福祉施設（特別養護老人ホーム）": {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏢",
  },
  "介護老人福祉施設 (特別養護老人ホーム)": {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏢",
  },
  介護老人保健施設: {
    icon: "bg-sky-100 text-sky-700",
    badge: "bg-sky-50 text-sky-700",
    symbol: "🏥",
  },
  "介護老人保健施設（老健）": {
    icon: "bg-sky-100 text-sky-700",
    badge: "bg-sky-50 text-sky-700",
    symbol: "🏥",
  },
  "介護老人保健施設 (老健)": {
    icon: "bg-sky-100 text-sky-700",
    badge: "bg-sky-50 text-sky-700",
    symbol: "🏥",
  },
  小規模多機能型居宅介護: {
    icon: "bg-orange-100 text-orange-700",
    badge: "bg-orange-50 text-orange-700",
    symbol: "🏠",
  },
  認知症対応型共同生活介護: {
    icon: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700",
    symbol: "🏘️",
  },
  "認知症対応型共同生活介護（グループホーム）": {
    icon: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700",
    symbol: "🏘️",
  },
  "認知症対応型共同生活介護 (グループホーム)": {
    icon: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700",
    symbol: "🏘️",
  },
  特定施設入居者生活介護: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏨",
  },
  "特定施設入居者生活介護（介護付有料老人ホーム）": {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏨",
  },
  "特定施設入居者生活介護 (介護付有料老人ホーム)": {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏨",
  },
  介護予防支援: {
    icon: "bg-indigo-100 text-indigo-700",
    badge: "bg-indigo-50 text-indigo-700",
    symbol: "💬",
  },
  介護予防支援事業所: {
    icon: "bg-indigo-100 text-indigo-700",
    badge: "bg-indigo-50 text-indigo-700",
    symbol: "💬",
  },
  指定介護予防支援事業所: {
    icon: "bg-indigo-100 text-indigo-700",
    badge: "bg-indigo-50 text-indigo-700",
    symbol: "💬",
  },
  地域包括支援センター: {
    icon: "bg-indigo-100 text-indigo-700",
    badge: "bg-indigo-50 text-indigo-700",
    symbol: "💬",
  },
  訪問入浴介護: {
    icon: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700",
    symbol: "🛀",
  },
  通所リハビリテーション: {
    icon: "bg-orange-100 text-orange-700",
    badge: "bg-orange-50 text-orange-700",
    symbol: "🏃",
  },
  "通所リハビリテーション（デイケア）": {
    icon: "bg-orange-100 text-orange-700",
    badge: "bg-orange-50 text-orange-700",
    symbol: "🏃",
  },
  "通所リハビリテーション (デイケア)": {
    icon: "bg-orange-100 text-orange-700",
    badge: "bg-orange-50 text-orange-700",
    symbol: "🏃",
  },
  短期入所生活介護: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🛌",
  },
  短期入所療養介護: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🛌",
  },
  "短期入所生活介護・療養介護（ショートステイ）": {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🛌",
  },
  地域密着型介護老人福祉施設: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏢",
  },
  地域密着型特別養護老人ホーム: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏢",
  },
  地域密着型介護老人福祉施設入所者生活介護: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏢",
  },
  介護医療院: {
    icon: "bg-sky-100 text-sky-700",
    badge: "bg-sky-50 text-sky-700",
    symbol: "🏥",
  },
  "定期巡回・随時対応型訪問介護看護": {
    icon: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700",
    symbol: "🚗",
  },
  地域密着型通所介護: {
    icon: "bg-orange-100 text-orange-700",
    badge: "bg-orange-50 text-orange-700",
    symbol: "☀️",
  },
  認知症対応型通所介護: {
    icon: "bg-orange-100 text-orange-700",
    badge: "bg-orange-50 text-orange-700",
    symbol: "☀️",
  },
  軽費老人ホーム: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏠",
  },
  ケアハウス: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏠",
  },
  サービス付き高齢者向け住宅: {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏠",
  },
  "介護老人福祉施設（ユニット型）": {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏢",
  },
  "特定施設入居者生活介護（ユニット型）": {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🏨",
  },
  "短期入所生活介護・療養介護（ショートステイ）（ユニット型）": {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🛌",
  },
  "短期入所生活介護（ユニット型）": {
    icon: "bg-rose-100 text-rose-700",
    badge: "bg-rose-50 text-rose-700",
    symbol: "🛌",
  },
  看護小規模多機能型居宅介護: {
    icon: "bg-orange-100 text-orange-700",
    badge: "bg-orange-50 text-orange-700",
    symbol: "🏠",
  },
  特定福祉用具販売: {
    icon: "bg-violet-100 text-violet-700",
    badge: "bg-violet-50 text-violet-700",
    symbol: "♿",
  },
  "福祉用具貸与・販売": {
    icon: "bg-violet-100 text-violet-700",
    badge: "bg-violet-50 text-violet-700",
    symbol: "♿",
  },
};

// 大分類マッピング定義
export const serviceCategoryMapping: Record<string, string[]> = {
  訪問サービス: [
    "訪問介護",
    "訪問看護",
    "訪問入浴介護",
    "定期巡回・随時対応型訪問介護看護",
  ],
  通所サービス: [
    "通所介護",
    "地域密着型通所介護",
    "認知症対応型通所介護",
    "通所リハビリテーション",
    "通所リハビリテーション（デイケア）",
    "通所リハビリテーション (デイケア)",
  ],
  居宅: [
    "居宅介護支援",
    "居宅介護支援事業所",
    "小規模多機能型居宅介護",
    "看護小規模多機能型居宅介護",
  ],
  "入居・施設": [
    "介護老人福祉施設",
    "介護老人福祉施設（特別養護老人ホーム）",
    "介護老人福祉施設 (特別養護老人ホーム)",
    "介護老人福祉施設（ユニット型）",
    "地域密着型介護老人福祉施設",
    "地域密着型特別養護老人ホーム",
    "地域密着型介護老人福祉施設入所者生活介護",
    "介護老人保健施設",
    "介護老人保健施設（老健）",
    "介護老人保健施設 (老健)",
    "介護医療院",
    "認知症対応型共同生活介護",
    "認知症対応型共同生活介護（グループホーム）",
    "認知症対応型共同生活介護 (グループホーム)",
    "特定施設入居者生活介護",
    "特定施設入居者生活介護（介護付有料老人ホーム）",
    "特定施設入居者生活介護 (介護付有料老人ホーム)",
    "特定施設入居者生活介護（ユニット型）",
    "軽費老人ホーム",
    "ケアハウス",
    "住宅型有料老人ホーム",
    "サービス付き高齢者向け住宅",
  ],
  短期入所: [
    "短期入所生活介護",
    "短期入所生活介護（ユニット型）",
    "短期入所療養介護",
    "短期入所生活介護・療養介護（ショートステイ）",
    "短期入所生活介護・療養介護（ショートステイ）（ユニット型）",
  ],
  福祉用具: [
    "福祉用具貸与",
    "特定福祉用具販売",
    "福祉用具貸与・販売",
  ],
  相談窓口: [
    "地域包括支援センター",
    "介護予防支援",
    "介護予防支援事業所",
    "指定介護予防支援事業所",
  ],
};

// 大分類の表示順序
export const serviceCategories = [
  "訪問サービス",
  "通所サービス",
  "居宅",
  "入居・施設",
  "短期入所",
  "福祉用具",
  "相談窓口",
  "その他",
];

// デフォルト（未登録フォールバック）スタイル
export const defaultTypeStyle: ServiceTypeStyle = {
  icon: "bg-gray-100 text-gray-700",
  badge: "bg-gray-50 text-gray-700",
  symbol: "🏠",
};

/**
 * サービス種別名から対応する大分類（Category）を取得する
 */
export function getServiceCategory(type: string | undefined): string {
  if (!type) return "その他";

  // 大分類マッピング内を検索
  const found = Object.keys(serviceCategoryMapping).find((category) =>
    serviceCategoryMapping[category].includes(type)
  );

  return found || "その他";
}

/**
 * サービス種別名から対応するスタイルを取得する (登録なし時はフォールバック)
 */
export function getServiceTypeStyle(type: string | undefined): ServiceTypeStyle {
  if (!type) return defaultTypeStyle;
  return typeStyles[type] || defaultTypeStyle;
}
