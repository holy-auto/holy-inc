#!/usr/bin/env node
/**
 * ルート別の静的HTMLを生成する（`npm run build` の後段 / `node scripts/prerender.mjs`）。
 *
 * ## なぜ要るか
 *
 * このサイトは CSR の SPA で、Vercel の rewrite により**全URLが同じ index.html**を
 * 返していた。Googlebot は JS を実行するので最終的には各ページを読めるが、
 * **生成AI・AI検索のクローラー（GPTBot / ClaudeBot / PerplexityBot 等）の多くは
 * JS を実行しない。** つまり AI から見ると、/ledra も /about も /careers も
 * 「トップページ」1枚にしか見えていなかった。
 *
 * このスクリプトは out/<route>/index.html を書き出し、そこに
 * title / description / canonical / OGP / JSON-LD と、そのページの本文要約を
 * 静的に埋め込む。Vercel はファイルが存在すれば rewrite より優先して返すので、
 * 追加の設定は要らない。
 *
 * ## 文言の出典
 *
 * すべて `src/i18n/local/ja/common.ts` から読む。React 側と同じ文言なので、
 * 静的HTMLと実際の描画内容がずれない。ここに文言を直書きしない。
 *
 * ponytail: 文字列置換で HTML を組み立てる素朴な実装。index.html の head の
 * 並びが変わったら置換が効かなくなるので、その場合はここも直す（検証は
 * scripts/check-links.mjs が落として知らせる）。上げるなら SSG に寄せる。
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const jiti = createJiti(import.meta.url);
const ja = (await jiti.import("../src/i18n/local/ja/common.ts", { default: true }));

const ORIGIN = "https://holy-inc.jp";
const OUT = join(repoRoot, "out");

/**
 * 生成するルート。`key` は i18n のセクション名、`ogImage` は public/og/ の実ファイル。
 * トップ（/）は index.html がそのまま使えるので対象外。
 */
const ROUTES = [
  { path: "/about", key: "about", h1: "会社概要", ogImage: "/og/og-about.png", crumb: "会社概要" },
  { path: "/ledra", key: "brandLedra", h1: "Ledra", ogImage: "/og/og-ledra.png", crumb: "Ledra" },
  { path: "/mobilewash", key: "brandMobilewash", h1: "MobileWash", ogImage: "/og/og-mobilewash.png", crumb: "MobileWash" },
  { path: "/holy-auto", key: "brandHolyauto", h1: "HOLY AUTO", ogImage: "/og/og-holyauto.png", crumb: "HOLY AUTO" },
  { path: "/careers", key: "careers", h1: "採用情報", ogImage: "/og/og-careers.png", crumb: "採用情報" },
  { path: "/contact", key: "contact", h1: "お問い合わせ", ogImage: "/og/og-contact.png", crumb: "お問い合わせ" },
  // /privacy と /terms は robots.txt で Disallow。静的HTMLも出さない。
];

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** そのページで人が読める導入文。hero があれば使い、無ければ seo.description。 */
function leadParagraphs(section) {
  const hero = section.hero ?? {};
  const lines = [hero.subtitle1, hero.subtitle2, hero.description, hero.lead].filter(
    (v) => typeof v === "string" && v.length > 0,
  );
  return lines.length > 0 ? lines : [section.seo.description];
}

/** head の1タグを差し替える。見つからなければ例外（黙って落とさない）。 */
function replaceTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`index.html に ${label} が見つからない（head の構造が変わった可能性）`);
  return html.replace(pattern, replacement);
}

const template = readFileSync(join(OUT, "index.html"), "utf8");
if (!template.includes('id="hero-crit-inner"')) {
  throw new Error("index.html に #hero-crit-inner が無い（プリレンダの差し込み先が変わった可能性）");
}

let written = 0;
for (const route of ROUTES) {
  const section = ja[route.key];
  if (!section?.seo) throw new Error(`i18n に ${route.key}.seo が無い`);
  const { title, description, keywords } = section.seo;
  const url = `${ORIGIN}${route.path}`;
  const ogImage = `${ORIGIN}${route.ogImage}`;

  let html = template;
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`, "<title>");
  html = replaceTag(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(description)}" />`, "description");
  html = replaceTag(html, /<meta name="keywords" content="[^"]*" \/>/, `<meta name="keywords" content="${esc(keywords ?? "")}" />`, "keywords");
  html = replaceTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, "og:url");
  html = replaceTag(html, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${ogImage}" />`, "og:image");
  html = replaceTag(html, /<meta property="twitter:title" content="[^"]*" \/>/, `<meta property="twitter:title" content="${esc(title)}" />`, "twitter:title");
  html = replaceTag(html, /<meta property="twitter:description" content="[^"]*" \/>/, `<meta property="twitter:description" content="${esc(description)}" />`, "twitter:description");
  html = replaceTag(html, /<meta property="twitter:image" content="[^"]*" \/>/, `<meta property="twitter:image" content="${ogImage}" />`, "twitter:image");
  html = replaceTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, "canonical");
  // og:title は index.html に無い（React が付ける）ので、静的側にも足しておく
  html = html.replace(
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(title)}" />\n    <meta property="og:url" content="${url}" />`,
  );

  // JS を実行しないクローラー向けの構造化データ。React がマウントしたら
  // 重複しないよう index.html 側のスクリプトが取り除く。
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    inLanguage: "ja",
    isPartOf: { "@type": "WebSite", name: "株式会社HOLY", url: ORIGIN },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: ORIGIN },
        { "@type": "ListItem", position: 2, name: route.crumb, item: url },
      ],
    },
  };
  html = html.replace(
    "</head>",
    `  <script type="application/ld+json" id="prerender-jsonld">${JSON.stringify(jsonLd)}</script>\n  </head>`,
  );

  // 本文。React がマウントするまで表示され、クローラーにはこれが見える。
  const body = [
    `<p class="overline"><i></i><span class="subtitle">株式会社HOLY</span></p>`,
    `<h1>${esc(route.h1)}</h1>`,
    ...leadParagraphs(section).map((t) => `<p class="lead">${esc(t)}</p>`),
    `<div class="cta-row">`,
    `  <a href="/" class="cta-secondary">トップページ</a>`,
    `  <a href="/contact" class="cta-primary">お問い合わせ</a>`,
    `</div>`,
  ].join("\n        ");
  html = html.replace(
    /(<div id="hero-crit-inner">)[\s\S]*?(<\/div>\s*<\/section>)/,
    `$1\n        ${body}\n      $2`,
  );
  if (!html.includes(`<h1>${esc(route.h1)}</h1>`)) {
    throw new Error(`${route.path}: 本文の差し込みに失敗した`);
  }

  const dir = join(OUT, route.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  written += 1;
}

console.log(`OK: prerendered ${written} routes -> out/<route>/index.html`);
