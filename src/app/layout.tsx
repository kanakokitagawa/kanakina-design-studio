import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientComponentWrapper from "@/components/ClientComponentWrapper";

const mPlusRounded1c = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-m-plus-rounded-1c',
});

export const metadata = {
  title: "Kanakina Design Studio",
  description: "Design & Branding",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={mPlusRounded1c.variable}>
      {/* ★ ここが、変更点です！
          ・背景色(bg-...)を、一旦、削除します。（各ページで設定するため）
          ・基本の文字色を、我々の新しい絵の具 `text-smoky-black` に設定します。 */}
      <body className="text-smoky-black flex flex-col min-h-screen">
        <ClientComponentWrapper>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientComponentWrapper>
      </body>
    </html>
  );
}