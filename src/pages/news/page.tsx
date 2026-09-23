import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SeoHead from '@/components/base/SeoHead';
import FadeIn from '@/components/base/FadeIn';
import Breadcrumb from '@/components/feature/Breadcrumb';
import { buildBreadcrumbJsonLd } from '@/utils/seo';
import { newsPosts, formatNewsDate } from '@/lib/news';

const baseUrl = import.meta.env.VITE_SITE_URL || 'https://www.holy-inc.jp';

/** お知らせ一覧。記事は src/content/news/*.md を足すだけで増える。 */
const NewsIndexPage: FC = () => {
  const { t, i18n } = useTranslation('common');
  const ja = i18n.language.startsWith('ja');
  const seo = t('newsIndex.seo', { returnObjects: true }) as Record<string, string>;

  return (
    <div className="min-h-screen">
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogType="website"
        structuredData={[
          buildBreadcrumbJsonLd(baseUrl, [
            { name: ja ? 'ホーム' : 'Home', path: '/' },
            { name: ja ? 'お知らせ' : 'News', path: '/news' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: seo.title,
            description: seo.description,
            url: `${baseUrl}/news`,
            inLanguage: ja ? 'ja' : 'en',
            hasPart: newsPosts.map((post) => ({
              '@type': 'NewsArticle',
              headline: ja ? post.title : post.titleEn,
              datePublished: post.date,
              url: `${baseUrl}/news/${post.slug}`,
              author: { '@type': 'Organization', name: '株式会社HOLY' },
            })),
          },
        ]}
      />
      <main>
        <section className="relative text-slate-900 pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
          <Breadcrumb variant="overlay" />
          <span className="pointer-events-none absolute right-[-4vw] top-1/2 -translate-y-1/2 select-none font-serif leading-none" style={{ fontSize: 'clamp(13rem, 34vw, 34rem)', color: 'var(--neu-bg)', textShadow: '6px 6px 14px rgba(163,177,198,.5), -6px -6px 14px rgba(255,255,255,.85)' }} aria-hidden="true">報</span>
          <div className="relative w-full px-6 md:px-10 max-w-4xl mx-auto text-center">
            <p className="text-[color:var(--neu-accent)] text-sm tracking-[0.3em] uppercase mb-4">News</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[color:var(--neu-ink)]">
              {t('newsIndex.heading')}
            </h1>
          </div>
        </section>

        <section className="w-full pb-20 md:pb-28">
          <div className="w-full px-6 md:px-10 max-w-4xl mx-auto">
            <FadeIn>
              <ul className="border-t border-slate-200/70">
                {newsPosts.map((post) => {
                  const title = ja ? post.title : post.titleEn;
                  const category = ja ? post.category : post.categoryEn;
                  const hasBody = post.body.length > 0;
                  const row = (
                    <div className="group flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                      <time dateTime={post.date} className="w-24 shrink-0 text-sm tabular-nums tracking-wide text-slate-400">
                        {formatNewsDate(post.date)}
                      </time>
                      <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-accent-teal/30 px-2.5 py-0.5 text-[11px] tracking-wide text-accent-teal">
                        {category}
                      </span>
                      <p className="text-sm leading-relaxed text-slate-700 transition-colors duration-200 group-hover:text-slate-900 md:text-base">
                        {title}
                      </p>
                    </div>
                  );
                  return (
                    <li key={post.slug} className="border-b border-slate-200/70">
                      {hasBody ? <a href={`/news/${post.slug}`}>{row}</a> : row}
                    </li>
                  );
                })}
              </ul>
            </FadeIn>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NewsIndexPage;
