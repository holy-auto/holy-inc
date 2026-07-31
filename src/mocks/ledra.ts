export interface LedraFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface LedraUseCase {
  id: string;
  role: string;
  title: string;
  description: string;
  benefit: string;
  imageUrl: string;
}

export interface LedraStat {
  value: string;
  label: string;
  description: string;
}

export interface TechLayer {
  name: string;
  description: string;
  icon: string;
}

export const ledraFeatures: LedraFeature[] = [
  {
    id: 'immutable-record',
    title: '施工記録の不変保存',
    description:
      'ブロックチェーン技術を活用し、車両の施工履歴・技術記録を改ざん不可能な形で保存。一度記録された情報は永遠に残り、後からの書き換えを完全に防ぎます。',
    icon: 'ri-shield-check-line',
  },
  {
    id: 'tech-certification',
    title: '技術者認証システム',
    description:
      '施工を行った技術者のスキル・実績・認定情報を紐付け。誰が、どの技術で、どのような施工を行ったのかを透明化し、技術者の「誇り」を証明します。',
    icon: 'ri-id-card-line',
  },
  {
    id: 'vehicle-history',
    title: '車両履歴の透明化',
    description:
      '中古車の過去の施工・修理・メンテナンス履歴を一本のタイムラインとして可視化。購入者が「本当に良い車か」を数字と事実で判断できる環境を創出。',
    icon: 'ri-time-line',
  },
  {
    id: 'cross-platform',
    title: 'マルチプラットフォーム対応',
    description:
      'ディーラー・買取店・オークション・個人売買など、あらゆる取引シーンに対応。API連携で既存システムとの統合もスムーズに行えます。',
    icon: 'ri-apps-line',
  },
  {
    id: 'real-time-verify',
    title: 'リアルタイム検証',
    description:
      'QRコードや専用アプリで、現場ですぐに記録の真贋を確認。購入判断のスピードを上げ、取引の摩擦を劇的に減らします。',
    icon: 'ri-qr-scan-line',
  },
  {
    id: 'data-portability',
    title: 'データの可搬性',
    description:
      '車両の記録は車両に付随。オーナーが変わっても履歴は引き継がれ、次のオーナーも同じ品質の情報にアクセスできます。',
    icon: 'ri-exchange-line',
  },
];

