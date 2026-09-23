#!/usr/bin/env node
/**
 * ビルド成果物（out/）の SEO / AIO 検査（`npm run check:seo`。`npm run build` の後に走らせる）。
 *
 * check-links.mjs がソースを見るのに対し、こちらは**実際に配信される HTML** を見る。
 * JS を実行しない AI クローラーが受け取るのはこの静的HTMLそのものなので、
 * ここで欠けていれば AI 検索からは欠けて見える。
 *
 * - error: CI を落とす（公開すると検索・AI 露出が確実に損なわれるもの）
 * - warn:  表示だけ（直した方がよいが、公開を止めるほどではないもの）
 *
 * ponytail: 正規表現で HTML を読む素朴な実装。プリレンダの出力は自前で組み立てた
 * 定型なのでこれで足りる。HTML が複雑になったら parse5 等に替える。
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(repoRoot, "out");
const ORIGIN = "https://www.holy-inc.jp";

/** Google の検索結果で切れずに出る目安（全角換算の文字数）。 */
const TITLE_MAX = 60;
const DESC_MIN = 50;
const DESC_MAX = 160;

if (!existsSync(join(OUT, "index.html"))) {
  console.error("out/index.html が無い。先に `npm run build` を実行する");
  process.exit(1);
}

const errors = [];
const warnings = [];
const error = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

// --- 配信される HTML を集める ------------------------------------------------
const pages = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "assets") continue;
      walk(p);
    } else if (name === "index.html") {
      const rel = relative(OUT, dir).split("\\").join("/");
      pages.push({ path: rel ? `/${rel}` : "/", html: readFileSync(p, "utf8") });
    }
  }
};
walk(OUT);

const attr = (html, re) => html.match(re)?.[1];
const unesc = (s) =>
  s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

const seenTitles = new Map();
const seenDescs = new Map();

for (const { path, html } of pages) {
  const where = path;
  const url = path === "/" ? ORIGIN : `${ORIGIN}${path}`;

  // title
  const titles = [...html.matchAll(/<title>([^<]*)<\/title>/g)].map((m) => unesc(m[1]));
  if (titles.length !== 1) error(where, `<title> が ${titles.length} 個ある（1個にする）`);
  const title = titles[0] ?? "";
  if (!title.trim()) error(where, "<title> が空");
  else if ([...title].length > TITLE_MAX) warn(where, `title が長い（${[...title].length}文字 > ${TITLE_MAX}）: ${title}`);
  if (title) {
    if (seenTitles.has(title)) error(where, `title が ${seenTitles.get(title)} と重複: ${title}`);
    else seenTitles.set(title, path);
  }

  // description
  const descRaw = attr(html, /<meta name="description" content="([^"]*)"/);
  if (descRaw === undefined) error(where, "meta description が無い");
  else {
    const desc = unesc(descRaw);
    const len = [...desc].length;
    if (len < DESC_MIN || len > DESC_MAX) warn(where, `description の長さが目安外（${len}文字。${DESC_MIN}〜${DESC_MAX}）`);
    if (seenDescs.has(desc)) error(where, `description が ${seenDescs.get(desc)} と重複`);
    else seenDescs.set(desc, path);
  }

  // canonical / og:url がそのページ自身を指しているか
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  if (!canonical) error(where, "canonical が無い");
  else if (canonical.replace(/\/$/, "") !== url) error(where, `canonical が別ページを指している: ${canonical}`);
  const ogUrl = attr(html, /<meta property="og:url" content="([^"]*)"/);
  if (ogUrl && ogUrl.replace(/\/$/, "") !== url) error(where, `og:url が別ページを指している: ${ogUrl}`);

  // og:image の実ファイルがあるか
  const ogImage = attr(html, /<meta property="og:image" content="([^"]*)"/);
  if (!ogImage) warn(where, "og:image が無い");
  else if (ogImage.startsWith(ORIGIN) && !existsSync(join(OUT, ogImage.slice(ORIGIN.length)))) {
    error(where, `og:image のファイルが out/ に無い: ${ogImage}`);
  }

  // noindex の混入（公開ページには付けない）
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) error(where, "noindex が付いている");

  // lang
  if (!/<html lang="ja"/.test(html)) error(where, '<html lang="ja"> になっていない');

  // 静的本文の h1（JS を実行しないクローラーが見る見出し）
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) error(where, `静的HTMLの <h1> が ${h1s.length} 個（1個にする）`);

  // JSON-LD が JSON として読めて @type を持つか
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) error(where, "JSON-LD が無い（AI・検索が会社やページの種類を読み取れない）");
  for (const [, body] of blocks) {
    let data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      error(where, `JSON-LD が JSON として読めない: ${e.message}`);
      continue;
    }
    for (const item of Array.isArray(data) ? data : [data]) {
      if (item["@context"] !== "https://schema.org") error(where, `JSON-LD の @context が schema.org でない: ${item["@type"]}`);
      if (!item["@type"]) error(where, "JSON-LD に @type が無い");
    }
  }
}

// --- sitemap.xml と実ファイルの突き合わせ -----------------------------------
const sitemap = readFileSync(join(OUT, "sitemap.xml"), "utf8");
const sitemapPaths = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].slice(ORIGIN.length) || "/"),
);
for (const p of sitemapPaths) {
  if (!pages.some((pg) => pg.path === p)) error("sitemap.xml", `${p} が載っているが静的HTMLが無い`);
}
for (const { path } of pages) {
  if (!sitemapPaths.has(path)) error("sitemap.xml", `${path} の静的HTMLがあるのに sitemap に無い`);
}

// --- robots.txt が公開ページを塞いでいないか ---------------------------------
const robots = readFileSync(join(OUT, "robots.txt"), "utf8");
const disallows = [...robots.matchAll(/^Disallow:\s*(\S+)/gm)].map((m) => m[1]);
if (disallows.includes("/")) error("robots.txt", "Disallow: / でサイト全体を塞いでいる");
for (const { path } of pages) {
  const hit = disallows.find((d) => path === d || path.startsWith(`${d}/`));
  if (hit) error("robots.txt", `公開ページ ${path} を Disallow: ${hit} が塞いでいる`);
}

// --- llms.txt / llms-full.txt のリンクが実在するか ---------------------------
for (const file of ["llms.txt", "llms-full.txt"]) {
  const p = join(OUT, file);
  if (!existsSync(p)) {
    error(file, "生成されていない");
    continue;
  }
  const text = readFileSync(p, "utf8");
  if (!text.startsWith("# ")) error(file, "先頭が `# サイト名` になっていない（llms.txt の書式）");
  for (const [, href] of text.matchAll(/\]\((https:\/\/www\.holy-inc\.jp[^)]*)\)/g)) {
    const path = href.slice(ORIGIN.length) || "/";
    const ok = pages.some((pg) => pg.path === path.replace(/\/$/, "") || (path === "/" && pg.path === "/"))
      || existsSync(join(OUT, path));
    if (!ok) error(file, `リンク先が out/ に無い: ${href}`);
  }
}

// --- 結果 -----------------------------------------------------------------
for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
if (errors.length > 0) {
  console.error(`\nNG: ${errors.length} 件のエラー（警告 ${warnings.length} 件）`);
  process.exit(1);
}
console.log(`OK: ${pages.length} ページを検査（警告 ${warnings.length} 件）`);
