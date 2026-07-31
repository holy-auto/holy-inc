import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import SeoHead from '@/components/base/SeoHead';
import FadeIn from '@/components/base/FadeIn';
import CraftCanvas from '@/components/base/CraftCanvas';
import { buildBreadcrumbJsonLd } from '@/utils/seo';
import Breadcrumb from '@/components/feature/Breadcrumb';
import QualitySection from './components/QualitySection';
import TeamSection from './components/TeamSection';
import TimelineSection from './components/TimelineSection';
import MapCard from '@/components/feature/MapCard';

const baseUrl = import.meta.env.VITE_SITE_URL || 'https://holy-inc.jp';

const AboutPage: FC = () => {
  const { t } = useTranslation('common');

  const a = t('about', { returnObjects: true }) as Record<string, unknown>;

  const companyRows = [
    { labelKey: 'tableName', valueKey: 'name' },
    { labelKey: 'tableFounded', valueKey: 'founded' },
    { labelKey: 'tableCapital', valueKey: 'capital' },
    { labelKey: 'tableRepresentative', valueKey: 'representative' },
    { labelKey: 'tableEmployees', valueKey: 'employees' },
    { labelKey: 'tableAddress', valueKey: 'address' },
    { labelKey: 'tableWorkplace', valueKey: 'workplace' },
    { labelKey: 'tableAccess', valueKey: 'access' },
    { labelKey: 'tableTel', valueKey: 'tel' },
    { labelKey: 'tableEmail', valueKey: 'email' },
  ];

  const businessItems = t('about.companyInfo.business', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen">
      <SeoHead
        title={t('about.seo.title')}
        description={t('about.seo.description')}
        keywords={t('about.seo.keywords')}
        ogType="website"
        ogImage="/og/og-about.png"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: t('about.seo.structuredDataName'),
            description: t('about.seo.structuredDataDesc'),
            url: `${baseUrl}/about`,
          },
          buildBreadcrumbJsonLd(baseUrl, [
            { name: 'ホーム', path: '/' },
            { name: '会社概要', path: '/about' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: '株式会社HOLY',
            alternateName: 'HOLY Inc.',
            url: baseUrl,
            image: `${baseUrl}/og/og-about.png`,
            description: t('about.seo.description'),
            foundingDate: '2024-11-12',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '北青山1-3-1 アールキューブ青山3F',
              addressLocality: '港区',
              addressRegion: '東京都',
              postalCode: '107-0061',
              addressCountry: 'JP',
            },
            telephone: '03-4363-3234',
            email: 'info@holy-inc.jp',
            priceRange: '$$$',
            openingHours: 'Mo-Sa 09:00-18:00',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '35.67277',
              longitude: '139.72319',
            },
            sameAs: [baseUrl],
            areaServed: {
              '@type': 'Place',
              name: '東京都中央区銀座',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: '自動車関連サービス',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '自動車コーティング施工' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'プロテクションフィルム施工' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '出張洗車サービス' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ブロックチェーン車両証明' } },
              ],
            },
          },
        ]}
      />

      <Breadcrumb className="bg-white border-b border-slate-100 pt-20 md:pt-28" />
      <main>
        {/* Page Hero */}
        <section className="relative w-full pt-12 pb-16 md:pt-16 md:pb-24 bg-stone-950 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <CraftCanvas variant="thread" kanji="誠" rounded={false} className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/20 to-stone-950/60" />
          </div>

          <div className="relative z-10 px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <p className="text-teal-300 text-xs tracking-[0.3em] uppercase mb-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                {t('about.hero.label')}
              </p>
              <h1 className="text-white text-3xl md:text-5xl font-bold tracking-wide mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] [text-shadow:_0_1px_12px_rgba(0,0,0,0.3),_0_1px_2px_rgba(0,0,0,0.5)]">
                {t('about.hero.title')}
              </h1>
              <div className="w-12 h-px bg-teal-300" />
            </FadeIn>
          </div>
        </section>

        {/* Greeting / Philosophy */}
        <section id="message" className="w-full py-16 md:py-24 bg-white">
          <div className="px-6 md:px-10 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
              {/* Message */}
              <div className="w-full lg:w-3/5">
                <FadeIn delay={100}>
                  <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-4">
                    {t('about.greeting.label')}
                  </p>
                  <h2 className="text-slate-800 text-2xl md:text-3xl font-bold tracking-wide mb-8">
                    {t('about.greeting.heading')}
                  </h2>
                  <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
                    <p>{t('about.greeting.p1')}</p>
                    <p>{t('about.greeting.p2')}</p>
                    <p>{t('about.greeting.p3')}</p>
                    <p>{t('about.greeting.p4')}</p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-slate-800 font-medium">
                      {t('about.greeting.representative')}
                    </p>
                  </div>
                </FadeIn>
              </div>

              {/* Image */}
              <div className="w-full lg:w-2/5">
                <FadeIn delay={200} direction="right">
                  <div className="relative rounded-lg overflow-hidden aspect-[3/4]">
                    <CraftCanvas variant="thread" kanji="誠" rounded={false} className="absolute inset-0 h-full w-full" />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        <QualitySection />

        {/* Company Info */}
        <section className="w-full py-16 md:py-24 bg-slate-50">
          <div className="px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
                {t('about.companyInfo.label')}
              </p>
              <h2 className="text-slate-800 text-2xl md:text-3xl font-bold tracking-wide mb-8">
                {t('about.companyInfo.heading')}
              </h2>
              <div className="w-12 h-px bg-teal-400 mb-10" />
            </FadeIn>

            <FadeIn delay={150}>
              <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {companyRows.map((item, index) => {
                      const label = t(`about.companyInfo.${item.labelKey}`);
                      const value = t(`about.companyInfo.${item.valueKey}`);
                      const isEmail = item.labelKey === 'tableEmail';
                      const isTel = item.labelKey === 'tableTel';
                      return (
                        <tr
                          key={item.labelKey}
                          className={`border-b border-slate-100 ${index % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}`}
                        >
                          <td className="w-32 md:w-40 px-6 py-4 text-slate-600 font-medium">
                            {label}
                          </td>
                          <td className="px-6 py-4 text-slate-700">
                            {isEmail ? (
                              <a href={`mailto:${value}`} className="text-teal-600 hover:underline">
                                {value}
                              </a>
                            ) : isTel ? (
                              <a href={`tel:${value}`} className="text-teal-600 hover:underline">
                                {value}
                              </a>
                            ) : (
                              value
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-slate-50/50">
                      <td className="w-32 md:w-40 px-6 py-4 text-slate-600 font-medium align-top">
                        {t('about.companyInfo.tableBusiness')}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        <ul className="space-y-1">
                          {businessItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="ri-check-line text-teal-500 text-xs" />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </FadeIn>
          </div>
        </section>

        <TimelineSection />

        <TeamSection />

        {/* Access / Map */}
        <section id="access" className="w-full py-16 md:py-24 bg-slate-50">
          <div className="px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
                {t('about.access.label')}
              </p>
              <h2 className="text-slate-800 text-2xl md:text-3xl font-bold tracking-wide mb-8">
                {t('about.access.heading')}
              </h2>
              <div className="w-12 h-px bg-teal-400 mb-10" />
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MapCard
                title={t('about.access.headOfficeLabel')}
                mapUrl={`https://maps.google.com/maps?q=${encodeURIComponent('東京都港区北青山1-3-1 アールキューブ青山3F')}&z=17&ie=UTF8&iwloc=&output=embed`}
                address={t('about.companyInfo.address')}
                access={t('about.companyInfo.access')}
                routeUrl={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('東京都港区北青山1-3-1 アールキューブ青山3F')}`}
                routeLabel={t('about.access.routeSearch')}
                delay={100}
              />
              <MapCard
                title={t('about.access.workplaceLabel')}
                mapUrl={`https://maps.google.com/maps?q=${encodeURIComponent('茨城県古河市前林623-1')}&z=17&ie=UTF8&iwloc=&output=embed`}
                address={t('about.access.workplaceAddress')}
                access={t('about.access.workplaceAccess')}
                routeUrl={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('茨城県古河市前林623-1')}`}
                routeLabel={t('about.access.workplaceRouteSearch')}
                delay={200}
              />
            </div>
          </div>
        </section>

        {/* MVV Recap */}
        <section className="w-full py-16 md:py-24 bg-slate-50">
          <div className="px-6 md:px-10 max-w-6xl mx-auto text-center">
            <FadeIn>
              <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-4">
                {t('about.mvvRecap.label')}
              </p>
              <h2 className="text-slate-900 text-2xl md:text-4xl font-bold tracking-wide mb-4">
                {t('about.mvvRecap.heading')}
              </h2>
              <div className="w-12 h-px bg-teal-400 mx-auto mb-10" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white rounded-lg p-8 border border-slate-200">
                  <p className="text-teal-600 text-xs font-bold tracking-[0.2em] uppercase mb-3">
                    {t('section.mission')}
                  </p>
                  <h3 className="text-slate-800 text-lg md:text-xl font-light">
                    {t('about.mvvRecap.mission')}
                  </h3>
                </div>
                <div className="bg-white rounded-lg p-8 border border-slate-200">
                  <p className="text-teal-600 text-xs font-bold tracking-[0.2em] uppercase mb-3">
                    {t('section.vision')}
                  </p>
                  <h3 className="text-slate-800 text-lg md:text-xl font-light">
                    {t('about.mvvRecap.vision')}
                  </h3>
                </div>
              </div>

              <a
                href="/"
                className="inline-flex items-center gap-2 border border-slate-200 hover:border-teal-400 hover:text-teal-600 text-slate-800 px-8 py-3 rounded-md text-sm tracking-wide transition-all duration-200 whitespace-nowrap"
              >
                {t('about.mvvRecap.backToTop')}
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-line" />
                </span>
              </a>
            </FadeIn>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;