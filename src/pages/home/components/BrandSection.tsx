import type { FC } from "react";
import { useTranslation } from "react-i18next";
import CraftCanvas, { type CraftVariant } from "../../../components/base/CraftCanvas";

const BrandSection: FC = () => {
  const { t } = useTranslation("common");

  const brands = [
    {
      id: "ledra",
      name: "Ledra",
      tagline: t("brandData.ledra.tagline"),
      description: t("brandData.ledra.description"),
      features: [t("brandData.ledra.features.0"), t("brandData.ledra.features.1"), t("brandData.ledra.features.2")],
      strokeColor: "#c05621",
      statValue: "∞",
      statLabel: "保存期間",
      kanji: "証",
      variant: "grid" as CraftVariant,
    },
    {
      id: "mobilewash",
      name: "MobileWash",
      tagline: t("brandData.mobilewash.tagline"),
      description: t("brandData.mobilewash.description"),
      features: [t("brandData.mobilewash.features.0"), t("brandData.mobilewash.features.1"), t("brandData.mobilewash.features.2")],
      strokeColor: "#5560e3",
      statValue: "即日",
      statLabel: "最短施工",
      kanji: "洗",
      variant: "ripple" as CraftVariant,
    },
    {
      id: "holy-auto",
      name: "HOLY AUTO",
      tagline: t("brandData.holyauto.tagline"),
      description: t("brandData.holyauto.description"),
      features: [t("brandData.holyauto.features.0"), t("brandData.holyauto.features.1"), t("brandData.holyauto.features.2")],
      strokeColor: "#3b45b3",
      statValue: "3年〜",
      statLabel: "保証期間",
      kanji: "匠",
      variant: "sheen" as CraftVariant,
    },
  ];

  const flowSteps = [
    {
      step: "01",
      title: t("brandsSection.flowStep1"),
      desc: t("brandsSection.flowStep1Desc"),
      icon: "ri-tools-line",
      color: "#3b45b3",
    },
    {
      step: "02",
      title: t("brandsSection.flowStep2"),
      desc: t("brandsSection.flowStep2Desc"),
      icon: "ri-shield-check-line",
      color: "#c05621",
    },
    {
      step: "03",
      title: t("brandsSection.flowStep3"),
      desc: t("brandsSection.flowStep3Desc"),
      icon: "ri-drop-line",
      color: "#5560e3",
    },
  ];

  const impactStats = t("brandsSection.impact", { returnObjects: true }) as Array<{ value: string; label: string }>;

  return (
    <section id="brands" className="w-full py-20 md:py-28">
      <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-accent-teal text-xs tracking-[0.3em] uppercase mb-3">{t("section.brands")}</p>
          <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-wide mb-4">
            {t("nav.brands")}
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {t("brandsSection.subtitle")}
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-teal/60 to-transparent mx-auto mt-6" />
        </div>

        {/* Impact Metrics Row */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-14 md:mb-20">
          <p className="text-center text-accent-teal text-xs tracking-[0.3em] uppercase mb-0 col-span-3">
            {t("brandsSection.impactTitle")}
          </p>
          <div className="col-span-3 grid grid-cols-3 gap-4 md:gap-8">
            {impactStats.map((stat, i) => (
              <div key={i} className="text-center p-4 md:p-6 neu-card rounded-[20px]">
                <p className="text-slate-900 text-2xl md:text-3xl font-bold mb-1 tracking-tight">{stat.value}</p>
                <p className="text-slate-500 text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration Flow */}
        <div className="mb-16 md:mb-24">
          <p className="text-center text-accent-teal text-xs tracking-[0.3em] uppercase mb-10">
            {t("brandsSection.flowLabel")}
          </p>

          {/* Flow Pipeline */}
          <div className="relative max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-0">
              {flowSteps.map((step, i) => (
                <div key={i} className="flex-1 flex flex-col lg:flex-col items-center text-center relative">
                  {/* Step number */}
                  <div className="relative z-10 mb-4 flex items-center gap-2">
                    <i className={`${step.icon} text-2xl`} style={{ color: step.color }} />
                    <span className="font-serif font-medium text-3xl tracking-wider" style={{ color: step.color }}>
                      {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <h4 className="text-slate-900 font-bold text-base md:text-lg mb-2 whitespace-nowrap">{step.title}</h4>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-[240px] mx-auto">{step.desc}</p>

                  {/* Arrow between steps — mobile */}
                  {i < flowSteps.length - 1 && (
                    <div className="lg:hidden flex justify-center py-2">
                      <span className="w-6 h-6 flex items-center justify-center">
                        <i className="ri-arrow-down-line text-slate-300" />
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Flow CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm mb-4 max-w-md mx-auto leading-relaxed">
              {t("brandsSection.flowCtaDesc")}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 neu-btn neu-btn-primary text-sm font-medium px-6 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap"
            >
              {t("brandsSection.flowCta")}
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line" />
              </span>
            </a>
          </div>
        </div>

        {/* Brand Cards */}
        <div className="space-y-0">
          {brands.map((brand, index) => {
            const isLast = index === brands.length - 1;

            return (
              <div key={brand.id}>
                <div
                  className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-center`}
                >
                  {/* Brand visual */}
                  <div className="w-full lg:w-1/2 rounded-lg overflow-hidden">
                    <CraftCanvas
                      variant={brand.variant}
                      kanji={brand.kanji}
                      eyebrow={brand.name}
                      title={brand.tagline}
                      className="aspect-[3/2] w-full"
                    />
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <div className="flex items-baseline gap-3 mb-3">
                      <h3 className="text-slate-900 text-2xl md:text-3xl font-bold">{brand.name}</h3>
                      {brand.id === "ledra" && (
                        <span className="text-accent-teal text-xs font-medium tracking-wide">{t("brandsSection.newBadge")}</span>
                      )}
                      <span className="ml-auto text-right shrink-0">
                        <span className="block text-accent-teal font-bold text-lg leading-tight">{brand.statValue}</span>
                        <span className="block text-slate-400 text-[10px] leading-tight">{brand.statLabel}</span>
                      </span>
                    </div>
                    <p className="text-accent-teal text-sm font-medium mb-4 tracking-wide">{brand.tagline}</p>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">{brand.description}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-8">
                      {brand.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-500 text-sm">
                          <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                            <i className="ri-check-line text-accent-teal text-sm" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href={`/${brand.id}`}
                      className="inline-flex items-center gap-2 text-slate-700 hover:text-accent-teal text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                    >
                      {t("ui.viewDetails")}
                      <span className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-arrow-right-line" />
                      </span>
                    </a>
                  </div>
                </div>

                {/* Connector between cards */}
                {!isLast && (
                  <div className="flex justify-center my-6 md:my-8">
                    <svg width="2" height="48" viewBox="0 0 2 48" fill="none" className="hidden lg:block">
                      <line
                        x1="1" y1="0" x2="1" y2="48"
                        stroke={brand.strokeColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="1" cy="48" r="3" fill={brand.strokeColor} />
                    </svg>
                    <div className="lg:hidden flex flex-col items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Ecosystem Synergy Section */}
        <div className="mt-20 md:mt-28">
          <div className="text-center mb-10">
            <p className="text-accent-teal text-xs tracking-[0.3em] uppercase mb-3">Ecosystem</p>
            <h3 className="text-slate-900 text-2xl md:text-3xl font-bold mb-4">
              {t("brandsSection.ecosystemTitle")}
            </h3>
            <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
              {t("brandsSection.ecosystemDesc")}
            </p>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-teal/60 to-transparent mx-auto mt-6" />
          </div>

          {/* Ecosystem visual */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2">
              {/* Step 1 — HOLY AUTO */}
              <div className="flex-1 w-full neu-card rounded-[20px] p-6 md:p-8 text-center">
                <i className="ri-tools-line text-2xl mb-3" style={{ color: "#3b45b3" }} />
                <p className="text-slate-900 font-bold text-sm mb-1">{brands[2].name}</p>
                <p className="text-slate-500 text-xs">{t("brandsSection.ecosystemStep1")}</p>
              </div>

              <i className="ri-arrow-right-s-line md:block hidden text-accent-teal/50 text-3xl" />
              <i className="ri-arrow-down-s-line md:hidden text-accent-teal/50 text-3xl" />

              {/* Step 2 — Ledra */}
              <div className="flex-1 w-full neu-card rounded-[20px] p-6 md:p-8 text-center">
                <i className="ri-shield-check-line text-2xl mb-3" style={{ color: "#c05621" }} />
                <p className="text-slate-900 font-bold text-sm mb-1">{brands[0].name}</p>
                <p className="text-slate-500 text-xs">{t("brandsSection.ecosystemStep2")}</p>
              </div>

              <i className="ri-arrow-right-s-line md:block hidden text-accent-teal/50 text-3xl" />
              <i className="ri-arrow-down-s-line md:hidden text-accent-teal/50 text-3xl" />

              {/* Step 3 — MobileWash */}
              <div className="flex-1 w-full neu-card rounded-[20px] p-6 md:p-8 text-center">
                <i className="ri-drop-line text-2xl mb-3" style={{ color: "#5560e3" }} />
                <p className="text-slate-900 font-bold text-sm mb-1">{brands[1].name}</p>
                <p className="text-slate-500 text-xs">{t("brandsSection.ecosystemStep3")}</p>
              </div>
            </div>

            <p className="text-center mt-10 text-slate-400 text-xs tracking-wider">
              施工 → 記録 → メンテナンス → 施工 ...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;