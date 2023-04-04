import { categories } from "constants-k";
import fetchNews from "util/fetchNews";
import NewsList from "app/components/NewsList";

const Home = async () => {
  // fetch the news data
  const news: NewsResponse = await fetchNews(categories.join(","));

  return (
    <div>
      <NewsList news={news} />
    </div>
  );
};

export default Home;
