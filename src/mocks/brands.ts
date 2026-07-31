export interface Brand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  imageUrl: string;
  color: string;
}

export const brands: Brand[] = [
  {
    id: 'ledra',
    name: 'Ledra',
    tagline: '自動車業界向けの証明・信用インフラ',
    description: '車両の施工履歴・技術記録をブロックチェーン技術で不変に記録。中古車市場の透明性を高め、職人の技術を「証明」する次世代インフラです。',
    features: ['施工記録の不変保存', '技術者認証システム', '車両履歴の透明化'],
    imageUrl: 'https://readdy.ai/api/search-image?query=modern%20automotive%20technology%20digital%20infrastructure%20abstract%20dark%20background%20with%20glowing%20network%20nodes%20and%20data%20flow%20lines%20minimalist%20premium%20corporate%20style%20subtle%20amber%20gold%20accents%20clean%20geometric%20composition&width=600&height=400&seq=ledra-001&orientation=landscape',
    color: 'amber',
  },
  {
    id: 'mobilewash',
    name: 'MobileWash',
    tagline: '出張洗車・現場サービス系ブランド',
    description: 'プロの技術者がお客様の指定場所に駆けつけ、妥協のないクオリティで洗車・コーティングを提供。時間と場所の制約から解放される、新しいカーケアの形です。',
    features: ['プロによる出張洗車', '現場コーティング', '法人契約対応'],
    imageUrl: 'https://readdy.ai/api/search-image?query=professional%20mobile%20car%20wash%20service%20luxury%20vehicle%20being%20detailed%20by%20skilled%20technician%20outdoor%20setting%20soft%20natural%20lighting%20premium%20clean%20aesthetic%20minimalist%20background%20warm%20tones%20high%20quality%20photography&width=600&height=400&seq=mobilewash-001&orientation=landscape',
    color: 'emerald',
  },
  {
    id: 'holy-auto',
    name: 'HOLY AUTO',
    tagline: '既存事業・施工現場の実体',
    description: '長年培った技術と実績を基盤に、自動車のコーティング・フィルム施工・車両販売を展開。職人の「誇り」と「誠実」を体現する、HOLYの原点となる事業です。',
    features: ['コーティング施工', 'フィルム貼付', '車両販売・買取'],
    imageUrl: 'https://readdy.ai/api/search-image?query=automotive%20coating%20workshop%20professional%20technician%20applying%20protective%20film%20to%20luxury%20car%20indoor%20garage%20setting%20warm%20industrial%20lighting%20clean%20organized%20workspace%20premium%20craftsmanship%20atmosphere%20high%20quality%20photography&width=600&height=400&seq=holyauto-001&orientation=landscape',
    color: 'stone',
  },
];

export interface Value {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export const values: Value[] = [
  {
    id: 'pride',
    title: '誇り',
    subtitle: 'Pride',
    description: '技術者が胸を張れる環境をつくる',
    icon: 'ri-medal-line',
  },
  {
    id: 'succession',
    title: '継承',
    subtitle: 'Succession',
    description: '今の技術を、次の誰かに渡すことを考える',
    icon: 'ri-hand-heart-line',
  },
  {
    id: 'integrity',
    title: '誠実',
    subtitle: 'Integrity',
    description: '嘘をつかない。記録を曲げない',
    icon: 'ri-shield-check-line',
  },
  {
    id: 'proof',
    title: '証明',
    subtitle: 'Proof',
    description: '言葉でなく、事実で語る',
    icon: 'ri-file-list-3-line',
  },
];