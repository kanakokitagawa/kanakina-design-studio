import Image from 'next/image';
import { getPostBySlug } from '@/lib/wordpress';

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return <div>Post not found.</div>;
  }

  // 日付をフォーマット（例: 2025-06-19 -> 2025.06.19）
  const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.');

  return (
    <article className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">{post.title}</h1>
      <p className="text-center text-neutral-400 mb-8">{formattedDate}</p>

      {post.featuredImage && (
        <div className="relative w-full h-60 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}

      <div
        className="prose prose-invert lg:prose-xl max-w-4xl mx-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}