/**
 * 会社（Organization）と WebSite の JSON-LD。トップページで使う。
 *
 * React 側（`src/pages/home/page.tsx`）とプリレンダ（`scripts/prerender.mjs`）の
 * 両方がこれを使う。JS を実行しない AI クローラーにもトップの会社情報が
 * 見えるよう、静的HTMLにも同じものを埋め込むため。
 *
 * Node（jiti）からも読むので `@/` エイリアスや `import.meta.env` を使わない。
 */
import { officialSites, socialLinks } from "./sites";
import { companyInfo } from "../mocks/company";

export function buildWebSiteJsonLd(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "株式会社HOLY",
    url: baseUrl,
    description: "職人の技術を、次へつなぐ。自動車コーティング・出張洗車・ブロックチェーン証明インフラ。",
  };
}

export function buildOrganizationJsonLd(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "株式会社HOLY",
    alternateName: "HOLY Inc.",
    url: baseUrl,
    logo: `${baseUrl}/favicon-512.png`,
    description: "自動車コーティング・出張洗車・ブロックチェーン証明インフラを展開。職人の技術を次世代へ継承する企業。",
    foundingDate: "2024-11-12",
    // 各事業ブランドの公式サイトを同一事業者のものとして明示（相互リンクの機械可読版）
    sameAs: [officialSites.ledra, officialSites.mobilewash, officialSites.holyauto, socialLinks.x],
    subOrganization: [
      { "@type": "Organization", name: "Ledra", url: officialSites.ledra },
      { "@type": "Organization", name: "MobileWash", url: officialSites.mobilewash },
      { "@type": "Organization", name: "HOLY AUTO", url: officialSites.holyauto },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "北青山1-3-1 アールキューブ青山3F",
      addressLocality: "港区",
      addressRegion: "東京都",
      postalCode: companyInfo.postalCode,
      addressCountry: "JP",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+81-3-4363-3234",
      contactType: "customer service",
      availableLanguage: ["ja", "en"],
      hoursAvailable: "Mo-Fr 09:00-18:00",
    },
    areaServed: {
      "@type": "Place",
      name: "東京都港区",
      geo: {
        "@type": "GeoCoordinates",
        latitude: companyInfo.geo.latitude,
        longitude: companyInfo.geo.longitude,
      },
    },
  };
}
