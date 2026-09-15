/**
 * お知らせの読み込み。
 *
 * 記事は `src/content/news/<slug>.md` に1ファイル1件で置く。
 *
 * このファイルは **Node からも読めるように** `import.meta.glob` を含めない。
 * ブラウザ向けの読み込みは `news.ts`、ビルドスクリプトは
 * `scripts/prerender.mjs` がそれぞれディレクトリを走査してここを呼ぶ。
 * ファイルを1つ足せば、トップのお知らせ・一覧ページ・sitemap・RSS に自動で載る。
 * コードを書き換える必要はない。
 *
 * ## 書き方
 *
 * ```md
 * ---
 * date: "2026-08-01"        # 必須。YYYY-MM-DD
 * category: "地域貢献"       # 必須。日本語の分類
 * categoryEn: "Community"   # 必須。英語の分類
 * title: "〜しました。"      # 必須。日本語の見出し
 * titleEn: "..."            # 必須。英語の見出し
 * ---
 *
 * 本文（任意）。書くと /news/<slug> の記事ページができる。
 * 書かなければ一覧に見出しだけが載る（中身の薄い記事ページを作らないため）。
 * ```
 *
 * ponytail: frontmatter のパーサは `key: "value"` だけを見る素朴な実装。
 * 配列やネストは扱わない。必要になったら gray-matter を入れる。
 * 本文も段落を <p> にするだけで、Markdown の記法は解釈しない。
 */

export type NewsPost = {
  slug: string;
  /** YYYY-MM-DD */
  date: string;
  category: string;
  categoryEn: string;
  title: string;
  titleEn: string;
  /** 本文の段落。空配列なら記事ページを作らない。 */
  body: string[];
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
// 値は引用符で囲む。行末の `# コメント` は無視する（README の例をそのまま写せるように）。
const FIELD = /^(\w+):\s*(?:"([^"]*)"|'([^']*)')\s*(?:#.*)?$/;

/** 1ファイル分をパースする。必須項目が欠けていれば例外（黙って落とさない）。 */
export function parseNewsFile(slug: string, raw: string): NewsPost {
  const m = FRONTMATTER.exec(raw.trim() + "\n");
  if (!m) throw new Error(`news/${slug}.md: frontmatter が読めない`);

  const fields: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const f = FIELD.exec(line);
    if (!f) throw new Error(`news/${slug}.md: frontmatter の行が読めない: ${line}`);
    fields[f[1]] = f[2] ?? f[3] ?? "";
  }

  for (const key of ["date", "category", "categoryEn", "title", "titleEn"]) {
    if (!fields[key]) throw new Error(`news/${slug}.md: ${key} が無い`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.date)) {
    throw new Error(`news/${slug}.md: date は YYYY-MM-DD で書く: ${fields.date}`);
  }

  return {
    slug,
    date: fields.date,
    category: fields.category,
    categoryEn: fields.categoryEn,
    title: fields.title,
    titleEn: fields.titleEn,
    body: m[2].trim().split(/\r?\n\s*\r?\n/).filter(Boolean),
  };
}

/** 一覧の日付表示（2026.08 の形）。 */
export function formatNewsDate(date: string): string {
  return `${date.slice(0, 4)}.${date.slice(5, 7)}`;
}
