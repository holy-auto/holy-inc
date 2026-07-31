export interface WashPlan {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  recommended: boolean;
  badge?: string;
}

export interface WashFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WashStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServiceArea {
  region: string;
  cities: string[];
}

export const washPlans: WashPlan[] = [
  {
    id: 'payg',
    name: '都度払い',
    price: '¥3,980',
    priceNote: '/ 回（税込・出張料込）',
    description:
      '使いたい時だけ。試しに1回からご利用OK。',
    features: [
      '出張料含込',
      '全メニューから選択可',
      '支払いはアプリで完結',
      'キャンセル料 24時間前まで無料',
    ],
    recommended: false,
  },
  {
    id: 'light',
    name: '定額ライト',
    price: '¥2,980',
    priceNote: '/ 月（税込・出張料込）',
    description:
      '月1回の手洗い洗車で、いつもキレイをキープ。',
    features: [
      '月1回 出張手洗い洗車込み',
      'オプション追加 10%OFF',
      '予約優先枠',
      '雨天時の再施工保証',
    ],
    recommended: false,
    badge: '20%お得',
  },
  {
    id: 'premium',
    name: '定額プレミアム',
    price: '¥9,800',
    priceNote: '/ 月（税込・出張料込）',
    description:
      '毎週ピカピカ。法人・愛車家に選ばれる王道プラン。',
    features: [
      '月4回 出張手洗い洗車込み',
      '年1回 ガラスコーティング込み',
      'オプション追加 20%OFF',
      '深夜・早朝枠の優先予約',
      '専属プロ指名可',
    ],
    recommended: true,
    badge: '人気No.1',
  },
];

export const washFeatures: WashFeature[] = [
  {
    id: 'professional',
    title: 'プロ技術者がご自宅へ',
    description:
      'HOLYが培った技術を持つ洗車専門スタッフが、お客様の指定場所へ出張。ディーラー並みの品質を、ご自宅で。',
    icon: 'ri-user-star-line',
  },
  {
    id: 'full-equipment',
    title: 'プロ仕様の現場設備',
    description:
      '純水生成器・高圧洗浄機・業務用掃除機など、すべて車載。現地で整備工房並みの環境を構築します。',
    icon: 'ri-truck-line',
  },
  {
    id: 'eco-friendly',
    title: '環境配慮型洗浄',
    description:
      '純水・中性洗剤・排水処理キットを標準装備。マンション駐車場や狭い場所でも安心して施工可能。',
    icon: 'ri-leaf-line',
  },
  {
    id: 'flexible',
    title: '時間・場所を自由に',
    description:
      '平日夜間・週末・出張先への来訪も対応。お客様のライフスタイルに合わせた柔軟な予約が可能。',
    icon: 'ri-calendar-check-line',
  },
  {
    id: 'corporate',
    title: '法人・ Fleet 契約対応',
    description:
      '企業の社用車・営業車・高級車の定期メンテナンスを一括管理。月次レポート・複数台割引もご用意。',
    icon: 'ri-building-line',
  },
  {
    id: 'ledra-linked',
    title: 'Ledra連携対応',
    description:
      '施工記録をLedraに登録し、次の売却時に「履歴付き車両」として差別化。技術の「証明」まで一気通貫。',
    icon: 'ri-links-line',
  },
];

export const washSteps: WashStep[] = [
  {
    step: '01',
    title: 'Webで予約',
    description: '日時・場所・車種・プランを選択。即日予約も可能。',
    icon: 'ri-smartphone-line',
  },
  {
    step: '02',
    title: 'スタッフ来訪',
    description: 'プロ技術者が指定場所へ。設営〜施工開始まで約10分。',
    icon: 'ri-map-pin-line',
  },
  {
    step: '03',
    title: '現場施工',
    description: '純水・高圧洗浄・手洗い・室内清掃・コーティングなど、プランに応じたフル施工。',
    icon: 'ri-brush-line',
  },
  {
    step: '04',
    title: '完了・お支払い',
    description: '施工後の確認・写真記録・お支払い。次回予約もその場でOK。',
    icon: 'ri-checkbox-circle-line',
  },
];

export const serviceAreas: ServiceArea[] = [
  {
    region: '東京都',
    cities: ['港区', '渋谷区', '新宿区', '千代田区', '中央区', '目黒区', '品川区', '大田区', '世田谷区', '文京区'],
  },
  {
    region: '神奈川県',
    cities: ['横浜市', '川崎市', '横須賀市'],
  },
  {
    region: '埼玉県',
    cities: ['さいたま市', '川口市', '所沢市'],
  },
];

export const problemPoints = [
  '洗車場へ行く時間が取れない、待ち時間が長い',
  'セルフ洗車では満足のいく仕上がりにならない',
  'コーティング施工はディーラーに預けるしかない',
  'マンション住まいで水場・排水が使えない',
];

export const solutions = [
  '出張型だから、待ち時間ゼロ。指定時間にスタッフが来訪',
  'プロ技術者の手洗いだから、傷も汚れも徹底除去',
  '現場でコーティング完結。預け入れ不要、即日乗れます',
  '純水・排水処理キット標準装備。どこでも施工可能',
];