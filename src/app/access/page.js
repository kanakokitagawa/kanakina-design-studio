export default function AccessPage() {
  const mapEmbedHtml = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.490891632599!2d135.3789438763577!3d34.74311138234858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f3750519a861%3A0x8673321557577543!2z44CSNjY0LTAwMDEg5YW15bqr55yM5LyK5Li55biC5Y2A55S677yR5LiB55uu!5e0!3m2!1sja!2sjp!4v1721545645607!5m2!1sja!2sjp" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

  return (
    // ★ 背景色を `bg-bone` に設定
    <div className="bg-bone">
      <div className="container mx-auto px-4 py-16 md:py-24" style={{ paddingTop: '120px' }}>
        <h1 className="text-4xl font-bold mb-12 text-center">
          Access
        </h1>
        <div className="prose lg:prose-xl mx-auto">
          <p>〒XXX-XXXX</p>
          <p>東京都渋谷区…</p>
          <p>お問い合わせは、メールまたはお電話にて承っております。</p>
        </div>
        <div className="mt-12">
          <div dangerouslySetInnerHTML={{ __html: mapEmbedHtml }} />
        </div>
      </div>
    </div>
  );
}