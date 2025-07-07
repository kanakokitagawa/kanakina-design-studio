// src/components/Logo.js

import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="group"> {/* groupクラスを追加 */}
      <div className="text-3xl font-black tracking-tighter text-white transition-transform duration-500 ease-in-out group-hover:rotate-180">
        KDS
      </div>
    </Link>
  );
};

export default Logo;