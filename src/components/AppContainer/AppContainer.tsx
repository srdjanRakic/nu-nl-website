import { useFetchNews } from '../../hooks';
import GeneralNewsList from '../GeneralNewsList';
import LatestNews from '../LatestNews';
import './app-container.scss';

export const AppContainer = () => {
  const { data: news, error } = useFetchNews();

  const currentDate = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <div className="page-wrapper">
      <header>
        <p>{formattedDate} | The latest news first on NU.nl</p>
      </header>
      <main>
        {error && <p>Error: {error}</p>}
        {news && (
          <div className="app-container">
            <section>
              <GeneralNewsList news={news} />
            </section>
            <aside>
              <LatestNews news={news} />
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};
