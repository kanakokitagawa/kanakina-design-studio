import { getAllPortfolioSlugs, getPortfolioData } from '@/lib/posts';
import Image from 'next/image';

// このページが、どのURL（どの実績）で生成されるべきかをNext.jsに教えます
export async function generateStaticParams() {
  const paths = getAllPortfolioSlugs();
  return paths;
}

// 各ページを生成するためのメインの関数です
export default async function PortfolioPost({ params }) {
  // URLのslugを元に、実績の全データを取得します
  const portfolioData = await getPortfolioData(params.slug);

  return (
    <article className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold mb-4 text-center text-white">
        {portfolioData.title}
      </h1>
      <div className="text-lg text-gray-400 mb-8 text-center">
        {portfolioData.date}
      </div>

      {portfolioData.image && (
        <div className="relative w-full h-96 mb-12">
          <Image
            src={portfolioData.image}
            alt={portfolioData.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      {/* 本文をHTMLとして表示します */}
      <div
        className="prose prose-invert lg:prose-xl mx-auto text-white"
        dangerouslySetInnerHTML={{ __html: portfolioData.contentHtml }}
      />
    </article>
  );
}