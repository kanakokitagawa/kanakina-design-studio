import { getPageBySlug } from '@/lib/wordpress';

// ページの整形用コンポーネント（すでにあれば不要）
function PageContent({ html }) {
  return (
    <div
      className="prose prose-invert lg:prose-xl max-w-4xl mx-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default async function AccessPage() {
  // "access" というスラッグで固定ページのデータを取得
  const pageData = await getPageBySlug('access');

  if (!pageData) {
    // データが取れなかった場合の処理
    return <div>Page not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold mb-8 text-center">{pageData.title}</h1>
      <PageContent html={pageData.content} />
    </div>
  );
}