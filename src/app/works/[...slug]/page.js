import Image from 'next/image';
import Link from 'next/link';
import { getAllPortfoliosData, getPortfolioData, getPortfoliosByCategory } from '@/lib/posts';

export default async function WorksPage({ params }) {
  const slugParts = params.slug || [];

  // === 一覧ページの場合 ===
  if (slugParts.length === 0) {
    const allPortfolios = getAllPortfoliosData();
    return (
      // ★ 背景色を、一番外側に設定
      <div className="bg-floral-white">
        <div className="container mx-auto px-4 py-16 md:py-24" style={{ paddingTop: '100px' }}>
          {/* ★ 文字色(text-white)を削除 */}
          <h1 className="text-4xl font-bold mb-12 text-center">Works</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPortfolios.map((work) => (
              <Link href={`/works/${work.slug}`} key={work.slug} className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-video">
                  {work.image && <Image src={work.image} alt={work.title} fill className="object-cover" />}
                </div>
                <div className="p-4">
                  {work.category && <p className="text-sm text-sky-400 mb-1">{work.category}</p>}
                  {/* ★ 文字色(text-white)を、ここでは、あえて、残します（カードの中なので） */}
                  <h3 className="text-lg font-semibold text-white">{work.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // === カテゴリーページの場合 ===
  if (slugParts.length === 2 && slugParts[0] === 'category') {
    const categoryName = decodeURIComponent(slugParts[1]);
    const portfolios = getPortfoliosByCategory(categoryName);
    return (
      // ★ 背景色を、一番外側に設定
      <div className="bg-floral-white">
        <div className="container mx-auto px-4 py-16 md:py-24" style={{ paddingTop: '100px' }}>
          {/* ★ 文字色(text-white)を削除 */}
          <h1 className="text-4xl font-bold mb-12 text-center">Works: {categoryName}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((work) => (
              <Link href={`/works/${work.slug}`} key={work.slug} className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-video">
                  {work.image && <Image src={work.image} alt={work.title} fill className="object-cover" />}
                </div>
                <div className="p-4">
                  {work.category && <p className="text-sm text-sky-400 mb-1">{work.category}</p>}
                  <h3 className="text-lg font-semibold text-white">{work.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // === 詳細ページの場合 ===
  if (slugParts.length === 1) {
    const portfolioData = await getPortfolioData(slugParts[0]);
    const isVideo = portfolioData.contentHtml.includes('<iframe');
    return (
      // ★ 背景色を、一番外側に設定
      <article className="bg-floral-white">
        <div className="container mx-auto px-4 py-16 md:py-24" style={{ paddingTop: '100px' }}>
          {/* ★ 文字色(text-white)を削除 */}
          <h1 className="text-4xl font-bold mb-4 text-center">{portfolioData.title}</h1>
          {/* ★ 文字色(text-gray-400)を、少し濃いめの `text-gray-600` に変更 */}
          <div className="text-lg text-gray-600 mb-8 text-center">{portfolioData.date}</div>
          {!isVideo && portfolioData.image && (
            <div className="mb-12">
              <Image src={portfolioData.image} alt={portfolioData.title} width={1200} height={800} className="w-full h-auto rounded-lg" />
            </div>
          )}
          {/* ★ ここも、文字色(text-white)を削除 */}
          <div className="mx-auto" dangerouslySetInnerHTML={{ __html: portfolioData.contentHtml }} />
        </div>
      </article>
    );
  }

  return null;
}