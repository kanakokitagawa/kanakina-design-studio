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
        slug
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
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-amber-50 text-stone-800">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">最新の投稿 (GraphQL版)</h1>
        {posts.length > 0 ? (
           <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* (D) グリッドレイアウトに変更 */}
            {posts.map((post) => {
              const imageUrl = post.featuredImage?.node?.sourceUrl; // オプショナルチェイニングで安全にアクセス
              const imageAlt = post.featuredImage?.node?.altText || post.title; // 代替テキスト

              return (
                 <li key={post.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden group flex flex-col"> {/* (E) カード全体のスタイル変更 */}
                  {imageUrl && (
                    <div className="relative w-full aspect-[16/10] mb-0"> {/* (F) 画像コンテナ、アスペクト比固定、下マージン削除 */}
                      <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        style={{ objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-300 ease-in-out" // (L) ホバーエフェクト追加
                        priority={posts.indexOf(post) < 3}
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow"> {/* (M) テキストエリアのパディングとレイアウト */}
                  <h2 className="text-lg font-semibold mb-1 text-gray-100 group-hover:text-sky-400 transition-colors"> {/* (G) タイトルのスタイル変更 */}
                    <a
                        href={post.link} // 将来的には個別の投稿ページへのリンクに変更
                      target="_blank" // 今はWordPressの元記事へ
                      rel="noopener noreferrer"
                      
                    >
                      <span dangerouslySetInnerHTML={{ __html: post.title }} />
                    </a>
                  </h2>
                  <p className="text-xs text-gray-400 mb-3"> {/* (I) 投稿日のスタイル変更 */}
                    
        {new Date(post.date).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                  </p>
                  {/* 抜粋は参考サイトにはないので一旦コメントアウト (必要なら後で追加)
                  {post.excerpt && (
                    <div
                      className="text-gray-300 text-sm leading-relaxed prose prose-sm max-w-none mt-auto"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  )}
                 */}
                 <a
        href={post.link} // 将来的には個別の投稿ページへのリンク
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto self-start inline-block bg-sky-500 text-white text-xs font-bold py-2 px-4 rounded-md hover:bg-sky-600 transition-colors" // (N) READボタン風のリンク
      >
        READ
      </a>
      </div>
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
