import Image from 'next/image';
import Link from 'next/link'; // リンク機能を使うために必要です

// ★ 修正点1: 正しい関数名 `getAllPortfolios` をインポートします
import { getAllPortfolios } from '@/lib/api';

export default async function WorksPage() {
  // ★ 修正点2: 正しい関数を呼び出し、結果を入れる変数名も `allPortfolios` に統一します
  const allPortfolios = await getAllPortfolios();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold mb-12 text-center text-white">
        Works
      </h1>

      {/* ★ 修正点3: 新しい変数名 `allPortfolios` を使ってデータの有無を判定します */}
      {!allPortfolios || allPortfolios.length === 0 ? (
        <p className="text-center text-white">実績はまだありません。</p>
      ) : (
        // 実績一覧をグリッドで表示
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* ★ 修正点4: 新しい変数名 `allPortfolios` を使って、各実績をループ処理します */}
          {allPortfolios.map((work) => (
            <Link href={`/works/${work.slug}`} key={work.id} className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative aspect-video">
                {/* WordPressから取得したアイキャッチ画像を表示 */}
                {work.featuredImage ? (
                  <Image
                    src={work.featuredImage.node.sourceUrl}
                    alt={work.featuredImage.node.altText || work.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  // 画像がない場合の代替表示
                  <div className="w-full h-full bg-neutral-700"></div>
                )}
              </div>
              <div className="p-4">
                 <h3 className="text-lg font-semibold text-white">{work.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}