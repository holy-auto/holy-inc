export interface CompanyInfo {
  name: string;
  founded: string;
  capital: string;
  representative: string;
  employees: string;
  business: string[];
  address: string;
  access: string;
  tel: string;
  email: string;
}

export const companyInfo: CompanyInfo = {
  name: '株式会社HOLY',
  founded: '2024年11月12日',
  capital: '10万円',
  representative: '代表取締役 堀越 友輔',
  employees: '1名（代表）',
  business: [
    '自動車カスタム・コーティング・フィルム施工・技術講習（HOLY-AUTO）',
    '車両履歴・技術証明インフラ（LEDRA）',
    '出張洗車サービス（MobileWash）※準備中',
  ],
  address: '東京都港区北青山1-3-1 アールキューブ青山3F',
  access: '東京メトロ銀座線・半蔵門線「青山一丁目駅」より徒歩3分',
  tel: '03-4363-3234',
  email: 'info@holy-inc.jp',
};

export interface TimelineEvent {
  year: string;
  month: string;
  title: string;
  description: string;
}

export const timeline: TimelineEvent[] = [
  {
    year: '2024',
    month: '11',
    title: '会社設立',
    description: '東京都港区北青山に「株式会社HOLY」を設立。自動車コーティング専門店として事業を開始。',
  },
  {
    year: '2024',
    month: '12',
    title: 'HOLY-AUTO ブランド展開',
    description: 'カスタム施工・コーティング・フィルム施工・技術講習を事業に追加。',
  },
  {
    year: '2025',
    month: '01',
    title: 'LEDRA プロジェクト始動',
    description: '自動車業界向け証明・信用インフラ「LEDRA」の開発を開始。ブロックチェーン技術を活用。',
  },
  {
    year: '2025',
    month: '03',
    title: 'MVVの策定',
    description: 'Mission・Vision・Valuesを策定。「職人の技術を、次へつなぐ」を企業理念として掲げる。',
  },
  {
    year: '2025',
    month: '10',
    title: 'MobileWash サービス準備',
    description: '出張洗車サービス「MobileWash」の立ち上げ準備を開始。',
  },
];