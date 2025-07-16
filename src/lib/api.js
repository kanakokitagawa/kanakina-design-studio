// WordPress APIと通信するための基本設定
const API_URL = process.env.WP_GRAPHQL_URL;

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (!API_URL) {
    throw new Error('WP_GRAPHQL_URL is not configured in .env.local');
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 10 },
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

// --- すべての「実績」投稿を取得するための関数 ---
export async function getAllWorks() {
  const data = await fetchAPI(`
    query GetAllWorks {
      portfolios(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `);
  return data?.portfolios?.nodes;
}

// --- 1件の「実績」投稿をスラッグで取得する関数 ---
export async function getWorkBySlug(slug) {
  const data = await fetchAPI(
    `
    query GetWorkBySlug($id: ID!) {
      portfolio(id: $id, idType: SLUG) {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    `,
    {
      variables: {
        id: slug,
      },
    }
  );
  return data.portfolio;
}

// --- すべての「ブログ」投稿を取得するための関数 ---
export async function getAllPosts() {
  const data = await fetchAPI(`
    query GetAllPosts {
      posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `);
  return data?.posts?.nodes;
}

// --- 1件の「ブログ」投稿をスラッグで取得する関数 ---
export async function getPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    `,
    {
      variables: {
        id: slug,
      },
    }
  );
  return data.post;
}

// --- 固定ページをスラッグで取得する関数 ---
export async function getPageBySlug(slug) {
    const data = await fetchAPI(
    `
    query GetPageBySlug($id: ID!) {
      page(id: $id, idType: URI) {
        id
        title
        content
      }
    }
    `,
    {
      variables: {
        id: slug
      }
    }
  );
  return data.page;
}