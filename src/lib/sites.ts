/**
 * 各事業ブランドの公式サイト（相互リンクの単一定義源）。
 * ドメインを差し替えるときはここだけを直す。
 *
 * URL は各サイトが自ら宣言している canonical に合わせている:
 * - Ledra:      src/lib/marketing/config.ts の siteConfig.siteUrl（www 付き）
 * - MobileWash: index.html の <link rel="canonical">（mobilewash.app）
 */
export const officialSites = {
  ledra: 'https://www.ledra.co.jp',
  mobilewash: 'https://mobilewash.app',
  holyauto: 'https://holy-auto.com',
} as const;

export type BrandId = keyof typeof officialSites;

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
