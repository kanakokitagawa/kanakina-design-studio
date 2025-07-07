// src/components/Footer.js
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-6 px-6 md:px-10 border-t border-neutral-700">
      <div className="container mx-auto text-center">
        <p>© {currentYear} kanakina.com. All rights reserved.</p>
        {/* 必要に応じてSNSリンクや他の情報を追加 */}
      </div>
    </footer>
  );
}