'use client';
import Link from 'next/link';
import { useState } from 'react';
import Logo from './Logo';
import HeaderIcons from './HeaderIcons';

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link href={href} className="text-gray-300 hover:text-white transition-colors" onClick={onClick}>
    {children}
  </Link>
);

const DropdownLink = ({ title, links }: { title: string; links: { href: string; label: string }[] }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        className="text-gray-300 hover:text-white transition-colors flex items-center"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {title}
        <svg className={`h-4 w-4 ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`absolute top-full left-0 mt-2 w-48 bg-neutral-800 rounded-md shadow-lg z-10
                     ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
                     group-hover:opacity-100 group-hover:visible transition-all duration-300`}>
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
  const [isOpen, setIsOpen] = useState(false);

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

        {/* Desktop Navigation */}
      {/* Desktop Navigation */}
<div className="hidden md:flex items-center justify-end flex-1">
  <nav className="flex items-center space-x-8 text-lg">
    <NavLink href="/info">INFO</NavLink>
    <DropdownLink title="WORKS" links={workLinks} />
    <DropdownLink title="BLOG" links={blogLinks} />
    <NavLink href="/about-us">ABOUT US</NavLink>
    <NavLink href="/access">ACCESS</NavLink>
  </nav>
  {/* アイコンをナビゲーションの隣に配置 */}
  <div className="ml-8">
    <HeaderIcons />
  </div>
</div>  
        {/* Mobile Hamburger and Icons */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              // Close icon (X)
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon (three lines)
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <HeaderIcons />
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-90 z-40 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}
           transition-transform duration-300 ease-in-out md:hidden`}
        >
          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
              aria-label="Close menu"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col items-center space-y-8 text-2xl text-white mt-16">
            <NavLink href="/#info" onClick={() => setIsOpen(false)}>INFO</NavLink>
            <DropdownLink title="WORKS" links={workLinks} />
            <DropdownLink title="BLOG" links={blogLinks} />
            <NavLink href="/about" onClick={() => setIsOpen(false)}>ABOUT US</NavLink>
            <NavLink href="/access" onClick={() => setIsOpen(false)}>ACCESS</NavLink>
          </nav>
        </div>
      </nav>
    </header>
  );
}