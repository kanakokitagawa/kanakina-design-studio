// src/app/blog/[slug]/page.js
import Image from 'next/image';
import Link from 'next/link'; // トップページへ戻るリンクなどのために念のためインポート

// WordPressのGraphQLエンドポイント
const WORDPRESS_GRAPHQL_ENDPOINT = process.env.WORDPRESS_GRAPHQL_ENDPOINT || 'https://kanakina.com/graphql';

// 個別の投稿を取得するGraphQLクエリ
const GET_SINGLE_POST_QUERY = `
  query GetSinglePost($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      title
      date
      content
      featuredImage {
        node {
          sourceUrl(size: LARGE)
          altText
        }
      }
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

// WordPressから個別の投稿データを取得する非同期関数
async function getSinglePost(slug) {
  try {
    const response = await fetch(WORDPRESS_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_SINGLE_POST_QUERY,
        variables: {
          id: slug,
          idType: 'SLUG',
        },
      }),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[getSinglePost] Failed to fetch post. Status: ${response.status}, Body: ${errorBody}`);
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error('[getSinglePost] GraphQL Errors:', json.errors);
      throw new Error('Failed to fetch post due to GraphQL errors');
    }

    if (!json.data.post) {
      console.warn(`[getSinglePost] Post with slug "${slug}" not found.`);
      return null;
    }

    return json.data.post;
  } catch (error) {
    console.error('[getSinglePost] Error fetching post:', error);
    // エラーページで詳細を表示したい場合は、ここでエラーオブジェクトを再スローする
    // throw error;
    // あるいは、nullを返してコンポーネント側でnotFound()を呼ぶ
    return null;
  }
}

// 個別投稿ページのReactコンポーネント
export default async function SinglePostPage({ params }) {
  const { slug } = params; // URLからslugを取得
  let post;

  try {
    post = await getSinglePost(slug);
  } catch (error) {
    // getSinglePost内でエラーがスローされた場合、ここでキャッチしてエラーページ等を表示できる
    // ただし、getSinglePostがnullを返す設計なら、ここではエラーにならない
    console.error(`[SinglePostPage] Error fetching post for slug: ${slug}`, error);
    // 必要であれば、ここでカスタムエラーページにリダイレクトしたり、エラーメッセージを表示したりする
    // 今回はgetSinglePostがnullを返すので、次のif (!post) で処理される
  }

  // 投稿が見つからない場合は、404ページを表示
  if (!post) {
    const { notFound } = await import('next/navigation');
    notFound();
    // notFound()を呼んだ後は何もreturnしない（またはnullをreturn）
    return null;
  }

  // console.log('[SinglePostPage] Fetched post content:', post.content); // デバッグ用

  // 日付のフォーマット
  const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      {/* アイキャッチ画像 */}
      {post.featuredImage?.node?.sourceUrl && (
        <div className="mb-8 relative w-full h-96">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}

      {/* タイトル */}
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">{post.title}</h1>

      {/* 投稿日と著者 */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        <span>{formattedDate}</span>
        {post.author?.node?.name && <span> by {post.author.node.name}</span>}
      </div>

      {/* 本文 */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content || '' }} // post.contentがnullの場合を考慮
      />

      {/* カテゴリーとタグ */}
      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        {post.categories?.nodes?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Categories:</h3>
            {post.categories.nodes.map((category) => (
              <span key={category.slug} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2">
                {category.name}
              </span>
            ))}
          </div>
        )}
        {post.tags?.nodes?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Tags:</h3>
            {post.tags.nodes.map((tag) => (
              <span key={tag.slug} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2">
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          ← トップページへ戻る
        </Link>
      </div>
    </article>
  );
}

// (任意) 静的パスの生成 (ビルド時に各投稿ページを事前生成する場合)
// export async function generateStaticParams() {
//   // ... (省略) ...
//   return [];
// }