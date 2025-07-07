"use client";

import dynamic from 'next/dynamic';

// SparkleCursorをクライアントサイドのみで読み込む
const SparkleCursor = dynamic(
  () => import('@/components/SparkleCursor'), // ← ここのパスを修正しました！
  { ssr: false }
);

export default function ClientComponentWrapper() {
  return (
    <>
      <SparkleCursor />
    </>
  );
}