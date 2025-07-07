// src/components/HeaderIcons.js (★★★ 新しく作るアイコン用のコンポーネント ★★★)

import Link from 'next/link';

// SVGアイコンを定義します
const InstagramIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const MailIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const CartIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const HeaderIcons = () => {
  return (
    <div className="flex items-center space-x-5">
      <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
        <InstagramIcon />
      </Link>
      <Link href="mailto:contact@kanakina.com" className="text-gray-300 hover:text-white transition-colors">
        <MailIcon />
      </Link>
      <Link href="/cart" className="text-gray-300 hover:text-white transition-colors">
        <CartIcon />
      </Link>
    </div>
  );
};

export default HeaderIcons;