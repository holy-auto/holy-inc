import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface QualityItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const qualityImages: Record<string, string> = {
  coating:
    'https://readdy.ai/api/search-image?query=A%20freshly%20glass-coated%20car%20hood%20gleaming%20with%20mirror-like%20reflection%20under%20soft%20warm%20studio%20lighting%2C%20extreme%20closeup%20of%20deep%20glossy%20ceramic%20coating%20finish%20on%20dark%20metallic%20paint%20surface%2C%20tiny%20water%20beads%20forming%20perfect%20spheres%20demonstrating%20hydrophobic%20properties%2C%20luxurious%20automotive%20detailing%20result%2C%20warm%20amber%20and%20gold%20tones%2C%20elegant%20professional%20photography%20with%20shallow%20depth%20of%20field%2C%20dark%20moody%20background%2C%20no%20blue%20no%20purple&width=600&height=400&seq=about-quality-coating-v2-001&orientation=landscape',
  film:
    'https://readdy.ai/api/search-image?query=Close-up%20of%20a%20pristine%20transparent%20paint%20protection%20film%20being%20smoothed%20onto%20a%20luxury%20car%20front%20fender%20by%20gloved%20hands%2C%20crystal%20clear%20PPF%20material%20showing%20invisible%20protection%20layer%2C%20warm%20workshop%20lighting%20highlighting%20the%20flawless%20application%2C%20professional%20automotive%20film%20installation%20detail%20shot%2C%20warm%20neutral%20earth%20tones%2C%20soft%20bokeh%20background%20with%20tools%2C%20high-end%20craftsmanship%20photography%2C%20no%20blue%20no%20purple&width=600&height=400&seq=about-quality-film-v2-002&orientation=landscape',
  mobile:
    'https://readdy.ai/api/search-image?query=Macro%20photograph%20of%20crystal%20clear%20water%20droplets%20beading%20on%20a%20freshly%20polished%20dark%20car%20surface%20after%20professional%20hand%20wash%2C%20morning%20dew%20on%20glossy%20automotive%20paint%20reflecting%20warm%20golden%20sunlight%2C%20each%20water%20bead%20perfectly%20spherical%20showing%20superior%20coating%20protection%2C%20intimate%20detail%20shot%20of%20pristine%20clean%20vehicle%20finish%2C%20warm%20amber%20natural%20lighting%2C%20shallow%20depth%20of%20field%20with%20blurred%20greenery%20background%2C%20professional%20automotive%20photography%2C%20no%20blue%20no%20purple&width=600&height=400&seq=about-quality-mobile-v2-003&orientation=landscape',
  training:
    'https://readdy.ai/api/search-image?query=Professional%20certification%20documents%20and%20achievement%20badges%20displayed%20on%20a%20dark%20wooden%20desk%20alongside%20premium%20car%20detailing%20tools%2C%20elegant%20framed%20certificates%20with%20gold%20seals%20for%20automotive%20coating%20specialists%2C%20warm%20ambient%20lighting%20creating%20cozy%20prestigious%20atmosphere%2C%20leather%20portfolio%20and%20inspection%20clipboard%20nearby%2C%20sophisticated%20small%20business%20success%20scene%2C%20rich%20warm%20brown%20and%20gold%20tones%2C%20overhead%20flat%20lay%20photography%20style%2C%20no%20blue%20no%20purple&width=600&height=400&seq=about-quality-training-v2-004&orientation=landscape',
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
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-slate-900">
      <div className="px-6 md:px-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-teal-400 text-xs tracking-[0.3em] uppercase mb-3">
            {quality.label as string}
          </p>
          <h2 className="text-white text-2xl md:text-4xl font-bold tracking-wide mb-4">
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
            const imageUrl = qualityImages[item.id] || qualityImages.coating;
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                data-index={index}
                className={`quality-card group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ${
                  visible[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={400}
                  />
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