import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CraftCanvas from '@/components/base/CraftCanvas';

interface QualityItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const qualityMotifs: Record<string, { variant: 'thread' | 'grid' | 'ripple' | 'sheen'; kanji: string }> = {
  coating: { variant: 'sheen', kanji: '匠' },
  film: { variant: 'sheen', kanji: '匠' },
  mobile: { variant: 'ripple', kanji: '洗' },
  training: { variant: 'grid', kanji: '証' },
};

const qualityNumbers = ['01', '02', '03', '04'];

const QualitySection: FC = () => {
  const { t } = useTranslation('common');
  const quality = t('about.quality', { returnObjects: true }) as Record<string, unknown>;
  const items = quality.items as QualityItem[];

  const [visible, setVisible] = useState<boolean[]>(new Array(items.length).fill(false));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            setVisible((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const cards = sectionRef.current?.querySelectorAll('.quality-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [items.length]);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24">
      <div className="px-6 md:px-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-teal-400 text-xs tracking-[0.3em] uppercase mb-3">
            {quality.label as string}
          </p>
          <h2 className="text-slate-900 text-2xl md:text-4xl font-bold tracking-wide mb-4">
            {quality.heading as string}
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
            {quality.subtitle as string}
          </p>
          <div className="w-16 h-px bg-teal-500 mt-8" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {items.map((item, index) => {
            const motif = qualityMotifs[item.id] || qualityMotifs.coating;
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                data-index={index}
                className={`quality-card group relative rounded-[20px] overflow-hidden cursor-pointer neu-raised transition-all duration-700 ${
                  visible[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <CraftCanvas variant={motif.variant} kanji={motif.kanji} rounded={false} className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-110" />
                  {/* Overlay - darker default, lighter on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40 group-hover:from-slate-900/95 group-hover:via-slate-900/85 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 md:p-8 min-h-[280px] md:min-h-[320px] flex flex-col justify-end">
                  {/* Number */}
                  <span
                    className={`absolute top-4 ${isEven ? 'right-4' : 'left-4'} text-6xl md:text-7xl font-bold text-white/10 group-hover:text-teal-500/20 transition-colors duration-500 select-none`}
                  >
                    {qualityNumbers[index]}
                  </span>

                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-500/20 backdrop-blur-sm border border-teal-500/30 group-hover:bg-teal-500 group-hover:border-teal-500 transition-all duration-500">
                      <i
                        className={`${item.icon} text-teal-400 text-xl group-hover:text-white transition-colors duration-500`}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-lg md:text-xl font-bold mb-2 group-hover:text-teal-300 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* Hover line accent */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-teal-500 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;