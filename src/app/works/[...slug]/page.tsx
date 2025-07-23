import Image from 'next/image';
import Link from 'next/link';
import { getAllPortfoliosData, getPortfolioData, getPortfoliosByCategory, Portfolio } from '@/lib/posts';
import type { Metadata } from 'next';

//【最終修正】 works も同様に、引数に直接、厳密な型を定義します
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
    // ... 中身は変更なし ...
}

//【最終修正】 こちらも同様に、引数に直接、厳密な型を定義します
export default async function WorksPage({ params }: { params: { slug: string[] } }) {
    // ... 中身は変更なし ...
}