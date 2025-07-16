// 厨房（WordPress）との通信を担う、唯一の電話機。
async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  // Vercel環境では環境変数から、ローカルでは.env.localからAPIのURLを取得
  const apiUrl = process.env.WORDPRESS_GRAPHQL_ENDPOINT || 'http://localhost/graphql';
  if (!apiUrl) {
    throw new Error('WORDPRESS_GRAPHQL_ENDPOINT is not configured');
  }

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    // ★★★ 変更点 ★★★
    // ここが今回の最重要修正箇所です。
    // Next.jsの強力なキャッシュ機能を制御し、10秒ごとに新しいデータを
    // 取得しにいくよう（再検証するよう）指示します。
    // これにより、Vercelが古いデータを掴み続けることを防ぎます。
    next: { revalidate: 10 },
  });

  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2));
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

// 以下は、あなたの既存のコード構造を維持したものです。
// 内部で修正済みの fetchAPI を呼び出します。

// 全ての投稿を取得する関数
export async function getAllPosts() {
    const data = await fetchAPI(`
      query GetAllPosts {
        posts {
          nodes {
            id
            title
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `);
    return data?.posts?.nodes;
  }

// 全ての実績を取得する関数
export async function getAllPortfolios() {
  const data = await fetchAPI(`
    query GetAllPortfolios {
      portfolios {
        nodes {
          id
          title
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `);
  return data?.portfolios?.nodes;
}

// スラッグを元に単体の実績を取得する関数
export async function getPortfolioBySlug(slug) {
  const data = await fetchAPI(
    `
    query GetPortfolioBySlug($id: ID!) {
      portfolio(id: $id, idType: SLUG) {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
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
  return data?.portfolio;
}


// スラッグを元に固定ページを取得する関数
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
        id: slug,
      },
    }
  );
  return data?.page;
}