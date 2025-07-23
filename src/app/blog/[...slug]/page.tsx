import Image from 'next/image';
import Link from 'next/link';
// Blog用のデータを 'posts.ts' から取得します
import { getAllPostsData, getPostData, getPostsByCategory, Post } from '@/lib/posts';
import type { Metadata } from 'next';

// ページが受け取るパラメータの型を定義します
type Props = {
  params: { slug: string[] };
};

// メタデータを生成する関数
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugParts = params.slug || [];
  if (slugParts.length === 1) {
    const postData = await getPostData(slugParts[0]);
    return { title: `${postData.title} | Kanakina Design Studio` };
  }import Image from 'next/image';
import Link from 'next/link';
import { getAllPostsData, getPostData, getPostsByCategory, Post } from '@/lib/posts';
import type { Metadata } from 'next';

//【最終修正】 type Props を使わず、引数に直接、厳密な型を定義します
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const slugParts = params.slug || [];
  if (slugParts.length === 1) {
    const postData = await getPostData(slugParts[0]);
    return { title: `${postData.title} | Kanakina Design Studio` };
  }
  return { title: 'Blog | Kanakina Design Studio' };
}

//【最終修正】 こちらも同様に、引数に直接、厳密な型を定義します
export default async function BlogPage({ params }: { params: { slug: string[] } }) {
  const slugParts = params.slug || [];

  if (slugParts.length === 0) {
    const allPosts: Omit<Post, 'contentHtml'>[] = getAllPostsData();
    return (
      <div className="bg-bone" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-12 text-center text-white">Blog</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-video">
                  {post.image && <Image src={post.image} alt={post.title} fill className="object-cover" />}
                </div>
                <div className="p-4">
                  <p className="text-sm text-sky-400 mb-1">{post.category}</p>
                  <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slugParts.length === 2 && slugParts[0] === 'category') {
    const categoryName = decodeURIComponent(slugParts[1]);
    const posts: Omit<Post, 'contentHtml'>[] = getPostsByCategory(categoryName);
    return (
      <div className="bg-bone" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-12 text-center text-white">Blog: {categoryName}</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group block bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-video">
                  {post.image && <Image src={post.image} alt={post.title} fill className="object-cover" />}
                </div>
                <div className="p-4">
                  <p className="text-sm text-sky-400 mb-1">{post.category}</p>
                  <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slugParts.length === 1) {
    const postData: Post = await getPostData(slugParts[0]);
    return (
      <article className="bg-floral-white" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4 text-center">{postData.title}</h1>
          <div className="text-lg text-gray-600 mb-8 text-center">{postData.date}</div>
          {postData.image && (
            <div className="mb-12">
              <Image src={postData.image} alt={postData.title} width={1200} height={800} className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          )}
          <div className="prose lg:prose-xl mx-auto" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </article>
    );
  }

  return null;
}