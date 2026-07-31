import type { FC } from "react";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const services = [
  {
    id: "holy-auto",
    icon: "ri-car-line",
    keywordsKey: "servicesOverview.holyautoKeywords",
    href: "/holy-auto",
    color: "#78716c",
    bgGlow: "from-slate-100 to-slate-50",
    iconBg: "bg-slate-100",
    taglineKey: "brandData.holyauto.tagline",
  },
  {
    id: "mobilewash",
    icon: "ri-drop-line",
    keywordsKey: "servicesOverview.mobilewashKeywords",
    href: "/mobilewash",
    color: "#d97706",
    bgGlow: "from-cyan-50/50 to-white",
    iconBg: "bg-cyan-50",
    taglineKey: "brandData.mobilewash.tagline",
  },
  {
    id: "ledra",
    icon: "ri-shield-check-line",
    keywordsKey: "servicesOverview.ledraKeywords",
    href: "/ledra",
    color: "#c05621",
    bgGlow: "from-accent-teal/5 to-white",
    iconBg: "bg-accent-teal/10",
    taglineKey: "brandData.ledra.tagline",
  },
];

const ServicesOverview: FC = () => {
  const { t } = useTranslation("common");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-20 bg-white"
    >
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
          {services.map((svc, index) => {
            const keywords = t(svc.keywordsKey, { returnObjects: true }) as string[];
            return (
              <a
                key={svc.id}
                href={svc.href}
                className={`group relative flex flex-col bg-white rounded-xl border border-slate-100 p-6 md:p-8 transition-all duration-500 hover:border-slate-200 hover:shadow-lg cursor-pointer ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: `${200 + index * 150}ms`,
                }}
              >
                {/* Background glow on hover */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${svc.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 flex items-center justify-center ${svc.iconBg} rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <i
                      className={`${svc.icon} text-2xl`}
                      style={{ color: svc.color }}
                    />
                  </div>

                  {/* Brand Name */}
                  <h3 className="text-slate-900 text-xl font-bold mb-2 tracking-wide">
                    {svc.id === "holy-auto" ? "HOLY AUTO" : svc.id === "mobilewash" ? "MobileWash" : "Ledra"}
                  </h3>

                  {/* Tagline */}
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {t(svc.taglineKey)}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-3 py-1 bg-slate-50 text-slate-600 text-xs rounded-full whitespace-nowrap"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto flex items-center gap-1.5 text-sm font-medium" style={{ color: svc.color }}>
                    <span>{t("ui.viewDetails")}</span>
                    <span className="w-4 h-4 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-200">
                      <i className="ri-arrow-right-line" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom connector + CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
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
              className="inline-flex items-center gap-2 bg-accent-teal hover:bg-accent-teal/90 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap"
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