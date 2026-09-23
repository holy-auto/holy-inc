import SeoHead from "../../components/base/SeoHead";
import { buildBreadcrumbJsonLd } from "@/utils/seo";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/organization";
import HeroSection from "./components/HeroSection";
import NewsSection from "./components/NewsSection";
import ServicesOverview from "./components/ServicesOverview";
import MVVSection from "./components/MVVSection";
import BrandSection from "./components/BrandSection";
import AboutPreview from "./components/AboutPreview";
import ContactSection from "./components/ContactSection";

const baseUrl = import.meta.env.VITE_SITE_URL || "https://www.holy-inc.jp";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SeoHead
        title="株式会社HOLY | 職人の技術を、次へつなぐ - 自動車コーティング・出張洗車・ブロックチェーン証明"
        description="株式会社HOLYは、自動車コーティング・フィルム施工・出張洗車・ブロックチェーン車両証明システムLedraを展開。職人の技術を次世代へ継承し、自動車業界に新たな価値基準を創造します。"
        keywords="HOLY, Ledra, MobileWash, 自動車コーティング, 出張洗車, ブロックチェーン, 車両証明, 職人, 技術継承"
        ogType="website"
        structuredData={[
          buildWebSiteJsonLd(baseUrl),
          buildBreadcrumbJsonLd(baseUrl, [{ name: "ホーム", path: "/" }]),
          buildOrganizationJsonLd(baseUrl),
        ]}
      />
      <main>
        <HeroSection />
        <MVVSection />
        <NewsSection />
        <ServicesOverview />
        <BrandSection />
        <AboutPreview />
        <ContactSection />
      </main>
    </div>
  );
}