// src/app/blog/[slug]/page.js
import Image from 'next/image'; // Imageコンポーネントをインポート
import Link from 'next/link'; // これを追加
// WordPressのGraphQLエンドポイント
const WORDPRESS_GRAPHQL_ENDPOINT = process.env.WORDPRESS_GRAPHQL_ENDPOINT || 'https://kanakina.com/graphql';

// 個別の投稿を取得するGraphQLクエリ
const GET_SINGLE_POST_QUERY = `
  query GetSinglePost($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      title
      date
      content # 投稿の本文 (HTML形式で返ってくる想定)
      featuredImage {
        node {
          sourceUrl(size: LARGE)
          altText
        }
      }
      author { # 著者情報を追加 (任意)
        node {
          name
        }
      }
      categories { # カテゴリー情報を追加 (任意)
        nodes {
          name
          slug
        }
      }
      tags { # タグ情報を追加 (任意)
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
      console.error(`Failed to fetch post. Status: ${response.status}, Body: ${errorBody}`);
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      throw new Error('Failed to fetch post due to GraphQL errors');
    }

    if (!json.data.post) {
      console.warn(`Post with slug "${slug}" not found.`);
      return null;
    }

    return json.data.post;
  } catch (error) {
    console.error('Error in getSinglePost:', error);
    throw error;
  }
}

// ここから下がReactコンポーネント部分 (これがページの本体です)
export default async function Home() {
  let posts = [];
  try {
    posts = await getPosts();
  } catch (error) {
    console.error("Error in Home component when fetching posts:", error);
    // ここでエラーページを表示するなどの処理も可能
  }

  // 投稿が見つからない場合は、404ページを表示する (より適切な方法)
  if (!posts || posts.length === 0) {
   return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-light-amber text-dark-stone">
        <p>投稿がありません。</p>
      </main>
    );
  }
  console.log('Fetched post content:', post.content);
  // 日付のフォーマット (例: 2025年06月20日)
  const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-light-amber text-dark-stone">
        <p>投稿がありません。</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-light-amber text-dark-stone">
      <h1 className="text-5xl font-bold mb-12">最新の投稿 (GraphQL版)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} legacyBehavior={false}> {/* ← Linkコンポーネントで囲む */}
            <a className="block bg-slate-800 rounded-lg shadow-lg overflow-hidden group transform transition-all duration-300 hover:scale-105"> {/* カード全体のスタイル */}
              {post.featuredImage?.node?.sourceUrl && (
                <div className="relative w-full aspect-[16/9]"> {/* 画像のアスペクト比 */}
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:opacity-90 transition-opacity duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 text-slate-100 group-hover:text-amber-400 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-400 mb-2">
                  {new Date(post.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {/* READボタンのデザインを調整 */}
                <div className="mt-4 text-right">
                  <span className="inline-block bg-amber-500 text-slate-900 text-sm font-semibold px-4 py-2 rounded-md group-hover:bg-amber-400 transition-colors duration-300">
                    READ
                  </span>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </main>
  );
