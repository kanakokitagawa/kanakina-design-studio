import Link from 'next/link';
import Image from 'next/image';
import { getAllPostsForHome } from '@/lib/wordpress';

// 日付をフォーマットするコンポーネント
function PostDate({ dateString }) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.');
  return <time dateTime={dateString}>{formattedDate}</time>;
}

export default async function BlogPage() {
  const allPosts = await getAllPostsForHome();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id}
            className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <div className="relative w-full h-48 bg-neutral-700">
              <Image
                src={post.featuredImage?.node.sourceUrl || '/no-image.png'}
                alt={post.featuredImage?.node.altText || post.title}
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-105 transition-transform duration-300"
              />
              {!post.featuredImage && (
                <div className="w-full h-full flex items-center justify-center text-neutral-500">
                  No Image
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-sm text-gray-400 mb-2">
                <PostDate dateString={post.date} />
              </p>
              <h2 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors mb-2">
                {post.title}
              </h2>
              <div
                className="text-gray-300 text-sm leading-relaxed flex-grow"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}