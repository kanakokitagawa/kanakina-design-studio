// あなたが提供する、素晴らしいサービスの一覧です
const services = [
  {
    title: "トータルブランディング",
    description: "クライアントの魅力と個性を引き出し、動画、ロゴ、販促物まで、一貫した世界観を構築します。"
  },
  {
    title: "プロモーション動画制作",
    description: "企業PR、人材採用、商品紹介、営業用など、目的に合わせた最適な動画を企画・制作します。"
  },
  {
    title: "SNS動画運用",
    description: "YouTube、TikTokなど、プラットフォームの特性を活かしたコンテンツで、ファンを増やし、ブランドを成長させます。"
  },
  {
    title: "ショップデザイン",
    description: "オンラインストア（BASEなど）のデザインから、リアル店舗の販促物まで、トータルでサポートします。"
  },
  {
    title: "ロゴ & グラフィック",
    description: "ブランドの顔となるロゴや、名刺、パンフレットなど、想いを形にするデザインを提供します。"
  },
  {
    title: "社内向けコンテンツ",
    description: "理念浸透のための研修動画や、業務マニュアルなど、組織を強くする映像コンテンツを制作します。"
  }
];

export default function BrandingPage() {
  return (
    <div className="bg-bone">
    <div className="container mx-auto px-4 py-16 md:py-24" style={{ paddingTop: '120px' }}>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Our Services</h1>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          あなたの想いを、唯一無二のブランドへ。私たちは、デザインと映像の力で、あなたのビジネスを加速させます。
        </p>
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-olive-drab bg-apacity-50 p-8 rounded-lg shadow-lg border border-neutral-700
                                      transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-neutral-100 mb-3">{service.title}</h3>
            <p className="text-neutral-900 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}