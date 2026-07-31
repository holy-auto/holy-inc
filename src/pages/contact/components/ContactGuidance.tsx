import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FadeIn from '@/components/base/FadeIn';

const ContactGuidance: FC = () => {
  const { t } = useTranslation('common');
  const guidance = t('contact.guidance', { returnObjects: true }) as Record<string, unknown>;
  const channels = guidance.channels as Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    action: string;
    href: string;
  }>;

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="px-6 md:px-10 max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
            {guidance.label as string}
          </p>
          <h2 className="text-slate-800 text-2xl md:text-3xl font-bold tracking-wide mb-4">
            {guidance.heading as string}
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-3xl mb-10">
            {guidance.subtitle as string}
          </p>
          <div className="w-12 h-px bg-teal-400 mb-10" />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {channels.map((channel, index) => (
            <FadeIn key={channel.id} delay={100 * (index + 1)}>
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-100 h-full hover:border-teal-300 transition-colors">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-50 mb-4">
                  <i className={`${channel.icon} text-teal-500 text-lg`} />
                </div>
                <h3 className="text-slate-800 font-bold text-sm mb-2">{channel.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{channel.description}</p>
                <a
                  href={channel.href}
                  className="text-teal-600 text-xs font-medium hover:text-teal-700 transition-colors whitespace-nowrap inline-flex items-center gap-1"
                >
                  {channel.action}
                  <span className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-arrow-right-line" />
                  </span>
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactGuidance;