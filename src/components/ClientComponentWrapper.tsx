'use client'; // このコンポーネントが、ブラウザの世界だけで動くことを宣言する、最強の呪文

import { useEffect, useState } from 'react';
import SparkleCursor from './SparkleCursor'; // 我々の魔法使い

const ClientComponentWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  // このコンポーネントが、ブラウザの世界に完全に降り立った後で、初めて実行される
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {/* isClientがtrueになるまで（＝ブラウザの世界になるまで）、魔法使いの召喚を待つ */}
      {isClient && <SparkleCursor />}
      {children}
    </>
  );
};

export default ClientComponentWrapper;