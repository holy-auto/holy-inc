import type { FC } from "react";
import { useTranslation } from "react-i18next";

interface NewsItem {
  date: string;
  category: string;
  title: string;
}

/**
 * お知らせ / News — a quiet, editorial list (date · category · title).
 * Content is driven by i18n (`homeNews.items`) so it is easy to edit or later
 * swap for a data source.
 */
const NewsSection: FC = () => {
  const { t } = useTranslation("common");
  const items = (t("homeNews.items", { returnObjects: true }) as NewsItem[]) || [];

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
          {items.map((item, i) => (
            <li key={i} className="border-b border-slate-200/70">
              <div className="group flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                <time className="w-24 shrink-0 text-sm tabular-nums tracking-wide text-slate-400">
                  {item.date}
                </time>
                <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-accent-teal/30 px-2.5 py-0.5 text-[11px] tracking-wide text-accent-teal">
                  {item.category}
                </span>
                <p className="text-sm leading-relaxed text-slate-700 transition-colors duration-200 group-hover:text-slate-900 md:text-base">
                  {item.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NewsSection;