export const ledraUseCases: LedraUseCase[] = [
  {
    id: 'buyer',
    role: '購入者',
    title: '"本物"を、事実で選ぶ',
    description:
      '営業トークではなく、施工記録・技術者情報・部品履歴を見て判断。隠れた修復歴や手抜き施工を事前に回避し、後悔のない購入を実現。',
    benefit: '施工記録に基づく安心した購入判断',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Sophisticated%20car%20buyer%20holding%20a%20sleek%20transparent%20tablet%20displaying%20holographic%20vehicle%20history%20and%20blockchain%20verification%20records%20floating%20above%20a%20pristine%20luxury%20sedan%2C%20the%20digital%20interface%20showing%20encrypted%20maintenance%20timelines%20and%20certification%20badges%2C%20premium%20automotive%20showroom%20with%20dramatic%20spotlighting%20and%20reflective%20dark%20marble%20floors%2C%20professional%20commercial%20photography%2C%208K%20ultra%20detailed%2C%20shallow%20depth%20of%20field%2C%20cinematic%20lighting%20with%20warm%20golden%20and%20cool%20teal%20accents%2C%20dark%20elegant%20atmosphere%2C%20no%20text&width=500&height=350&seq=ledra-buyer-pro-005&orientation=landscape',
  },
  {
    id: 'seller',
    role: '販売者・ディーラー',
    title: '"信用"を、資産に変える',
    description:
      '自社での施工・整備記録をLedraに登録し、販売時に差別化要素に。透明性が信用を生み、在庫回転率と販売単価の両方を向上させます。',
    benefit: '透明な履歴による信用向上と差別化',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Premium%20luxury%20car%20dealership%20interior%20with%20a%20professional%20consultant%20presenting%20glowing%20digital%20vehicle%20verification%20data%20on%20a%20large%20curved%20transparent%20display%20to%20an%20interested%20customer%2C%20holographic%20blockchain%20records%20and%20service%20history%20floating%20in%20mid-air%20beside%20a%20gleaming%20black%20sedan%2C%20ultra-modern%20showroom%20with%20dramatic%20architectural%20lighting%20and%20polished%20reflective%20surfaces%2C%20professional%20commercial%20photography%2C%208K%20ultra%20detailed%2C%20cinematic%20atmosphere%20with%20rich%20warm%20amber%20and%20subtle%20teal%20accents%2C%20dark%20sophisticated%20environment%2C%20no%20text&width=500&height=350&seq=ledra-seller-pro-005&orientation=landscape',
  },
  {
    id: 'technician',
    role: '技術者',
    title: '"技術"を、証明する',
    description:
      '自分の施工が記録に残り、技術の「可視化」を実現。スキルの証明が評価・報酬に直結。次世代への「継承」にも、具体的数据として活用できます。',
    benefit: '技術の可視化による評価向上',
    imageUrl:
      'https://readdy.ai/api/search-image?query=Expert%20automotive%20technician%20using%20a%20precision%20digital%20scanning%20device%20on%20a%20luxury%20car%20panel%20with%20holographic%20quality%20verification%20data%20and%20blockchain%20certification%20records%20glowing%20in%20translucent%20teal%20overlay%2C%20advanced%20measurement%20tools%20and%20LED%20inspection%20systems%20surrounding%20the%20work%20area%2C%20high-tech%20Japanese%20automotive%20workshop%20with%20pristine%20equipment%2C%20professional%20commercial%20photography%2C%208K%20ultra%20detailed%2C%20macro%20detail%20emphasis%2C%20cinematic%20lighting%20with%20cool%20cyan%20and%20warm%20amber%20contrast%2C%20dark%20moody%20atmosphere%2C%20no%20text&width=500&height=350&seq=ledra-tech-pro-005&orientation=landscape',
  },
];

export const ledraStats: LedraStat[] = [
  {
    value: '100%',
    label: '改ざん防止',
    description: 'ブロックチェーンによる完全な不変性',
  },
  {
    value: '3秒',
    label: '検証時間',
    description: 'QRスキャンで即座に記録を確認',
  },
  {
    value: '∞',
    label: '保存期間',
    description: '車両寿命に連動した永久保存',
  },
];

export const techLayers: TechLayer[] = [
  {
    name: 'ブロックチェーン層',
    description: '分散型台帳で記録の不変性を担保',
    icon: 'ri-links-line',
  },
  {
    name: '暗号化層',
    description: 'AES-256 + RSA でデータを多重保護',
    icon: 'ri-lock-2-line',
  },
  {
    name: '認証層',
    description: '技術者・施工業者のデジタル身分証明',
    icon: 'ri-fingerprint-line',
  },
  {
    name: 'API層',
    description: 'REST/GraphQL で外部システムと連携',
    icon: 'ri-server-line',
  },
];

export const ledraProblemPoints = [
  '中古車の過去施工履歴が不透明で、購入後のトラブルが頻発',
  '優秀な技術者の実績が可視化されず、正当な評価を受けにくい',
  '販売店側も「本当に良い車」を証明する手段がない',
  '紙の記録は紛失・改ざんのリスクがあり、信用に繋がらない',
];

export const ledraSolutions = [
  '施工記録をブロックチェーンに刻み、永遠に残る「証明」を生成',
  '技術者ごとに実績を蓄積し、スキルの「可視化」を実現',
  '販売店は客観的数据で品質を訴求し、差別化を図る',
  'デジタル化により紙の煩雑さを排除し、効率と信用を両立',
];