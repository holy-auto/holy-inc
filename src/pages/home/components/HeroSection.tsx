import type { CSSProperties, FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Hero — Soft UI.
 *
 * Rebuilt on the neumorphic matte: one warm material, depth drawn only with
 * paired soft shadows. The three businesses (HOLY AUTO / MobileWash / Ledra)
 * sit as raised tiles that press inward on interaction. Brand amber is the
 * single saturated accent, reserved for the primary action.
 */

const anim = (
  name: string,
  duration: string,
  delay: string,
  easing = "cubic-bezier(0.22, 1, 0.36, 1)",
): CSSProperties => ({
  animation: `${name} ${duration} ${easing} ${delay} both`,
});

const pillars = [
  { name: "HOLY AUTO", descKey: "hero.autoDesc", href: "/holy-auto" },
  { name: "MobileWash", descKey: "hero.washDesc", href: "/mobilewash" },
  { name: "Ledra", descKey: "hero.ledraDesc", href: "/ledra" },
] as const;

const HeroSection: FC = () => {
  const { t } = useTranslation("common");

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col overflow-hidden">
      {/* Debossed craft watermark — 継 (to carry on), pressed into the matte */}
      <span
        className="pointer-events-none absolute -right-[5vw] top-1/2 -translate-y-1/2 select-none font-serif leading-none"
        style={{
          fontSize: "clamp(20rem, 46vw, 52rem)",
          color: "var(--neu-bg)",
          textShadow: "6px 6px 14px rgba(163,177,198,.5), -6px -6px 14px rgba(255,255,255,.85)",
        }}
        aria-hidden="true"
      >
        継
      </span>

      {/* ---- Content ---- */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-24 md:pt-32">
          {/* Overline */}
          <div
            className="hero-anim flex items-center gap-4 mb-8"
            style={anim("hero-rise", "0.8s", "0.05s")}
          >
            <span className="h-px w-10" style={{ background: "linear-gradient(90deg, var(--neu-accent), transparent)" }} />
            <span className="text-xs md:text-sm tracking-[0.35em] font-medium" style={{ color: "var(--neu-accent)" }}>
              {t("hero.companyName")}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-medium leading-[1.14] tracking-tight text-[clamp(2.6rem,7vw,5.75rem)]">
            <span
              className="hero-anim block"
              style={{ color: "var(--neu-ink)", ...anim("hero-rise", "1s", "0.2s") }}
            >
              {t("hero.headlineA")}
            </span>
            <span
              className="hero-anim block text-gradient-accent"
              style={anim("hero-rise", "1s", "0.38s")}
            >
              {t("hero.headlineB")}
            </span>
          </h1>

          {/* Lead */}
          <p
            className="hero-anim mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "var(--neu-muted)", ...anim("hero-rise", "1s", "0.6s") }}
          >
            {t("hero.lead")}
          </p>

          {/* CTA */}
          <div
            className="hero-anim mt-10 flex flex-wrap items-center gap-5"
            style={anim("hero-rise", "1s", "0.78s")}
          >
            <a
              href="#brands"
              className="neu-btn neu-btn-primary group px-8 py-3.5 text-sm font-semibold tracking-wide"
            >
              {t("hero.viewBrands")}
              <i className="ri-arrow-right-line text-base transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/about"
              className="neu-btn group px-7 py-3.5 text-sm font-medium tracking-wide"
            >
              {t("hero.aboutLink")}
              <i className="ri-arrow-right-up-line text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ---- The three works, as raised tiles ---- */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 pb-16 md:pb-20">
        <p
          className="hero-anim mb-6 text-[11px] tracking-[0.3em] uppercase"
          style={{ color: "var(--neu-faint)", ...anim("hero-fade", "0.8s", "1.15s") }}
        >
          {t("hero.pillarsLabel")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {pillars.map((p, i) => (
            <Link
              key={p.name}
              to={p.href}
              aria-label={p.name}
              className="hero-anim neu-card neu-focus group flex flex-col gap-1.5 p-6 md:p-7 transition-all duration-300 active:shadow-[var(--neu-pressed)] active:translate-y-px"
              style={anim("hero-rise", "0.7s", `${1.3 + i * 0.14}s`)}
            >
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "var(--neu-accent)", boxShadow: "0 0 0 4px rgba(85,96,227,.12)" }}
                  aria-hidden="true"
                />
                <span className="font-serif text-lg md:text-2xl transition-colors duration-300 group-hover:text-[var(--neu-accent)]" style={{ color: "var(--neu-ink)" }}>
                  {p.name}
                </span>
              </span>
              <span className="text-[12px] md:text-sm tracking-wide pl-4" style={{ color: "var(--neu-muted)" }}>
                {t(p.descKey)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
