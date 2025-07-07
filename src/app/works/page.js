import Link from 'next/link';
import Image from 'next/image';
import { getAllWorks } from '@/lib/wordpress'; // 正しい関数をインポート

export default async function WorksPage() {
  const allWorks = await getAllWorks();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold mb-12 text-center text-white">
        Works
      </h1>

      {/* 実績一覧をグリッドで表示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allWorks.map((work) => (
          <Link
            href={`/works/${work.slug}`}
            key={work.id}
            className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative w-full h-60">
              <Image
                src={work.featuredImage?.node.sourceUrl || '/placeholder.png'}
                alt={work.featuredImage?.node.altText || work.title}
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                {work.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}