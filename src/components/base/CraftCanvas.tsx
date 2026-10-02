import type { CSSProperties, FC } from "react";
import { useId } from "react";

/**
 * CraftCanvas — the unified, image-free brand visual.
 *
 * Every place that used to hold an external AI-generated photo now renders one
 * of these instead. It is cut from the same Soft UI matte as the rest of the
 * site (the one the hero speaks): a debossed plate of the pale grey-blue
 * material, a single kanji pressed into it, and a coded motif drawn as grooves
 * and raised studs. Indigo is used only for the small accent points, exactly
 * like the dots on the hero's pillar tiles.
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
  /** Press the plate into the surface. Turn off when the canvas is the face of a raised card. */
  inset?: boolean;
}

const MATTE = "#e0e5ec";
const SHADE = "#a3b1c6";
const LIGHT = "#ffffff";
const ACCENT = "#5560e3";

/** A groove pressed into the matte: dark edge on top-left, light edge on bottom-right. */
const groove = (o = 0.7) => ({
  shade: { stroke: SHADE, strokeOpacity: 0.55 * o, transform: "translate(-0.5 -0.5)" },
  light: { stroke: LIGHT, strokeOpacity: 0.9 * o, transform: "translate(0.5 0.5)" },
});

/** A raised stud of matte with an indigo point at its centre. */
const Stud: FC<{ cx: number; cy: number; filter: string; strength?: number }> = ({ cx, cy, filter, strength = 1 }) => (
  <g>
    <circle cx={cx} cy={cy} r="9" fill={MATTE} filter={`url(#${filter})`} />
    <circle cx={cx} cy={cy} r="5.5" fill={ACCENT} opacity={0.12 * strength} />
    <circle cx={cx} cy={cy} r="2.75" fill={ACCENT} opacity={0.55 + 0.4 * strength} />
  </g>
);

