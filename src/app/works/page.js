import Image from 'next/image';
import Link from 'next/link';

// ★ 変更点1: 古いAPIの代わりに、新しい厨房の設計図 `posts.js` を読み込みます
import { getAllPortfoliosData } from '@/lib/posts';

export default function WorksPage() {
  // ★ 変更点2: 新しい厨房から、全ての実績データを取得します
  const allPortfolios = getAllPortfoliosData();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold mb-12 text-center text-white">
        Works
      </h1>

      {/* ここから下の表示部分は、以前のコードとほぼ同じです。
          しかし、参照しているデータは、新しい厨房からのものです！ */}
      {!allPortfolios || allPortfolios.length === 0 ? (
        <p className="text-center text-white">実績はまだありません。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPortfolios.map((work) => (
            // ★ 変更点3: リンク先も、新しいデータの `slug` を使うようにします
            <Link href={`/works/${work.slug}`} key={work.slug} className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative aspect-video">
                {/* 画像表示は、後でダミー画像が表示されるようにします */}
                {work.image ? (
                  <Image
                    src={work.image} // ★ 変更点4: 新しいデータの `image` を参照
                    alt={work.title}
                    fill
                    className="object-cover"
                    // ダミー画像なので、ドメイン設定は不要
                  />
                ) : (
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