import type { CSSProperties, FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Hero — "一線" (the line that continues).
 *
 * A sumi-dark, image-free hero built entirely in code, so it always renders
 * and never depends on an external stock/AI image. The composition tells a
 * short story on load: the wordmark settles, the headline rises, then a single
 * luminous thread draws across the canvas and ignites three nodes — the three
 * businesses (HOLY AUTO / MobileWash / Ledra) held together by one craft.
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
  { name: "HOLY AUTO", descKey: "hero.autoDesc", href: "/holy-auto", pos: 18 },
  { name: "MobileWash", descKey: "hero.washDesc", href: "/mobilewash", pos: 50 },
  { name: "Ledra", descKey: "hero.ledraDesc", href: "/ledra", pos: 82 },
] as const;

const HeroSection: FC = () => {
  const { t } = useTranslation("common");

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col overflow-hidden bg-stone-950 text-white">
      {/* ---- Atmosphere (kept deliberately minimal) ---- */}
      {/* Warm ember rising from below — the only light source */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 85% at 50% 118%, rgba(217,119,6,0.20), rgba(217,119,6,0.05) 38%, transparent 62%)",
        }}
        aria-hidden="true"
      />
      {/* Cool depth in the top corner keeps it from feeling flat */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 85% 0%, rgba(28,25,23,0.9), transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Craft watermark — 継 (to inherit / to carry on). Whisper-subtle texture */}
      <span
        className="hero-anim pointer-events-none absolute -right-[6vw] top-1/2 -translate-y-1/2 select-none font-serif leading-none text-white/[0.035]"
        style={{ fontSize: "clamp(20rem, 46vw, 52rem)", ...anim("hero-fade", "1.6s", "0.1s") }}
        aria-hidden="true"
      >
        継
      </span>
      {/* Fine vignette for cinematic falloff */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 -140px 160px -60px rgba(0,0,0,0.9), inset 0 0 240px 40px rgba(0,0,0,0.55)" }}
        aria-hidden="true"
      />

      {/* ---- Content ---- */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-40 md:pt-32">
          {/* Overline */}
          <div
            className="hero-anim flex items-center gap-4 mb-8"
            style={anim("hero-rise", "0.8s", "0.05s")}
          >
            <span className="h-px w-10 bg-gradient-to-r from-amber-400 to-amber-400/0" />
            <span className="text-amber-300/90 text-xs md:text-sm tracking-[0.35em] font-medium">
              {t("hero.companyName")}
            </span>
            <span className="text-white/35 text-[11px] tracking-[0.25em] hidden sm:inline">
              {t("hero.since")}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-medium leading-[1.14] tracking-tight text-[clamp(2.6rem,7vw,5.75rem)]">
            <span
              className="hero-anim block text-white"
              style={anim("hero-rise", "1s", "0.2s")}
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
            className="hero-anim mt-8 max-w-xl text-stone-300/90 text-base md:text-lg leading-relaxed font-light"
            style={anim("hero-rise", "1s", "0.6s")}
          >
            {t("hero.lead")}
          </p>

          {/* CTA */}
          <div
            className="hero-anim mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={anim("hero-rise", "1s", "0.78s")}
          >
            <a
              href="#brands"
              className="group inline-flex items-center gap-3 rounded-full bg-amber-400 px-8 py-3.5 text-sm font-semibold tracking-wide text-stone-950 transition-all duration-300 hover:bg-amber-300 hover:gap-4 hover:shadow-[0_0_40px_-8px_rgba(251,191,36,0.6)]"
            >
              {t("hero.viewBrands")}
              <i className="ri-arrow-right-line text-base transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-white/70 transition-colors duration-300 hover:text-white"
            >
              {t("hero.aboutLink")}
              <span className="inline-block h-px w-6 bg-white/40 transition-all duration-300 group-hover:w-9 group-hover:bg-amber-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* ---- The thread: one line, three works ---- */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 pb-16 md:pb-20">
        <p
          className="hero-anim mb-6 text-[11px] tracking-[0.3em] uppercase text-white/40"
          style={anim("hero-fade", "0.8s", "1.15s")}
        >
          {t("hero.pillarsLabel")}
        </p>

        <div className="relative">
          {/* The luminous horizontal thread */}
          <div className="absolute left-0 right-0 top-[6px] h-px overflow-hidden">
            <div
              className="hero-anim h-px w-full origin-left bg-gradient-to-r from-amber-400/10 via-amber-300/80 to-amber-400/10"
              style={anim("hero-draw-x", "1.3s", "1.2s")}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-8">
            {pillars.map((p, i) => (
              <Link
                key={p.name}
                to={p.href}
                className="group relative pt-6"
                aria-label={p.name}
              >
                {/* Node on the thread */}
                <span
                  className="hero-anim absolute top-0 block"
                  style={{ ...anim("hero-ignite", "0.7s", `${1.5 + i * 0.28}s`), left: `calc(${p.pos}% - 6px)` }}
                >
                  <span className="relative block h-3 w-3">
                    <span
                      className="hero-anim absolute inset-[-6px] rounded-full bg-amber-400/30 blur-[3px]"
                      style={anim("hero-halo", "3.2s", `${2 + i * 0.28}s`, "ease-in-out")}
                    />
                    <span className="absolute inset-0 rounded-full bg-amber-300 ring-4 ring-amber-400/15 shadow-[0_0_14px_2px_rgba(251,191,36,0.55)]" />
                  </span>
                </span>

                {/* Label */}
                <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
                  <span
                    className="hero-anim block font-serif text-base md:text-2xl text-white/90 transition-colors duration-300 group-hover:text-amber-300"
                    style={anim("hero-rise", "0.7s", `${1.65 + i * 0.28}s`)}
                  >
                    {p.name}
                  </span>
                  <span
                    className="hero-anim mt-1 block text-[11px] md:text-sm tracking-wide text-white/45"
                    style={anim("hero-fade", "0.7s", `${1.8 + i * 0.28}s`)}
                  >
                    {t(p.descKey)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Scroll cue ---- */}
      <a
        href="#brands"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition-colors duration-500 hover:text-white/80 md:flex"
        aria-label={t("ui.scroll")}
      >
        <span className="h-8 w-px overflow-hidden">
          <span
            className="hero-anim block h-full w-px bg-gradient-to-b from-amber-300 to-transparent"
            style={anim("hero-scroll", "2.4s", "2.4s", "ease-in-out")}
          />
        </span>
      </a>

      {/* Seam into the light section below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" aria-hidden="true" />
    </section>
  );
};

export default HeroSection;
