/**
 * 各事業ブランドの公式サイト（相互リンクの単一定義源）。
 * ドメインを差し替えるときはここだけを直す。
 *
 * URL の出典:
 * - Ledra:      Ledra リポジトリ src/lib/marketing/config.ts の siteConfig.siteUrl
 *               （「canonical は www に統一」とコメント有り）
 * - MobileWash: MobileWash リポジトリ index.html の <link rel="canonical">
 * - HOLY AUTO:  従来からこのサイトが掲載しているURL。canonical の宣言は未確認
 *               （www 付きへ寄せているかは【要確認】）。
 */
export const officialSites = {
  ledra: 'https://www.ledra.co.jp',
  mobilewash: 'https://mobilewash.app',
  holyauto: 'https://holy-auto.com',
} as const;

export type BrandId = keyof typeof officialSites;

/**
 * 公式SNS。フッターのアイコンと Organization JSON-LD の sameAs から参照する。
 * 出典: Ledra リポジトリ src/lib/marketing/config.ts の twitterHandle（@detailing_holy）。
 */
export const socialLinks = {
  x: 'https://x.com/detailing_holy',
} as const;

/** サイト内のブランド紹介ページ。Footer / Navbar / ブランド間ナビで共有する。 */
export const brandPagePaths: Record<BrandId, string> = {
  ledra: '/ledra',
  mobilewash: '/mobilewash',
  holyauto: '/holy-auto',
};

export const brandDisplayNames: Record<BrandId, string> = {
  ledra: 'Ledra',
  mobilewash: 'MobileWash',
  holyauto: 'HOLY AUTO',
};
