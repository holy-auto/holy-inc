import type { FC } from "react";
import { useTranslation } from "react-i18next";

const textShadowStyle = { textShadow: '0 2px 30px rgba(0,0,0,0.6), 0 1px 10px rgba(0,0,0,0.5), 0 0 3px rgba(0,0,0,0.4)' };

const HeroSection: FC = () => {
  const { t } = useTranslation("common");

  return (
    <section className="relative w-full min-h-[700px] md:min-h-[800px] flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Background image - three businesses in one cinematic scene */}
      <img
        src="https://readdy.ai/api/search-image?query=A%20breathtaking%20ultra-wide%20cinematic%20automotive%20hero%20composition%20showing%20a%20gleaming%20black%20luxury%20sedan%20at%20the%20center%20with%20flawless%20mirror-like%20ceramic%20coating%20reflecting%20dramatic%20amber%20and%20teal%20studio%20lights%2C%20thick%20white%20premium%20foam%20gently%20cascading%20from%20above%20onto%20the%20hood%2C%20translucent%20holographic%20data%20streams%20and%20glowing%20blockchain%20network%20nodes%20orbiting%20the%20vehicle%20like%20digital%20satellites%2C%20a%20pristine%20modern%20Japanese%20automotive%20atelier%20with%20polished%20dark%20concrete%20floors%20and%20precision%20equipment%20silhouettes%20in%20background%2C%20golden%20hour%20warmth%20meeting%20cool%20technology%20glow%2C%20professional%20Hasselblad%20medium%20format%20editorial%20photography%2C%208K%20ultra%20detailed%2C%20extreme%20shallow%20depth%20of%20field%20with%20creamy%20bokeh%2C%20cinematic%20color%20grading%20with%20rich%20warm%20amber%20and%20deep%20teal%20contrast%2C%20dark%20sophisticated%20atmosphere%2C%20no%20text&width=1440&height=900&seq=holy-hero-pro-006&orientation=landscape"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchpriority="high"
        width="1440"
        height="900"
        decoding="async"
      />

      {/* Light overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

      {/* Subtle radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />

      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-10 max-w-4xl mx-auto">
        {/* Brand Name */}
        <div className="mb-6">
          <h1 className="text-white text-6xl md:text-8xl font-bold tracking-[0.3em] mb-2 animate-fade-in-up" style={textShadowStyle}>
            HOLY
          </h1>
          <p className="text-white/95 text-xs md:text-sm tracking-[0.5em] uppercase animate-fade-in-up" style={{ ...textShadowStyle, animationDelay: '0.15s' }}>
            {t("hero.companyName")}
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto mb-8 h-px w-16 animate-fade-in-up bg-gradient-to-r from-transparent via-teal-400 to-transparent" style={{ animationDelay: '0.3s' }} />

        {/* Mission & Vision */}
        <p className="text-white text-xl md:text-3xl font-normal tracking-wider mb-3 animate-fade-in-up" style={{ ...textShadowStyle, animationDelay: '0.45s' }}>
          {t("hero.mission")}
        </p>
        <p className="text-white/90 text-sm md:text-base tracking-wide animate-fade-in-up" style={{ ...textShadowStyle, animationDelay: '0.6s' }}>
          {t("hero.vision")}
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.75s' }}>
          <a
            href="#brands"
            className="group inline-flex items-center gap-2.5 bg-white/95 hover:bg-white text-slate-900 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap hover:scale-[1.02]"
          >
            {t("hero.viewBrands")}
            <span className="w-4 h-4 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-0.5">
              <i className="ri-arrow-down-s-line" />
            </span>
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 border border-white/50 hover:border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 whitespace-nowrap hover:scale-[1.02]"
            style={textShadowStyle}
          >
            {t("hero.contactUs")}
            <span className="w-4 h-4 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
              <i className="ri-arrow-right-s-line" />
            </span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#mvv"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/50 hover:text-white/80 transition-colors duration-500 cursor-pointer group"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-medium opacity-60 group-hover:opacity-100 transition-opacity duration-500">
          {t("ui.scroll")}
        </span>
        <div className="relative w-5 h-10 rounded-full border border-white/30 group-hover:border-white/50 transition-colors duration-500 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-white/70 group-hover:bg-white/90 animate-scroll-dot" />
        </div>
      </a>
    </section>
  );
};

export default HeroSection;