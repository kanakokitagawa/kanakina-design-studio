import Link from 'next/link';

// トップページ用のメタデータ
export const metadata = {
  title: 'Kanakina design Studio | Official Site',
  description: 'デザインとブランディングのスタジオ、Kanakinaの公式サイトです。',
};

export default function LandingPage() {
  return (
    // 画面全体を使い、中央にコンテンツを配置するスタイル
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <main className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-wider animate-fade-in-down">
          Kanakina design Studio
        </h1>
        <p className="mt-4 text-lg text-gray-400 animate-fade-in-up">
          Design & Branding
        </p>
        <div className="mt-12 animate-fade-in-up-delay">
          <Link href="/blog" className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 transition-all text-lg">
            Enter Works
          </Link>
        </div>
      </main>
    </div>
  );
}