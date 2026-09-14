#!/usr/bin/env node
/**
 * リンク健全性の自己チェック（フレームワーク無し / `node scripts/check-links.mjs`）。
 *
 * 過去に出た事故を止めるためのもの:
 * - Navbar が存在しないルート `/holyauto` を指していた（ルートは `/holy-auto`）
 * - sitemap.xml / robots.txt が `https://example.com` のまま公開されていた
 *
 * ponytail: 正規表現でソースを読む素朴な実装。ルート定義の書式が変わったら
 * ここも直す。上げるなら vite でビルドした router を import して検証する。
 */
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

const SITE_ORIGIN = "https://holy-inc.jp";

const routes = [...read("src/router/config.tsx").matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);
assert.ok(routes.includes("/"), "ルートが1件も取れていない（config.tsx の書式が変わった可能性）");

const sites = read("src/lib/sites.ts");
const brandPaths = [...sites.matchAll(/^\s{2}(\w+):\s*'(\/[^']*)',$/gm)].map((m) => m[2]);
assert.equal(brandPaths.length, 3, `brandPagePaths が3件取れていない: ${JSON.stringify(brandPaths)}`);
for (const path of brandPaths) {
  assert.ok(routes.includes(path), `brandPagePaths の ${path} に対応するルートが無い`);
}

const officialUrls = [...sites.matchAll(/'(https:\/\/[^']+)'/g)].map((m) => m[1]);
assert.equal(officialUrls.length, 3, `officialSites が3件取れていない: ${JSON.stringify(officialUrls)}`);
for (const url of officialUrls) {
  assert.doesNotMatch(url, /\/$/, `公式サイトURLは末尾スラッシュ無しで揃える: ${url}`);
  assert.doesNotMatch(url, /example\.com/, `プレースホルダのドメインが残っている: ${url}`);
}

for (const file of ["public/sitemap.xml", "public/robots.txt"]) {
  const body = read(file);
  assert.doesNotMatch(body, /example\.com/, `${file} に example.com が残っている`);
  assert.ok(body.includes(SITE_ORIGIN), `${file} が ${SITE_ORIGIN} を指していない`);
}

for (const [, loc] of read("public/sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)) {
  assert.ok(loc.startsWith(SITE_ORIGIN), `sitemap の loc が自サイト外: ${loc}`);
  const path = loc.slice(SITE_ORIGIN.length) || "/";
  assert.ok(routes.includes(path), `sitemap の ${loc} に対応するルートが無い`);
}

console.log(`OK: routes=${routes.length} brandPaths=${brandPaths.length} officialSites=${officialUrls.length}`);
