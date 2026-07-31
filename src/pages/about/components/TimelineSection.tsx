import { useEffect, useRef, type FC } from 'react';
import { useTranslation } from 'react-i18next';

interface TimelineEvent {
  year: string;
  month: string;
  title: string;
  description: string;
}

const eventImages: Record<string, string> = {
  '2024-11': 'https://readdy.ai/api/search-image?query=a%20minimalist%20modern%20corporate%20office%20corner%20with%20two%20people%20at%20a%20sleek%20white%20desk%20facing%20a%20large%20panoramic%20window%20overlooking%20the%20Tokyo%20skyline%20at%20golden%20hour%2C%20clean%20architectural%20lines%2C%20soft%20diffused%20natural%20light%2C%20potted%20monstera%20plant%2C%20warm%20beige%20and%20cream%20interior%20palette%2C%20professional%20yet%20intimate%20startup%20atmosphere%2C%20editorial%20photography%20style%2C%20shallow%20depth%20of%20field%2C%20muted%20earth%20tones&width=500&height=320&seq=about-timeline-2024-11-v3&orientation=landscape',
  '2024-12': 'https://readdy.ai/api/search-image?query=a%20professional%20automotive%20detailing%20studio%20interior%20with%20a%20single%20luxury%20sedan%20under%20soft%20overhead%20studio%20lighting%2C%20glossy%20coated%20hood%20reflecting%20warm%20light%2C%20pristine%20white%20walls%20and%20polished%20concrete%20floor%2C%20organized%20premium%20tools%20and%20products%20on%20a%20floating%20shelf%2C%20sophisticated%20car%20care%20environment%2C%20editorial%20commercial%20photography%2C%20warm%20amber%20and%20cream%20tones%2C%20clean%20modern%20aesthetic&width=500&height=320&seq=about-timeline-2024-12-v3&orientation=landscape',
  '2025-01': 'https://readdy.ai/api/search-image?query=a%20sleek%20modern%20workspace%20with%20a%20large%20ultrawide%20monitor%20displaying%20an%20abstract%20blockchain%20data%20visualization%20with%20glowing%20nodes%20and%20connections%2C%20minimalist%20white%20desk%20with%20wireless%20keyboard%2C%20ambient%20warm%20task%20lamp%2C%20a%20cup%20of%20coffee%2C%20large%20window%20with%20soft%20daylight%2C%20clean%20Scandinavian%20interior%2C%20muted%20warm%20gray%20and%20cream%20palette%2C%20editorial%20tech%20photography&width=500&height=320&seq=about-timeline-2025-01-v3&orientation=landscape',
  '2025-03': 'https://readdy.ai/api/search-image?query=a%20modern%20meeting%20room%20with%20a%20matte%20glass%20whiteboard%20showing%20hand-drawn%20mission%20statement%20words%20in%20elegant%20marker%20script%2C%20two%20chairs%20pulled%20up%20to%20a%20light%20oak%20table%2C%20soft%20natural%20light%20from%20floor-to-ceiling%20windows%2C%20indoor%20greenery%2C%20warm%20neutral%20color%20scheme%20with%20cream%20walls%20and%20beige%20accents%2C%20professional%20corporate%20interior%20photography%2C%20calm%20and%20focused%20atmosphere&width=500&height=320&seq=about-timeline-2025-03-v3&orientation=landscape',
  '2025-10': 'https://readdy.ai/api/search-image?query=a%20compact%20modern%20service%20van%20parked%20in%20front%20of%20a%20stylish%20minimalist%20building%20facade%20during%20soft%20morning%20light%2C%20the%20van%20wrapped%20in%20a%20clean%20matte%20white%20finish%20with%20subtle%20branding%2C%20organized%20equipment%20visible%20through%20open%20side%20door%2C%20urban%20setting%20with%20warm%20stone%20pavement%2C%20professional%20mobile%20service%20launch%20scene%2C%20editorial%20commercial%20photography%2C%20warm%20earth%20tone%20palette%20with%20cream%20and%20taupe&width=500&height=320&seq=about-timeline-2025-10-v3&orientation=landscape',
};

