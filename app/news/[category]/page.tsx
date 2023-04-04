import fetchNews from "util/fetchNews";
import NewsList from "app/components/NewsList";
import { categories } from "constants-k";

type Props = {
  params: { category: Category };
};

const NewsCategoryPage = async ({ params: { category } }: Props) => {
  const news: NewsResponse = await fetchNews(category);
  return (
    <div>
      <h1 className="headerTitle">{category}</h1>
      <NewsList news={news} />
    </div>
  );
};

export default NewsCategoryPage;

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category,
  }));
}

// localhost:3000/news/business
// localhost:3000/news/entertainment
// localhost:3000/news/general
// localhost:3000/news/health
// localhost:3000/news/science
// localhost:3000/news/health
// localhost:3000/news/technology
// prebuild these pages...