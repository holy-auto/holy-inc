import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SeoHead from '@/components/base/SeoHead';
import FadeIn from '@/components/base/FadeIn';

interface PrivacySection {
  num: string;
  title: string;
  content?: string;
  intro?: string;
  items?: string[];
  contactName?: string;
  phone?: string;
  email?: string;
}

const PrivacyPage: FC = () => {
  const { t } = useTranslation('common');
  const seo = t('privacy.seo', { returnObjects: true }) as Record<string, string>;
  const sections = t('privacy.sections', { returnObjects: true }) as PrivacySection[];

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogType="website"
        noindex={true}
        ogImage="/og/og-default.png"
      />
      <main>
        {/* Hero */}
        <section className="relative text-slate-900 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <span className="pointer-events-none absolute right-[-4vw] top-1/2 -translate-y-1/2 select-none font-serif leading-none" style={{ fontSize: "clamp(13rem, 34vw, 34rem)", color: "var(--neu-bg)", textShadow: "6px 6px 14px rgba(176,162,140,.5), -6px -6px 14px rgba(255,255,255,.85)" }} aria-hidden="true">信</span>
          <div className="relative w-full px-6 md:px-10 max-w-4xl mx-auto text-center">
            <p className="text-[color:var(--neu-accent)] text-sm tracking-[0.3em] uppercase mb-4">
              {t('privacy.hero.label')}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[color:var(--neu-ink)]">
              {t('privacy.hero.title')}
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="w-full px-6 md:px-10 py-16 md:py-20 max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-sm text-slate-600 mb-12">
              {t('privacy.updated')}
            </p>
          </FadeIn>

          <div className="space-y-16">
            {sections.map((section) => (
              <FadeIn key={section.num} delay={100}>
                <div className="mb-12">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 text-sm font-bold">
                      {section.num}
                    </span>
                    {section.title}
                  </h2>
                  {section.content && (
                    <p className="text-slate-600 leading-relaxed">{section.content}</p>
                  )}
                  {section.intro && (
                    <p className="text-slate-600 leading-relaxed mb-4">{section.intro}</p>
                  )}
                  {section.items && (
                    <ul className="space-y-2 text-slate-600">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {(section.contactName || section.phone || section.email) && (
                    <div className="neu-card rounded-[20px] p-5 mt-4">
                      {section.contactName && (
                        <p className="text-sm text-slate-700"><strong>{section.contactName}</strong></p>
                      )}
                      {section.phone && (
                        <p className="text-sm text-slate-600 mt-2">{section.phone}</p>
                      )}
                      {section.email && (
                        <p className="text-sm text-slate-600">{section.email}</p>
                      )}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={150}>
              <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 hover:border-teal-400 text-slate-600 hover:text-teal-600 text-sm font-medium rounded-md transition-colors whitespace-nowrap"
                >
                  {t('privacy.contactBtn')}
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
};

export default PrivacyPage;