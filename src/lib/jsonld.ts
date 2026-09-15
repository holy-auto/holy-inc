/**
 * JSON-LD を <script> の中身にする。
 *
 * 記事の見出し・本文は `src/content/news/*.md` から来るので、`</script>` が
 * 含まれると script タグが早期終了し、残りが本文として描画される。
 * `<` を Unicode エスケープすれば JSON としての値は変わらず、これを防げる。
 *
 * ブラウザ側（`SeoHead.tsx`）とプリレンダ（`scripts/prerender.mjs`）の両方が
 * これを使う。片方だけ直すことがないよう、定義はここ1箇所。
 */
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
