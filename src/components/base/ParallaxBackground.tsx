import type { FC } from "react";
import { useRef, useState, useEffect, useCallback } from "react";

interface ParallaxBackgroundProps {
  src: string;
  alt?: string;
  speed?: number;
  overlay?: React.ReactNode;
  className?: string;
  imgClassName?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

const ParallaxBackground: FC<ParallaxBackgroundProps> = ({
  src,
  alt = "",
  speed = 0.4,
  overlay,
  className = "",
  imgClassName = "",
  fetchPriority = 'auto',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number>(0);
  const lastOffsetRef = useRef(0);
  const isInViewportRef = useRef(true);

  const updateParallax = useCallback(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img || !isInViewportRef.current) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.bottom > 0 && rect.top < windowHeight) {
      const scrollProgress =
        (windowHeight - rect.top) / (windowHeight + rect.height);
      const offset = (scrollProgress - 0.5) * speed * 100;
      // Only update if offset changed significantly (reduce reflows)
      if (Math.abs(offset - lastOffsetRef.current) > 0.5) {
        lastOffsetRef.current = offset;
        img.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.15)`;
      }
    }
  }, [speed]);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      updateParallax();
      rafRef.current = 0;
    });
  }, [updateParallax]);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewportRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          updateParallax();
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(container);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateParallax, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateParallax);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, updateParallax]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden contain-paint ${className}`}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover gpu-accelerated ${imgClassName}`}
        loading="eager"
        fetchpriority={fetchPriority}
        width="1440"
        height="900"
        style={{ willChange: 'transform' }}
        decoding="async"
      />
      {overlay}
    </div>
  );
};

export default ParallaxBackground;