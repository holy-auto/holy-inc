import { useEffect, useRef, useState, useCallback } from 'react';
import type { FC } from 'react';

interface SectionConnectorProps {
  color?: string;
  dark?: boolean;
  delay?: number;
}

const SectionConnector: FC<SectionConnectorProps> = ({
  color = 'teal',
  dark = false,
  delay = 0,
}) => {
  const ref = useRef<SVGSVGElement>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  const animate = useCallback((timestamp: number) => {
    const start = timestamp;
    const duration = 900;
    
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            animate(performance.now());
          }, delay);
          observer.unobserve(svg);
          return () => {
            clearTimeout(timer);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
          };
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(svg);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [delay, animate]);

  const colorMap: Record<string, { light: string; dark: string }> = {
    teal: { light: '#a3abf3', dark: '#4550d3' },
    emerald: { light: '#a3abf3', dark: '#4550d3' },
    slate: { light: '#d6d3d1', dark: '#78716c' },
    sky: { light: '#c4caf9', dark: '#5560e3' },
    default: { light: '#e7e5e4', dark: '#57534e' },
  };

  const strokeColor = dark
    ? colorMap[color]?.dark || '#0d9488'
    : colorMap[color]?.light || '#2dd4bf';

  const pathLength = 2000;

  return (
    <div className="w-full hidden md:flex justify-center contain-layout">
      <svg
        ref={ref}
        className="w-full max-w-6xl"
        height="3"
        viewBox="0 0 1200 3"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="1.5"
          x2="1200"
          y2="1.5"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength * (1 - progress)}
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default SectionConnector;