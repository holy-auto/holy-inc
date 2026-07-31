import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
import SeoHead from '@/components/base/SeoHead';

export default function NotFound() {
  const location = useLocation();
  const { t } = useTranslation('common');

  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://holy-inc.jp';

  return (
    <>
      <SeoHead
        title={t('notFound.title')}
        description={t('notFound.subtitle')}
        noindex
        ogImage="https://readdy.ai/api/search-image?query=Premium%20Japanese%20automotive%20corporate%20brand%20visual%20with%20abstract%20minimalist%20dark%20background%20cool%20teal%20blue%20light%20rays%20and%20geometric%20patterns%20professional%20corporate%20identity%20design%20landscape%20format%20high%20quality%20editorial%20style%20elegant%20subtle%20glow&width=1200&height=630&seq=og-default-002&orientation=landscape"
        ogUrl={`${baseUrl}${location.pathname}`}
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 pt-[72px]">
        <h1 className="absolute bottom-0 text-9xl md:text-[12rem] font-black text-slate-100 select-none pointer-events-none z-0">
          404
        </h1>
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl font-semibold mt-6 text-slate-800">
            {t('notFound.title')}
          </h2>
          <p className="mt-2 text-base text-slate-600 font-mono">{location.pathname}</p>
          <p className="mt-4 text-lg md:text-xl text-slate-600">
            {t('notFound.subtitle')}
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-md transition-colors whitespace-nowrap"
          >
            <i className="ri-home-line" />
            {t('notFound.backHome')}
          </a>
        </div>
      </div>
    </>
  );
}