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
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const jiti = createJiti(import.meta.url);
const ja = await jiti.import("../src/i18n/local/ja/common.ts", { default: true });
const { parseNewsFile, formatNewsDate } = await jiti.import("../src/lib/news-parse.ts");

/** src/content/news/*.md を新しい順に読む。ブラウザ側と同じパーサを使う。 */
const NEWS_DIR = join(repoRoot, "src/content/news");
const newsPosts = readdirSync(NEWS_DIR)
  // 記事のファイル名は日付で始める規約。README.md 等は読まない。
  .filter((f) => f.endsWith(".md") && /^\d/.test(f))
  .map((f) => parseNewsFile(f.replace(/\.md$/, ""), readFileSync(join(NEWS_DIR, f), "utf8")))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

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
  { path: "/news", key: "newsIndex", h1: "お知らせ", ogImage: "/og/og-default.png", crumb: "お知らせ" },
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
/**
 * JSON-LD を <script> に入れる形にする。記事本文に `</script>` があっても
 * script が早期終了しないよう `<` を Unicode エスケープする（JSON としては同じ値）。
 */
function jsonLdScript(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

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
  html = replaceTag(
    html,
    /<\/head>/,
    `  <script type="application/ld+json" id="prerender-jsonld">${jsonLdScript(jsonLd)}</script>\n  </head>`,
    "</head>（JSON-LD の差し込み先）",
  );

  // 本文。React がマウントするまで表示され、クローラーにはこれが見える。
  const lead =
    route.path === "/news"
      ? newsPosts.map(
          (n) =>
            `${formatNewsDate(n.date)}｜${n.category}｜${n.title}`,
        )
      : leadParagraphs(section);
  const body = [
    `<p class="overline"><i></i><span class="subtitle">株式会社HOLY</span></p>`,
    `<h1>${esc(route.h1)}</h1>`,
    ...lead.map((t) => `<p class="lead">${esc(t)}</p>`),
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

// --- お知らせの記事ページ（本文があるものだけ。薄いページを作らない） ---
const articles = newsPosts.filter((n) => n.body.length > 0);
for (const post of articles) {
  const url = `${ORIGIN}/news/${post.slug}`;
  const title = `${post.title} | お知らせ | 株式会社HOLY`;
  const description = post.body[0].slice(0, 120);

  let html = template;
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`, "<title>");
  html = replaceTag(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(description)}" />`, "description");
  html = replaceTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, "og:url");
  html = replaceTag(html, /<meta property="twitter:title" content="[^"]*" \/>/, `<meta property="twitter:title" content="${esc(title)}" />`, "twitter:title");
  html = replaceTag(html, /<meta property="twitter:description" content="[^"]*" \/>/, `<meta property="twitter:description" content="${esc(description)}" />`, "twitter:description");
  html = replaceTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, "canonical");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    url,
    inLanguage: "ja",
    articleSection: post.category,
    author: { "@type": "Organization", name: "株式会社HOLY", url: ORIGIN },
    publisher: {
      "@type": "Organization",
      name: "株式会社HOLY",
      url: ORIGIN,
      logo: { "@type": "ImageObject", url: `${ORIGIN}/favicon-512.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  html = replaceTag(
    html,
    /<\/head>/,
    `  <script type="application/ld+json" id="prerender-jsonld">${jsonLdScript(jsonLd)}</script>\n  </head>`,
    "</head>（JSON-LD の差し込み先）",
  );

  const body = [
    `<p class="overline"><i></i><span class="subtitle">${esc(formatNewsDate(post.date))}｜${esc(post.category)}</span></p>`,
    `<h1>${esc(post.title)}</h1>`,
    ...post.body.map((t) => `<p class="lead">${esc(t)}</p>`),
    `<div class="cta-row">`,
    `  <a href="/news" class="cta-secondary">お知らせ一覧</a>`,
    `  <a href="/contact" class="cta-primary">お問い合わせ</a>`,
    `</div>`,
  ].join("\n        ");
  html = html.replace(
    /(<div id="hero-crit-inner">)[\s\S]*?(<\/div>\s*<\/section>)/,
    `$1\n        ${body}\n      $2`,
  );
  if (!html.includes(`<h1>${esc(post.title)}</h1>`)) {
    throw new Error(`/news/${post.slug}: 本文の差し込みに失敗した`);
  }

  const dir = join(OUT, "news", post.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  written += 1;
}

// --- sitemap.xml（記事を含む。手書きの public/sitemap.xml は廃止） ---
const STATIC_SITEMAP = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/ledra", changefreq: "weekly", priority: "0.9" },
  { path: "/mobilewash", changefreq: "weekly", priority: "0.9" },
  { path: "/holy-auto", changefreq: "weekly", priority: "0.9" },
  { path: "/careers", changefreq: "weekly", priority: "0.8" },
  { path: "/news", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
];
const today = new Date().toISOString().slice(0, 10);
const urls = [
  ...STATIC_SITEMAP.map((u) => ({ loc: `${ORIGIN}${u.path}`, lastmod: today, changefreq: u.changefreq, priority: u.priority })),
  ...articles.map((n) => ({ loc: `${ORIGIN}/news/${n.slug}`, lastmod: n.date, changefreq: "yearly", priority: "0.6" })),
];
writeFileSync(
  join(OUT, "sitemap.xml"),
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.flatMap((u) => [
      "  <url>",
      `    <loc>${u.loc}</loc>`,
      `    <lastmod>${u.lastmod}</lastmod>`,
      `    <changefreq>${u.changefreq}</changefreq>`,
      `    <priority>${u.priority}</priority>`,
      "  </url>",
    ]),
    "</urlset>",
    "",
  ].join("\n"),
);

// --- RSS（記事だけ。購読とAIクローラーの巡回の入口） ---
writeFileSync(
  join(OUT, "feed.xml"),
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>株式会社HOLY のお知らせ</title>",
    `    <link>${ORIGIN}/news</link>`,
    "    <description>株式会社HOLY の会社・サービス・プロダクトに関するお知らせ。</description>",
    "    <language>ja</language>",
    `    <atom:link href="${ORIGIN}/feed.xml" rel="self" type="application/rss+xml" />`,
    ...articles.flatMap((n) => [
      "    <item>",
      `      <title>${esc(n.title)}</title>`,
      `      <link>${ORIGIN}/news/${n.slug}</link>`,
      `      <guid isPermaLink="true">${ORIGIN}/news/${n.slug}</guid>`,
      `      <pubDate>${new Date(`${n.date}T00:00:00+09:00`).toUTCString()}</pubDate>`,
      `      <category>${esc(n.category)}</category>`,
      `      <description>${esc(n.body[0])}</description>`,
      "    </item>",
    ]),
    "  </channel>",
    "</rss>",
    "",
  ].join("\n"),
);

console.log(
  `OK: prerendered ${written} routes (記事 ${articles.length}件) + sitemap.xml (${urls.length} URL) + feed.xml`,
);
