export type CareNewsType = "補助金" | "助成金" | "加算";

export type CareNewsCard = {
  id: string;

  title: string;

  plainSummary: string;

  type: CareNewsType;

  regions: string[];

  themes: string[];

  problemTags: string[];

  publishedAt: string;

  updatedAt: string;

  keywordExplanation: string;

  deepExplanation: string[];

  examples: string[];

  situations: string[];

  forWhom: string;

  whatCanHappen: string;

  policyIntent: string;

  firstStep: string[];

  checkPoints: string[];

  caution: string;

  sourceName: string;

  sourceUrl: string;
};

export const careNewsCards: CareNewsCard[] = [
  {
    id: "care-technology-support",

    title: "介護テクノロジー導入支援事業",

    plainSummary:
      "記録や情報共有、見守り、業務負担の見直しに関係する可能性がある制度です。",

    type: "補助金",

    regions: ["全国", "福岡県", "福岡市"],

    themes: [
      "記録・情報共有",
      "業務負担",
      "設備・環境整備",
    ],

    problemTags: [
      "記録に時間がかかる",
      "情報共有・連携が大変",
      "設備を見直したい",
    ],

    publishedAt: "2026-05-24",

    updatedAt: "2026-05-24",

    keywordExplanation:
      "ICTや介護テクノロジーは、記録・共有・見守りなどを支援する仕組みです。",

    deepExplanation: [
      "ICTとは、情報通信技術のことです。介護現場では、紙の記録をタブレットで入力したり、職員間の申し送りをシステムで共有したりする仕組みを指します。",

      "介護テクノロジーはICTだけではありません。見守りセンサー、介護ロボット、移乗支援機器など、職員や利用者を支える技術全体を含むことがあります。",

      "つまり、新しい機械導入ではなく、現場課題を少し軽くするための制度です。",
    ],

    examples: [
      "タブレットで介護記録を入力する",
      "申し送りをシステム共有する",
      "見守りセンサーで夜間巡回を減らす",
      "移乗支援機器で身体負担を減らす",
    ],

    situations: [
      "記録入力が終業後に残っている",
      "申し送りが口頭や紙中心",
      "職員ごとに記録品質がばらつく",
      "夜間見守り負担が大きい",
      "何から改善するか決められない",
    ],

    forWhom:
      "記録負担や情報共有、現場効率に課題を感じている事業所向けです。",

    whatCanHappen:
      "対象機器やシステム導入時に支援を受けられる可能性があります。",

    policyIntent:
      "介護現場の人手不足や負担軽減を後押しする目的があります。",

    firstStep: [
      "時間がかかる業務を書く",
      "ICTで改善できそうか見る",
      "対象条件を見る",
    ],

    checkPoints: [
      "対象サービス",
      "補助率",
      "申請期限",
      "導入条件",
    ],

    caution:
      "年度や自治体で内容が変わるため最新情報を確認してください。",

    sourceName: "厚生労働省",

    sourceUrl: "https://www.mhlw.go.jp/",
  },

  {
    id: "care-staff-improvement",

    title: "介護職員等処遇改善加算",

    plainSummary:
      "職員の待遇改善や採用・定着と関係する加算です。",

    type: "加算",

    regions: ["全国"],

    themes: [
      "採用・人材",
      "収益・運営",
    ],

    problemTags: [
      "人が足りない",
      "採用が難しい",
      "収支・加算を整理したい",
    ],

    publishedAt: "2026-05-24",

    updatedAt: "2026-05-24",

    keywordExplanation:
      "介護職員の賃金改善や職場環境改善を目的とした加算です。",

    deepExplanation: [],

    examples: [],

    situations: [],

    forWhom:
      "採用・定着・職員満足を改善したい事業所向けです。",

    whatCanHappen:
      "要件を満たすことで加算対象になる可能性があります。",

    policyIntent:
      "介護人材不足への対応です。",

    firstStep: [
      "現在の算定状況確認",
      "配分ルール確認",
      "要件確認",
    ],

    checkPoints: [
      "算定要件",
      "報告義務",
      "配分方法",
    ],

    caution:
      "算定後の運用ルールがあります。",

    sourceName:
      "厚生労働省",

    sourceUrl:
      "https://www.mhlw.go.jp/",
  },

  {
    id: "fukuoka-care-support",

    title: "福岡県介護人材確保支援",

    plainSummary:
      "採用や定着、職場環境改善に関係する支援です。",

    type: "補助金",

    regions: [
      "福岡県",
      "福岡市",
      "北九州市",
    ],

    themes: [
      "採用・人材",
      "業務負担",
    ],

    problemTags: [
      "人が足りない",
      "採用が難しい",
    ],

    publishedAt: "2026-05-24",

    updatedAt: "2026-05-24",

    keywordExplanation:
      "介護人材確保や職場環境改善を支援する制度です。",

    deepExplanation: [],

    examples: [],

    situations: [],

    forWhom:
      "採用や人材定着に課題がある事業所向けです。",

    whatCanHappen:
      "研修や採用支援対象になる可能性があります。",

    policyIntent:
      "地域介護提供体制維持です。",

    firstStep: [
      "採用課題整理",
      "対象確認",
      "自治体情報確認",
    ],

    checkPoints: [
      "対象地域",
      "対象事業所",
      "申請時期",
    ],

    caution:
      "年度更新があります。",

    sourceName:
      "福岡県",

    sourceUrl:
      "https://www.pref.fukuoka.lg.jp/",
  },
];