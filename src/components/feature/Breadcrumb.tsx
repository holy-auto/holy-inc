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
  /**
   * "bar"     – a standalone light strip (default; dark text on light bg).
   * "overlay" – pinned to the top of a `relative` dark hero, above the page
   *             title, in light text. This is the clearest placement: the
   *             current location reads right where the eye lands on the page.
   */
  variant?: 'bar' | 'overlay';
}

export default function Breadcrumb({ customCrumbs, className = '', variant = 'bar' }: BreadcrumbProps) {
  const location = useLocation();
  const { t } = useTranslation('common');

  const config = BREADCRUMB_MAP[location.pathname];
  if (!config && !customCrumbs) return null;

  const crumbs = customCrumbs || [
    { name: config!.parent!.name, path: config!.parent!.path },
    { name: config!.label, path: location.pathname },
  ];

  const overlay = variant === 'overlay';

  const navClass = overlay
    ? `absolute top-0 inset-x-0 z-20 px-6 md:px-10 pt-20 md:pt-24 ${className}`
    : `py-3 px-6 md:px-10 ${className}`;

  // Heroes are now the light matte material, so overlay crumbs read in ink.
  const listClass = 'flex items-center gap-2 text-xs flex-wrap max-w-6xl mx-auto text-slate-500';
  void overlay;

  return (
    <nav aria-label="Breadcrumb" className={navClass}>
      <ol className={listClass}>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {index > 0 && (
                <span className="w-4 h-4 flex items-center justify-center text-slate-400">
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
                  className="whitespace-nowrap transition-colors hover:text-accent-teal"
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
