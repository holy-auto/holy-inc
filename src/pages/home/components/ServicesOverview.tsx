import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { BrandId } from "@/lib/sites";
import { brandDisplayNames, brandPagePaths, officialSites } from "@/lib/sites";

const services: {
  id: BrandId;
  icon: string;
  keywordsKey: string;
  color: string;
  taglineKey: string;
}[] = [
  {
    id: "holyauto",
    icon: "ri-car-line",
    keywordsKey: "servicesOverview.holyautoKeywords",
    color: "#78716c",
    taglineKey: "brandData.holyauto.tagline",
  },
  {
    id: "mobilewash",
    icon: "ri-drop-line",
    keywordsKey: "servicesOverview.mobilewashKeywords",
    color: "#5560e3",
    taglineKey: "brandData.mobilewash.tagline",
  },
  {
    id: "ledra",
    icon: "ri-shield-check-line",
    keywordsKey: "servicesOverview.ledraKeywords",
    color: "#c05621",
    taglineKey: "brandData.ledra.tagline",
  },
];

const ServicesOverview: FC = () => {
  const { t } = useTranslation("common");

  return (
    <section className="w-full py-16 md:py-20">
      <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-accent-teal text-xs tracking-[0.3em] uppercase mb-3">
            {t("servicesOverview.sectionLabel")}
          </p>
          <h2 className="text-slate-900 text-2xl md:text-3xl font-bold tracking-wide mb-4">
            {t("servicesOverview.sectionTitle")}
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-teal/60 to-transparent mx-auto" />
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {services.map((svc) => {
            const keywords = t(svc.keywordsKey, { returnObjects: true }) as string[];
            return (
              <div
                key={svc.id}
                className="group flex flex-col neu-card rounded-[22px] p-6 md:p-8"
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-5">
                    <i
                      className={`${svc.icon} text-3xl`}
                      style={{ color: svc.color }}
                    />
                  </div>

                  {/* Brand Name */}
                  <h3 className="text-slate-900 text-xl font-bold mb-2 tracking-wide">
                    {brandDisplayNames[svc.id]}
                  </h3>

                  {/* Tagline */}
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {t(svc.taglineKey)}
                  </p>

                  {/* Keywords */}
                  <p className="text-slate-500 text-xs mb-6">
                    {keywords.join(" ・ ")}
                  </p>

                  {/* CTA: サイト内の紹介ページ ＋ ブランド公式サイト */}
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
                    <a
                      href={brandPagePaths[svc.id]}
                      className="inline-flex items-center gap-1.5 hover:underline"
                      style={{ color: svc.color }}
                    >
                      <span>{t("ui.viewDetails")}</span>
                      <span className="w-4 h-4 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
                        <i className="ri-arrow-right-line" />
                      </span>
                    </a>
                    <a
                      href={officialSites[svc.id]}
                      target="_blank"
                      rel="noopener"
                      aria-label={t("footer.officialSiteAria", { brand: brandDisplayNames[svc.id] })}
                      className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      <span>{t("ui.officialSite")}</span>
                      <span className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-external-link-line" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom connector + CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-slate-200" />
            {t("brandsSection.subtitle")}
            <span className="w-8 h-px bg-slate-200" />
          </p>

          {/* Collaboration CTA */}
          <div className="max-w-lg mx-auto">
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              {t("servicesOverview.collaborationCtaDesc")}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 neu-btn neu-btn-primary text-sm font-medium px-6 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap"
            >
              {t("servicesOverview.collaborationCta")}
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;