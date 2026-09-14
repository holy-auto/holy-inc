/**
 * お知らせの読み込み（ブラウザ向け）。
 *
 * 記事の置き場所と書き方は `news-parse.ts` のコメントを見る。
 * ここは Vite の `import.meta.glob` で `src/content/news/*.md` を集めるだけ。
 */
import { parseNewsFile, type NewsPost } from "./news-parse";

export { parseNewsFile, formatNewsDate } from "./news-parse";
export type { NewsPost } from "./news-parse";

const files = import.meta.glob<string>("../content/news/*.md", { eager: true, query: "?raw", import: "default" });

/**
 * 新しい順のお知らせ一覧。
 *
 * 記事のファイル名は日付で始める規約なので、数字以外で始まるファイル
 * （README.md など）は記事として読まない。
 */
export const newsPosts: NewsPost[] = Object.entries(files)
  .map(([path, raw]) => [path.replace(/^.*\/([^/]+)\.md$/, "$1"), raw] as const)
  .filter(([slug]) => /^\d/.test(slug))
  .map(([slug, raw]) => parseNewsFile(slug, raw))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getNewsPost(slug: string): NewsPost | undefined {
  return newsPosts.find((p) => p.slug === slug);
}
