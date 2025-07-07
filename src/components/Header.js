'use client'; // useStateを使うので 'use client' は必須です

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo'; // Logoコンポーネントをインポート
import HeaderIcons from './HeaderIcons'; // HeaderIconsコンポーネントをインポート

const Header = () => {
  // メニューの開閉状態を管理
  const [isOpen, setIsOpen] = useState(false);

  // ★★★ エラーの原因だった toggleMenu 関数をここで定義します ★★★
  const toggleMenu = () => {
    setIsOpen(!isOpen); // isOpenの値をtrue/falseで反転させる
  };

  // ナビゲーションリンクのデータ。これは素晴らしい実装です！
  const navLinks = [
    { name: 'INFO', href: '/' },
    { name: 'WORKS', href: '/works' },
    { name: 'BLOG', href: '/blog' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'ACCESS', href: '/access' },
  ];

  return (
    // <header>タグに変更し、z-indexで他の要素より手前に表示
    <header className="fixed top-0 left-0 w-full bg-neutral-900/80 backdrop-blur-sm text-gray-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 h-20">
        
        {/* 左のロゴ */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* PC用のナビゲーションメニュー (中央寄せ) */}
        <nav className="hidden md:flex flex-grow justify-center">
          <div className="flex space-x-10 items-center">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors duration-300">
                {link.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* 右のアイコン */}
        <div className="hidden md:flex flex-shrink-0">
          <HeaderIcons />
        </div>
        
        {/* モバイル用のハンバーガーメニューボタン (md未満で表示) */}
        <div className="md:hidden z-50">
          <button onClick={toggleMenu} aria-label="メニューを開閉する">
            {isOpen ? (
              // × アイコン
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // ≡ アイコン
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* --- ここがスマホ用ナビゲーションメニュー本体 --- */}
      <div
        className={`
          md:hidden fixed top-0 left-0 w-full h-screen bg-neutral-950
          transform transition-transform duration-300 ease-in-out
          flex flex-col items-center justify-center space-y-8
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            // リンクをクリックしたらメニューを閉じる
            onClick={toggleMenu}
            className="text-2xl font-bold uppercase tracking-wider text-gray-300 hover:text-white"
          >
            {link.name}
          </Link>
        ))}
        {/* スマホメニューにもアイコンを表示する場合はここに追加 */}
        <div className="pt-8">
          <HeaderIcons />
        </div>
      </div>
    </header>
  );
};

export default Header;