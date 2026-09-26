import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import CraftCanvas from '@/components/base/CraftCanvas';

interface TimelineEvent {
  year: string;
  month: string;
  title: string;
  description: string;
}

const TimelineItem: FC<{ event: TimelineEvent; index: number; isLeft: boolean }> = ({
  event,
  index,
  isLeft,
}) => {
  return (
    <div className="relative flex items-center gap-0 md:gap-0">
      {/* Mobile: single column layout */}
      <div className="flex md:hidden w-full">
        {/* Line side */}
        <div className="flex flex-col items-center mr-4 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-teal-600 ring-4 ring-teal-100" />
          {index < 6 && <div className="w-px flex-1 bg-gradient-to-b from-teal-200 to-stone-200 min-h-[80px]" />}
        </div>
        {/* Content side */}
        <div className="flex-1 pb-10">
          <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden hover:border-stone-300 transition-all duration-300 hover:-translate-y-1">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <CraftCanvas variant="thread" kanji="継" rounded={false} className="absolute inset-0 h-full w-full hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-teal-700 text-2xl font-bold">{event.year}</span>
                <span className="text-teal-500 text-sm font-medium">{event.month}月</span>
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
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <CraftCanvas variant="thread" kanji="継" rounded={false} className="absolute inset-0 h-full w-full hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-teal-700 text-3xl font-bold">{event.year}</span>
                    <span className="text-teal-500 text-sm font-medium">{event.month}月</span>
                  </div>
                  <h3 className="text-stone-800 text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
            {/* Center dot */}
            <div className="relative flex items-center justify-start pl-8">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-600 ring-8 ring-teal-50" />
              {index < 6 && (
                <div className="absolute left-[7px] top-1/2 h-[calc(100%+4rem)] w-px bg-gradient-to-b from-teal-200 to-stone-200" />
              )}
            </div>
          </>
        ) : (
          <>
            {/* Center dot */}
            <div className="relative flex items-center justify-end pr-8">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-600 ring-8 ring-teal-50" />
              {index < 6 && (
                <div className="absolute right-[7px] top-1/2 h-[calc(100%+4rem)] w-px bg-gradient-to-b from-teal-200 to-stone-200" />
              )}
            </div>
            {/* Right content */}
            <div className="pl-8">
              <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden hover:border-stone-300 transition-all duration-300 hover:-translate-y-1 inline-block w-full max-w-lg">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <CraftCanvas variant="thread" kanji="継" rounded={false} className="absolute inset-0 h-full w-full hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-teal-700 text-3xl font-bold">{event.year}</span>
                    <span className="text-teal-500 text-sm font-medium">{event.month}月</span>
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
    <section id="history" className="w-full py-16 md:py-24 overflow-hidden">
      <div className="px-6 md:px-10 max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
            {t('about.timeline.label')}
          </p>
          <h2 className="text-stone-800 text-2xl md:text-3xl font-bold tracking-wide mb-4">
            {t('about.timeline.heading')}
          </h2>
          <div className="w-12 h-px bg-teal-400 mx-auto" />
        </div>

        <div className="relative">
          {/* Desktop center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-300 via-teal-200 to-stone-200 -translate-x-1/2" />

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