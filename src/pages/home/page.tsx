import SeoHead from "../../components/base/SeoHead";
import { buildBreadcrumbJsonLd } from "@/utils/seo";
import HeroSection from "./components/HeroSection";
import ServicesOverview from "./components/ServicesOverview";
import MVVSection from "./components/MVVSection";
import BrandSection from "./components/BrandSection";
import AboutPreview from "./components/AboutPreview";
import ContactSection from "./components/ContactSection";

const baseUrl = import.meta.env.VITE_SITE_URL || "https://holy-inc.jp";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SeoHead
        title="株式会社HOLY | 職人の技術を、次へつなぐ - 自動車コーティング・出張洗車・ブロックチェーン証明"
        description="株式会社HOLYは、自動車コーティング・フィルム施工・出張洗車・ブロックチェーン車両証明システムLedraを展開。職人の技術を次世代へ継承し、自動車業界に新たな価値基準を創造します。"
        keywords="HOLY, Ledra, MobileWash, 自動車コーティング, 出張洗車, ブロックチェーン, 車両証明, 職人, 技術継承"
        ogType="website"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "株式会社HOLY",
            url: baseUrl,
            description: "職人の技術を、次へつなぐ。自動車コーティング・出張洗車・ブロックチェーン証明インフラ。",
          },
          buildBreadcrumbJsonLd(baseUrl, [{ name: "ホーム", path: "/" }]),
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "株式会社HOLY",
            alternateName: "HOLY Inc.",
            url: baseUrl,
            logo: `${baseUrl}/favicon-512.png`,
            description: "自動車コーティング・出張洗車・ブロックチェーン証明インフラを展開。職人の技術を次世代へ継承する企業。",
            foundingDate: "2024-11-12",
            sameAs: [
              baseUrl,
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "北青山1-3-1 アールキューブ青山3F",
              addressLocality: "港区",
              addressRegion: "東京都",
              postalCode: "107-0061",
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
                latitude: "35.6726",
                longitude: "139.7148",
              },
            },
          },
        ]}
      />
      <main>
        <HeroSection />
        <ServicesOverview />
        <MVVSection />
        <BrandSection />
        <AboutPreview />
        <ContactSection />
      </main>
    </div>
  );
}