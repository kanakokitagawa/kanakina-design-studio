export default function AboutUsPage() {
  return (
    // ★ 背景色を `bg-bone` に設定
    <div className="bg-bone">
      <div className="container mx-auto px-4 py-16 md:py-24" style={{ paddingTop: '120px' }}>
        <h1 className="text-4xl font-bold mb-12 text-center">
          About Us
        </h1>
        <div className="prose lg:prose-xl mx-auto">
          <p>Kanakina Design Studioへようこそ。</p>
          <p>私たちは、お客様一人ひとりの想いを形にするデザインスタジオです。ここには、あなたのスタジオに関する美しい物語が綴られます。</p>
        </div>
      </div>
    </div>
  );
}