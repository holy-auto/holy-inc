export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'コーティングの見積もりは無料ですか？',
    answer:
      'はい、HOLY AUTOの施工見積もりは完全無料です。車種・年式・現在の塗装状態を確認した上で、最適なプランをご提案いたします。来店査定も出張査定も対応しております。',
  },
  {
    id: '2',
    question: '出張洗車（MobileWash）はどのエリアに対応していますか？',
    answer:
      '現在、東京都23区・神奈川県（横浜・川崎エリア）・千葉県（船橋・柏エリア）・埼玉県（さいたま市エリア）に対応しております。法人契約の場合、上記エリア外も個別にご相談承ります。',
  },
  {
    id: '3',
    question: 'Ledraのブロックチェーン証明システムの導入にはどのくらいの期間がかかりますか？',
    answer:
      '標準的な導入期間は約2〜4週間です。契約締結後、システムの初期設定・技術者登録・施工フローの調整を行い、導入完了まで専任の担当者がサポートいたします。',
  },
  {
    id: '4',
    question: '施工中の車両はどこに預ける必要がありますか？',
    answer:
      'HOLY AUTO店舗（銀座・新宿・渋谷）にご入庫いただきます。期間は施工内容により1日〜5日程度です。代車のご用意も可能ですので、事前にご相談ください。',
  },
  {
    id: '5',
    question: '採用エントリー後、どのくらいで連絡が来ますか？',
    answer:
      'エントリーいただきましたら、原則として5営業日以内に担当からメールまたはお電話にてご連絡いたします。書類選考通過の場合、オンラインまたは対面での面接をご案内いたします。',
  },
  {
    id: '6',
    question: 'PPF（プロテクションフィルム）の保証期間はどのくらいですか？',
    answer:
      'HOLY AUTOのPPF施工には最長5年間の品質保証が付帯します。施工箇所の剥がれ・黄ばみ・気泡の発生などが生じた場合、無償で再施工いたします。保証の詳細は施工時にお渡しする保証書に記載しております。',
  },
  {
    id: '7',
    question: 'Ledra認定技術者を自社スタッフにさせるにはどうすればいいですか？',
    answer:
      '提携パートナー店としてご登録いただくと、お客様の技術者をLedra認定技術者制度の受講にご案内できます。受講料は無料で、オンライン研修と実技試験を通過後に認定証（NFT）が発行されます。',
  },
  {
    id: '8',
    question: '法人契約の料金体系を教えてください',
    answer:
      '法人契約は台数・施工頻度に応じてカスタム見積もりを作成いたします。MobileWashのFleet Careは5台から月額契約が可能で、HOLY AUTOの店舗施工も法人価格を設定しております。詳細はお問い合わせフォームよりご相談ください。',
  },
];

export const inquiryTypes = [
  { value: 'general', label: '一般的なお問い合わせ' },
  { value: 'coating', label: '施工・コーティング相談' },
  { value: 'ppf', label: 'PPF・フィルム相談' },
  { value: 'ledra', label: 'Ledra（ブロックチェーン）契約' },
  { value: 'mobilewash', label: 'MobileWash（出張洗車）契約' },
  { value: 'construction', label: '施工相談・見積もり' },
  { value: 'career', label: '採用・エントリー' },
  { value: 'media', label: '取材・メディア掲載' },
  { value: 'other', label: 'その他' },
];

export const contactMethods = [
  { value: 'email', label: 'メール' },
  { value: 'phone', label: '電話' },
  { value: 'both', label: 'どちらでも' },
];