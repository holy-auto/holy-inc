export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  priceRange: string;
  duration: string;
  imageUrl: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  car: string;
  rating: number;
}

export const services: ServiceItem[] = [
  {
    id: 'coating',
    name: 'ガラスコーティング',
    tagline: '納車品質の輝きを、長く。',
    description:
      '新車時の輝きを再現するプロ仕様のガラスコーティング。独自の多層塗布技術により、深みのある光沢と長期間の保護性能を両立。3年〜5年の耐久性を実現。',
    features: [
      '多層ガラスコーティング施工',
      '下地処理（洗浄・研磨・脱脂）',
      '専用硬化ブース完備',
      '施工後3年〜5年保証',
    ],
    priceRange: '¥35,000 〜',
    duration: '2〜4日間',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Extreme%20close-up%20of%20a%20professional%20detailer%20hand-applying%20premium%20ceramic%20glass%20coating%20to%20a%20luxury%20car%20hood%20with%20visible%20holographic%20rainbow%20iridescent%20reflection%20effects%20on%20the%20wet%20glossy%20surface%2C%20the%20applicator%20pad%20gliding%20smoothly%20over%20flawless%20paint%2C%20macro%20photography%20capturing%20every%20droplet%20and%20light%20refraction%2C%20advanced%20LED%20inspection%20lamps%20illuminating%20the%20work%20area%2C%20pristine%20high-end%20Japanese%20automotive%20workshop%20background%2C%20professional%20commercial%20photography%2C%208K%20ultra%20detailed%2C%20shallow%20depth%20of%20field%2C%20cinematic%20lighting%20with%20warm%20golden%20and%20cool%20teal%20accents%2C%20dark%20elegant%20atmosphere%2C%20no%20text&width=500&height=350&seq=holyauto-coating-pro-005&orientation=landscape',
  },
  {
    id: 'film',
    name: 'プロテクションフィルム',
    tagline: '傷から守る、見た目はそのまま。',
    description:
      'ペイントプロテクションフィルム（PPF）で車体を守る。飛び石・傷・紫外線から愛車を保護しながら、塗装の輝きはそのまま。部分的・フルラッピング対応。',
    features: [
      '高品質TPUフィルム使用',
      'パターン裁断・手裁断両対応',
      '飛び石・傷・黄ばみ防止',
      '自己修復機能付きフィルム',
    ],
    priceRange: '¥48,000 〜',
    duration: '1〜3日間',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Precision%20paint%20protection%20film%20installation%20on%20the%20front%20bumper%20of%20a%20pristine%20white%20luxury%20sedan%2C%20skilled%20technician%20carefully%20aligning%20transparent%20TPU%20film%20with%20laser-guided%20cutting%20tools%20visible%2C%20the%20glossy%20paint%20beneath%20showing%20perfect%20mirror%20reflections%20of%20professional%20workshop%20lighting%2C%20clean%20modern%20automotive%20protection%20studio%20with%20premium%20equipment%20and%20digital%20measurement%20displays%2C%20macro%20detail%20shot%20emphasizing%20film%20edge%20perfection%2C%20professional%20commercial%20photography%2C%208K%20ultra%20detailed%2C%20shallow%20depth%20of%20field%2C%20cinematic%20lighting%20with%20rich%20warm%20tones%20against%20dark%20background%2C%20no%20text&width=500&height=350&seq=holyauto-film-pro-005&orientation=landscape',
  },
  {
    id: 'custom',
    name: 'カスタム施工',
    tagline: '電装品取付からエアロ制作まで。',
    description:
      '電装品取付、エアロパーツ制作・取付、内装カスタムなど、お客様の理想のカスタムを実現。熟練技術者が一台一台丁寧に施工し、機能性とデザイン性を両立。',
    features: [
      '電装品取付・配線加工',
      'エアロパーツ制作・取付',
      '内装カスタム・張替え',
      'オーダーメイド対応',
    ],
    priceRange: '¥15,000 〜',
    duration: '1日〜',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Luxury%20car%20interior%20customization%20in%20progress%20with%20fiber%20optic%20ambient%20lighting%20being%20installed%20along%20the%20dashboard%20and%20door%20panels%2C%20glowing%20soft%20teal%20LED%20strips%20weaving%20through%20premium%20leather%20upholstery%2C%20advanced%20electronic%20modules%20and%20custom%20digital%20displays%20visible%2C%20high-end%20vehicle%20modification%20workshop%20with%20precision%20tools%20and%20diagnostic%20equipment%2C%20the%20sleek%20interior%20bathed%20in%20dramatic%20moody%20lighting%2C%20professional%20automotive%20interior%20photography%2C%208K%20ultra%20detailed%2C%20cinematic%20atmosphere%20with%20rich%20warm%20amber%20and%20cool%20teal%20color%20palette%2C%20dark%20sophisticated%20background%2C%20no%20text&width=500&height=350&seq=holyauto-custom-pro-005&orientation=landscape',
  },
  {
    id: 'training',
    name: '技術講習',
    tagline: '職人の技を、次の世代へ。',
    description:
      '自動車コーティング・フィルム施工・カスタム技術の講習会を開催。初学者から上級者まで、段階的なカリキュラムで確実な技術習得。認定制度で技術の証明まで一気通貫。',
    features: [
      'コーティング技術講習',
      'フィルム施工講習',
      'カスタム技術講習',
      '認定技術者制度',
    ],
    priceRange: '¥25,000 〜',
    duration: '1日〜3日間',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Professional%20automotive%20coating%20instructor%20demonstrating%20advanced%20technique%20on%20a%20car%20panel%20to%20an%20attentive%20apprentice%20in%20a%20state-of-the-art%20training%20facility%2C%20large%20curved%20monitors%20displaying%20real-time%20paint%20analysis%20data%20and%20vehicle%20diagnostic%20information%2C%20modern%20workshop%20with%20pristine%20equipment%20and%20organized%20tool%20stations%2C%20warm%20focused%20task%20lighting%20creating%20dramatic%20contrast%2C%20educational%20yet%20premium%20atmosphere%2C%20professional%20commercial%20photography%2C%208K%20ultra%20detailed%2C%20cinematic%20depth%20of%20field%2C%20rich%20warm%20tones%20with%20subtle%20teal%20accents%2C%20dark%20sophisticated%20background%2C%20no%20text&width=500&height=350&seq=holyauto-training-pro-005&orientation=landscape',
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: '入庫・査定',
    description: '車両状態を詳細に査定。傷・汚れ・塗装状態を記録し、最適な施工プランをご提案。',
    icon: 'ri-search-line',
  },
  {
    step: '02',
    title: '下地処理',
    description: '徹底した洗浄・鉄粉除去・粘土洗浄・研磨で、塗装面を完璧な状態に整えます。',
    icon: 'ri-brush-line',
  },
  {
    step: '03',
    title: '本施工',
    description: '熟練技術者が、一工程ずつ丁寧にコーティング・フィルムを施工。急ぎません。',
    icon: 'ri-tools-line',
  },
  {
    step: '04',
    title: '検査・納車',
    description: '最終検査を経て納車。施工記録をLedraに登録し、品質を透明に証明します。',
    icon: 'ri-checkbox-circle-line',
  },
];

