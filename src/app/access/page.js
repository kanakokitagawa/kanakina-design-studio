// Accessページも、内容が固定的なので、直接ここに記述します。

export default function AccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold mb-12 text-center text-white">
        Access
      </h1>

      <div className="prose prose-invert lg:prose-xl mx-auto text-white">
        {/* ここに、あなたのスタジオへのアクセス情報を自由に追加・編集してください */}
        <p>
          〒XXX-XXXX
        </p>
        <p>
          東京都渋谷区…
        </p>
        <p>
          お問い合わせは、メールまたはお電話にて承っております。
        </p>
      </div>
    </div>
  );
}