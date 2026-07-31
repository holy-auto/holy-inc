export interface JobCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface JobOpening {
  id: string;
  title: string;
  category: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  idealCandidate: string;
}

export interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  duration: string;
  icon: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CareerStat {
  value: string;
  label: string;
}

export const jobCategories: JobCategory[] = [
  {
    id: 'technician',
    name: '施工技術者',
    description: '自動車コーティング・フィルム施工の現場で、代表とともに技術を磨く',
    icon: 'ri-brush-line',
  },
  {
    id: 'digital',
    name: 'デジタル・エンジニア',
    description: 'Ledraの開発・Webサイト・システム構築。小さなチームで大きな影響を',
    icon: 'ri-code-s-slash-line',
  },
  {
    id: 'business',
    name: '営業・運営',
    description: '法人営業・CS・ブランド運営。2名のチームに欠かせない縁の下の力持ち',
    icon: 'ri-customer-service-2-line',
  },
];

export const jobOpenings: JobOpening[] = [
  {
    id: 'coating-tech',
    title: '自動車コーティング施工スタッフ',
    category: '施工技術者',
    type: '正社員',
    location: '東京都港区（本社併設工房）',
    description:
      'HOLY AUTOの施工現場で、ガラスコーティング・フィルム施工・下地処理を担当。代表（堀越）が直接OJTで指導します。小さなチームだからこそ、施工から接客まで一貫して携われます。',
    requirements: [
      '自動車コーティング・洗車・フィルム施工の実務経験（1年以上）または整備・鈑金塗装の実務経験',
      '細かい作業が得意な方、物作りが好きな方',
      '普通自動車免許（AT可）',
      '学歴不問',
    ],
    idealCandidate: '「技術を極めたい」という気持ちが強く、小さなチームで一緒に会社を作り上げたい方',
  },
  {
    id: 'engineer',
    title: 'Webアプリケーションエンジニア',
    category: 'デジタル・エンジニア',
    type: '正社員・業務委託（週3日〜相談可）',
    location: '東京都港区（リモート併用可）',
    description:
      'LedraのWebアプリケーション・管理画面・APIの設計・開発を担当。代表と二人三脚で、自動車業界の「信用インフラ」を作り上げます。小さなチームだからこそ、設計から実装、運用まで全部できます。',
    requirements: [
      'React / TypeScript / Node.js いずれかでの開発経験 1年以上',
      'REST API の設計・実装経験',
      'Git を使ったチーム開発経験',
      '自走力があり、課題を自分で見つけ解決できる方',
    ],
    idealCandidate: '「技術で業界を変えたい」という野心があり、0→1のプロダクト創りに興奮する方',
  },
  {
    id: 'sales-ops',
    title: '営業・運営スタッフ',
    category: '営業・運営',
    type: '正社員',
    location: '東京都港区（出張あり）',
    description:
      '法人営業（MobileWash Fleet契約・Ledra導入）と、社内運営業務（事務・CS対応・SNS運用）を担当。2名のチームにとって「縁の下の力持ち」が最も必要なポジションです。',
    requirements: [
      '法人営業またはサービス業での接客・運営経験 1年以上',
      'Excel・Word・PowerPoint の基本操作',
      'SNS（Instagram・X）の運用に興味がある方歓迎',
      '普通自動車免許',
    ],
    idealCandidate: '「人と話すことが好き」で、小さなチームの「潤滑油」になりたい方',
  },
  {
    id: 'open',
    title: 'オープン応募（職種不問）',
    category: '施工技術者',
    type: '正社員・業務委託・アルバイト',
    location: '東京都港区（リモート併用可）',
    description:
      '上記の職種に当てはまらなくても、「HOLYで働きたい」という熱意があれば歓迎します。代表と直接話して、あなたに最適な役割を一緒に考えます。',
    requirements: [
      '「技術を資産にする」というHOLYのVisionに共感できる方',
      '自動車・IT・サービス業への興味・関心',
      '学歴・経験不問',
    ],
    idealCandidate: '「まだ何者でもないけど、一緒に何かを作りたい」という方',
  },
];

