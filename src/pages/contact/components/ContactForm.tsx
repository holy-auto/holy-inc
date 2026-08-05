import { useState } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { submitContactForm, collectFormFields } from '@/lib/contact';

const ContactForm: FC = () => {
  const { t } = useTranslation('common');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  // Get arrays from translation with returnObjects
  const inquiryTypes = t('contact.inquiryTypes', { returnObjects: true }) as Array<{ value: string; label: string }>;
  const contactMethods = t('contact.contactMethods', { returnObjects: true }) as Array<{ value: string; label: string }>;
  const formLabels = t('contact.form', { returnObjects: true }) as Record<string, string>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;

    try {
      await submitContactForm('contact', collectFormFields(form));
      setStatus('success');
      form.reset();
      setCharCount(0);
    } catch {
      setStatus('error');
    }
  };

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="neu-card rounded-[20px] p-6 md:p-8"
    >
      {status === 'success' && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-700 text-sm">
          <div className="flex items-center gap-2 mb-1">
            <i className="ri-check-line text-lg" />
            <strong>{formLabels.successTitle}</strong>
          </div>
          <p>{formLabels.successMsg}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          <div className="flex items-center gap-2 mb-1">
            <i className="ri-error-warning-line text-lg" />
            <strong>{formLabels.errorTitle}</strong>
          </div>
          <p>{formLabels.errorMsg}</p>
        </div>
      )}

      <div className="space-y-5">
        {/* お名前 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
            {formLabels.name} <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={formLabels.namePlaceholder}
            className="w-full px-4 py-2.5 bg-slate-50 rounded-md text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
          />
        </div>

        {/* メール */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
            {formLabels.email} <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={formLabels.emailPlaceholder}
            className="w-full px-4 py-2.5 bg-slate-50 rounded-md text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
          />
        </div>

        {/* 電話番号 */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
            {formLabels.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={formLabels.phonePlaceholder}
            className="w-full px-4 py-2.5 bg-slate-50 rounded-md text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
          />
        </div>

        {/* お問い合わせ種別 */}
        <div>
          <label htmlFor="inquiry_type" className="block text-sm font-medium text-slate-700 mb-1.5">
            {formLabels.inquiryType} <span className="text-red-500">*</span>
          </label>
          <select
            id="inquiry_type"
            name="inquiry_type"
            required
            className="w-full px-4 py-2.5 bg-slate-50 rounded-md text-sm text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
          >
            <option value="">{formLabels.selectPlaceholder}</option>
            {inquiryTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* ご希望の連絡方法 */}
        <div>
          <label htmlFor="contact_method" className="block text-sm font-medium text-slate-700 mb-1.5">
            {formLabels.contactMethod}
          </label>
          <select
            id="contact_method"
            name="contact_method"
            className="w-full px-4 py-2.5 bg-slate-50 rounded-md text-sm text-slate-800 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
          >
            {contactMethods.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* お問い合わせ内容 */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
            {formLabels.message} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={500}
            placeholder={formLabels.messagePlaceholder}
            onChange={(e) => setCharCount(e.target.value.length)}
            className="w-full px-4 py-2.5 bg-slate-50 rounded-md text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors resize-none"
          />
          <p className="text-xs text-slate-500 mt-1 text-right">
            {formLabels.charCount?.replace('{count}', String(charCount))}
          </p>
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full px-8 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white text-sm font-medium rounded-md transition-colors whitespace-nowrap flex items-center justify-center gap-2"
        >
          {status === 'sending' ? (
            <>
              <i className="ri-loader-4-line animate-spin" />
              {formLabels.sending}
            </>
          ) : (
            <>
              <i className="ri-send-plane-line" />
              {formLabels.send}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;