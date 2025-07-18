import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/contents/posts');
const portfolioDirectory = path.join(process.cwd(), 'src/contents/portfolios');

// === ブログ記事用の関数群 ===

export function getAllPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      slug,
      ...matterResult.data,
    };
  });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ★ 新機能1: 全てのブログ記事の「slug」の一覧を取得する
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// ★ 新機能2: slugを元に、特定のブログ記事の全データを取得する
export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // 本文をHTMLに変換する
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}

// === 実績用の関数群 ===

export function getAllPortfoliosData() {
  const fileNames = fs.readdirSync(portfolioDirectory);
  const allPortfoliosData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(portfolioDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      slug,
      ...matterResult.data,
    };
  });
  return allPortfoliosData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ★ 新機能3: 全ての実績の「slug」の一覧を取得する
export function getAllPortfolioSlugs() {
    const fileNames = fs.readdirSync(portfolioDirectory);
    return fileNames.map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
  }
  
// ★ 新機能4: slugを元に、特定の実績の全データを取得する
export async function getPortfolioData(slug) {
    const fullPath = path.join(portfolioDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
  
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
  
    return {
      slug,
      contentHtml,
      ...matterResult.data,
    };
}