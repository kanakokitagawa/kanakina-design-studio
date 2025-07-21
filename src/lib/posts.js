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
      return { slug, ...matterResult.data };
    });
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
export function getAllPostSlugs() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => ({ params: { slug: fileName.replace(/\.md$/, '') } }));
}
export async function getPostData(slug) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();
    return { slug, contentHtml, ...matterResult.data };
}
export function getPostsByCategory(category) {
  const allPosts = getAllPostsData();
  return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

// === 実績用の関数群 ===
export function getAllPortfoliosData() {
    const fileNames = fs.readdirSync(portfolioDirectory);
    const allPortfoliosData = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(portfolioDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return { slug, ...matterResult.data };
    });
    return allPortfoliosData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
export function getAllPortfolioSlugs() {
    const fileNames = fs.readdirSync(portfolioDirectory);
    return fileNames.map((fileName) => ({ params: { slug: fileName.replace(/\.md$/, '') } }));
}
export async function getPortfolioData(slug) {
    const fullPath = path.join(portfolioDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();
    return { slug, contentHtml, ...matterResult.data };
}
export function getPortfoliosByCategory(category) {
    const allPortfolios = getAllPortfoliosData();
    return allPortfolios.filter(portfolio => portfolio.category.toLowerCase() === category.toLowerCase());
}