import Image from 'next/image';
import Link from 'next/link';

// ★ 変更点1: 新しい厨房の設計図から、ブログ記事用の関数を読み込みます
import { getAllPostsData } from '@/lib/posts';

export default function BlogPage() {
  // ★ 変更点2: 新しい厨房から、全てのブログ記事データを取得します
  const allPosts = getAllPostsData();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold mb-12 text-center text-white">
        Blog
      </h1>

      {!allPosts || allPosts.length === 0 ? (
        <p className="text-center text-white">ブログ記事はまだありません。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            // ★ 変更点3: リンク先も、ブログ記事用に正しく設定します
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative aspect-video">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-700"></div>
                )}
              </div>
              <div className="p-4">
                 <h3 className="text-lg font-semibold text-white">{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}