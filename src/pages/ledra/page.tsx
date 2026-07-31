import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SeoHead from '../../components/base/SeoHead';
import FadeIn from '../../components/base/FadeIn';
import ParallaxBackground from '../../components/base/ParallaxBackground';
import SectionConnector from '../../components/base/SectionConnector';
import CountUpStats from '../../components/base/CountUpStats';
import Breadcrumb from '@/components/feature/Breadcrumb';
import { buildBreadcrumbJsonLd } from '@/utils/seo';

interface LedraFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface LedraUseCase {
  id: string;
  role: string;
  title: string;
  description: string;
  benefit: string;
  imageUrl: string;
}

interface TechLayer {
  name: string;
  description: string;
  icon: string;
}

interface Stat {
  value: string;
  label: string;
  description: string;
}

interface Step {
  step: string;
  title: string;
  desc: string;
  icon: string;
}

const baseUrl = import.meta.env.VITE_SITE_URL || 'https://holy-inc.jp';

const LedraPage: FC = () => {
  const { t } = useTranslation('common');
  const seo = t('brandLedra.seo', { returnObjects: true }) as Record<string, string>;
  const problemSolution = t('brandLedra.problemSolution', { returnObjects: true }) as {
    problems: string[];
    solutions: string[];
    label: string;
    title: string;
    subtitle: string;
    problemTitle: string;
    solutionTitle: string;
  };
  const techLayers = t('brandLedra.tech.layers', { returnObjects: true }) as TechLayer[];
  const stats = t('brandLedra.stats', { returnObjects: true }) as Stat[];
  const features = t('brandLedra.features.items', { returnObjects: true }) as LedraFeature[];
  const useCases = t('brandLedra.useCases.cases', { returnObjects: true }) as LedraUseCase[];
  const steps = t('brandLedra.howItWorks.steps', { returnObjects: true }) as Step[];

  return (
    <div className="min-h-screen">
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogType="product"
        ogImage="https://readdy.ai/api/search-image?query=Abstract%20futuristic%20blockchain%20technology%20visualization%20with%20interconnected%20glowing%20nodes%20forming%20a%20secure%20digital%20network%20around%20a%20holographic%20luxury%20vehicle%20silhouette%2C%20encrypted%20data%20streams%20flowing%20through%20translucent%20geometric%20pathways%2C%20deep%20teal%20and%20electric%20cyan%20light%20trails%20against%20an%20ultra-dark%20background%2C%20premium%20automotive%20data%20security%20concept%20art%2C%20professional%20commercial%20photography%2C%208K%20ultra%20detailed%2C%20cinematic%20lighting%20with%20volumetric%20light%20rays%2C%20dark%20cyberpunk%20atmosphere%20with%20sophisticated%20color%20grading%2C%20no%20text&width=1440&height=700&seq=ledra-og-pro-005&orientation=landscape"
        structuredData={[
          buildBreadcrumbJsonLd(baseUrl, [
            { name: 'ホーム', path: '/' },
            { name: 'Ledra', path: '/ledra' },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: seo.structuredDataName,
            description: seo.structuredDataDesc,
            brand: { "@type": "Brand", name: "Ledra" },
            url: `${baseUrl}/ledra`,
            offers: {
              '@type': 'Offer',
              url: `${baseUrl}/ledra`,
              priceCurrency: 'JPY',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: '株式会社HOLY',
                url: baseUrl,
              },
            },
          },
        ]}
      />
      <Breadcrumb className="bg-white border-b border-slate-100 pt-20 md:pt-28" />
      <main className="w-full">
        {/* Hero Section */}
        <section className="relative w-full min-h-[520px] md:min-h-[620px] flex items-center justify-center overflow-hidden bg-slate-50">
          <ParallaxBackground
            src="https://readdy.ai/api/search-image?query=Abstract%20futuristic%20blockchain%20technology%20visualization%20with%20interconnected%20glowing%20nodes%20forming%20a%20secure%20digital%20network%20around%20a%20holographic%20luxury%20vehicle%20silhouette%2C%20encrypted%20data%20streams%20flowing%20through%20translucent%20geometric%20pathways%2C%20deep%20teal%20and%20electric%20cyan%20light%20trails%20against%20an%20ultra-dark%20background%2C%20premium%20automotive%20data%20security%20concept%20art%2C%20professional%20commercial%20photography%2C%208K%20ultra%20detailed%2C%20cinematic%20lighting%20with%20volumetric%20light%20rays%2C%20dark%20cyberpunk%20atmosphere%20with%20sophisticated%20color%20grading%2C%20no%20text&width=1440&height=700&seq=ledra-hero-pro-005&orientation=landscape"
            alt="Ledra Technology"
            speed={0.35}
            fetchPriority="high"
            imgClassName="opacity-60"
            overlay={
              <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/15 to-white/40" />
            }
          />

          <div className="relative z-10 text-center px-6 md:px-10 max-w-4xl mx-auto pt-20">
            <p className="text-teal-300 text-xs tracking-[0.3em] uppercase mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {t('brandLedra.hero.label')}
            </p>
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wide mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
              {t('brandLedra.hero.title')}
            </h1>
            <div className="w-16 h-px bg-teal-300 mx-auto mb-6" />
            <p className="text-white/95 text-lg md:text-xl tracking-wide mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              {t('brandLedra.hero.subtitle1')}
            </p>
            <p className="text-white/85 text-sm md:text-base max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              {t('brandLedra.hero.subtitle2')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <a
                href="#features"
                className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
              >
                {t('brandLedra.hero.viewFeatures')}
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-white/50 hover:border-white hover:bg-white/10 text-white text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                {t('brandLedra.hero.inquire')}
              </a>
            </div>
          </div>

          <a
            href="#features"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <span className="text-white/70 text-xs tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{t('ui.scroll')}</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/70 to-transparent" />
          </a>
        </section>

        <SectionConnector color="teal" dark />

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

        <SectionConnector color="teal" />

        {/* Technology Stack */}
        <section className="w-full py-20 md:py-28 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandLedra.tech.label')}
                </p>
                <h2 className="text-slate-800 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                  {t('brandLedra.tech.title')}
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  {t('brandLedra.tech.subtitle')}
                </p>
                <div className="w-12 h-px bg-teal-400 mx-auto mt-6" />
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {techLayers.map((layer, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-200 rounded-lg p-6 hover:border-teal-300 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-teal-50 mb-4">
                      <i className={`${layer.icon} text-teal-600 text-xl`} />
                    </div>
                    <h3 className="text-slate-800 text-base font-bold mb-2">
                      {layer.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionConnector color="teal" dark />

        {/* Stats Section */}
        <CountUpStats stats={stats} theme="light" />

        <SectionConnector color="teal" />

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandLedra.features.label')}
                </p>
                <h2 className="text-slate-800 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                  {t('brandLedra.features.title')}
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  {t('brandLedra.features.subtitle')}
                </p>
                <div className="w-12 h-px bg-teal-400 mx-auto mt-6" />
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-white rounded-lg p-6 md:p-8 border border-slate-100 hover:border-teal-200 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-teal-50 mb-5">
                      <i className={`${feature.icon} text-teal-600 text-xl`} />
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

        <SectionConnector color="teal" />

        {/* Use Cases Section */}
        <section className="w-full py-20 md:py-28 bg-white">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandLedra.useCases.label')}
                </p>
                <h2 className="text-slate-800 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                  {t('brandLedra.useCases.title')}
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  {t('brandLedra.useCases.subtitle')}
                </p>
                <div className="w-12 h-px bg-teal-400 mx-auto mt-6" />
              </div>
            </FadeIn>

            <div className="space-y-16 md:space-y-20">
              {useCases.map((useCase, index) => (
                <FadeIn key={useCase.id} delay={index * 100} direction={index % 2 === 0 ? 'left' : 'right'}>
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } gap-8 lg:gap-12 items-center`}
                  >
                    {/* Image */}
                    <div className="w-full lg:w-1/2">
                      <div className="rounded-lg overflow-hidden aspect-[5/3.5] bg-slate-200">
                        <img
                          src={useCase.imageUrl}
                          alt={useCase.role}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          width={700}
                          height={490}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2">
                      <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs rounded-full font-medium mb-4 whitespace-nowrap">
                        {useCase.role}
                      </span>
                      <h3 className="text-slate-800 text-2xl md:text-3xl font-bold mb-4">
                        {useCase.title}
                      </h3>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                        {useCase.description}
                      </p>
                      <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-4">
                        <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                          <i className="ri-line-chart-line text-teal-500" />
                        </span>
                        <span className="text-slate-700 text-sm font-medium">
                          {useCase.benefit}
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <SectionConnector color="teal" />

        {/* Flow Section - How it works */}
        <section className="w-full py-20 md:py-28 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandLedra.howItWorks.label')}
                </p>
                <h2 className="text-slate-800 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                  {t('brandLedra.howItWorks.title')}
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  {t('brandLedra.howItWorks.subtitle')}
                </p>
                <div className="w-12 h-px bg-teal-400 mx-auto mt-6" />
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
                {steps.map((item, i) => (
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
                        {item.desc}
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

        <SectionConnector color="teal" dark />

        {/* CTA Section */}
        <section id="contact" className="w-full py-20 md:py-28 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-wide mb-4">
                {t('brandLedra.cta.title')}
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10">
                {t('brandLedra.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="px-10 py-3.5 bg-teal-500 text-white text-sm font-medium rounded-md hover:bg-teal-600 transition-colors duration-200 whitespace-nowrap"
                >
                  {t('brandLedra.cta.contact')}
                </a>
                <a
                  href="/contact"
                  className="px-10 py-3.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:border-teal-400 hover:text-teal-600 transition-colors duration-200 whitespace-nowrap"
                >
                  {t('brandLedra.cta.requestDocs')}
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionConnector color="teal" />

        {/* Combo Section */}
        <section className="w-full py-16 md:py-20 bg-slate-50">
          <div className="w-full px-6 md:px-10 max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-teal-600 text-xs tracking-[0.3em] uppercase mb-3">
                  {t('brandLedra.comboSection.label')}
                </p>
                <h2 className="text-slate-900 text-2xl md:text-3xl font-bold tracking-wide mb-4">
                  {t('brandLedra.comboSection.title')}
                </h2>
                <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
                  {t('brandLedra.comboSection.subtitle')}
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
                      {t('brandLedra.comboSection.step1Brand')}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {t('brandLedra.comboSection.step1Desc')}
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
                      {t('brandLedra.comboSection.step2Brand')}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {t('brandLedra.comboSection.step2Desc')}
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
                    {t('brandLedra.comboSection.step3Brand')}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {t('brandLedra.comboSection.step3Desc')}
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
                  {t('brandLedra.comboSection.cta')}
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-right-line" />
                  </span>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionConnector color="teal" dark />

        {/* Next Brand Navigation */}
        <section className="w-full py-16 md:py-20 bg-slate-50 border-t border-slate-200">
          <div className="w-full px-6 md:px-10 max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-10">
                <p className="text-slate-500 text-xs tracking-[0.2em] uppercase mb-2">
                  {t('brandLedra.nextBrand.label')}
                </p>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-8 h-px bg-teal-400" />
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-50">
                    <i className="ri-arrow-right-line text-teal-500 text-sm" />
                  </span>
                  <div className="w-8 h-px bg-teal-400" />
                </div>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  {t('brandLedra.nextBrand.desc')}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <a
                href="/mobilewash"
                className="group block bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-teal-300 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row items-stretch">
                  {/* Brand Visual */}
                  <div className="w-full md:w-2/5 relative overflow-hidden">
                    <div className="aspect-[16/10] md:aspect-auto md:h-full bg-slate-200">
                      <img
                        src="https://readdy.ai/api/search-image?query=Premium%20mobile%20car%20wash%20service%20van%20with%20professional%20equipment%20parked%20beside%20a%20gleaming%20luxury%20sedan%20at%20a%20modern%20urban%20residence%2C%20water%20droplets%20catching%20dramatic%20golden%20hour%20light%20as%20a%20uniformed%20technician%20performs%20meticulous%20hand%20washing%2C%20sleek%20branded%20service%20vehicle%20with%20polished%20chrome%20details%20and%20advanced%20cleaning%20apparatus%2C%20cinematic%20automotive%20care%20photography%2C%20professional%20commercial%20style%2C%208K%20ultra%20detailed%2C%20shallow%20depth%20of%20field%2C%20warm%20and%20cool%20lighting%20contrast%20against%20dark%20sophisticated%20background%2C%20no%20text&width=640&height=360&seq=ledra-next-mobilewash-pro-005&orientation=landscape"
                        alt="MobileWash"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={360}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:to-white/40" />
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full font-medium whitespace-nowrap">
                        {t('brandLedra.nextBrand.next')}
                      </span>
                    </div>
                    <h3 className="text-slate-800 text-xl md:text-2xl font-bold mb-2 group-hover:text-teal-600 transition-colors duration-200">
                      MobileWash
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      {t('brandLedra.nextBrand.mobilewashDesc')}
                    </p>
                    <div className="flex items-center gap-2 text-teal-600 text-sm font-medium">
                      <span>{t('brandLedra.nextBrand.viewDetails')}</span>
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
                <span className="text-slate-400 text-xs">{t('brandLedra.nextBrand.otherBrands')}</span>
                <a
                  href="/holy-auto"
                  className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors duration-200 whitespace-nowrap"
                >
                  HOLY AUTO
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LedraPage;