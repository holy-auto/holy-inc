import type { FC, FormEvent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { submitContactForm, collectFormFields } from "@/lib/contact";

const ContactSection: FC = () => {
  const { t } = useTranslation("common");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget as HTMLFormElement;

    try {
      await submitContactForm("home", collectFormFields(form));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="w-full py-20 md:py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-teal/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 w-full px-6 md:px-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent-teal text-xs tracking-[0.3em] uppercase mb-3">{t("section.contact")}</p>
          <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-wide mb-4">
            {t("nav.contact")}
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            {t("contactSection.subtitle")}
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-teal/60 to-transparent mx-auto mt-6" />
        </div>

        {/* Contact Form */}
        <form
          id="holy-contact"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-slate-700 text-sm font-medium mb-2">
                {t("form.name")} <span className="text-accent-teal">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 neu-input text-sm"
                placeholder={t("form.namePlaceholder")}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-slate-700 text-sm font-medium mb-2">
                {t("form.email")} <span className="text-accent-teal">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 neu-input text-sm"
                placeholder={t("form.emailPlaceholder")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-slate-700 text-sm font-medium mb-2">
              {t("form.company")}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full px-4 py-3 neu-input text-sm"
              placeholder={t("form.companyPlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-slate-700 text-sm font-medium mb-2">
              {t("form.subject")}
            </label>
            <select
              id="subject"
              name="subject"
              className="w-full px-4 py-3 neu-input text-sm"
            >
              <option value="" className="bg-white text-slate-500">{t("form.subjectPlaceholder")}</option>
              <option value="ledra" className="bg-white">{t("form.ledraSubject")}</option>
              <option value="mobilewash" className="bg-white">{t("form.mobilewashSubject")}</option>
              <option value="holy-auto" className="bg-white">{t("form.holyautoSubject")}</option>
              <option value="partnership" className="bg-white">{t("form.partnership")}</option>
              <option value="recruit" className="bg-white">{t("form.recruit")}</option>
              <option value="other" className="bg-white">{t("form.other")}</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-slate-700 text-sm font-medium mb-2">
              {t("form.message")} <span className="text-accent-teal">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={500}
              className="w-full px-4 py-3 neu-input text-sm resize-none"
              placeholder={t("form.messagePlaceholder")}
            />
            <p className="text-slate-400 text-xs mt-1 text-right">{t("form.messageLimit")}</p>
          </div>

          <div className="text-center">
            {status === "success" && (
              <div className="mb-4 p-4 bg-accent-teal/10 border border-accent-teal/20 rounded-lg text-accent-teal text-sm">
                <span className="w-4 h-4 inline-flex items-center justify-center mr-1">
                  <i className="ri-check-line" />
                </span>
                {t("form.success")}
              </div>
            )}
            {status === "error" && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                <span className="w-4 h-4 inline-flex items-center justify-center mr-1">
                  <i className="ri-error-warning-line" />
                </span>
                {t("form.error")}
              </div>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 neu-btn neu-btn-primary disabled:opacity-60 px-10 py-4 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 whitespace-nowrap shadow-[0_0_20px_rgba(0,212,170,0.2)] hover:shadow-[0_0_30px_rgba(0,212,170,0.35)]"
            >
              {status === "submitting" ? (
                <>
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-loader-4-line animate-spin" />
                  </span>
                  {t("ui.sending")}
                </>
              ) : (
                <>
                  {t("ui.submit")}
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-send-plane-line" />
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;