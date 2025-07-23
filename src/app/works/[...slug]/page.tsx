import Image from 'next/image';
import Link from 'next/link';
import { getAllPortfoliosData, getPortfolioData, getPortfoliosByCategory, Portfolio } from '@/lib/posts';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugParts = params.slug || [];
  if (slugParts.length === 1) {
    const portfolioData = await getPortfolioData(slugParts[0]);
    return { title: `${portfolioData.title} | Kanakina Design Studio` };
  }
  return { title: 'Works | Kanakina Design Studio' };
}

export default async function WorksPage({ params }: Props) {
  const slugParts = params.slug || [];

  // ■■■ 一覧ページの場合 ■■■
  if (slugParts.length === 0) {
    const allPortfolios: Omit<Portfolio, 'contentHtml'>[] = getAllPortfoliosData();
    return (
      <div className="bg-bone" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-12 text-center text-white">Works</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPortfolios.map((portfolio) => (
              <Link href={`/works/${portfolio.slug}`} key={portfolio.slug} className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-video">
                  {portfolio.image && <Image src={portfolio.image} alt={portfolio.title} fill className="object-cover" />}
                </div>
                <div className="p-4">
                  <p className="text-sm text-sky-400 mb-1">{portfolio.category}</p>
                  <h3 className="text-lg font-semibold text-white">{portfolio.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ■■■ カテゴリー別ページの場合 ■■■
  if (slugParts.length === 2 && slugParts[0] === 'category') {
    const categoryName = decodeURIComponent(slugParts[1]);
    const portfolios: Omit<Portfolio, 'contentHtml'>[] = getPortfoliosByCategory(categoryName);
    return (
      <div className="bg-bone" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-12 text-center text-white">Works: {categoryName}</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((portfolio) => (
              <Link href={`/works/${portfolio.slug}`} key={portfolio.slug} className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-video">
                  {portfolio.image && <Image src={portfolio.image} alt={portfolio.title} fill className="object-cover" />}
                </div>
                <div className="p-4">
                  <p className="text-sm text-sky-400 mb-1">{portfolio.category}</p>
                  <h3 className="text-lg font-semibold text-white">{portfolio.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ■■■ 詳細ページの場合 ■■■
  if (slugParts.length === 1) {
    const portfolioData: Portfolio = await getPortfolioData(slugParts[0]);
    return (
      <article className="bg-floral-white" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4 text-center">{portfolioData.title}</h1>
          <div className="text-lg text-gray-600 mb-8 text-center">{portfolioData.date}</div>
          
          {/* ★★★ ここが修正点です ★★★ */}
          {/* 詳細ページのメイン画像は不要とのことでしたので、以下の画像表示ブロックを完全に削除しました。*/}
          
          {/* 本文のHTMLコンテンツ（YouTube動画など）だけを表示します */}
          <div className="prose lg:prose-xl mx-auto" dangerouslySetInnerHTML={{ __html: portfolioData.contentHtml }} />
        </div>
      </article>
    );
  }

  return null;
}
