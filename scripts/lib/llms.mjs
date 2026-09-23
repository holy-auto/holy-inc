/**
 * llms.txt / llms-full.txt の組み立て（https://llmstxt.org/ の書式）。
 *
 * `scripts/prerender.mjs` が out/ に書き出し、`scripts/check-links.mjs` が
 * 中身を検査する。以前は public/llms.txt を手で書いていたが、お知らせを
 * 足しても沿革やリンクが追従しなかったので生成に切り替えた。
 *
 * 事実の出典:
 * - 会社概要 … src/mocks/company.ts（companyInfo）
 * - 理念 …… i18n の mvv / valuesData
 * - 公式サイト … src/lib/sites.ts
 * - 沿革・お知らせ … src/content/news/*.md
 *
 * ブランドの一行説明だけはここに書く。サイト上の宣伝文句（店舗数や対応エリア等）
 * は AI にそのまま引用されるので、事実として言い切れる範囲に抑えてある。
 * 事業内容が変わったらここを直す。
 */

const BRAND_SUMMARIES = {
  holyauto: "自動車カスタム・コーティング・フィルム施工・技術講習。",
  ledra: "自動車整備・コーティング店向けの施工履歴プラットフォーム。",
  mobilewash: "出張洗車・出張コーティング（2026年Q3 正式ローンチ予定）。",
};
const BRAND_ORDER = ["holyauto", "ledra", "mobilewash"];

/** 生成対象のページ。順番がそのまま Links の並びになる。 */
export const LLMS_PAGES = [
  { path: "/", label: "トップページ" },
  { path: "/about", label: "会社概要" },
  { path: "/ledra", label: "Ledra" },
  { path: "/mobilewash", label: "MobileWash" },
  { path: "/holy-auto", label: "HOLY AUTO" },
  { path: "/news", label: "お知らせ" },
  { path: "/careers", label: "採用情報" },
  { path: "/contact", label: "お問い合わせ" },
];

const yearMonth = (date) => `${date.slice(0, 4)}年${Number(date.slice(5, 7))}月`;

/**
 * @param {object} p
 * @param {string} p.origin
 * @param {object} p.companyInfo
 * @param {Record<string,string>} p.officialSites
 * @param {Record<string,string>} p.brandDisplayNames
 * @param {object} p.ja i18n（ja/common.ts の default）
 * @param {Array<{slug:string,date:string,category:string,title:string,body:string[]}>} p.news 新しい順
 * @returns {{ llms: string, llmsFull: string }}
 */
export function buildLlmsTxt({ origin, companyInfo, officialSites, brandDisplayNames, ja, news }) {
  const values = Object.values(ja.valuesData);
  const articles = news.filter((n) => n.body.length > 0);
  const oldestFirst = [...news].reverse();

  const head = [
    `# ${companyInfo.name}`,
    "",
    `> ${ja.mvv.missionText}自動車の施工・記録・カーケアを手がける会社です。`,
    "",
    `${companyInfo.name} は、自動車の現場技術を「証明できる資産」に変えることを目指す会社です。`,
    `コーティング・フィルム施工の現場（HOLY AUTO）、施工履歴のプラットフォーム（Ledra）、`,
    `出張洗車（MobileWash）の3つの事業を運営しています。`,
    "",
    "## 会社概要",
    "",
    `- 商号: ${companyInfo.name}（HOLY Inc.）`,
    `- 設立: ${companyInfo.founded}`,
    `- 資本金: ${companyInfo.capital}`,
    `- 代表者: ${companyInfo.representative}`,
    `- 従業員: ${companyInfo.employees}`,
    `- 所在地: 〒${companyInfo.postalCode} ${companyInfo.address}`,
    `- アクセス: ${companyInfo.access}`,
    `- 電話: ${companyInfo.tel}`,
    `- メール: ${companyInfo.email}`,
    "",
    "## 企業理念",
    "",
    `- Mission: ${ja.mvv.missionText}`,
    `- Vision: ${ja.mvv.visionText}`,
    `- Values: ${values.map((v) => `${v.title}（${v.subtitle}）`).join("／")}`,
    "",
    "## 事業ブランド",
    "",
    ...BRAND_ORDER.map(
      (id) => `- ${brandDisplayNames[id]} — ${BRAND_SUMMARIES[id]}公式サイト: ${officialSites[id]}`,
    ),
    "",
    "## 沿革",
    "",
    // 見出しは「〜しました。」で終わる規約なので、年表向けに体言止めにする
    ...oldestFirst.map((n) => `- ${yearMonth(n.date)} ${n.title.replace(/しました。$/, "")}`),
    "",
  ];

  const links = [
    "## Links",
    "",
    ...LLMS_PAGES.map((p) => `- [${p.label}](${origin}${p.path === "/" ? "/" : p.path})`),
    `- [お知らせ RSS](${origin}/feed.xml)`,
    `- [全文版（llms-full.txt）](${origin}/llms-full.txt)`,
    "",
  ];

  const articleLinks =
    articles.length === 0
      ? []
      : [
          "## お知らせ記事",
          "",
          ...articles.map((n) => `- [${n.title}](${origin}/news/${n.slug}): ${n.date}｜${n.category}`),
          "",
        ];

  const llms = [...head, ...articleLinks, ...links].join("\n");

  const full = [
    ...head,
    "## 価値観の詳細",
    "",
    ...values.map((v) => `- ${v.title}（${v.subtitle}）: ${v.description}`),
    "",
    "## お知らせ全文",
    "",
    ...articles.flatMap((n) => [
      `### ${n.title}`,
      "",
      `- 日付: ${n.date}`,
      `- 分類: ${n.category}`,
      `- URL: ${origin}/news/${n.slug}`,
      "",
      ...n.body.flatMap((para) => [para, ""]),
    ]),
    ...links,
  ].join("\n");

  return { llms, llmsFull: full };
}
