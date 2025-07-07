import Image from 'next/image';
import { getWorkBySlug } from '@/lib/wordpress';
import { notFound } from 'next/navigation';

// 日付を「YYYY.MM.DD」形式に変換する関数
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default async function WorkDetailPage({ params }) {
  const { slug } = params;
  const work = await getWorkBySlug(slug);

  // データが見つからなかった場合は404ページを表示
  if (!work) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <article>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">{work.title}</h1>
        <p className="text-center text-gray-400 mb-8">{formatDate(work.date)}</p>

        {work.featuredImage && (
          <div className="relative w-full aspect-video mb-12 rounded-lg overflow-hidden">
            <Image
              src={work.featuredImage.node.sourceUrl}
              alt={work.featuredImage.node.altText || '実績のアイキャッチ画像'}
              fill
              style={{ objectFit: 'cover' }}
              priority // LCPになる可能性が高いので優先的に読み込む
            />
          </div>
        )}

        {/* 
          本文を表示するエリア 
          Tailwind Typographyプラグインを使うと、ここの表示が綺麗になります
        */}
        <div 
          className="prose prose-invert prose-lg max-w-4xl mx-auto"
          dangerouslySetInnerHTML={{ __html: work.content }}
        />
      </article>
    </div>
  );
}