const getEventImage = (year: string, month: string): string => {
  const key = `${year}-${month}`;
  if (eventImages[key]) return eventImages[key];
  return eventImages[year] || eventImages['2020'];
};

const TimelineItem: FC<{ event: TimelineEvent; index: number; isLeft: boolean }> = ({
  event,
  index,
  isLeft,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.remove('opacity-0', 'translate-y-8');
            el.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const imageUrl = getEventImage(event.year, event.month);
  const delayClass = `transition-delay-${Math.min(index * 100, 500)}`;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-0 md:gap-0 opacity-0 translate-y-8 transition-all duration-700 ease-out ${delayClass}`}
    >
      {/* Mobile: single column layout */}
      <div className="flex md:hidden w-full">
        {/* Line side */}
        <div className="flex flex-col items-center mr-4 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-amber-600 ring-4 ring-amber-100" />
          {index < 6 && <div className="w-px flex-1 bg-gradient-to-b from-amber-200 to-stone-200 min-h-[80px]" />}
        </div>
        {/* Content side */}
        <div className="flex-1 pb-10">
          <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden hover:border-stone-300 transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img
                src={imageUrl}
                alt={event.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                width={500}
                height={320}
              />
            </div>
            <div className="p-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-amber-700 text-2xl font-bold">{event.year}</span>
                <span className="text-amber-500 text-sm font-medium">{event.month}月</span>
              </div>
              <h3 className="text-stone-800 text-base font-bold mb-1">{event.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{event.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: zigzag layout */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-8 w-full items-center">
        {isLeft ? (
          <>
            {/* Left content */}
            <div className="text-right pr-8">
              <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden hover:border-stone-300 transition-all duration-300 hover:-translate-y-1 inline-block text-left w-full max-w-lg">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width={500}
                    height={320}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-amber-700 text-3xl font-bold">{event.year}</span>
                    <span className="text-amber-500 text-sm font-medium">{event.month}月</span>
                  </div>
                  <h3 className="text-stone-800 text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
            {/* Center dot */}
            <div className="relative flex items-center justify-start pl-8">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-600 ring-8 ring-amber-50" />
              {index < 6 && (
                <div className="absolute left-[7px] top-1/2 h-[calc(100%+4rem)] w-px bg-gradient-to-b from-amber-200 to-stone-200" />
              )}
            </div>
          </>
        ) : (
          <>
            {/* Center dot */}
            <div className="relative flex items-center justify-end pr-8">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-600 ring-8 ring-amber-50" />
              {index < 6 && (
                <div className="absolute right-[7px] top-1/2 h-[calc(100%+4rem)] w-px bg-gradient-to-b from-amber-200 to-stone-200" />
              )}
            </div>
            {/* Right content */}
            <div className="pl-8">
              <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden hover:border-stone-300 transition-all duration-300 hover:-translate-y-1 inline-block w-full max-w-lg">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width={500}
                    height={320}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-amber-700 text-3xl font-bold">{event.year}</span>
                    <span className="text-amber-500 text-sm font-medium">{event.month}月</span>
                  </div>
                  <h3 className="text-stone-800 text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const TimelineSection: FC = () => {
  const { t } = useTranslation('common');

  const timelineEvents = t('about.timeline.events', { returnObjects: true }) as Array<TimelineEvent>;

  return (
    <section id="history" className="w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="px-6 md:px-10 max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-3">
            {t('about.timeline.label')}
          </p>
          <h2 className="text-stone-800 text-2xl md:text-3xl font-bold tracking-wide mb-4">
            {t('about.timeline.heading')}
          </h2>
          <div className="w-12 h-px bg-amber-400 mx-auto" />
        </div>

        <div className="relative">
          {/* Desktop center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-300 via-amber-200 to-stone-200 -translate-x-1/2" />

          <div className="space-y-0 md:space-y-0">
            {timelineEvents.map((event, index) => (
              <TimelineItem
                key={`${event.year}-${event.month}`}
                event={event}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;