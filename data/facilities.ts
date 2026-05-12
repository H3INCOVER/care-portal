export type Facility = {
  name: string;
  slug: string;
  area: string;
  type: string;
  icon: string;
  color: "green" | "blue" | "amber" | "purple";
  desc: string;
  tags: string[];

  address: string;
  tel: string;
  hours: string;
  company: string;
  officeNumber: string;
  serviceArea: string;
};

export const facilities: Facility[] = [
  {
    name: "ケアプラン福岡",
    slug: "careplan-fukuoka",
    area: "福岡市中央区",
    type: "居宅介護支援",
    icon: "📝",
    color: "amber",
    desc: "介護保険サービスの利用計画づくりをサポートします。",
    tags: ["ケアプラン", "相談支援", "介護保険"],

    address: "福岡県福岡市中央区〇〇",
    tel: "092-000-0000",
    hours: "平日 9:00〜18:00",
    company: "株式会社サンプルケア",
    officeNumber: "4070000000",
    serviceArea: "福岡市中央区周辺",
  },
  {
    name: "ひまわり訪問看護",
    slug: "himawari-nurse",
    area: "福岡市博多区",
    type: "訪問看護",
    icon: "🩺",
    color: "purple",
    desc: "医療と連携した在宅ケアを提供する訪問看護ステーションです。",
    tags: ["在宅ケア", "医療連携", "訪問看護"],

    address: "福岡県福岡市博多区〇〇",
    tel: "092-111-1111",
    hours: "平日 9:00〜18:00",
    company: "株式会社ひまわりケア",
    officeNumber: "4060000000",
    serviceArea: "福岡市博多区周辺",
  },
  {
    name: "さくら訪問介護ステーション",
    slug: "sakura",
    area: "福岡市南区",
    type: "訪問介護",
    icon: "🏠",
    color: "green",
    desc: "ご自宅での生活を支える、地域密着型の訪問介護事業所です。",
    tags: ["生活援助", "身体介護", "相談可"],

    address: "福岡県福岡市南区〇〇",
    tel: "092-222-2222",
    hours: "平日 9:00〜18:00",
    company: "株式会社さくらケア",
    officeNumber: "4070000001",
    serviceArea: "福岡市南区周辺",
  },
  {
    name: "みなみデイサービス",
    slug: "minami-day",
    area: "福岡市南区",
    type: "デイサービス",
    icon: "☀️",
    color: "blue",
    desc: "日中の活動・交流・入浴などを支援する通所介護サービスです。",
    tags: ["日中活動", "交流", "入浴支援"],

    address: "福岡県福岡市南区〇〇",
    tel: "092-333-3333",
    hours: "平日 8:30〜17:30",
    company: "株式会社みなみケア",
    officeNumber: "4070000002",
    serviceArea: "福岡市南区周辺",
  },
];