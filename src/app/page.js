// src/app/page.js
import Image from 'next/image';

// GraphQLクエリを定義
const GET_POSTS_QUERY = `
  query GetPosts {
    posts(first: 10) { # 最新10件の投稿を取得 (件数は調整可能)
      nodes {
        id
        title
        date
        link
        excerpt
        featuredImage { # アイキャッチ画像の情報
          node {
            sourceUrl(size: LARGE) # 画像のURL (サイズも指定可能: THUMBNAIL, MEDIUM, LARGE, FULLなど)
            altText
          }
        }
      }
    }
  }
`;

async function getPosts() {
  const res = await fetch('https://kanakina.com/graphql', { // あなたのGraphQLエンドポイント
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: GET_POSTS_QUERY }), // クエリを送信
    next: { revalidate: 60 } // 60秒ごとにデータを再検証 (任意)
  });

  if (!res.ok) {
    const errorBody = await res.text(); // エラー内容をテキストで取得
    console.error("Failed to fetch posts from GraphQL:", res.status, res.statusText, errorBody);
    throw new Error('Failed to fetch posts'); // エラーをスローしてNext.jsに処理させる
  }

  const json = await res.json();
  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    throw new Error('Failed to fetch posts due to GraphQL errors');
  }

  return json.data.posts.nodes; // 投稿データの配列を返す
}

export default async function Home() {
  let posts = [];
  try {
    posts = await getPosts();
  } catch (error) {
    console.error("Error in Home component when fetching posts:", error);
    // ここでエラーページを表示するなどの処理も可能
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">最新の投稿 (GraphQL版)</h1>
        {posts.length > 0 ? (
          <ul className="space-y-6">
            {posts.map((post) => {
              const imageUrl = post.featuredImage?.node?.sourceUrl; // オプショナルチェイニングで安全にアクセス
              const imageAlt = post.featuredImage?.node?.altText || post.title; // 代替テキスト

              return (
                <li key={post.id} className="p-4 border rounded-lg shadow-sm overflow-hidden">
                  {imageUrl && (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={posts.indexOf(post) < 2}
                      />
                    </div>
                  )}
                  <h2 className="text-xl font-semibold mb-2">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      <span dangerouslySetInnerHTML={{ __html: post.title }} />
                    </a>
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    投稿日: {new Date(post.date).toLocaleDateString('ja-JP')}
                  </p>
                  {post.excerpt && (
                    <div
                      className="text-gray-700 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500">投稿がありません。</p>
        )}
      </div>
    </main>
  );
}
