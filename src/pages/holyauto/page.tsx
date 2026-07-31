import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SeoHead from '../../components/base/SeoHead';
import FadeIn from '../../components/base/FadeIn';
import CraftCanvas from '../../components/base/CraftCanvas';
import SectionConnector from '../../components/base/SectionConnector';
import CountUpStats from '../../components/base/CountUpStats';
import Breadcrumb from '@/components/feature/Breadcrumb';
import { buildBreadcrumbJsonLd } from '@/utils/seo';

interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  priceRange: string;
  duration: string;
  imageUrl: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

interface WhyItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  id: string;
  content: string;
  author: string;
  car: string;
  rating: number;
}

interface Stat {
  value: string;
  label: string;
  description: string;
}

const baseUrl = import.meta.env.VITE_SITE_URL || 'https://holy-inc.jp';

const HolyAutoPage: FC = () => {
  const { t } = useTranslation('common');
  const seo = t('brandHolyauto.seo', { returnObjects: true }) as Record<string, string>;
  const problemSolution = t('brandHolyauto.problemSolution', { returnObjects: true }) as {
    problems: string[];
    solutions: string[];
    label: string;
    title: string;
    subtitle: string;
    problemTitle: string;
    solutionTitle: string;
  };
  const services = t('brandHolyauto.services.items', { returnObjects: true }) as ServiceItem[];
  const stats = t('brandHolyauto.stats', { returnObjects: true }) as Stat[];
  const processSteps = t('brandHolyauto.process.steps', { returnObjects: true }) as ProcessStep[];
  const whyItems = t('brandHolyauto.why.items', { returnObjects: true }) as WhyItem[];
  const testimonials = t('brandHolyauto.testimonials.items', { returnObjects: true }) as Testimonial[];

  return (
    <div className="min-h-screen">
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogType="product"
        ogImage="/og/og-holyauto.png"
        structuredData={[
          buildBreadcrumbJsonLd(baseUrl, [
            { name: 'ホーム', path: '/' },
            { name: 'HOLY AUTO', path: '/holy-auto' },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: seo.structuredDataName,
            description: seo.structuredDataDesc,
            provider: { "@type": "Organization", name: "株式会社HOLY", url: baseUrl },
            areaServed: {
              "@type": "Place",
              name: "東京都",
            },
            serviceType: "自動車カスタム・コーティング・フィルム施工・技術講習",
            url: `${baseUrl}/holy-auto`,
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "HOLY AUTO サービスメニュー",
              itemListElement: services.map((svc) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: svc.name,
                  description: svc.description,
                },
                price: svc.priceRange,
                priceCurrency: "JPY",
              })),
            },
          },
        ]}
      />
      <Breadcrumb className="bg-white border-b border-slate-100 pt-20 md:pt-28" />
      <main className="w-full">
        {/* Hero Section */}
        <section className="relative w-full min-h-[520px] md:min-h-[620px] flex items-center justify-center overflow-hidden bg-stone-950">
          <CraftCanvas variant="sheen" kanji="匠" rounded={false} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/20 to-stone-950/70" />

          <div className="relative z-10 text-center px-6 md:px-10 max-w-4xl mx-auto pt-20">
            <p className="text-teal-300 text-xs tracking-[0.3em] uppercase mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {t('brandHolyauto.hero.label')}
            </p>
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wide mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
              {t('brandHolyauto.hero.title')}
            </h1>
            <div className="w-16 h-px bg-teal-300 mx-auto mb-6" />
            <p className="text-white/95 text-lg md:text-xl tracking-wide mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              {t('brandHolyauto.hero.subtitle1')}
            </p>
            <p className="text-white/85 text-sm md:text-base max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              {t('brandHolyauto.hero.subtitle2')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <a
                href="#services"
                className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
              >
                {t('brandHolyauto.hero.viewServices')}
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-white/50 hover:border-white hover:bg-white/10 text-white text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                {t('brandHolyauto.hero.consult')}
              </a>
            </div>
          </div>

          <a
            href="#services"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <span className="text-white/70 text-xs tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{t('ui.scroll')}</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/70 to-transparent" />
          </a>
        </section>

        <SectionConnector color="slate" dark />

        {/* Problem & Solution Section */}
        <section className="w-full py-20 md:py-28 bg-white">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {problemSolution.label}
                </p>
                <h2 className="text-slate-800 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                  {problemSolution.title}
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  {problemSolution.subtitle}
                </p>
                <div className="w-12 h-px bg-teal-400 mx-auto mt-6" />
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
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-50 flex-shrink-0">
                      <i className="ri-lightbulb-line text-teal-600" />
                    </span>
                    <h3 className="text-slate-800 text-lg font-bold">
                      {problemSolution.solutionTitle}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {problemSolution.solutions.map((solution, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="ri-check-line text-teal-500 text-sm" />
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

        <SectionConnector color="slate" />

        {/* Services Section */}
        <section id="services" className="w-full py-20 md:py-28 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandHolyauto.services.label')}
                </p>
                <h2 className="text-slate-800 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                  {t('brandHolyauto.services.title')}
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  {t('brandHolyauto.services.subtitle')}
                </p>
                <div className="w-12 h-px bg-teal-400 mx-auto mt-6" />
              </div>
            </FadeIn>

            <div className="space-y-16 md:space-y-20">
              {services.map((service, index) => (
                <FadeIn key={service.id} delay={index * 100} direction={index % 2 === 0 ? 'left' : 'right'}>
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } gap-8 lg:gap-12 items-center`}
                  >
                    {/* Image */}
                    <div className="w-full lg:w-1/2">
                      <div className="rounded-lg overflow-hidden aspect-[5/3.5]">
                        <CraftCanvas
                          variant="sheen"
                          kanji={service.id === 'coating' ? '光' : service.id === 'film' ? '護' : service.id === 'training' ? '継' : '匠'}
                          eyebrow="HOLY AUTO"
                          title={service.name}
                          rounded={false}
                          className="h-full w-full"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2">
                      <p className="text-teal-600 text-xs tracking-[0.2em] uppercase mb-2">
                        {service.id === 'custom' ? t('brandHolyauto.services.customLabel') : service.id === 'coating' ? t('brandHolyauto.services.coatingLabel') : service.id === 'film' ? t('brandHolyauto.services.filmLabel') : t('brandHolyauto.services.trainingLabel')}
                      </p>
                      <h3 className="text-slate-800 text-2xl md:text-3xl font-bold mb-2">
                        {service.name}
                      </h3>
                      <p className="text-teal-700 text-sm font-medium mb-4">
                        {service.tagline}
                      </p>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-500 text-sm">
                            <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                              <i className="ri-check-line text-teal-500 text-sm" />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-6 mb-6">
                        <div>
                          <p className="text-slate-500 text-xs mb-1">{t('brandHolyauto.services.priceLabel')}</p>
                          <p className="text-slate-800 text-sm font-bold">{service.priceRange}</p>
                        </div>
                        <div className="w-px h-8 bg-slate-200" />
                        <div>
                          <p className="text-slate-500 text-xs mb-1">{t('brandHolyauto.services.durationLabel')}</p>
                          <p className="text-slate-800 text-sm font-bold">{service.duration}</p>
                        </div>
                      </div>

                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap"
                      >
                        {t('brandHolyauto.services.consultBtn')}
                        <span className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-arrow-right-line" />
                        </span>
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <SectionConnector color="slate" />

        {/* Stats Section */}
        <CountUpStats stats={stats} theme="light" />

        <SectionConnector color="slate" dark />

        {/* Process Section */}
        <section className="w-full py-20 md:py-28 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandHolyauto.process.label')}
                </p>
                <h2 className="text-slate-800 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                  {t('brandHolyauto.process.title')}
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  {t('brandHolyauto.process.subtitle')}
                </p>
                <div className="w-12 h-px bg-teal-400 mx-auto mt-6" />
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
                {processSteps.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="bg-white border border-slate-200 rounded-lg p-6 text-center h-full">
                      <span className="text-teal-400/30 text-3xl font-bold block mb-4">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-50 mx-auto mb-4">
                        <i className={`${item.icon} text-teal-500`} />
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

        <SectionConnector color="slate" dark />

        {/* Why HOLY AUTO */}
        <section className="w-full py-20 md:py-28 bg-white">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandHolyauto.why.label')}
                </p>
                <h2 className="text-slate-800 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                  {t('brandHolyauto.why.title')}
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  {t('brandHolyauto.why.subtitle')}
                </p>
                <div className="w-12 h-px bg-teal-400 mx-auto mt-6" />
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-50 rounded-lg p-6 md:p-8 border border-slate-100 hover:border-teal-200 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-teal-50 mb-5">
                      <i className={`${item.icon} text-teal-600 text-xl`} />
                    </div>
                    <h3 className="text-slate-800 text-base font-bold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionConnector color="slate" />

        {/* Testimonials */}
        <section className="w-full py-20 md:py-28 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandHolyauto.testimonials.label')}
                </p>
                <h2 className="text-slate-800 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                  {t('brandHolyauto.testimonials.title')}
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  {t('brandHolyauto.testimonials.subtitle')}
                </p>
                <div className="w-12 h-px bg-teal-400 mx-auto mt-6" />
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((tItem) => (
                  <div
                    key={tItem.id}
                    className="bg-white rounded-lg p-6 md:p-8 border border-slate-100"
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: tItem.rating }).map((_, i) => (
                        <span key={i} className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-star-fill text-teal-400 text-sm" />
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      &quot;{tItem.content}&quot;
                    </p>
                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-slate-800 text-sm font-bold">{tItem.author}</p>
                      <p className="text-slate-500 text-xs">{tItem.car}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionConnector color="slate" />

        {/* CTA Section */}
        <section id="contact" className="w-full py-20 md:py-28 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                {t('brandHolyauto.cta.title')}
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10">
                {t('brandHolyauto.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="px-10 py-3.5 bg-teal-500 text-white text-sm font-medium rounded-md hover:bg-teal-600 transition-colors duration-200 whitespace-nowrap"
                >
                  {t('brandHolyauto.cta.consult')}
                </a>
                <a
                  href="/contact"
                  className="px-10 py-3.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:border-teal-400 hover:text-teal-600 transition-colors duration-200 whitespace-nowrap"
                >
                  {t('brandHolyauto.cta.visit')}
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionConnector color="slate" />

        {/* Combo Section */}
        <section className="w-full py-16 md:py-20 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandHolyauto.comboSection.label')}
                </p>
                <h2 className="text-slate-900 text-2xl md:text-3xl font-bold tracking-wide mb-4">
                  {t('brandHolyauto.comboSection.title')}
                </h2>
                <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
                  {t('brandHolyauto.comboSection.subtitle')}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-10">
                {/* Step 1 */}
                <div className="relative">
                  <div className="bg-white border border-slate-200 rounded-lg p-6 text-center h-full">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-50 mx-auto mb-4">
                      <i className="ri-tools-line text-teal-500" />
                    </div>
                    <h3 className="text-slate-800 text-sm font-bold mb-2">
                      {t('brandHolyauto.comboSection.step1Brand')}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {t('brandHolyauto.comboSection.step1Desc')}
                    </p>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-slate-300">
                    <i className="ri-arrow-right-line" />
                  </div>
                </div>
                {/* Step 2 */}
                <div className="relative">
                  <div className="bg-white border border-slate-200 rounded-lg p-6 text-center h-full">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-50 mx-auto mb-4">
                      <i className="ri-shield-check-line text-teal-500" />
                    </div>
                    <h3 className="text-slate-800 text-sm font-bold mb-2">
                      {t('brandHolyauto.comboSection.step2Brand')}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {t('brandHolyauto.comboSection.step2Desc')}
                    </p>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-slate-300">
                    <i className="ri-arrow-right-line" />
                  </div>
                </div>
                {/* Step 3 */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 text-center h-full">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-50 mx-auto mb-4">
                    <i className="ri-drop-line text-teal-500" />
                  </div>
                  <h3 className="text-slate-800 text-sm font-bold mb-2">
                    {t('brandHolyauto.comboSection.step3Brand')}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {t('brandHolyauto.comboSection.step3Desc')}
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={250}>
              <div className="text-center">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap"
                >
                  {t('brandHolyauto.comboSection.cta')}
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-right-line" />
                  </span>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionConnector color="slate" dark />

        {/* Next Brand Navigation */}
        <section className="w-full py-16 md:py-20 bg-slate-50 border-t border-slate-200">
          <div className="w-full px-6 md:px-10 max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-10">
                <p className="text-slate-500 text-xs tracking-[0.2em] uppercase mb-2">
                  {t('brandHolyauto.nextBrand.label')}
                </p>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-8 h-px bg-teal-400" />
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-50">
                    <i className="ri-arrow-right-line text-teal-500 text-sm" />
                  </span>
                  <div className="w-8 h-px bg-teal-400" />
                </div>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  {t('brandHolyauto.nextBrand.desc')}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <a
                href="/ledra"
                className="group block bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-teal-300 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row items-stretch">
                  {/* Brand Visual */}
                  <div className="w-full md:w-2/5 relative overflow-hidden">
                    <div className="aspect-[16/10] md:aspect-auto md:h-full">
                      <CraftCanvas variant="grid" kanji="証" rounded={false} className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full font-medium whitespace-nowrap">
                        {t('brandHolyauto.nextBrand.next')}
                      </span>
                    </div>
                    <h3 className="text-slate-800 text-xl md:text-2xl font-bold mb-2 group-hover:text-teal-600 transition-colors duration-200">
                      Ledra
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      {t('brandHolyauto.nextBrand.ledraDesc')}
                    </p>
                    <div className="flex items-center gap-2 text-teal-600 text-sm font-medium">
                      <span>{t('brandHolyauto.nextBrand.viewDetails')}</span>
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
                <span className="text-slate-400 text-xs">{t('brandHolyauto.nextBrand.otherBrands')}</span>
                <a
                  href="/mobilewash"
                  className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs rounded-md hover:border-emerald-300 hover:text-emerald-600 transition-colors duration-200 whitespace-nowrap"
                >
                  MobileWash
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HolyAutoPage;