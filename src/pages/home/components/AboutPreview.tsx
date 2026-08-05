import type { FC } from "react";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CraftCanvas from "../../../components/base/CraftCanvas";

const AboutPreview: FC = () => {
  const { t } = useTranslation("common");
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="relative w-full py-20 md:py-28 bg-white overflow-hidden">
      {/* CSS-only background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-400/5 via-transparent to-transparent" />
      {/* Shimmer overlay */}
      <div className="absolute inset-0 shimmer-gradient animate-shimmer opacity-20" />

      <div className="relative z-10 w-full px-6 md:px-10 max-w-6xl mx-auto">
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Content */}
          <div className="w-full lg:w-1/2">
            <p className="text-accent-teal text-xs tracking-[0.3em] uppercase mb-3">{t("section.about")}</p>
            <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-wide mb-6">
              {t("hero.companyName")}
            </h2>
            <div className="w-12 h-px bg-gradient-to-r from-accent-teal/60 to-transparent mb-6" />
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8">
              {t("aboutPreview.text")}
            </p>

            {/* Stats with glow - startup realistic */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="group">
                <p className="text-accent-teal text-2xl md:text-3xl font-bold tabular-nums transition-transform duration-300 group-hover:scale-110">
                  3
                </p>
                <p className="text-slate-400 text-xs mt-1">{t("aboutPreview.stat1Label")}</p>
              </div>
              <div className="group">
                <p className="text-accent-teal text-2xl md:text-3xl font-bold tabular-nums transition-transform duration-300 group-hover:scale-110">
                  1
                </p>
                <p className="text-slate-400 text-xs mt-1">{t("aboutPreview.stat2Label")}</p>
              </div>
              <div className="group">
                <p className="text-accent-teal text-2xl md:text-3xl font-bold tabular-nums transition-transform duration-300 group-hover:scale-110">
                  2024
                </p>
                <p className="text-slate-400 text-xs mt-1">{t("aboutPreview.stat3Label")}</p>
              </div>
            </div>

            <a
              href="/about"
              className="inline-flex items-center gap-2 border border-slate-200 hover:border-accent-teal/50 hover:text-accent-teal text-slate-800 px-6 py-3 rounded-md text-sm tracking-wide transition-all duration-200 whitespace-nowrap hover:shadow-[0_0_15px_rgba(0,212,170,0.15)]"
            >
              {t("aboutPreview.viewAbout")}
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line" />
              </span>
            </a>

            {/* 3-Brand CTA */}
            <div className="mt-8 p-5 md:p-6 bg-gradient-to-br from-accent-teal/5 to-cyan-50/50 border border-accent-teal/20 rounded-lg">
              <p className="text-accent-teal text-xs font-bold tracking-[0.2em] uppercase mb-2">
                3 BRAND COLLABORATION
              </p>
              <h3 className="text-slate-900 text-lg md:text-xl font-bold mb-2">
                {t("aboutPreview.ctaTitle")}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                {t("aboutPreview.ctaDesc")}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent-teal hover:bg-accent-teal/90 text-white px-6 py-3 rounded-md text-sm tracking-wide transition-all duration-200 whitespace-nowrap hover:shadow-[0_0_15px_rgba(0,212,170,0.25)]"
              >
                {t("aboutPreview.ctaButton")}
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-line" />
                </span>
              </a>
            </div>
          </div>

          {/* Brand visual */}
          <div className="w-full lg:w-1/2 border-glow rounded-lg">
            <CraftCanvas
              variant="sheen"
              kanji="匠"
              eyebrow="Since 2024"
              title={t("hero.companyName")}
              className="aspect-[4/3] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;