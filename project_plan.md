# 株式会社HOLY コーポレートサイト

## 1. プロジェクト概要

株式会社HOLYの統合コーポレートサイト。自動車業界向けの証明・信用インフラ「Ledra」、出張洗車・現場サービス「MobileWash」、既存事業・施工現場「HOLY AUTO」という3つの事業ブランドを統合的に紹介。企業理念（MVV）と各サービスの特徴を明確に伝える。

**対象ユーザー:** 自動車業界の関係者、技術者、潜在的なパートナー企業、採用候補者
**コアバリュー:** 職人の技術の継承と証明。技術を資産として次世代につなぐ。

## 2. ページ構成

- `/` - トップページ（Hero・MVV・ブランド紹介・お問い合わせ）
- `/ledra` - Ledraブランドページ（証明・信用インフラ詳細）
- `/mobilewash` - MobileWashブランドページ（出張洗車サービス詳細）
- `/holy-auto` - HOLY AUTOブランドページ（施工現場・既存事業詳細）
- `/about` - 会社概要ページ
- `/contact` - お問い合わせページ

## 3. コア機能一覧

- [x] ヒーローセクション（ブランドロゴ・ミッションのビジュアル化）
- [x] MVVセクション（Mission・Vision・Valuesの明示）
- [x] ブランド紹介セクション（Ledra / MobileWash / HOLY AUTO）
- [x] ナビゲーションとCTA
- [x] お問い合わせフォーム
- [x] フッター（会社情報・SNSリンク）

## 4. データモデル設計

現時点ではSupabase接続不要。静的コンテンツサイトとして構築。

## 5. バックエンド・サードパーティ連携計画

- **Supabase:** 現時点では不要。将来的にお問い合わせ管理や採用応募機能を追加する際に検討。
- **Shopify:** 不要。サービスサイトではなくコーポレートサイトのため。
- **Stripe:** 不要。

## 6. SEO構造化データ強化（2026.05.09実施）

全ページのSchema.orgマークアップを大幅に強化した：

### 追加スキーマ
- **BreadcrumbList** — 全8ページに追加。Google検索結果にパンくず表示を有効化
- **WebSite** — トップページ。サイト名とURLを明示
- **WebPage** — About/Contact/Careersページ。ページ属性を明示
- **LocalBusiness** — Aboutページ。areaServed + hasOfferCatalog（4サービス）を追加
- **ContactPage** — Contactページ。mainEntityとしてOrganizationを内包
- **FAQPage** — Contactページ（継続）
- **JobPosting** — Careersページ。jobBenefits + industryを追加
- **Product (Ledra)** — offers（seller + availability）を追加
- **Service (MobileWash)** — serviceType + AggregateOffer（価格帯）を追加
- **Service (HOLY AUTO)** — serviceType + hasOfferCatalog（4サービスメニュー）を追加

### 統合ユーティリティ
- `src/utils/seo.ts` に `buildBreadcrumbJsonLd()` 関数を作成。全ページで一貫したパンくずスキーマ生成を実現

## 7. 開発フェーズ計画

### Phase 1: トップページコアセクション
- **目標:** トップページの主要セクション（Hero・MVV・ブランド紹介・ナビゲーション）を構築
- **成果物:** フルデザインのトップページ、レスポンシブ対応

### Phase 2: ブランド詳細ページ
- **目標:** Ledra / MobileWash / HOLY AUTO の各ブランド詳細ページを構築
- **成果物:** 3つのブランドページ、ブランド間の導線

### Phase 3: 会社概要・お問い合わせ
- **目標:** AboutページとContactページ、フッターの構築
- **成果物:** 会社情報ページ、お問い合わせフォーム、フッター