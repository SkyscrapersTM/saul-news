import { gql } from "graphql-request";
import sortNewsByImage from "util/sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  // GraphQL query
  const query = gql`
    query MyQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "gb"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          author
          country
          description
          image
          language
          published_at
          source
          title
          url
        }
        pagination {
          total
          offset
          limit
          count
        }
      }
    }
  `;
  // Fetch function with nextJS.js 13 caching...
  const res = await fetch(
    "https://cangas.stepzen.net/api/illmannered-leopard/__graphql",
    {
      method: "POST",
      cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          keywords: keywords,
        },
      }),
    }
  );
  console.log("LOADING NEW DATA FROM API for category >>>", category, keywords);

  const newsResponse = await res.json();

  // Sort function by images vs not  images present
  const news = sortNewsByImage(newsResponse.data.myQuery);
  // return news
  return news;
};

export default fetchNews;

// stepzen import curl http://api.mediastack.com/v1/news?access_key=e015767b6d57db872034ba4954640275&countries=us%2Cgb&limit=100&offset=0&sort=published_desc
