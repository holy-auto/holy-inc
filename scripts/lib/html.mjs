/**
 * プリレンダの HTML 差し込みユーティリティ。
 *
 * `scripts/prerender.mjs` が使い、`scripts/check-links.mjs` が挙動を検査する
 * （プリレンダ本体は import しただけでファイルを読みに行くので、検査できるよう
 * ここに切り出してある）。
 *
 * **置換には必ず関数を渡す。** `String.prototype.replace` の置換「文字列」は
 * `$&` `$'` `` $` `` `$1` を特殊解釈するので、記事タイトルに `$'` が入るだけで
 * 文書の一部が複製されて混入する（実際に再現済み）。関数形式ならそれが起きない。
 */

/** HTML の属性・テキストに出す文字列のエスケープ。 */
export function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** 文字列 anchor の直前に差し込む。見つからなければ例外。正規表現を使わない。 */
export function insertBefore(html, anchor, insertion, label) {
  const at = html.indexOf(anchor);
  if (at < 0) throw new Error(`index.html に ${label} が見つからない（head の構造が変わった可能性）`);
  return html.slice(0, at) + insertion + html.slice(at);
}

/** 1箇所を差し替える。見つからなければ例外（黙って落とさない）。 */
export function replaceTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`index.html に ${label} が見つからない（head の構造が変わった可能性）`);
  }
  return html.replace(pattern, () => replacement);
}
