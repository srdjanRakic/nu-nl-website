
import NewsList from "../components/NewsList";
import LatestNewsFeed from "../components/LatestNewsFeed";
import { useFetchNews } from '../hooks';
import "./home.scss";

export const Home = () => {
  const { data: news, error } = useFetchNews();

  const currentDate = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <div className="page-wrapper">
      <header>
        <p>{formattedDate} | The latest news first on NU.nl</p>
      </header>
      <main role="main">
        {error && <p>Error: {error}</p>}
        {news && (
          <div className="app-container">
            <section>
              <NewsList news={news} />
            </section>
            <aside>
              <LatestNewsFeed news={news} />
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};
