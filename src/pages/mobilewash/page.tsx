import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SeoHead from '../../components/base/SeoHead';
import FadeIn from '../../components/base/FadeIn';
import CraftCanvas from '../../components/base/CraftCanvas';
import SectionConnector from '../../components/base/SectionConnector';
import CountUpStats from '../../components/base/CountUpStats';
import Breadcrumb from '@/components/feature/Breadcrumb';
import { buildBreadcrumbJsonLd } from '@/utils/seo';

interface WashPlan {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  recommended: boolean;
  badge?: string;
}

interface WashFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface WashStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

interface ServiceArea {
  region: string;
  cities: string[];
}

interface Stat {
  value: string;
  label: string;
  description: string;
}

const baseUrl = import.meta.env.VITE_SITE_URL || 'https://holy-inc.jp';

const MobileWashPage: FC = () => {
  const { t } = useTranslation('common');
  const seo = t('brandMobilewash.seo', { returnObjects: true }) as Record<string, string>;
  const problemSolution = t('brandMobilewash.problemSolution', { returnObjects: true }) as {
    problems: string[];
    solutions: string[];
    label: string;
    title: string;
    subtitle: string;
    problemTitle: string;
    solutionTitle: string;
  };
  const features = t('brandMobilewash.features.items', { returnObjects: true }) as WashFeature[];
  const stats = t('brandMobilewash.stats', { returnObjects: true }) as Stat[];
  const steps = t('brandMobilewash.steps.items', { returnObjects: true }) as WashStep[];
  const plans = t('brandMobilewash.plans.items', { returnObjects: true }) as WashPlan[];
  const serviceAreas = t('brandMobilewash.serviceArea.areas', { returnObjects: true }) as ServiceArea[];
  const corporateFeatures = t('brandMobilewash.corporate.features', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen">
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogType="product"
        ogImage="https://storage.readdy-site.link/project_files/234865a6-4360-473d-8e75-b35b617c3eae/de343a3c-f936-44de-b853-641c1bdee16e_ChatGPT-Image-2026514-22_14_08.png?v=c1e7617480180d33843ee74cdf1696a6"
        structuredData={[
          buildBreadcrumbJsonLd(baseUrl, [
            { name: 'ホーム', path: '/' },
            { name: 'MobileWash', path: '/mobilewash' },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: seo.structuredDataName,
            description: seo.structuredDataDesc,
            provider: { "@type": "Organization", name: "株式会社HOLY", url: baseUrl },
            areaServed: {
              "@type": "City",
              name: "東京",
            },
            serviceType: "出張洗車・車両コーティング",
            url: `${baseUrl}/mobilewash`,
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "3980",
              highPrice: "9800",
              priceCurrency: "JPY",
              availability: "https://schema.org/InStock",
            },
          },
        ]}
      />
      <Breadcrumb className="bg-white border-b border-slate-100 pt-20 md:pt-28" />
      <main className="w-full">
        {/* Hero Section */}
        <section className="relative w-full min-h-[520px] md:min-h-[620px] flex items-center justify-center overflow-hidden bg-stone-950">
          <CraftCanvas variant="ripple" kanji="洗" rounded={false} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/20 to-stone-950/70" />

          <div className="relative z-10 text-center px-6 md:px-10 max-w-4xl mx-auto pt-20">
            <p className="text-emerald-300 text-xs tracking-[0.3em] uppercase mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {t('brandMobilewash.hero.label')}
            </p>
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wide mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
              {t('brandMobilewash.hero.title')}
            </h1>
            <div className="w-16 h-px bg-emerald-300 mx-auto mb-6" />
            <p className="text-white/95 text-lg md:text-xl tracking-wide mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              {t('brandMobilewash.hero.subtitle1')}
            </p>
            <p className="text-white/85 text-sm md:text-base max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              {t('brandMobilewash.hero.subtitle2')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <a
                href="#plans"
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
              >
                {t('brandMobilewash.hero.viewPlans')}
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-white/50 hover:border-white hover:bg-white/10 text-white text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                {t('brandMobilewash.hero.book')}
              </a>
            </div>
          </div>

          <a
            href="#plans"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <span className="text-white/70 text-xs tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{t('ui.scroll')}</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/70 to-transparent" />
          </a>
        </section>

        <SectionConnector color="emerald" dark />

        {/* Problem & Solution Section */}
        <section className="w-full py-20 md:py-28 bg-white">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-emerald-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {problemSolution.label}
                </p>
                <h2 className="text-slate-800 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                  {problemSolution.title}
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  {problemSolution.subtitle}
                </p>
                <div className="w-12 h-px bg-emerald-400 mx-auto mt-6" />
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                {/* Problem */}
                <div className="bg-slate-50 rounded-lg p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 flex-shrink-0">
                      <i className="ri-alert-line text-red-600" />
                    </span>
                    <h3 className="text-slate-800 text-lg font-bold">
                      {problemSolution.problemTitle}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {problemSolution.problems.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="ri-close-circle-line text-red-400 text-sm" />
                        </span>
                        <span className="text-slate-600 text-sm leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution */}
                <div className="bg-white border border-slate-200 rounded-lg p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 flex-shrink-0">
                      <i className="ri-lightbulb-line text-emerald-600" />
                    </span>
                    <h3 className="text-slate-800 text-lg font-bold">
                      {problemSolution.solutionTitle}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {problemSolution.solutions.map((solution, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="ri-check-line text-emerald-500 text-sm" />
                        </span>
                        <span className="text-slate-600 text-sm leading-relaxed">
                          {solution}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionConnector color="emerald" />

        {/* Features Section */}
        <section className="w-full py-20 md:py-28 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-emerald-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandMobilewash.features.label')}
                </p>
                <h2 className="text-slate-800 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                  {t('brandMobilewash.features.title')}
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  {t('brandMobilewash.features.subtitle')}
                </p>
                <div className="w-12 h-px bg-emerald-400 mx-auto mt-6" />
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-white rounded-lg p-6 md:p-8 border border-slate-100 hover:border-emerald-200 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-50 mb-5">
                      <i className={`${feature.icon} text-emerald-600 text-xl`} />
                    </div>
                    <h3 className="text-slate-800 text-base font-bold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionConnector color="emerald" />

        {/* Steps / Flow Section */}
        <section className="w-full py-20 md:py-28 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-emerald-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandMobilewash.steps.label')}
                </p>
                <h2 className="text-slate-800 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                  {t('brandMobilewash.steps.title')}
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  {t('brandMobilewash.steps.subtitle')}
                </p>
                <div className="w-12 h-px bg-emerald-400 mx-auto mt-6" />
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
                {steps.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="bg-white border border-slate-200 rounded-lg p-6 text-center h-full">
                      <span className="text-emerald-400/30 text-3xl font-bold block mb-4">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 mx-auto mb-4">
                        <i className={`${item.icon} text-emerald-500`} />
                      </div>
                      <h3 className="text-slate-800 text-base font-bold mb-3">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    {i < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-slate-300">
                        <i className="ri-arrow-right-line" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionConnector color="emerald" />

        {/* Stats Section */}
        <CountUpStats stats={stats} theme="light" />

        <SectionConnector color="emerald" />

        {/* Plans / Pricing Section */}
        <section id="plans" className="w-full py-20 md:py-28 bg-white">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-emerald-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandMobilewash.plans.label')}
                </p>
                <h2 className="text-slate-800 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                  {t('brandMobilewash.plans.title')}
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  {t('brandMobilewash.plans.subtitle')}
                </p>
                <div className="w-12 h-px bg-emerald-400 mx-auto mt-6" />
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-lg p-6 md:p-8 border transition-all duration-300 h-full flex flex-col ${
                      plan.recommended
                        ? 'border-emerald-400 bg-emerald-50/30 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-emerald-200'
                    }`}
                  >
                    {plan.badge ? (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-sky-500 text-white text-xs font-medium rounded-full whitespace-nowrap">
                        {plan.badge}
                      </span>
                    ) : plan.recommended ? (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full whitespace-nowrap">
                        {t('brandMobilewash.plans.recommended')}
                      </span>
                    ) : null}
                    <h3 className="text-slate-800 text-lg font-bold mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-slate-800 text-3xl font-bold">
                        {plan.price}
                      </span>
                      <span className="text-slate-500 text-sm ml-1">
                        {plan.priceNote}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      {plan.description}
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                          <span className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i className="ri-check-line text-emerald-500 text-xs" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className={`block text-center px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap mt-auto ${
                        plan.recommended
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {t('brandMobilewash.plans.bookPlan')}
                    </a>
                  </div>
                ))}
              </div>
            </FadeIn>

            <p className="text-slate-500 text-xs text-center mt-8">
              {t('brandMobilewash.plans.note')}
            </p>
          </div>
        </section>

        <SectionConnector color="emerald" />

        {/* Service Area & Corporate */}
        <section className="w-full py-20 md:py-28 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Service Area */}
              <div>
                <FadeIn>
                  <p className="text-emerald-600 text-xs tracking-[0.3em] uppercase mb-3">
                    {t('brandMobilewash.serviceArea.label')}
                  </p>
                  <h2 className="text-slate-800 text-2xl md:text-3xl font-bold tracking-wide mb-6">
                    {t('brandMobilewash.serviceArea.title')}
                  </h2>
                  <div className="space-y-6">
                    {serviceAreas.map((area) => (
                      <div key={area.region}>
                        <h3 className="text-slate-700 text-sm font-bold mb-2">
                          {area.region}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {area.cities.map((city) => (
                            <span
                              key={city}
                              className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-md whitespace-nowrap"
                            >
                              {city}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-500 text-xs mt-6">
                    {t('brandMobilewash.serviceArea.note')}
                  </p>
                </FadeIn>
              </div>

              {/* Corporate Contract */}
              <div>
                <FadeIn delay={150}>
                  <p className="text-emerald-600 text-xs tracking-[0.3em] uppercase mb-3">
                    {t('brandMobilewash.corporate.label')}
                  </p>
                  <h2 className="text-slate-800 text-2xl md:text-3xl font-bold tracking-wide mb-6">
                    {t('brandMobilewash.corporate.title')}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {t('brandMobilewash.corporate.desc')}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {corporateFeatures.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                        <span className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="ri-check-line text-emerald-500 text-xs" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap"
                  >
                    {t('brandMobilewash.corporate.cta')}
                    <span className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-arrow-right-line" />
                    </span>
                  </a>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        <SectionConnector color="emerald" />

        {/* CTA Section */}
        <section id="contact" className="w-full py-20 md:py-28 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                {t('brandMobilewash.cta.title')}
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10">
                {t('brandMobilewash.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="px-10 py-3.5 bg-emerald-500 text-white text-sm font-medium rounded-md hover:bg-emerald-600 transition-colors duration-200 whitespace-nowrap"
                >
                  {t('brandMobilewash.cta.bookWeb')}
                </a>
                <a
                  href="/contact"
                  className="px-10 py-3.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:border-emerald-400 hover:text-emerald-600 transition-colors duration-200 whitespace-nowrap"
                >
                  {t('brandMobilewash.cta.contact')}
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionConnector color="emerald" />

        {/* Combo Section */}
        <section className="w-full py-16 md:py-20 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-emerald-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandMobilewash.comboSection.label')}
                </p>
                <h2 className="text-slate-900 text-2xl md:text-3xl font-bold tracking-wide mb-4">
                  {t('brandMobilewash.comboSection.title')}
                </h2>
                <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
                  {t('brandMobilewash.comboSection.subtitle')}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-10">
                {/* Step 1 */}
                <div className="relative">
                  <div className="bg-white border border-slate-200 rounded-lg p-6 text-center h-full">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 mx-auto mb-4">
                      <i className="ri-drop-line text-emerald-500" />
                    </div>
                    <h3 className="text-slate-800 text-sm font-bold mb-2">
                      {t('brandMobilewash.comboSection.step1Brand')}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {t('brandMobilewash.comboSection.step1Desc')}
                    </p>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-slate-300">
                    <i className="ri-arrow-right-line" />
                  </div>
                </div>
                {/* Step 2 */}
                <div className="relative">
                  <div className="bg-white border border-slate-200 rounded-lg p-6 text-center h-full">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 mx-auto mb-4">
                      <i className="ri-tools-line text-emerald-500" />
                    </div>
                    <h3 className="text-slate-800 text-sm font-bold mb-2">
                      {t('brandMobilewash.comboSection.step2Brand')}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {t('brandMobilewash.comboSection.step2Desc')}
                    </p>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-slate-300">
                    <i className="ri-arrow-right-line" />
                  </div>
                </div>
                {/* Step 3 */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 text-center h-full">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 mx-auto mb-4">
                    <i className="ri-shield-check-line text-emerald-500" />
                  </div>
                  <h3 className="text-slate-800 text-sm font-bold mb-2">
                    {t('brandMobilewash.comboSection.step3Brand')}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {t('brandMobilewash.comboSection.step3Desc')}
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={250}>
              <div className="text-center">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap"
                >
                  {t('brandMobilewash.comboSection.cta')}
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-right-line" />
                  </span>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionConnector color="emerald" dark />

        {/* Next Brand Navigation */}
        <section className="w-full py-16 md:py-20 bg-slate-50 border-t border-slate-200">
          <div className="w-full px-6 md:px-10 max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-10">
                <p className="text-slate-500 text-xs tracking-[0.2em] uppercase mb-2">
                  {t('brandMobilewash.nextBrand.label')}
                </p>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-8 h-px bg-emerald-400" />
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-50">
                    <i className="ri-arrow-right-line text-emerald-500 text-sm" />
                  </span>
                  <div className="w-8 h-px bg-emerald-400" />
                </div>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  {t('brandMobilewash.nextBrand.desc')}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <a
                href="/holy-auto"
                className="group block bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-teal-300 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row items-stretch">
                  {/* Brand Visual */}
                  <div className="w-full md:w-2/5 relative overflow-hidden">
                    <div className="aspect-[16/10] md:aspect-auto md:h-full">
                      <CraftCanvas variant="sheen" kanji="匠" rounded={false} className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full font-medium whitespace-nowrap">
                        {t('brandMobilewash.nextBrand.next')}
                      </span>
                    </div>
                    <h3 className="text-slate-800 text-xl md:text-2xl font-bold mb-2 group-hover:text-teal-600 transition-colors duration-200">
                      HOLY AUTO
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      {t('brandMobilewash.nextBrand.holyautoDesc')}
                    </p>
                    <div className="flex items-center gap-2 text-teal-600 text-sm font-medium">
                      <span>{t('brandMobilewash.nextBrand.viewDetails')}</span>
                      <span className="w-5 h-5 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-200">
                        <i className="ri-arrow-right-line" />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={250}>
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="text-slate-400 text-xs">{t('brandMobilewash.nextBrand.otherBrands')}</span>
                <a
                  href="/ledra"
                  className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs rounded-md hover:border-teal-300 hover:text-teal-600 transition-colors duration-200 whitespace-nowrap"
                >
                  Ledra
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MobileWashPage;