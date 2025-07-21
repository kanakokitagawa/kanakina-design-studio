import Image from 'next/image';
import Link from 'next/link';
import { getAllPostsData, getPostData, getPostsByCategory } from '@/lib/posts';

export default async function BlogPage({ params }) {
  const slugParts = params.slug || [];

  // === 一覧ページの場合 (/blog) ===
  if (slugParts.length === 0) {
    const allPosts = getAllPostsData();
    return (
      <div className="bg-floral-white">
        <div className="container mx-auto px-4 py-16 md:py-24" style={{ paddingTop: '100px' }}>
          <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-video">
                  {post.image && <Image src={post.image} alt={post.title} fill className="object-cover" />}
                </div>
                <div className="p-4">
                  {post.category && <p className="text-sm text-sky-400 mb-1">{post.category}</p>}
                  <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // === カテゴリーページの場合 (/blog/category/lifeなど) ===
  if (slugParts.length === 2 && slugParts[0] === 'category') {
    const categoryName = decodeURIComponent(slugParts[1]);
    const posts = getPostsByCategory(categoryName);
    return (
      <div className="bg-floral-white">
        <div className="container mx-auto px-4 py-16 md:py-24" style={{ paddingTop: '100px' }}>
          <h1 className="text-4xl font-bold mb-12 text-center">Blog: {categoryName}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-video">
                  {post.image && <Image src={post.image} alt={post.title} fill className="object-cover" />}
                </div>
                <div className="p-4">
                  {post.category && <p className="text-sm text-sky-400 mb-1">{post.category}</p>}
                  <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // === 詳細ページの場合 (/blog/new-beginningなど) ===
  if (slugParts.length === 1) {
    const postData = await getPostData(slugParts[0]);
    return (
      <article className="bg-floral-white">
        <div className="container mx-auto px-4 py-16 md:py-24" style={{ paddingTop: '100px' }}>
          <h1 className="text-4xl font-bold mb-4 text-center">{postData.title}</h1>
          <div className="text-lg text-gray-600 mb-8 text-center">{postData.date}</div>
          {postData.image && (
            <div className="mb-12">
              <Image src={postData.image} alt={postData.title} width={1200} height={800} className="w-full h-auto rounded-lg" />
            </div>
          )}
          <div className="prose lg:prose-xl mx-auto" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </article>
    );
  }

  return null;
}