import { M_PLUS_Rounded_1c } from 'next/font/google';
import './globals.css';

// --- ↓↓↓ ここのパスを全て修正しました！ ↓↓↓ ---
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientComponentWrapper from '@/components/ClientComponentWrapper';

// フォントの設定
const mPlusRounded1c = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-m-plus-rounded-1c',
  display: 'swap',
});

export const metadata = {
  title: 'kanakina.com - Headless WordPress Blog',
  description: 'A headless WordPress blog built with Next.js and Vercel.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={mPlusRounded1c.variable}>
      <head />
      <body className="bg-neutral-950 text-neutral-100 flex flex-col min-h-screen">
        <ClientComponentWrapper />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}