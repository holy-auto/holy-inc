import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { newsPosts, formatNewsDate } from "@/lib/news";

/** トップに出す件数。全件は /news で見せる。 */
const HOME_LIMIT = 5;

/**
 * お知らせ / News — a quiet, editorial list (date · category · title).
 *
 * 記事は `src/content/news/<slug>.md` が出典。ファイルを1つ足せばここにも
 * /news にも sitemap にも RSS にも載る。コードの書き換えは要らない。
 */
const NewsSection: FC = () => {
  const { t, i18n } = useTranslation("common");
  const ja = i18n.language.startsWith("ja");
  const items = newsPosts.slice(0, HOME_LIMIT);

  return (
    <section id="news" className="w-full py-16 md:py-24">
      <div className="w-full px-6 md:px-10 max-w-4xl mx-auto">
        <div className="mb-10 md:mb-12">
          <p className="text-accent-teal text-xs tracking-[0.3em] uppercase mb-2">
            {t("homeNews.sectionLabel")}
          </p>
          <h2 className="text-slate-900 text-2xl md:text-3xl font-bold tracking-wide">
            {t("homeNews.heading")}
          </h2>
          <div className="mt-4 h-px w-12 bg-gradient-to-r from-accent-teal/60 to-transparent" />
        </div>

        <ul className="border-t border-slate-200/70">
          {items.map((post) => {
            const row = (
              <div className="group flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                <time dateTime={post.date} className="w-24 shrink-0 text-sm tabular-nums tracking-wide text-slate-400">
                  {formatNewsDate(post.date)}
                </time>
                <span className="inline-flex w-fit shrink-0 items-center text-[11px] tracking-wide text-accent-teal">
                  {ja ? post.category : post.categoryEn}
                </span>
                <p className="text-sm leading-relaxed text-slate-700 transition-colors duration-200 group-hover:text-slate-900 md:text-base">
                  {ja ? post.title : post.titleEn}
                </p>
              </div>
            );
            return (
              <li key={post.slug} className="border-b border-slate-200/70">
                {post.body.length > 0 ? <a href={`/news/${post.slug}`}>{row}</a> : row}
              </li>
            );
          })}
        </ul>

        <div className="mt-8">
          <a
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-accent-teal transition-colors"
          >
            {t("newsIndex.viewAll")}
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
