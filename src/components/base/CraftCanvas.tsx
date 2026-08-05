import type { CSSProperties, FC } from "react";

/**
 * CraftCanvas — the unified, image-free brand visual.
 *
 * Every place that used to hold an external AI-generated photo now renders one
 * of these instead: a sumi-dark panel with warm ember light, a single kanji
 * watermark and a coded motif. This keeps the whole site in one visual
 * language (the same one the hero speaks) and removes all dependence on
 * external image services.
 *
 * Variants map to the meaning of each business:
 *   thread — one line, many works (継 / continuity)
 *   grid   — record & proof (Ledra)
 *   ripple — water & on-site care (MobileWash)
 *   sheen  — layered coating (HOLY AUTO)
 */

export type CraftVariant = "thread" | "grid" | "ripple" | "sheen";

interface CraftCanvasProps {
  kanji?: string;
  eyebrow?: string;
  title?: string;
  variant?: CraftVariant;
  className?: string;
  rounded?: boolean;
}

const AMBER = "#818dea";

const Motif: FC<{ variant: CraftVariant }> = ({ variant }) => {
  if (variant === "grid") {
    // Record / proof — a quiet ledger of hairlines and nodes
    return (
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300" aria-hidden="true">
        <defs>
          <linearGradient id="cc-grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={AMBER} stopOpacity="0.5" />
            <stop offset="100%" stopColor={AMBER} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {[...Array(7)].map((_, i) => (
          <line key={`h${i}`} x1="0" x2="400" y1={40 + i * 36} y2={40 + i * 36} stroke={AMBER} strokeOpacity="0.08" strokeWidth="1" />
        ))}
        {[...Array(9)].map((_, i) => (
          <line key={`v${i}`} x1={40 + i * 40} x2={40 + i * 40} y1="0" y2="300" stroke={AMBER} strokeOpacity="0.06" strokeWidth="1" />
        ))}
        <line x1="40" x2="360" y1="150" y2="150" stroke="url(#cc-grid-fade)" strokeWidth="1.5" />
        {[80, 200, 320].map((x, i) => (
          <circle key={i} cx={x} cy="150" r="4" fill={AMBER} opacity={0.9 - i * 0.15} />
        ))}
      </svg>
    );
  }

  if (variant === "ripple") {
    // Water / on-site care — concentric ripples from a single point
    return (
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <circle key={i} cx="200" cy="150" r={30 + i * 42} fill="none" stroke={AMBER} strokeOpacity={0.28 - i * 0.04} strokeWidth="1.25" />
        ))}
        <circle cx="200" cy="150" r="5" fill={AMBER} />
      </svg>
    );
  }

  if (variant === "sheen") {
    // Layered coating — diagonal sheen bands catching the light
    return (
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300" aria-hidden="true">
        <defs>
          <linearGradient id="cc-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={AMBER} stopOpacity="0" />
            <stop offset="50%" stopColor={AMBER} stopOpacity="0.35" />
            <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <rect key={i} x={-120 + i * 90} y="-40" width="26" height="420" fill="url(#cc-sheen)" transform={`rotate(18 200 150)`} opacity={0.5 - i * 0.06} />
        ))}
      </svg>
    );
  }

  // thread — one line, three works
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300" aria-hidden="true">
      <defs>
        <linearGradient id="cc-thread" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={AMBER} stopOpacity="0.05" />
          <stop offset="50%" stopColor={AMBER} stopOpacity="0.7" />
          <stop offset="100%" stopColor={AMBER} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <line x1="0" x2="400" y1="150" y2="150" stroke="url(#cc-thread)" strokeWidth="1.5" />
      {[72, 200, 328].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="150" r="10" fill={AMBER} opacity="0.12" />
          <circle cx={x} cy="150" r="4" fill={AMBER} opacity={0.9 - i * 0.12} />
        </g>
      ))}
    </svg>
  );
};

const CraftCanvas: FC<CraftCanvasProps> = ({
  kanji,
  eyebrow,
  title,
  variant = "thread",
  className = "",
  rounded = true,
}) => {
  const emberStyle: CSSProperties = {
    background:
      "radial-gradient(120% 90% at 50% 120%, rgba(85,96,227,0.28), rgba(85,96,227,0.06) 40%, transparent 66%)",
  };
  const vignetteStyle: CSSProperties = {
    boxShadow: "inset 0 0 120px 24px rgba(0,0,0,0.55)",
  };

  // Callers that pass their own `absolute` (full-bleed backgrounds) must not
  // also get `relative` — Tailwind emits `.relative` after `.absolute`, so a
  // hardcoded `relative` would win and knock the canvas back into flow.
  const position = /(^|\s)(absolute|fixed)(\s|$)/.test(className) ? "" : "relative";

  return (
    <div
      className={`${position} overflow-hidden bg-stone-950 ${rounded ? "rounded-lg" : ""} ${className}`}
      role="img"
      aria-label={title || kanji || "HOLY"}
    >
      <div className="pointer-events-none absolute inset-0" style={emberStyle} aria-hidden="true" />
      <Motif variant={variant} />
      {kanji && (
        <span
          className="pointer-events-none absolute right-[-0.08em] bottom-[-0.14em] select-none font-serif leading-none text-white/[0.06]"
          style={{ fontSize: "clamp(7rem, 40%, 20rem)" }}
          aria-hidden="true"
        >
          {kanji}
        </span>
      )}
      <div className="pointer-events-none absolute inset-0" style={vignetteStyle} aria-hidden="true" />
      {rounded && (
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-teal-400/15" aria-hidden="true" />
      )}

      {(eyebrow || title) && (
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          {eyebrow && (
            <span className="mb-1.5 text-[11px] tracking-[0.3em] uppercase text-teal-300/80">{eyebrow}</span>
          )}
          {title && (
            <span className="font-serif text-xl md:text-2xl text-white/90 leading-snug">{title}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default CraftCanvas;