export const whyItems: WhyItem[] = [
  {
    id: 'craftsmanship',
    title: '職人の技術',
    description:
      '3年以上の研修を経た認定技術者のみが施工。機械では代替できない「手の感覚」と「目利き」が、納車品質を生み出します。',
    icon: 'ri-user-star-line',
  },
  {
    id: 'facility',
    title: 'プロの現場設備',
    description:
      '純水設備・専用硬化ブース完備。現場環境を徹底管理し、施工品質を一定に保ちます。',
    icon: 'ri-building-4-line',
  },
  {
    id: 'materials',
    title: '厳選素材のみ使用',
    description:
      'コーティング剤・フィルム・研磨材は、国内メーカーの高品質製品を厳選。品質に妥協しない素材選びを徹底しています。',
    icon: 'ri-shield-check-line',
  },
  {
    id: 'record',
    title: '施工記録をLedraに',
    description:
      'すべての施工をLedraに記録。透明な履歴で品質を証明。技術の「誇り」を次世代にも伝えます。',
    icon: 'ri-links-line',
  },
  {
    id: 'warranty',
    title: '長期保証体制',
    description:
      'コーティングは3年〜5年、フィルムは5年〜10年の保証。施工後も定期点検・メンテナンスで安心を継続。',
    icon: 'ri-award-line',
  },
  {
    id: 'succession',
    title: '技術の継承',
    description:
      '若手技術者へのOJT体制を整備。HOLYの技術が次世代に受け継がれ、お客様へのサービス品質が長く保たれます。',
    icon: 'ri-hand-heart-line',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    content:
      'コーティング後2年経ちますが、光沢がまったく衰えていません。定期メンテナンスでずっと綺麗な状態を保てているのが嬉しいです。',
    author: 'S.K. 様',
    car: 'BMW 3シリーズ',
    rating: 5,
  },
  {
    id: 't2',
    content:
      'フロントのPPF施工をお願いしました。貼ってあることがわからないほど自然な仕上がり。飛び石傷も防げて大満足です。',
    author: 'M.T. 様',
    car: 'レクサス RX',
    rating: 5,
  },
  {
    id: 't3',
    content:
      'HOLY AUTOでコーティング・カスタムを施工。施工履歴がLedraで透明に記録されていて、安心して任せられました。仕上がりも素晴らしかったです。',
    author: 'Y.H. 様',
    car: 'メルセデス・ベンツ Cクラス',
    rating: 5,
  },
];

export const problemPoints = [
  'コーティング後すぐに輝きが落ち、手入れが大変',
  'フィルム施工後に気泡・黄ばみが出てしまった',
  'カスタム施工の品質が店によってばらつき、不安',
  '技術継承が組織的でなく、若手育成が遅れている',
];

export const solutions = [
  '独自多層技術で3年〜5年の持続的輝き。定期メンテナンスでさらに長持ち',
  '熟練技術者の手貼り+厳選TPUフィルム。気泡ゼロ・黄ばみ防止',
  '認定技術者制度+標準化マニュアルで、どの技術者でも一定品質',
  '技術講習・OJT体制で若手を確実に育成。技術の継承を組織的に推進',
];