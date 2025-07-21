'use client';
import Link from 'next/link';
import { useState } from 'react';
import Logo from './Logo';
import HeaderIcons from './HeaderIcons';

const NavLink = ({ href, children }) => (
  <Link href={href} className="text-gray-300 hover:text-white transition-colors">
    {children}
  </Link>
);

// ★ ここが、最後の、そして、唯一の、修正点です！
// useStateを使った、クリックによる開閉ロジックを、完全に、削除しました。
// これからは、CSSの :hover 疑似クラスと、group-hover という、
// Tailwind CSSの、最も、エレガントな魔法だけが、このメニューを、支配します。
const DropdownLink = ({ title, links }) => {
  return (
    <div className="relative group">
      <button className="text-gray-300 hover:text-white transition-colors flex items-center">
        {title}
        <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute top-full left-0 mt-2 w-48 bg-neutral-800 rounded-md shadow-lg z-10 
                     opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        {links.map((link) => (
          <Link 
            key={link.href}
            href={link.href} 
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};


export default function Header() {
  const workLinks = [
    { href: '/works/category/interior', label: 'インテリア' },
    { href: '/works/category/logo', label: 'ロゴデザイン' },
    { href: '/works/category/video', label: '動画' },
  ];
  const blogLinks = [
    { href: '/blog/category/life', label: '生活' },
    { href: '/blog/category/travel', label: '旅行' },
  ];
  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex items-center space-x-8 text-lg">
          <NavLink href="/#info">INFO</NavLink>
          <DropdownLink title="WORKS" links={workLinks} />
          <DropdownLink title="BLOG" links={blogLinks} />
          <NavLink href="/about">ABOUT US</NavLink>
          <NavLink href="/access">ACCESS</NavLink>
        </div>
        <div className="flex items-center">
          <HeaderIcons />
        </div>
      </nav>
    </header>
  );
}