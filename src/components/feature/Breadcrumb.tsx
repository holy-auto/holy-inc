import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const BREADCRUMB_MAP: Record<string, { label: string; parent?: { name: string; path: string } }> = {
  '/about': { label: '会社概要', parent: { name: 'ホーム', path: '/' } },
  '/contact': { label: 'お問い合わせ', parent: { name: 'ホーム', path: '/' } },
  '/careers': { label: '採用情報', parent: { name: 'ホーム', path: '/' } },
  '/ledra': { label: 'Ledra', parent: { name: 'ホーム', path: '/' } },
  '/mobilewash': { label: 'MobileWash', parent: { name: 'ホーム', path: '/' } },
  '/holy-auto': { label: 'HOLY AUTO', parent: { name: 'ホーム', path: '/' } },
  '/privacy': { label: 'プライバシーポリシー', parent: { name: 'ホーム', path: '/' } },
  '/terms': { label: '利用規約', parent: { name: 'ホーム', path: '/' } },
};

interface BreadcrumbProps {
  customCrumbs?: { name: string; path: string }[];
  className?: string;
}

export default function Breadcrumb({ customCrumbs, className = '' }: BreadcrumbProps) {
  const location = useLocation();
  const { t } = useTranslation('common');

  const config = BREADCRUMB_MAP[location.pathname];
  if (!config && !customCrumbs) return null;

  const crumbs = customCrumbs || [
    { name: config!.parent!.name, path: config!.parent!.path },
    { name: config!.label, path: location.pathname },
  ];

  return (
    <nav aria-label="Breadcrumb" className={`py-3 px-6 md:px-10 ${className}`}>
      <ol className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {index > 0 && (
                <span className="w-4 h-4 flex items-center justify-center text-slate-500">
                  <i className="ri-arrow-right-s-line" />
                </span>
              )}
              {isLast ? (
                <span className="text-slate-600 font-medium" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <a
                  href={crumb.path}
                  className="hover:text-teal-600 transition-colors whitespace-nowrap"
                >
                  {crumb.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}