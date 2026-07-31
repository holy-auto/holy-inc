import type { FC } from "react";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
                  2
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

          {/* Image with border glow - intimate 2-person startup workshop */}
          <div className="w-full lg:w-1/2 border-glow rounded-lg">
            <img
              src="https://readdy.ai/api/search-image?query=Two%20dedicated%20automotive%20craftsmen%20working%20side%20by%20side%20in%20an%20intimate%20ultra-modern%20Japanese%20detailing%20studio%2C%20one%20carefully%20inspecting%20paint%20finish%20under%20a%20precision%20LED%20lamp%20while%20the%20other%20organizes%20premium%20ceramic%20coating%20bottles%20on%20a%20pristine%20stainless%20steel%20shelf%2C%20warm%20amber%20workshop%20lighting%20casting%20soft%20dramatic%20shadows%20on%20clean%20white%20walls%2C%20professional%20tools%20neatly%20arranged%20on%20wall-mounted%20pegboards%2C%20compact%20yet%20meticulously%20organized%20startup%20workspace%2C%20polished%20concrete%20floor%20reflecting%20warm%20ambient%20glow%2C%20professional%20commercial%20photography%2C%208K%20ultra%20detailed%2C%20shallow%20depth%20of%20field%20focusing%20on%20the%20craftsmen%2C%20cinematic%20atmosphere%20with%20rich%20warm%20tones%20and%20subtle%20teal%20equipment%20accents%2C%20dark%20sophisticated%20background%2C%20no%20text&width=900&height=675&seq=holy-about-pro-006&orientation=landscape"
              alt="HOLY Team"
              className="w-full aspect-[4/3] object-cover rounded-lg"
              loading="lazy"
              width="900"
              height="675"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;