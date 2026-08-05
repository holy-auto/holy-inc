import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SeoHead from '@/components/base/SeoHead';
import CraftCanvas from "@/components/base/CraftCanvas";
import Breadcrumb from '@/components/feature/Breadcrumb';
import { buildBreadcrumbJsonLd } from '@/utils/seo';
import { submitContactForm, collectFormFields } from '@/lib/contact';

import {
  jobCategories,
  jobOpenings,
  trainingPrograms,
  benefits,
  careerStats,
  culturePoints,
} from "@/mocks/careers";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function CareersPage() {
  const { t } = useTranslation("common");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", position: "", message: "" });

  const categories = [
    { id: "all", label: t("careers.categoryAll", "すべて") },
    ...jobCategories.map((c) => ({ id: c.id, label: c.name })),
  ];

  const filteredJobs = activeCategory === "all"
    ? jobOpenings
    : jobOpenings.filter((j) => {
        const cat = jobCategories.find((c) => c.id === activeCategory);
        return cat && j.category === cat.name;
      });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: "", email: "", phone: "", position: "", message: "" });
  };

  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://holy-inc.jp';

  const jobPostingSchemas = jobOpenings.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    hiringOrganization: {
      "@type": "Organization",
      name: "株式会社HOLY",
      sameAs: baseUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location.replace(/（.*）/, ""),
        addressRegion: "東京都",
        addressCountry: "JP",
      },
    },
    employmentType: job.type.includes('正社員') ? 'FULL_TIME' : 'CONTRACTOR',
    datePosted: '2026-05-01',
    validThrough: '2026-12-31',
    qualifications: job.requirements.join(', '),
    jobBenefits: '社会保険完備、フレックスタイム制、交通費全額支給、道具・機材貸与、自社サービス割引、書籍・セミナー代補助',
    industry: '自動車サービス業',
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <SeoHead
        title={t("careers.seo.title")}
        description={t("careers.seo.description")}
        keywords={t("careers.seo.keywords")}
        ogType="website"
        ogImage="/og/og-careers.png"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: t("careers.seo.structuredDataName"),
            description: t("careers.seo.structuredDataDesc"),
            url: `${baseUrl}/careers`,
          },
          buildBreadcrumbJsonLd(baseUrl, [
            { name: 'ホーム', path: '/' },
            { name: '採用情報', path: '/careers' },
          ]),
          ...jobPostingSchemas,
        ]}
      />

      {/* Hero */}
      <section className="relative h-[480px] md:h-[600px] overflow-hidden pt-16 bg-stone-950">
        <Breadcrumb variant="overlay" />
        <div className="absolute inset-0">
          <CraftCanvas variant="thread" kanji="志" rounded={false} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/20 to-stone-950/70" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <FadeIn>
            <p className="text-teal-300 text-xs md:text-sm tracking-[0.25em] uppercase mb-4 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {t("careers.heroSubtitle", "Careers")}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] [text-shadow:_0_1px_12px_rgba(0,0,0,0.3),_0_1px_2px_rgba(0,0,0,0.5)]">
              {t("careers.heroTitle", "技術を、次の誰かに")}
            </h1>
            <p className="text-white/85 text-sm md:text-base max-w-2xl leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
              {t("careers.heroDesc", "HOLYは「施工技術者」の会社です。あなたの技術を、記録に残し、次の世代に伝える。誇り高き職人として、共に成長しませんか。")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {careerStats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 100}>
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-slate-800 mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-slate-500">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-14 md:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-teal-600 text-xs tracking-[0.2em] uppercase mb-3 font-medium text-center">{t("careers.cultureLabel", "Culture")}</p>
            <h2 className="text-xl md:text-3xl font-bold text-slate-800 text-center mb-10 md:mb-14">{t("careers.cultureTitle", "HOLYで働くということ")}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {culturePoints.map((pt, i) => (
              <FadeIn key={pt.title} delay={i * 100}>
                <div className="bg-white rounded-lg p-5 md:p-6 border border-slate-100 hover:shadow-md transition-shadow">
                  <h3 className="text-sm md:text-base font-bold text-slate-800 mb-2">{pt.title}</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{pt.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-teal-600 text-xs tracking-[0.2em] uppercase mb-3 font-medium text-center">{t("careers.categoriesLabel", "Job Categories")}</p>
            <h2 className="text-xl md:text-3xl font-bold text-slate-800 text-center mb-10 md:mb-14">{t("careers.categoriesTitle", "募集職種")}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-14">
            {jobCategories.map((cat, i) => (
              <FadeIn key={cat.id} delay={i * 100}>
                <div
                  className={`bg-slate-50 rounded-lg p-5 md:p-6 border transition-all cursor-pointer ${
                    activeCategory === cat.id ? "border-teal-400 ring-1 ring-teal-400" : "border-slate-100 hover:border-teal-200"
                  }`}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? "all" : cat.id)}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-teal-50 text-teal-600 mb-3">
                    <i className={`${cat.icon} text-lg md:text-xl`} />
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-slate-800 mb-1">{cat.name}</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{cat.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Filter tabs */}
          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    activeCategory === c.id
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Job Listings */}
          <div className="space-y-3 md:space-y-4">
            {filteredJobs.map((job, i) => (
              <FadeIn key={job.id} delay={i * 80}>
                <div className="bg-white rounded-lg border border-slate-100 overflow-hidden hover:shadow-sm transition-shadow">
                  <button
                    className="w-full text-left p-4 md:p-5 flex items-start justify-between gap-3"
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">{job.category}</span>
                        <span className="text-xs text-slate-500">{job.type}</span>
                        <span className="text-xs text-slate-500">{job.location}</span>
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-slate-800">{job.title}</h3>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center text-slate-500 flex-shrink-0">
                      <i className={`ri-arrow-down-s-line text-lg transition-transform ${expandedJob === job.id ? "rotate-180" : ""}`} />
                    </div>
                  </button>
                  {expandedJob === job.id && (
                    <div className="px-4 md:px-5 pb-5 pt-0 border-t border-slate-50">
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4">{job.description}</p>
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-slate-700 mb-2">{t("careers.requirements", "応募要件")}</h4>
                        <ul className="space-y-1">
                          {job.requirements.map((r, idx) => (
                            <li key={idx} className="text-xs text-slate-500 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-teal-50 rounded-md p-3">
                        <p className="text-xs text-teal-700">
                          <span className="font-bold">{t("careers.ideal", "理想の人材")}：</span>
                          {job.idealCandidate}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
            {filteredJobs.length === 0 && (
              <div className="text-center py-10 text-slate-500 text-sm">{t("careers.noJobs", "該当する募集がありません")}</div>
            )}
          </div>
        </div>
      </section>

      {/* Training */}
      <section className="py-14 md:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-teal-600 text-xs tracking-[0.2em] uppercase mb-3 font-medium text-center">{t("careers.trainingLabel", "Training")}</p>
            <h2 className="text-xl md:text-3xl font-bold text-slate-800 text-center mb-10 md:mb-14">{t("careers.trainingTitle", "育成プログラム")}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {trainingPrograms.map((prog, i) => (
              <FadeIn key={prog.id} delay={i * 100}>
                <div className="bg-white rounded-lg p-5 md:p-6 border border-slate-100 h-full hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-50 text-teal-600 mb-3">
                    <i className={`${prog.icon} text-lg`} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">{prog.name}</h3>
                  <p className="text-xs text-teal-600 font-medium mb-2">{prog.duration}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{prog.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-teal-600 text-xs tracking-[0.2em] uppercase mb-3 font-medium text-center">{t("careers.benefitsLabel", "Benefits")}</p>
            <h2 className="text-xl md:text-3xl font-bold text-slate-800 text-center mb-10 md:mb-14">{t("careers.benefitsTitle", "福利厚生")}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {benefits.map((b, i) => (
              <FadeIn key={b.id} delay={i * 80}>
                <div className="flex gap-3 md:gap-4 p-4 md:p-5 rounded-lg border border-slate-100 hover:border-teal-200 transition-colors">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-teal-50 text-teal-600">
                    <i className={`${b.icon} text-lg`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1">{b.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-14 md:py-20 bg-slate-50">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-teal-600 text-xs tracking-[0.2em] uppercase mb-3 font-medium text-center">{t("careers.applyLabel", "Apply")}</p>
            <h2 className="text-xl md:text-3xl font-bold text-slate-800 text-center mb-4">{t("careers.applyTitle", "応募する")}</h2>
            <p className="text-xs md:text-sm text-slate-500 text-center mb-8 md:mb-10 leading-relaxed">
              {t("careers.applyDesc", "下記フォームからご応募ください。書類選考後、1週間以内にご連絡いたします。")}
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            {formSubmitted ? (
              <div className="bg-white rounded-lg p-8 text-center border border-teal-100">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <i className="ri-check-line text-xl" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{t("careers.applySuccess", "応募を受け付けました")}</h3>
                <p className="text-sm text-slate-500">{t("careers.applySuccessDesc", "担当者より1週間以内にご連絡いたします。")}</p>
              </div>
            ) : (
              <form
                id="career-application"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  try {
                    await submitContactForm("careers", collectFormFields(form));
                    setFormSubmitted(true);
                    form.reset();
                    setTimeout(() => setFormSubmitted(false), 5000);
                  } catch {
                    alert(t("careers.applyError", "送信に失敗しました。時間をおいて再度お試しください。"));
                  }
                }}
                className="bg-white rounded-lg p-5 md:p-8 border border-slate-100 space-y-4 md:space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">{t("careers.formName", "お名前")} <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-3 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                      placeholder={t("careers.formNamePlaceholder", "山田 太郎")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">{t("careers.formEmail", "メールアドレス")} <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-3 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">{t("careers.formPhone", "電話番号")}</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-3 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                      placeholder="090-1234-5678"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">{t("careers.formPosition", "応募職種")} <span className="text-red-500">*</span></label>
                    <select
                      name="position"
                      required
                      className="w-full px-3 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors bg-white"
                    >
                      <option value="">{t("careers.formPositionPlaceholder", "選択してください")}</option>
                      {jobOpenings.map((j) => (
                        <option key={j.id} value={j.title}>{j.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">{t("careers.formMessage", "自己PR・質問など")}</label>
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={500}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-md border border-slate-200 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors resize-none"
                    placeholder={t("careers.formMessagePlaceholder", "ご自由にご記入ください")}
                  />
                  <p className="text-right text-xs text-slate-500 mt-1">{formData.message.length}/500</p>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-md transition-colors whitespace-nowrap"
                >
                  {t("careers.formSubmit", "応募する")}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </div>
  );
}