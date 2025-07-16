import Link from 'next/link';
import Image from 'next/image';
// 古い関数ではなく、新しいgetAllWorksをインポートします
import { getAllWorks } from '@/lib/api'; 

export default async function WorksPage() {
  // WordPressから「実績一覧」のデータを取得します
  const allWorks = await getAllWorks();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold mb-12 text-center text-white">
        Works
      </h1>
      
      {/* allWorksが存在しない、または空の場合の表示 */}
      {!allWorks || allWorks.length === 0 ? (
        <p className="text-center text-white">実績はまだありません。</p>
      ) : (
        // 実績一覧をグリッドで表示
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allWorks.map((work) => (
            <Link href={`/works/${work.slug}`} key={work.id} className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative aspect-video">
                {/* WordPressから取得したアイキャッチ画像を表示！ */}
                {work.featuredImage ? (
                  <Image
                    src={work.featuredImage.node.sourceUrl}
                    alt={work.featuredImage.node.altText || work.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
                    <span className="text-neutral-500">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                {/* 実績のタイトルを表示 */}
                <h2 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors duration-300">
                  {work.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}