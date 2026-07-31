import type { FC } from "react";
import { useRef, useState, useEffect } from "react";

interface Stat {
  value: string;
  label: string;
  description: string;
}

interface CountUpStatsProps {
  stats: Stat[];
  theme?: "teal" | "emerald" | "dark" | "light";
}

const themes = {
  teal: {
    bg: "bg-teal-500",
    number: "text-white",
    label: "text-white/90",
    desc: "text-white/60",
  },
  emerald: {
    bg: "bg-emerald-500",
    number: "text-white",
    label: "text-white/90",
    desc: "text-white/60",
  },
  dark: {
    bg: "bg-slate-50 border-y border-slate-100",
    number: "text-teal-600",
    label: "text-slate-800",
    desc: "text-slate-500",
  },
  light: {
    bg: "bg-slate-50 border-y border-slate-100",
    number: "text-teal-600",
    label: "text-slate-800",
    desc: "text-slate-500",
  },
};

const StatItem: FC<{
  stat: Stat;
  index: number;
  inView: boolean;
  theme: (typeof themes)["teal"];
}> = ({ stat, index, inView, theme }) => {
  return (
    <div className="text-center group">
      <p
        className={`${theme.number} text-4xl md:text-5xl font-bold mb-2 tabular-nums transition-all duration-1000 ease-out ${
          inView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        {stat.value}
      </p>
      <p
        className={`${theme.label} text-sm font-medium mb-1 transition-all duration-700 ease-out ${
          inView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
        style={{ transitionDelay: `${index * 200 + 100}ms` }}
      >
        {stat.label}
      </p>
      <p
        className={`${theme.desc} text-xs transition-all duration-700 ease-out ${
          inView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
        style={{ transitionDelay: `${index * 200 + 200}ms` }}
      >
        {stat.description}
      </p>
    </div>
  );
};

const CountUpStats: FC<CountUpStatsProps> = ({ stats, theme = "teal" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const t = themes[theme];

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
    <section ref={ref} className={`w-full py-16 md:py-20 ${t.bg}`}>
      <div className="w-full px-6 md:px-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              stat={stat}
              index={i}
              inView={inView}
              theme={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountUpStats;