#!/usr/bin/env node
/**
 * リンク健全性の自己チェック（フレームワーク無し / `node scripts/check-links.mjs`）。
 *
 * 止めたい事故:
 * - Navbar が存在しないルート `/holyauto` を指していた（ルートは `/holy-auto`）
 * - sitemap.xml / robots.txt が `https://example.com` のまま公開されていた
 * - 座標を companyInfo.geo に集約したのに、index.html の geo メタタグだけ
 *   旧い値が残っていた（index.html は静的なので TS 定数を参照できない）
 *
 * ponytail: 正規表現でソースを読む素朴な実装。ルート定義や sites.ts の書式が
 * 変わったらここも直す。上げるならビルド済みの router を import して検証する。
 */
import { readFileSync, readdirSync } from "node:fs";
import { createJiti } from "jiti";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const jiti = createJiti(import.meta.url);
const read = (p) => readFileSync(join(repoRoot, p), "utf8");

const SITE_ORIGIN = "https://holy-inc.jp";
/** ルートではないが実在する配信物。href="/..." の許可リスト。 */
const STATIC_PATHS = new Set(["/sitemap.xml", "/robots.txt"]);

// --- ルート一覧 ---------------------------------------------------------
const routes = [...read("src/router/config.tsx").matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);
assert.ok(routes.includes("/"), "ルートが1件も取れていない（config.tsx の書式が変わった可能性）");

// --- sites.ts: オブジェクト本体だけを見る（doc コメントの URL を拾わない） ---
const sites = read("src/lib/sites.ts");
const objectBody = (name) => {
  const m = sites.match(new RegExp(`export const ${name}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\}(?: as const)?;`));
  assert.ok(m, `sites.ts に ${name} のオブジェクトが見つからない`);
  return m[1];
};

const brandPaths = [...objectBody("brandPagePaths").matchAll(/^\s+\w+:\s*'([^']+)',$/gm)].map((m) => m[1]);
assert.equal(brandPaths.length, 3, `brandPagePaths が3件取れていない: ${JSON.stringify(brandPaths)}`);
for (const path of brandPaths) {
  assert.ok(routes.includes(path), `brandPagePaths の ${path} に対応するルートが無い`);
}

const officialUrls = [...objectBody("officialSites").matchAll(/^\s+\w+:\s*'([^']+)',$/gm)].map((m) => m[1]);
assert.equal(officialUrls.length, 3, `officialSites が3件取れていない: ${JSON.stringify(officialUrls)}`);
for (const url of officialUrls) {
  assert.match(url, /^https:\/\//, `公式サイトURLは https 絶対URLで書く: ${url}`);
  assert.doesNotMatch(url, /\/$/, `公式サイトURLは末尾スラッシュ無しで揃える: ${url}`);
  assert.doesNotMatch(url, /example\.(com|org|net)/, `プレースホルダのドメインが残っている: ${url}`);
}

// --- コンポーネント内の href="/..." が実在ルートか -------------------------
// これが `/holyauto` を直書きした事故を、起きた場所そのもので捕まえる。
const tsxFiles = [];
const walk = (dir) => {
  for (const e of readdirSync(join(repoRoot, dir), { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".tsx")) tsxFiles.push(p);
  }
};
walk("src");
assert.ok(tsxFiles.length > 10, `.tsx が集まっていない: ${tsxFiles.length} 件`);

let checkedHrefs = 0;
for (const file of tsxFiles) {
  for (const [, href] of read(file).matchAll(/href="(\/[^"]*)"/g)) {
    const path = href.split(/[#?]/)[0];
    if (STATIC_PATHS.has(path)) continue;
    checkedHrefs += 1;
    assert.ok(routes.includes(path), `${relative(".", file)} の href="${href}" に対応するルートが無い`);
  }
}

// --- 公開ファイル ---------------------------------------------------------
const robots = read("public/robots.txt");
assert.doesNotMatch(robots, /example\.(com|org|net)/, "robots.txt にプレースホルダのドメインが残っている");
assert.ok(robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`), "robots.txt が sitemap を宣言していない");
for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "OAI-SearchBot", "Google-Extended"]) {
  assert.ok(robots.includes(`User-agent: ${bot}`), `robots.txt が ${bot} を明示的に許可していない`);
}

try {
  read("public/sitemap.xml");
  throw new Error("public/sitemap.xml が残っている。sitemap は scripts/prerender.mjs が記事も含めて生成する");
} catch (e) {
  if (e.code !== "ENOENT") throw e;
}

// --- お知らせの記事がすべてパースできるか ----------------------------------
// 1ファイル足すだけで公開される仕組みなので、書式ミスはビルド前に落とす。
const { parseNewsFile } = await jiti.import("../src/lib/news-parse.ts");
const newsFiles = readdirSync(join(repoRoot, "src/content/news")).filter(
  (f) => f.endsWith(".md") && /^\d/.test(f),
);
assert.ok(newsFiles.length > 0, "src/content/news に記事が1件も無い");
const slugs = new Set();
for (const file of newsFiles) {
  const slug = file.replace(/\.md$/, "");
  const post = parseNewsFile(slug, read(join("src/content/news", file)));
  assert.ok(!slugs.has(post.slug), `slug が重複している: ${post.slug}`);
  slugs.add(post.slug);
}

// --- index.html の geo メタタグが companyInfo.geo と一致するか --------------
const geo = read("src/mocks/company.ts").match(/geo:\s*\{\s*latitude:\s*'([^']+)',\s*longitude:\s*'([^']+)'/);
assert.ok(geo, "companyInfo.geo が読めない（company.ts の書式が変わった可能性）");
const indexGeo = read("index.html").match(/name="geo\.position"\s+content="([^"]+)"/);
assert.ok(indexGeo, "index.html に geo.position メタタグが無い");
assert.equal(
  indexGeo[1],
  `${geo[1]};${geo[2]}`,
  `index.html の geo.position が companyInfo.geo と食い違っている（index.html は静的なので手で揃える）`,
);

console.log(
  `OK: routes=${routes.length} brandPaths=${brandPaths.length} officialSites=${officialUrls.length} ` +
    `internalHrefs=${checkedHrefs} newsPosts=${newsFiles.length}`,
);
