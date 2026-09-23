#!/usr/bin/env node
/**
 * 週次 SEO レポート（`.github/workflows/seo-weekly.yml` が毎週実行する）。
 *
 * 1. Search Console … 直近7日と前の7日のクリック・表示回数・CTR・掲載順位、
 *    検索クエリ／ページの上位。`GSC_ACCESS_TOKEN` が無ければ飛ばす。
 * 2. 本番サイトの巡回 … sitemap.xml の全URLが 200 を返し、noindex が無く、
 *    title があるか。robots.txt / llms.txt / llms-full.txt / feed.xml も確認する。
 *
 * 結果は Markdown で `--out` に書く（既定 seo-report.md）。本番巡回で問題が
 * 見つかったら終了コード 1（ワークフローを赤くして気づけるように）。
 *
 * 環境変数:
 * - GSC_ACCESS_TOKEN  Search Console API のアクセストークン（webmasters.readonly）
 * - SITE_ORIGIN       巡回先（既定 https://holy-inc.jp。ローカル検証用に差し替えられる）
 * - REPORT_ONLY=1     問題があっても終了コード 0（PR での試走用。PR は本番の状態を変えないので）
 *
 * 認証は鍵ファイルを使わない（組織ポリシーで SA キーの作成が禁止されている）。
 * GitHub Actions の OIDC → Workload Identity 連携 → seo-monitor SA で
 * トークンを得る。設定はワークフロー側を参照。
 */
import { writeFileSync } from "node:fs";

const ORIGIN = (process.env.SITE_ORIGIN || "https://holy-inc.jp").replace(/\/$/, "");
const TOKEN = process.env.GSC_ACCESS_TOKEN;
const outArg = process.argv.indexOf("--out");
const OUT_FILE = outArg > 0 ? process.argv[outArg + 1] : "seo-report.md";
/** Search Console のプロパティを探すときのドメイン（SITE_ORIGIN を差し替えても本番を見る）。 */
const GSC_DOMAIN = "holy-inc.jp";
const TOP_N = 20;

const lines = [];
const out = (s = "") => lines.push(s);
let liveProblems = 0;

// --- 日付 ------------------------------------------------------------------
// Search Console のデータは2〜3日遅れて確定するので、3日前までを「今週」とする。
const day = (offset) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - offset);
  return d.toISOString().slice(0, 10);
};
const cur = { start: day(9), end: day(3) };
const prev = { start: day(16), end: day(10) };