export const trainingPrograms: TrainingProgram[] = [
  {
    id: 'ojt-direct',
    name: '代表直々のOJT',
    description:
      '入社後は代表（堀越）がマンツーマンで指導。施工現場で隣に立って、一工程ずつ教えます。小さなチームだからできる、手厚い育成です。',
    duration: '入社後〜継続',
    icon: 'ri-user-follow-line',
  },
  {
    id: 'all-round',
    name: 'オールラウンド体験',
    description:
      '施工だけでなく、接客・見積もり・SNS発信・事務処理にも触れることができます。スタートアップの当事者として、会社全体が見渡せる環境です。',
    duration: '継続的',
    icon: 'ri-exchange-line',
  },
  {
    id: 'seminar',
    name: '外部セミナー・書籍支援',
    description:
      '技術セミナーや業界展示会の参加費、業務に関連する書籍購入費を会社が補助。スキルアップを金銭面で後押しします。',
    duration: '年2〜3回程度',
    icon: 'ri-graduation-cap-line',
  },
  {
    id: 'ledra-record',
    name: '施工記録の可視化',
    description:
      'Ledraに自分の施工記録を残すことで、客観的な成長の軌跡を確認できます。数字で「前より上手くなった」を実感できます。',
    duration: '継続的',
    icon: 'ri-award-line',
  },
];

export const benefits: Benefit[] = [
  {
    id: 'insurance',
    title: '社会保険完備',
    description: '健康保険・厚生年金・雇用保険・労災保険を完備。スタートアップでも安心して働ける環境を整えます。',
    icon: 'ri-shield-check-line',
  },
  {
    id: 'flextime',
    title: 'フレックスタイム制',
    description: 'コアタイムなしのフレックスタイム。朝型・夜型もOK。施工現場の場合、変形労働時間制を適用します。',
    icon: 'ri-time-line',
  },
  {
    id: 'transport',
    title: '交通費全額支給',
    description: '通勤交通費を全額支給。出張時のガソリン代・駐車場代も実費精算します。',
    icon: 'ri-car-line',
  },
  {
    id: 'tools',
    title: '道具・機材貸与',
    description: '施工に必要な道具・機材を会社が貸与。個人で高額な道具を揃える必要はありません。',
    icon: 'ri-tools-line',
  },
  {
    id: 'service',
    title: '自社サービス無料・割引',
    description: 'HOLY AUTOの施工を社員価格で利用可能。MobileWashも無料・割引で使えます。',
    icon: 'ri-sparkling-line',
  },
  {
    id: 'book-seminar',
    title: '書籍・セミナー代補助',
    description: '業務に関連する書籍購入やセミナー参加費を月5,000円まで補助。成長への投資を応援します。',
    icon: 'ri-book-open-line',
  },
];

export const careerStats: CareerStat[] = [
  {
    value: '2024.11',
    label: '設立年月',
  },
  {
    value: '2名',
    label: '現在のチーム',
  },
  {
    value: '3ブランド',
    label: '事業展開',
  },
];

export const culturePoints = [
  {
    title: '0→1を一緒に作る',
    description: '大企業の歯車ではなく、創業メンバーとして会社の核を作る当事者になれます。あなたの提案が、明日の会社の姿を変えます。',
  },
  {
    title: '代表との距離感ゼロ',
    description: 'フロアも組織もフラット。代表（堀越）と毎日隣で働き、直接技術や考え方を学べます。会議室ではなく現場で語り合う文化です。',
  },
  {
    title: '施工も営業も全部学べる',
    description: '小さなチームだからこそ、専任の枠を超えて多様な業務に挑戦できます。今日は施工、明日はSNS運用。幅広いスキルが身につきます。',
  },
  {
    title: '技術の「記録」を一緒に考える',
    description: 'Ledraで施工記録を残す文化は、単なる管理ではありません。自分たちの手で「技術者の誇り」を証明する仕組みを作っている実感があります。',
  },
];