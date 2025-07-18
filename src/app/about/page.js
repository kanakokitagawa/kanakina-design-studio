// About Usページは、内容が固定的なので、直接ここに記述します。

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold mb-12 text-center text-white">
        About Us
      </h1>

      <div className="prose prose-invert lg:prose-xl mx-auto text-white">
        {/* ここに、あなたの「About Us」に関する文章を自由に追加・編集してください */}
        <p>
          Kanakina Design Studioへようこそ。
        </p>
        <p>
          私たちは、お客様一人ひとりの想いを形にするデザインスタジオです。
          ここには、あなたのスタジオに関する美しい物語が綴られます。
        </p>
      </div>
    </div>
  );
}