// --- Search Console --------------------------------------------------------
async function gsc(path, body) {
  const res = await fetch(`https://www.googleapis.com/webmasters/v3${path}`, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Search Console API ${res.status}: ${text.slice(0, 300)}`);
  return JSON.parse(text);
}

const fmtInt = (n) => Math.round(n).toLocaleString("ja-JP");
const fmtPct = (n) => `${(n * 100).toFixed(1)}%`;
const fmtPos = (n) => (n ? n.toFixed(1) : "-");
const delta = (a, b, fmt, lowerIsBetter = false) => {
  if (!b) return "-";
  const d = a - b;
  if (Math.abs(d) < 1e-9) return "±0";
  const good = lowerIsBetter ? d < 0 : d > 0;
  return `${good ? "▲" : "▼"} ${d > 0 ? "+" : ""}${fmt(d)}`;
};
const cell = (s) => String(s).replace(/\|/g, "\\|");

async function searchConsoleSection() {
  out("## Search Console");
  out();
  if (!TOKEN) {
    out("_GSC_ACCESS_TOKEN が無いため省略（Workload Identity 連携が未設定か、認証に失敗）。_");
    out();
    return;
  }

  const { siteEntry = [] } = await gsc("/sites");
  const site = siteEntry.find(
    (s) => s.siteUrl === `sc-domain:${GSC_DOMAIN}` || s.siteUrl.replace(/\/$/, "") === `https://${GSC_DOMAIN}`,
  );
  if (!site) {
    out(
      `_Search Console に ${GSC_DOMAIN} のプロパティが見つからない。サービスアカウントを` +
        `「設定 → ユーザーと権限」に追加したか確認する（見えているプロパティ: ${
          siteEntry.map((s) => s.siteUrl).join(", ") || "なし"
        }）。_`,
    );
    out();
    return;
  }
  const sitePath = `/sites/${encodeURIComponent(site.siteUrl)}/searchAnalytics/query`;
  const query = (range, dimensions, rowLimit) =>
    gsc(sitePath, { startDate: range.start, endDate: range.end, dimensions, rowLimit, dataState: "final" });

  const [curTotal, prevTotal, queries, pages] = await Promise.all([
    query(cur, [], 1),
    query(prev, [], 1),
    query(cur, ["query"], TOP_N),
    query(cur, ["page"], TOP_N),
  ]);
  const t = curTotal.rows?.[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const p = prevTotal.rows?.[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };

  out(`プロパティ: \`${site.siteUrl}\` ／ 今週 ${cur.start}〜${cur.end} ／ 前週 ${prev.start}〜${prev.end}`);
  out();
  out("| 指標 | 今週 | 前週 | 増減 |");
  out("|---|--:|--:|--:|");
  out(`| クリック数 | ${fmtInt(t.clicks)} | ${fmtInt(p.clicks)} | ${delta(t.clicks, p.clicks, fmtInt)} |`);
  out(`| 表示回数 | ${fmtInt(t.impressions)} | ${fmtInt(p.impressions)} | ${delta(t.impressions, p.impressions, fmtInt)} |`);
  out(`| CTR | ${fmtPct(t.ctr)} | ${fmtPct(p.ctr)} | ${delta(t.ctr, p.ctr, (n) => `${(n * 100).toFixed(1)}pt`)} |`);
  out(`| 平均掲載順位 | ${fmtPos(t.position)} | ${fmtPos(p.position)} | ${delta(t.position, p.position, (n) => n.toFixed(1), true)} |`);
  out();

  const table = (title, key, rows) => {
    out(`### ${title}（上位${TOP_N}）`);
    out();
    if (!rows?.length) {
      out("_データなし（登録直後や表示回数が少ない間は出ない）。_");
      out();
      return;
    }
    out(`| ${key} | クリック | 表示 | CTR | 順位 |`);
    out("|---|--:|--:|--:|--:|");
    for (const r of rows) {
      const label = key === "ページ" ? r.keys[0].replace(/^https:\/\/[^/]+/, "") || "/" : r.keys[0];
      out(`| ${cell(label)} | ${fmtInt(r.clicks)} | ${fmtInt(r.impressions)} | ${fmtPct(r.ctr)} | ${fmtPos(r.position)} |`);
    }
    out();
  };
  table("検索クエリ", "クエリ", queries.rows);
  table("ページ", "ページ", pages.rows);
}

// --- 本番サイトの巡回 -------------------------------------------------------
async function get(url) {
  try {
    const res = await fetch(url, { redirect: "manual", headers: { "User-Agent": "holy-seo-monitor" } });
    return { status: res.status, text: res.status === 200 ? await res.text() : "", location: res.headers.get("location") };
  } catch (e) {
    return { status: 0, text: "", error: e.message };
  }
}

async function liveSection() {
  out("## 本番サイトの巡回");
  out();

  const files = ["/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt", "/feed.xml"];
  const fileResults = await Promise.all(files.map((f) => get(`${ORIGIN}${f}`)));
  const sitemap = fileResults[1].text;
  const pageUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  const rows = [];
  for (const [i, f] of files.entries()) {
    const r = fileResults[i];
    const issues = [];
    if (r.status !== 200) issues.push(`HTTP ${r.status || r.error}`);
    if (f === "/robots.txt" && /^Disallow:\s*\/\s*$/m.test(r.text)) issues.push("Disallow: / が入っている");
    rows.push({ path: f, status: r.status, issues });
  }

  // sitemap の URL は本番ドメインで書かれている。巡回先を差し替えたときも辿れるように置き換える。
  const pageResults = await Promise.all(
    pageUrls.map(async (u) => {
      const path = u.replace(/^https:\/\/[^/]+/, "") || "/";
      const r = await get(`${ORIGIN}${path}`);
      const issues = [];
      if (r.status !== 200) issues.push(`HTTP ${r.status || r.error}${r.location ? ` → ${r.location}` : ""}`);
      else {
        if (/<meta name="robots" content="[^"]*noindex/i.test(r.text)) issues.push("noindex");
        if (!/<title>[^<]+<\/title>/.test(r.text)) issues.push("title が無い");
        if (!/application\/ld\+json/.test(r.text)) issues.push("JSON-LD が無い");
      }
      return { path, status: r.status, issues };
    }),
  );
  rows.push(...pageResults);

  if (pageUrls.length === 0) {
    rows.push({ path: "(sitemap)", status: 0, issues: ["sitemap.xml から URL が1件も取れない"] });
  }

  const bad = rows.filter((r) => r.issues.length > 0);
  liveProblems = bad.length;
  out(`巡回先: ${ORIGIN} ／ ${rows.length} 件中 **問題 ${bad.length} 件**`);
  out();
  if (bad.length > 0) {
    out("| パス | 問題 |");
    out("|---|---|");
    for (const r of bad) out(`| ${cell(r.path)} | ${cell(r.issues.join("、"))} |`);
    out();
  }
  out("<details><summary>全件</summary>");
  out();
  out("| パス | HTTP | 状態 |");
  out("|---|--:|---|");
  for (const r of rows) out(`| ${cell(r.path)} | ${r.status} | ${r.issues.length ? "NG" : "OK"} |`);
  out();
  out("</details>");
  out();
}

// --- 実行 ------------------------------------------------------------------
out(`# 週次 SEO レポート（${day(0)}）`);
out();
let gscError = null;
try {
  await searchConsoleSection();
} catch (e) {
  gscError = e;
  out(`_Search Console の取得に失敗: ${cell(e.message)}_`);
  out();
}
await liveSection();

writeFileSync(OUT_FILE, lines.join("\n"));
console.log(lines.join("\n"));
if (process.env.REPORT_ONLY === "1") process.exit(0);
if (liveProblems > 0) {
  console.error(`\n本番サイトの巡回で ${liveProblems} 件の問題`);
  process.exit(1);
}
if (gscError) {
  console.error(`\nSearch Console の取得に失敗: ${gscError.message}`);
  process.exit(1);
}
