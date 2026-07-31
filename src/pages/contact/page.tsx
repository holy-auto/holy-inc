import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SeoHead from '@/components/base/SeoHead';
import FadeIn from '@/components/base/FadeIn';
import MapCard from '@/components/feature/MapCard';
import ContactForm from './components/ContactForm';
import CompanyInfo from './components/CompanyInfo';
import FAQAccordion from './components/FAQAccordion';
import ContactGuidance from './components/ContactGuidance';
import ConsultationFlow from './components/ConsultationFlow';
import Breadcrumb from '@/components/feature/Breadcrumb';
import { buildBreadcrumbJsonLd } from '@/utils/seo';

const baseUrl = import.meta.env.VITE_SITE_URL || 'https://holy-inc.jp';

interface Store {
  name: string;
  address: string;
  access: string;
  phone: string;
  hours: string;
  services: string[];
}

const ContactPage: FC = () => {
  const { t } = useTranslation('common');
  const seo = t('contact.seo', { returnObjects: true }) as Record<string, string>;

  const contactFaqs = t('contact.faqData', { returnObjects: true }) as Array<{ question: string; answer: string }>;
  const stores = t('contact.stores', { returnObjects: true }) as Store[];

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogType="website"
        ogImage="https://readdy.ai/api/search-image?query=Modern%20Japanese%20corporate%20office%20interior%20with%20cool%20natural%20lighting%20through%20large%20windows%20minimalist%20reception%20desk%20with%20slate%20and%20metal%20materials%20teal%20cool%20tones%20premium%20corporate%20headquarters%20atmosphere%20clean%20architectural%20photography%20professional%20business%20environment%20high%20quality%20editorial%20style&width=1400&height=600&seq=contact-hero-002&orientation=landscape"
        structuredData={[
          buildBreadcrumbJsonLd(baseUrl, [
            { name: 'ホーム', path: '/' },
            { name: 'お問い合わせ', path: '/contact' },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: seo.structuredDataName,
            description: seo.structuredDataDesc,
            url: `${baseUrl}/contact`,
            mainEntity: {
              "@type": "Organization",
              name: "株式会社HOLY",
              telephone: "03-4363-3234",
              email: "info@holy-inc.jp",
              address: {
                "@type": "PostalAddress",
                streetAddress: "北青山1-3-1 アールキューブ青山3F",
                addressLocality: "港区",
                addressRegion: "東京都",
                postalCode: "107-0061",
                addressCountry: "JP",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+81-3-4363-3234",
                contactType: "customer service",
                availableLanguage: ["ja", "en"],
              },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: contactFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ]}
      />
      <Breadcrumb className="bg-white border-b border-slate-100 pt-20 md:pt-28" />
      <main>
        {/* Hero */}
        <section className="relative bg-slate-50 text-slate-900 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Modern%20Japanese%20corporate%20office%20interior%20with%20cool%20natural%20lighting%20through%20large%20windows%2C%20minimalist%20reception%20desk%20with%20slate%20and%20metal%20materials%2C%20teal%20cool%20tones%2C%20premium%20corporate%20headquarters%20atmosphere%2C%20clean%20architectural%20photography%2C%20professional%20business%20environment%2C%20high%20quality%20editorial%20style&width=1400&height=600&seq=contact-hero-002&orientation=landscape"
              alt=""
              className="w-full h-full object-cover opacity-55"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={1400}
              height={600}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/15 to-white/40" />
          <div className="relative w-full px-6 md:px-10 max-w-4xl mx-auto text-center">
            <p className="text-teal-300 text-sm tracking-[0.3em] uppercase mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {t('contact.hero.label')}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] [text-shadow:_0_1px_12px_rgba(0,0,0,0.3),_0_1px_2px_rgba(0,0,0,0.5)]">
              {t('contact.hero.title')}
            </h1>
            <p className="text-white/85 text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
              {t('contact.hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Contact + Info */}
        <section className="w-full px-6 md:px-10 py-16 md:py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <FadeIn>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
                  {t('contact.formTitle')}
                </h2>
                <ContactForm />
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <FadeIn delay={150} direction="right">
                {/* Phone */}
                <div className="bg-teal-50 rounded-lg p-6 border border-teal-100">
                  <p className="text-xs tracking-[0.2em] uppercase mb-2 text-teal-600/80">
                    {t('contact.phone.label')}
                  </p>
                  <a
                    href={`tel:${t('contact.phone.number')}`}
                    className="text-2xl md:text-3xl font-bold block mb-1 text-teal-700 hover:text-teal-800 transition-opacity"
                  >
                    {t('contact.phone.number')}
                  </a>
                  <p className="text-sm text-teal-600/70">
                    {t('contact.phone.hours')}
                  </p>
                </div>

                {/* Company Info */}
                <div>
                  <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-building-line text-teal-500" />
                    </span>
                    {t('contact.companyInfoTitle')}
                  </h3>
                  <CompanyInfo />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <ContactGuidance />

        {/* FAQ */}
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="w-full px-6 md:px-10 max-w-3xl mx-auto">
            <FadeIn>
              <div className="text-center mb-10">
                <p className="text-slate-500 text-sm tracking-[0.2em] uppercase mb-3">
                  {t('contact.faq.label')}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                  {t('contact.faq.title')}
                </h2>
              </div>
              <FAQAccordion />
            </FadeIn>
          </div>
        </section>

        <ConsultationFlow />

        {/* Store Access */}
        <section id="stores" className="w-full px-6 md:px-10 py-16 md:py-20 max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-slate-500 text-sm tracking-[0.2em] uppercase mb-3">
                {t('contact.storeInfoTitle')}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                {t('contact.access.title')}
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto mt-3">
                {t('contact.access.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stores.map((store, idx) => (
                <MapCard
                  key={store.name}
                  title={store.name}
                  mapUrl={`https://maps.google.com/maps?q=${encodeURIComponent(store.address)}&z=17&ie=UTF8&iwloc=&output=embed`}
                  address={store.address}
                  access={store.access}
                  phone={store.phone}
                  hours={store.hours}
                  services={store.services}
                  routeUrl={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`}
                  routeLabel={t('contact.access.routeSearch')}
                  delay={100 * (idx + 1)}
                />
              ))}
            </div>
          </FadeIn>
        </section>
      </main>
    </>
  );
};

export default ContactPage;