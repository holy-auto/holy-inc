import type { FC } from "react";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CraftCanvas from "../../../components/base/CraftCanvas";

const MVVSection: FC = () => {
  const { t } = useTranslation("common");
  const svgRef = useRef<SVGSVGElement>(null);
  const [drawProgress, setDrawProgress] = useState(0);

  const values = [
    {
      id: "pride",
      title: t("valuesData.pride.title"),
      subtitle: t("valuesData.pride.subtitle"),
      description: t("valuesData.pride.description"),
      icon: "ri-medal-line",
    },
    {
      id: "succession",
      title: t("valuesData.succession.title"),
      subtitle: t("valuesData.succession.subtitle"),
      description: t("valuesData.succession.description"),
      icon: "ri-hand-heart-line",
    },
    {
      id: "integrity",
      title: t("valuesData.integrity.title"),
      subtitle: t("valuesData.integrity.subtitle"),
      description: t("valuesData.integrity.description"),
      icon: "ri-shield-check-line",
    },
    {
      id: "proof",
      title: t("valuesData.proof.title"),
      subtitle: t("valuesData.proof.subtitle"),
      description: t("valuesData.proof.description"),
      icon: "ri-file-list-3-line",
    },
  ];

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start: number | null = null;
          const duration = 1600;

          const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDrawProgress(eased);
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const strokeWidth = 1.5;
  const dotRadius = 3.5;
  const topY = 8;
  const lineEndY = 72;

  const spineStartX = 12.5;
  const spineEndX = 87.5;
  const col1X = 12.5;
  const col2X = 37.5;
  const col3X = 62.5;
  const col4X = 87.5;

  const totalLen = 1006;
  const currentLen = totalLen * drawProgress;

  const segments = [
    { type: "spine" as const, x1: spineStartX, y1: topY, x2: spineEndX, y2: topY, len: 750 },
    { type: "drop1" as const, x1: col1X, y1: topY, x2: col1X, y2: lineEndY, len: 64 },
    { type: "drop2" as const, x1: col2X, y1: topY, x2: col2X, y2: lineEndY, len: 64 },
    { type: "drop3" as const, x1: col3X, y1: topY, x2: col3X, y2: lineEndY, len: 64 },
    { type: "drop4" as const, x1: col4X, y1: topY, x2: col4X, y2: lineEndY, len: 64 },
  ];

  let accumulated = 0;
  const renderedSegments = segments.map((seg) => {
    const segStart = accumulated;
    const segEnd = accumulated + seg.len;
    accumulated = segEnd;

    if (currentLen <= segStart) {
      return { ...seg, visible: false, dashArray: "0 " + seg.len, dashOffset: 0 };
    }
    if (currentLen >= segEnd) {
      return { ...seg, visible: true, dashArray: seg.len + " 0", dashOffset: 0 };
    }
    const partial = currentLen - segStart;
    return {
      ...seg,
      visible: true,
      dashArray: partial + " " + (seg.len - partial),
      dashOffset: 0,
    };
  });

  return (
    <section id="mvv" className="w-full py-20 md:py-28">
      <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent-teal text-xs tracking-[0.3em] uppercase mb-3">{t("section.philosophy")}</p>
          <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-wide mb-4">
            {t("mvv.heading")}
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-teal/60 to-transparent mx-auto" />
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="neu-card rounded-[20px] p-8 md:p-10 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent-teal text-xs font-bold tracking-[0.2em] uppercase">{t("section.mission")}</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <p className="text-slate-800 text-xl md:text-2xl font-light leading-relaxed group-hover:text-teal-700 transition-colors">
              {t("mvv.missionText")}
            </p>
            {/* 3 brands badge */}
            <div className="mt-6 flex items-center gap-2.5 flex-wrap">
              <span className="text-slate-400 text-xs tracking-wider">{t("servicesOverview.sectionLabel")}</span>
              <span className="px-2 py-1 bg-slate-200/60 text-slate-600 text-xs rounded-md font-medium whitespace-nowrap">HOLY AUTO</span>
              <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-md font-medium whitespace-nowrap">MobileWash</span>
              <span className="px-2 py-1 bg-accent-teal/10 text-accent-teal text-xs rounded-md font-medium whitespace-nowrap">Ledra</span>
            </div>
          </div>
          <div className="neu-card rounded-[20px] p-8 md:p-10 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent-teal text-xs font-bold tracking-[0.2em] uppercase">{t("section.vision")}</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <p className="text-slate-800 text-xl md:text-2xl font-light leading-relaxed group-hover:text-teal-700 transition-colors">
              {t("mvv.visionText")}
            </p>
            {/* 3 brands badge */}
            <div className="mt-6 flex items-center gap-2.5 flex-wrap">
              <span className="text-slate-400 text-xs tracking-wider">{t("servicesOverview.sectionLabel")}</span>
              <span className="px-2 py-1 bg-slate-200/60 text-slate-600 text-xs rounded-md font-medium whitespace-nowrap">HOLY AUTO</span>
              <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-md font-medium whitespace-nowrap">MobileWash</span>
              <span className="px-2 py-1 bg-accent-teal/10 text-accent-teal text-xs rounded-md font-medium whitespace-nowrap">Ledra</span>
            </div>
          </div>
        </div>

        {/* Craftsmanship visual — recessed into the matte as an inset "screen" */}
        <div className="mb-20 neu-well p-2.5 md:p-3 rounded-[28px]">
          <CraftCanvas
            variant="thread"
            kanji="技"
            eyebrow="Craftsmanship"
            title={t("mvv.missionText")}
            className="aspect-[1440/500] w-full rounded-[20px] overflow-hidden"
          />
        </div>

        {/* Values with SVG Line Animation */}
        <div>
          <p className="text-accent-teal text-xs font-bold tracking-[0.2em] uppercase mb-8 text-center">{t("mvv.valuesTitle")}</p>

          {/* SVG Connector Lines - Desktop only */}
          <div className="hidden lg:block relative w-full mb-2">
            <svg
              ref={svgRef}
              viewBox="0 0 1000 80"
              preserveAspectRatio="none"
              className="w-full h-[80px]"
              aria-hidden="true"
            >
              {/* Horizontal spine */}
              {renderedSegments[0].visible && (
                <line
                  x1={renderedSegments[0].x1 + "%"}
                  y1={renderedSegments[0].y1}
                  x2={renderedSegments[0].x2 + "%"}
                  y2={renderedSegments[0].y2}
                  stroke="#d97706"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={renderedSegments[0].dashArray}
                  style={{ transition: "stroke-dasharray 0.05s linear" }}
                />
              )}
              {/* Vertical drops */}
              {renderedSegments.slice(1).map((seg) =>
                seg.visible ? (
                  <line
                    key={seg.type}
                    x1={seg.x1 + "%"}
                    y1={seg.y1}
                    x2={seg.x2 + "%"}
                    y2={seg.y2}
                    stroke="#d97706"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={seg.dashArray}
                    style={{ transition: "stroke-dasharray 0.05s linear" }}
                  />
                ) : null
              )}
              {/* End dots - appear after each drop completes */}
              {renderedSegments.slice(1).map((seg, idx) => {
                const dropEnd = segments[0].len + (idx + 1) * segments[1].len;
                const isComplete = currentLen >= dropEnd;
                return isComplete ? (
                  <circle
                    key={`dot-${seg.type}`}
                    cx={seg.x2 + "%"}
                    cy={seg.y2}
                    r={dotRadius}
                    fill="#d97706"
                    style={{
                      opacity: Math.min((currentLen - dropEnd) / 80 + 0.3, 1),
                      transition: "opacity 0.3s ease-out",
                    }}
                  />
                ) : null;
              })}
            </svg>
          </div>

          {/* Mobile/Tablet simple vertical lines */}
          <div className="lg:hidden flex justify-center mb-4">
            <svg
              viewBox="0 0 40 60"
              className="w-[40px] h-[60px]"
              aria-hidden="true"
            >
              <line
                x1="20"
                y1="0"
                x2="20"
                y2="60"
                stroke="#d97706"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeDasharray="60"
                strokeDashoffset={60 * (1 - drawProgress)}
                style={{ transition: "stroke-dashoffset 0.1s linear" }}
              />
              <circle
                cx="20"
                cy="60"
                r="3.5"
                fill="#d97706"
                style={{
                  opacity: drawProgress > 0.9 ? 1 : 0,
                  transition: "opacity 0.3s ease-out",
                }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, idx) => (
              <div
                key={value.id}
                className="group neu-card rounded-[20px] p-6 transition-all duration-300"
                style={{
                  opacity: drawProgress > 0.2 + idx * 0.2 ? 1 : 0.6,
                  transform: drawProgress > 0.2 + idx * 0.2 ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.5s ease-out ${idx * 120}ms, transform 0.5s ease-out ${idx * 120}ms, border-color 0.3s ease`,
                }}
              >
                <div className="w-12 h-12 flex items-center justify-center neu-well rounded-[14px] mb-4">
                  <i className={`${value.icon} text-slate-600 text-xl group-hover:text-accent-teal transition-colors`} />
                </div>
                <h3 className="text-slate-800 text-lg font-bold mb-1">
                  {value.title}
                </h3>
                <p className="text-slate-400 text-xs tracking-wider uppercase mb-3">{value.subtitle}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="inline-block w-full max-w-2xl p-8 md:p-10 neu-card rounded-[28px]">
              <p className="text-accent-teal text-xs font-bold tracking-[0.2em] uppercase mb-3">
                3 BRAND COLLABORATION
              </p>
              <h3 className="text-slate-900 text-xl md:text-2xl font-bold mb-3">
                {t("mvv.ctaTitle")}
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6">
                {t("mvv.ctaDesc")}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 neu-btn neu-btn-primary px-8 py-3.5 rounded-md text-sm tracking-wide transition-all duration-200 whitespace-nowrap hover:shadow-[0_0_15px_rgba(0,212,170,0.25)]"
              >
                {t("mvv.ctaButton")}
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-line" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MVVSection;