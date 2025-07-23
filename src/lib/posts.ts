
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

// 型定義
export type Post = {
  slug: string;
  title: string;
  date: string;
  image: string;
  category: string;
  contentHtml: string;
};

export type Portfolio = {
  slug: string;
  title: string;
  date: string;
  image: string;
  category: string;
  contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), 'src/contents/posts');
const portfolioDirectory = path.join(process.cwd(), 'src/contents/portfolios');

async function processMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);
  return result.toString();
}

// === ブログ記事用の関数群 ===
export function getAllPostsData(): Omit<Post, 'contentHtml'>[] {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return { slug, ...(matterResult.data as Omit<Post, 'slug' | 'contentHtml'>) };
    });
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => ({ params: { slug: fileName.replace(/\.md$/, '') } }));
}

export async function getPostData(slug: string): Promise<Post> {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const contentHtml = await processMarkdown(matterResult.content);
    return { slug, contentHtml, ...(matterResult.data as Omit<Post, 'slug' | 'contentHtml'>) };
}

export function getPostsByCategory(category: string): Omit<Post, 'contentHtml'>[] {
  const allPosts = getAllPostsData();
  return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

// === 実績用の関数群 ===
export function getAllPortfoliosData(): Omit<Portfolio, 'contentHtml'>[] {
    const fileNames = fs.readdirSync(portfolioDirectory);
    const allPortfoliosData = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(portfolioDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return { slug, ...(matterResult.data as Omit<Portfolio, 'slug' | 'contentHtml'>) };
    });
    return allPortfoliosData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPortfolioSlugs() {
    const fileNames = fs.readdirSync(portfolioDirectory);
    return fileNames.map((fileName) => ({ params: { slug: fileName.replace(/\.md$/, '') } }));
}

export async function getPortfolioData(slug: string): Promise<Portfolio> {
    const fullPath = path.join(portfolioDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const contentHtml = await processMarkdown(matterResult.content);
    return { slug, contentHtml, ...(matterResult.data as Omit<Portfolio, 'slug' | 'contentHtml'>) };
}

export function getPortfoliosByCategory(category: string): Omit<Portfolio, 'contentHtml'>[] {
    const allPortfolios = getAllPortfoliosData();
    return allPortfolios.filter(portfolio => portfolio.category.toLowerCase() === category.toLowerCase());
}
