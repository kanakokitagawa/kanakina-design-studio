

import {
  getAllPostsData,
  getPostData,
  getPostsByCategory,
  getAllPortfoliosData,
  getPortfolioData,
  getPortfoliosByCategory,
} from '../posts';

// fsモジュールをモック化して、実際のファイルシステムにアクセスしないようにする
jest.mock('fs', () => ({
  readdirSync: jest.fn((path) => {
    if (path.includes('posts')) {
      return ['happy-new-year-01.md', 'new-biginning.md', 'travel-diary-01.md'];
    } else if (path.includes('portfolios')) {
      return ['antique-door-design.md', 'book-corner.md', 'douga.md', 'logo-yamaboushi.md'];
    }
    return [];
  }),
  readFileSync: jest.fn((path) => {
    if (path.includes('happy-new-year-01.md')) {
      return '---\ntitle: \'新しい始まり\'\ndate: \'2025-07-21\'\nimage: \'/images/happy-new-year-01.jpg\'\ncategory: \'life\'\n---\nあけましておめでとう２０２５。\n今年も楽しい年になりそうです.';
    } else if (path.includes('new-biginning.md')) {
      return '---\ntitle: \'新しい始まり\'\ndate: \'2025-01-01\'\nimage: \'/images/new-biginning.jpg\'\ncategory: \'life\'\n---\n新しい始まりのブログ記事です.';
    } else if (path.includes('travel-diary-01.md')) {
      return '---\ntitle: \'旅行記01\'\ndate: \'2024-12-25\'\nimage: \'/images/travel-diary-01.jpg\'\ncategory: \'travel\'\n---\n旅行のブログ記事です.';
    } else if (path.includes('antique-door-design.md')) {
      return '---\ntitle: \'アンティーク風ドアデザイン\'\ndate: \'2025-07-20\'\nimage: \'/images/antique-door.jpg\'\ncategory: \'interior\'\n---\nアンティーク風ドアデザインのポートフォリオです.';
    } else if (path.includes('book-corner.md')) {
      return '---\ntitle: \'ブックコーナー\'\ndate: \'2025-06-15\'\nimage: \'/images/book-corner.jpg\'\ncategory: \'interior\'\n---\nブックコーナーのポートフォリオです.';
    } else if (path.includes('douga.md')) {
      return '---\ntitle: \'動画制作\'\ndate: \'2025-05-10\'\nimage: \'/images/douga.jpg\'\ncategory: \'video\'\n---\n動画制作のポートフォリオです.';
    } else if (path.includes('logo-yamaboushi.md')) {
      return '---\ntitle: \'ロゴデザイン（ヤマボウシ）\'\ndate: \'2025-04-01\'\nimage: \'/images/logo-yamaboushi.jpg\'\ncategory: \'logo\'\n---\nロゴデザインのポートフォリオです.';
    }
    return '';
  }),
}));

describe('posts.ts', () => {
  describe('Blog Functions', () => {
    it('getAllPostsData returns sorted posts', () => {
      const posts = getAllPostsData();
      expect(posts.length).toBe(3);
      expect(posts[0].title).toBe('新しい始まり'); // 2025-07-21
      expect(posts[1].title).toBe('新しい始まり'); // 2025-01-01
      expect(posts[2].title).toBe('旅行記01'); // 2024-12-25
    });

    it('getPostData returns correct post by slug', async () => {
      const post = await getPostData('happy-new-year-01');
      expect(post.title).toBe('新しい始まり');
      expect(post.contentHtml).toContain('あけましておめでとう２０２５。');
    });

    it('getPostsByCategory returns filtered posts', () => {
      const lifePosts = getPostsByCategory('life');
      expect(lifePosts.length).toBe(2);
      expect(lifePosts[0].title).toBe('新しい始まり');
      expect(lifePosts[1].title).toBe('新しい始まり');

      const travelPosts = getPostsByCategory('travel');
      expect(travelPosts.length).toBe(1);
      expect(travelPosts[0].title).toBe('旅行記01');
    });
  });

  describe('Portfolio Functions', () => {
    it('getAllPortfoliosData returns sorted portfolios', () => {
      const portfolios = getAllPortfoliosData();
      expect(portfolios.length).toBe(4);
      expect(portfolios[0].title).toBe('アンティーク風ドアデザイン'); // 2025-07-20
      expect(portfolios[1].title).toBe('ブックコーナー'); // 2025-06-15
      expect(portfolios[2].title).toBe('動画制作'); // 2025-05-10
      expect(portfolios[3].title).toBe('ロゴデザイン（ヤマボウシ）'); // 2025-04-01
    });

    it('getPortfolioData returns correct portfolio by slug', async () => {
      const portfolio = await getPortfolioData('antique-door-design');
      expect(portfolio.title).toBe('アンティーク風ドアデザイン');
      expect(portfolio.contentHtml).toContain('アンティーク風ドアデザインのポートフォリオです。');
    });

    it('getPortfoliosByCategory returns filtered portfolios', () => {
      const interiorPortfolios = getPortfoliosByCategory('interior');
      expect(interiorPortfolios.length).toBe(2);
      expect(interiorPortfolios[0].title).toBe('アンティーク風ドアデザイン');
      expect(interiorPortfolios[1].title).toBe('ブックコーナー');

      const logoPortfolios = getPortfoliosByCategory('logo');
      expect(logoPortfolios.length).toBe(1);
      expect(logoPortfolios[0].title).toBe('ロゴデザイン（ヤマボウシ）');
    });
  });
});
