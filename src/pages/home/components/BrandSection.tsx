import type { FC } from "react";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const BrandSection: FC = () => {
  const { t } = useTranslation("common");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    },
    {
      id: "mobilewash",
      name: "MobileWash",
      tagline: t("brandData.mobilewash.tagline"),
      description: t("brandData.mobilewash.description"),
      features: [t("brandData.mobilewash.features.0"), t("brandData.mobilewash.features.1"), t("brandData.mobilewash.features.2")],
      strokeColor: "#d97706",
      statValue: "即日",
      statLabel: "最短施工",
    },
    {
      id: "holy-auto",
      name: "HOLY AUTO",
      tagline: t("brandData.holyauto.tagline"),
      description: t("brandData.holyauto.description"),
      features: [t("brandData.holyauto.features.0"), t("brandData.holyauto.features.1"), t("brandData.holyauto.features.2")],
      strokeColor: "#92400e",
      statValue: "3年〜",
      statLabel: "保証期間",
    },
  ];

  const flowSteps = [
    {
      step: "01",
      title: t("brandsSection.flowStep1"),
      desc: t("brandsSection.flowStep1Desc"),
      icon: "ri-tools-line",
      color: "#92400e",
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
      color: "#d97706",
    },
  ];

  const impactStats = t("brandsSection.impact", { returnObjects: true }) as Array<{ value: string; label: string }>;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="brands" ref={sectionRef} className="w-full py-20 md:py-28 bg-white">
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
        <div
          className={`grid grid-cols-3 gap-4 md:gap-8 mb-14 md:mb-20 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <p className="text-center text-accent-teal text-xs tracking-[0.3em] uppercase mb-0 col-span-3">
            {t("brandsSection.impactTitle")}
          </p>
          <div className="col-span-3 grid grid-cols-3 gap-4 md:gap-8">
            {impactStats.map((stat, i) => (
              <div key={i} className="text-center p-4 md:p-6 bg-slate-50 rounded-lg">
                <p className="text-slate-900 text-2xl md:text-3xl font-bold mb-1 tracking-tight">{stat.value}</p>
                <p className="text-slate-500 text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration Flow — Redesigned */}
        <div
          className={`mb-16 md:mb-24 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
          }`}
          style={{ transitionDelay: "250ms" }}
        >
          <p className="text-center text-accent-teal text-xs tracking-[0.3em] uppercase mb-10">
            {t("brandsSection.flowLabel")}
          </p>

          {/* Flow Pipeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line — desktop */}
            <div className="hidden lg:block absolute top-[44px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-slate-200" />

            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-0">
              {flowSteps.map((step, i) => (
                <div key={i} className="flex-1 flex flex-col lg:flex-col items-center text-center relative">
                  {/* Step circle */}
                  <div className="relative z-10 mb-4">
                    <div
                      className="w-[88px] h-[88px] rounded-full flex items-center justify-center text-white font-bold text-2xl tracking-wider"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.step}
                    </div>
                    {/* Icon badge */}
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                      <span className="w-4 h-4 flex items-center justify-center">
                        <i className={`${step.icon} text-sm`} style={{ color: step.color }} />
                      </span>
                    </div>
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
              className="inline-flex items-center gap-2 bg-accent-teal hover:bg-accent-teal/90 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap"
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
            const cardDelay = 300 + index * 200;

            return (
              <div key={brand.id}>
                <div
                  className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-center transition-all duration-700 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
                  }`}
                  style={{ transitionDelay: `${cardDelay}ms` }}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2 border-glow rounded-lg relative group overflow-hidden">
                    <img
                      src={brand.id === "ledra"
                        ? "https://readdy.ai/api/search-image?query=A%20professional%20automotive%20certification%20specialist%20in%20a%20crisp%20white%20lab%20coat%20carefully%20examining%20the%20driver-side%20door%20panel%20of%20a%20midnight-blue%20luxury%20sedan%20with%20a%20handheld%20digital%20paint%20thickness%20gauge%2C%20a%20large%20wall-mounted%20curved%20display%20behind%20him%20showing%20a%20detailed%20vehicle%20history%20timeline%20with%20blockchain%20verification%20stamps%20and%20maintenance%20records%20flowing%20vertically%2C%20the%20car%20positioned%20on%20a%20rotating%20inspection%20platform%20with%20soft%20neutral%20gray%20studio%20lighting%20from%20above%2C%20premium%20Japanese%20inspection%20facility%20with%20clean%20minimalist%20white%20walls%20and%20subtle%20ambient%20teal%20LED%20strips%20along%20the%20baseboards%2C%20organized%20diagnostic%20tablets%20and%20certification%20documents%20arranged%20on%20a%20sleek%20white%20console%20nearby%2C%20professional%20documentary%20photography%20style%20capturing%20the%20precise%20moment%20of%20quality%20verification%2C%208K%20ultra%20detailed%2C%20soft%20diffused%20lighting%2C%20warm%20and%20trustworthy%20atmosphere%20with%20clinical%20precision%2C%20no%20text&width=900&height=600&seq=holy-brand-ledra-pro-009&orientation=landscape"
                        : brand.id === "mobilewash"
                        ? "https://storage.readdy-site.link/project_files/234865a6-4360-473d-8e75-b35b617c3eae/6110ece4-0008-4a23-bce7-f90d29b87cce_ChatGPT-Image-2026513-22_11_05.png?v=c2ec3fcf89ff9f0fcd8e1209fc8bd37f"
                        : "https://readdy.ai/api/search-image?query=Inside%20a%20meticulously%20organized%20Japanese%20automotive%20coating%20studio%2C%20a%20master%20craftsman%20wearing%20a%20fitted%20dark%20work%20apron%20and%20protective%20head%20covering%20is%20applying%20a%20final%20layer%20of%20ceramic%20sealant%20to%20the%20rear%20quarter%20panel%20of%20a%20candy-apple%20red%20premium%20coupe%20using%20a%20premium%20suede%20applicator%20block%2C%20dramatic%20side-lighting%20from%20a%20row%20of%20high-CRI%20LED%20strips%20mounted%20on%20a%20polished%20aluminum%20rail%20system%20reveals%20the%20wet%20coatings%20mirror-like%20liquid%20depth%20as%20it%20flows%20across%20the%20flawless%20paint%20surface%2C%20the%20background%20shows%20a%20complete%20coating%20workflow%20station%20with%20precisely%20labeled%20bottles%20of%20prep%20compounds%2C%20clay%20bars%2C%20and%20finishing%20polishes%20arranged%20on%20a%20carbon-fiber%20workbench%2C%20a%20professional%20dust-extraction%20system%20with%20flexible%20hose%20arms%20suspended%20from%20the%20ceiling%2C%20polished%20charcoal-gray%20concrete%20floor%20reflecting%20the%20warm%20amber%20workshop%20lights%2C%20professional%20documentary%20photography%20capturing%20the%20artisans%20concentrated%20expression%20and%20precise%20hand%20movement%2C%208K%20ultra%20detailed%2C%20cinematic%20workshop%20lighting%20with%20warm%20amber%20and%20cool%20neutral%20tones%2C%20dedicated%20craftsmanship%20atmosphere%2C%20no%20text&width=900&height=600&seq=holy-brand-auto-pro-009&orientation=landscape"
                      }
                      alt={brand.name}
                      className="w-full aspect-[3/2] object-cover rounded-lg"
                      loading="lazy"
                      width="900"
                      height="600"
                      decoding="async"
                    />
                    {/* Stat badge overlay */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-slate-100 text-center">
                      <p className="text-slate-900 font-bold text-lg leading-tight">{brand.statValue}</p>
                      <p className="text-slate-500 text-[10px] leading-tight">{brand.statLabel}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-slate-900 text-2xl md:text-3xl font-bold">{brand.name}</h3>
                      {brand.id === "ledra" && (
                        <span className="px-2 py-0.5 bg-accent-teal/10 text-accent-teal text-xs rounded-full font-medium whitespace-nowrap">{t("brandsSection.newBadge")}</span>
                      )}
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
                  <div
                    className={`flex justify-center my-6 md:my-8 transition-opacity duration-500 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${cardDelay + 150}ms` }}
                  >
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
        <div
          className={`mt-20 md:mt-28 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
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
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-0">
              {/* Step 1 — HOLY AUTO */}
              <div className="flex-1 bg-slate-50 rounded-lg p-6 md:p-8 text-center relative">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(146, 64, 14, 0.12)" }}>
                  <span className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-tools-line text-lg" style={{ color: "#92400e" }} />
                  </span>
                </div>
                <p className="text-slate-900 font-bold text-sm mb-1">{brands[2].name}</p>
                <p className="text-slate-500 text-xs">{t("brandsSection.ecosystemStep1")}</p>
                {/* Arrow — desktop right */}
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-accent-teal rounded-full items-center justify-center">
                  <span className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-arrow-right-s-line text-white text-xs" />
                  </span>
                </div>
              </div>

              {/* Step 2 — Ledra */}
              <div className="flex-1 bg-slate-50 rounded-lg p-6 md:p-8 text-center relative md:mx-2 my-2 md:my-0">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(192, 86, 33, 0.12)" }}>
                  <span className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-shield-check-line text-lg" style={{ color: "#c05621" }} />
                  </span>
                </div>
                <p className="text-slate-900 font-bold text-sm mb-1">{brands[0].name}</p>
                <p className="text-slate-500 text-xs">{t("brandsSection.ecosystemStep2")}</p>
                {/* Arrow — desktop right */}
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-accent-teal rounded-full items-center justify-center">
                  <span className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-arrow-right-s-line text-white text-xs" />
                  </span>
                </div>
                {/* Arrow — mobile down */}
                <div className="flex md:hidden justify-center absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="w-6 h-6 bg-accent-teal rounded-full flex items-center justify-center">
                    <i className="ri-arrow-down-s-line text-white text-xs" />
                  </span>
                </div>
              </div>

              {/* Step 3 — MobileWash */}
              <div className="flex-1 bg-slate-50 rounded-lg p-6 md:p-8 text-center relative">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(217, 119, 6, 0.12)" }}>
                  <span className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-drop-line text-lg" style={{ color: "#d97706" }} />
                  </span>
                </div>
                <p className="text-slate-900 font-bold text-sm mb-1">{brands[1].name}</p>
                <p className="text-slate-500 text-xs">{t("brandsSection.ecosystemStep3")}</p>
              </div>
            </div>

            {/* Circular loop indicator */}
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-3 text-slate-400 text-xs">
                <span className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-refresh-line" />
                </span>
                <span className="tracking-wider">施工 → 記録 → メンテナンス → 施工 ...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;