import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SeoHead from '@/components/base/SeoHead';
import FadeIn from '@/components/base/FadeIn';
import CraftCanvas from '@/components/base/CraftCanvas';

interface TermsSection {
  num: string;
  title: string;
  content?: string;
  intro?: string;
  items?: string[];
  outro?: string;
  contactName?: string;
  phone?: string;
  email?: string;
}

const TermsPage: FC = () => {
  const { t } = useTranslation('common');
  const seo = t('terms.seo', { returnObjects: true }) as Record<string, string>;
  const sections = t('terms.sections', { returnObjects: true }) as TermsSection[];

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
        <section className="relative bg-stone-950 text-slate-900 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <CraftCanvas
            variant="thread"
            kanji="信"
            rounded={false}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/20 to-stone-950/70" />
          <div className="relative w-full px-6 md:px-10 max-w-4xl mx-auto text-center">
            <p className="text-teal-300 text-sm tracking-[0.3em] uppercase mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {t('terms.hero.label')}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] [text-shadow:_0_1px_12px_rgba(0,0,0,0.3),_0_1px_2px_rgba(0,0,0,0.5)]">
              {t('terms.hero.title')}
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="w-full px-6 md:px-10 py-16 md:py-20 max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-sm text-slate-600 mb-12">
              {t('terms.updated')}
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
                  {section.outro && (
                    <p className="text-slate-600 leading-relaxed mt-4">{section.outro}</p>
                  )}
                  {(section.contactName || section.phone || section.email) && (
                    <div className="bg-slate-50 rounded-lg p-5 border border-slate-100 mt-4">
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
                  className="inline-flex items-center justify-center px-8 py-3 border border-slate-200 hover:border-teal-400 text-slate-600 hover:text-teal-600 text-sm font-medium rounded-md transition-colors whitespace-nowrap"
                >
                  {t('terms.contactBtn')}
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
};

export default TermsPage;