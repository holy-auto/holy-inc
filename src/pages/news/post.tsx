import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import SeoHead from '@/components/base/SeoHead';
import FadeIn from '@/components/base/FadeIn';
import Breadcrumb from '@/components/feature/Breadcrumb';
import { buildBreadcrumbJsonLd } from '@/utils/seo';
import { getNewsPost, formatNewsDate } from '@/lib/news';
import NotFound from '@/pages/NotFound';

const baseUrl = import.meta.env.VITE_SITE_URL || 'https://holy-inc.jp';

/** お知らせの記事ページ。本文のある記事だけが到達できる（薄いページを作らない）。 */
const NewsPostPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation('common');
  const ja = i18n.language.startsWith('ja');
  const post = slug ? getNewsPost(slug) : undefined;

  if (!post || post.body.length === 0) return <NotFound />;

  const title = ja ? post.title : post.titleEn;
  const category = ja ? post.category : post.categoryEn;
  const url = `${baseUrl}/news/${post.slug}`;

  return (
    <div className="min-h-screen">
      <SeoHead
        title={`${title} | ${t('newsIndex.heading')} | 株式会社HOLY`}
        description={post.body[0].slice(0, 120)}
        ogType="article"
        canonical={url}
        lastModified={post.date}
        structuredData={[
          buildBreadcrumbJsonLd(baseUrl, [
            { name: ja ? 'ホーム' : 'Home', path: '/' },
            { name: ja ? 'お知らせ' : 'News', path: '/news' },
            { name: title, path: `/news/${post.slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: title,
            datePublished: post.date,
            dateModified: post.date,
            url,
            inLanguage: ja ? 'ja' : 'en',
            articleSection: category,
            author: { '@type': 'Organization', name: '株式会社HOLY', url: baseUrl },
            publisher: {
              '@type': 'Organization',
              name: '株式会社HOLY',
              url: baseUrl,
              logo: { '@type': 'ImageObject', url: `${baseUrl}/favicon-512.png` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          },
        ]}
      />
      <main>
        <section className="relative text-slate-900 pt-24 pb-10 md:pt-32 md:pb-14 overflow-hidden">
          <Breadcrumb variant="overlay" />
          <div className="relative w-full px-6 md:px-10 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <time dateTime={post.date} className="text-sm tabular-nums tracking-wide text-slate-400">
                {formatNewsDate(post.date)}
              </time>
              <span className="inline-flex items-center rounded-full border border-accent-teal/30 px-2.5 py-0.5 text-[11px] tracking-wide text-accent-teal">
                {category}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-relaxed text-[color:var(--neu-ink)]">
              {title}
            </h1>
          </div>
        </section>

        <section className="w-full pb-20 md:pb-28">
          <div className="w-full px-6 md:px-10 max-w-3xl mx-auto">
            <FadeIn>
              <div className="space-y-5">
                {post.body.map((paragraph, i) => (
                  <p key={i} className="text-slate-700 text-sm md:text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-slate-200/70">
                <a href="/news" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-accent-teal transition-colors">
                  <i className="ri-arrow-left-line" aria-hidden="true" />
                  {t('newsIndex.backToList')}
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NewsPostPage;