const Motif: FC<{ variant: CraftVariant; uid: string }> = ({ variant, uid }) => {
  const studId = `${uid}-stud`;
  const fadeId = `${uid}-fade`;

  const defs = (
    <defs>
      <filter id={studId} x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="-2" dy="-2" stdDeviation="2" floodColor={LIGHT} floodOpacity="0.95" />
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor={SHADE} floodOpacity="0.7" />
      </filter>
      <linearGradient id={fadeId} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={ACCENT} stopOpacity="0" />
        <stop offset="50%" stopColor={ACCENT} stopOpacity="0.45" />
        <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
      </linearGradient>
    </defs>
  );

  const svgProps = {
    className: "absolute inset-0 h-full w-full",
    preserveAspectRatio: "xMidYMid slice",
    viewBox: "0 0 400 300",
    "aria-hidden": true,
  } as const;

  if (variant === "grid") {
    // Record / proof — a ledger of fine rules pressed into the plate
    const g = groove(0.5);
    return (
      <svg {...svgProps}>
        {defs}
        {[...Array(7)].map((_, i) => {
          const y = 42 + i * 36;
          return (
            <g key={`h${i}`} strokeWidth="1">
              <line x1="0" x2="400" y1={y} y2={y} {...g.shade} />
              <line x1="0" x2="400" y1={y} y2={y} {...g.light} />
            </g>
          );
        })}
        {[...Array(9)].map((_, i) => {
          const x = 40 + i * 40;
          return (
            <g key={`v${i}`} strokeWidth="1" opacity="0.6">
              <line x1={x} x2={x} y1="0" y2="300" {...g.shade} />
              <line x1={x} x2={x} y1="0" y2="300" {...g.light} />
            </g>
          );
        })}
        <line x1="40" x2="360" y1="150" y2="150" stroke={`url(#${fadeId})`} strokeWidth="1.25" />
        {[80, 200, 320].map((x, i) => (
          <Stud key={x} cx={x} cy={150} filter={studId} strength={1 - i * 0.25} />
        ))}
      </svg>
    );
  }

  if (variant === "ripple") {
    // Water / on-site care — rings spreading out from a single point
    return (
      <svg {...svgProps}>
        {defs}
        {[...Array(6)].map((_, i) => {
          const g = groove(1 - i * 0.14);
          return (
            <g key={i} fill="none" strokeWidth="1.25">
              <circle cx="200" cy="150" r={32 + i * 42} {...g.shade} />
              <circle cx="200" cy="150" r={32 + i * 42} {...g.light} />
            </g>
          );
        })}
        <circle cx="200" cy="150" r="32" fill="none" stroke={ACCENT} strokeOpacity="0.18" strokeWidth="1" />
        <Stud cx={200} cy={150} filter={studId} />
      </svg>
    );
  }

  if (variant === "sheen") {
    // Layered coating — soft highlight bands gliding across the matte
    const sheenId = `${uid}-sheen`;
    return (
      <svg {...svgProps}>
        <defs>
          <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={LIGHT} stopOpacity="0" />
            <stop offset="50%" stopColor={LIGHT} stopOpacity="0.85" />
            <stop offset="100%" stopColor={LIGHT} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g transform="rotate(18 200 150)">
          {[...Array(5)].map((_, i) => (
            <rect key={i} x={-120 + i * 90} y="-60" width={34 - i * 3} height="440" fill={`url(#${sheenId})`} opacity={0.75 - i * 0.1} />
          ))}
          {[...Array(3)].map((_, i) => (
            <line key={`a${i}`} x1={-6 + i * 90} x2={-6 + i * 90} y1="-60" y2="380" stroke={ACCENT} strokeOpacity={0.16 - i * 0.04} strokeWidth="1" />
          ))}
        </g>
      </svg>
    );
  }

  // thread — one line, three works
  const g = groove();
  return (
    <svg {...svgProps}>
      {defs}
      <g strokeWidth="1.5">
        <line x1="0" x2="400" y1="150" y2="150" {...g.shade} />
        <line x1="0" x2="400" y1="150" y2="150" {...g.light} />
      </g>
      <line x1="0" x2="400" y1="150" y2="150" stroke={`url(#${fadeId})`} strokeWidth="1" />
      {[72, 200, 328].map((x, i) => (
        <Stud key={x} cx={x} cy={150} filter={studId} strength={1 - i * 0.2} />
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
  inset = true,
}) => {
  // SVG defs ids must be unique per instance: a reference into a hidden
  // (display:none) copy of the same id would otherwise render nothing.
  const uid = `cc${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const surfaceStyle: CSSProperties = {
    background: [
      "radial-gradient(110% 90% at 0% 0%, rgba(255,255,255,0.55), transparent 60%)",
      "radial-gradient(90% 70% at 50% 120%, rgba(85,96,227,0.07), transparent 70%)",
      "var(--neu-bg)",
    ].join(", "),
  };
  const kanjiStyle: CSSProperties = {
    fontSize: "clamp(7rem, 40%, 20rem)",
    color: "var(--neu-bg)",
    textShadow: "5px 5px 12px rgba(163,177,198,.55), -5px -5px 12px rgba(255,255,255,.9)",
  };

  // Callers that pass their own `absolute` (full-bleed backgrounds) must not
  // also get `relative` — Tailwind emits `.relative` after `.absolute`, so a
  // hardcoded `relative` would win and knock the canvas back into flow.
  const position = /(^|\s)(absolute|fixed)(\s|$)/.test(className) ? "" : "relative";

  return (
    <div
      className={`${position} overflow-hidden ${rounded ? "rounded-[20px]" : ""} ${className}`}
      style={surfaceStyle}
      role="img"
      aria-label={title || kanji || "HOLY"}
    >
      <Motif variant={variant} uid={uid} />
      {kanji && (
        <span
          className="pointer-events-none absolute right-[-0.04em] bottom-[-0.12em] select-none font-serif leading-none"
          style={kanjiStyle}
          aria-hidden="true"
        >
          {kanji}
        </span>
      )}
      {inset && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ boxShadow: "var(--neu-inset)" }}
          aria-hidden="true"
        />
      )}

      {(eyebrow || title) && (
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          {eyebrow && (
            <span className="mb-1.5 text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--neu-accent)" }}>
              {eyebrow}
            </span>
          )}
          {title && (
            <span className="font-serif text-xl md:text-2xl leading-snug" style={{ color: "var(--neu-ink)" }}>
              {title}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CraftCanvas;
