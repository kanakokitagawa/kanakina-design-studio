import Link from 'next/link';

export default function HomePage() {
  return (
    // ★ 背景色を `bg-olive-drab` に設定
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-olive-drab">
      <div className="space-y-4">
        {/* ★ 文字色を、白(`text-white`)に設定 */}
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
          Kanakina design Studio
        </h1>
        <p className="text-xl md:text-2xl text-gray-300">
          Design & Branding
        </p>
      </div>
      <Link 
        href="/branding" 
         // ★ 未知の色指定を、我々が名付けた、聖なる色へと、変更します
        className="mt-12 px-8 py-4 bg-kanakina-blue text-white font-semibold rounded-full shadow-lg hover:bg-sky-600 transition-colors duration-300 text-lg"
      >
        Our Services
      </Link>
    </main>
  );
}