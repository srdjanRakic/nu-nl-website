import { FC, useState } from 'react';
import { useSortByDate, NewsData } from '../../hooks';
import ArrowIcon from '../ArrowIcon';
import useResponsiveItems from '../../hooks/useResponsiveItems';
import './latest-news.scss';
import NewsItem from './NewsItem';
import { Divider } from './Divider';

interface Props {
  news: NewsData[];
}

const breakpoints = [
  { width: 1200, items: 8 },
  { width: 768, items: 6 },
  { width: 0, items: 4 },
];

export const LatestNews: FC<Props> = ({ news }) => {
  const { data } = useSortByDate(news);
  const itemsToShow = useResponsiveItems(breakpoints);
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  const renderNewsItems = (startIndex: number, endIndex: number) =>
    data
      .slice(startIndex, endIndex)
      .map((item, index) => <NewsItem key={index} item={item} />);

  return (
    <section className="news-container">
      <aside className="news-section">
        <header>
          <h1 className="news-header">Just in</h1>
        </header>
        <ul className="news-list">{renderNewsItems(0, 4)}</ul>
        <Divider />
        <Divider />
        <ul className="news-list">
          {renderNewsItems(4, showMore ? itemsToShow + 4 : itemsToShow)}
        </ul>
        {!showMore && data.length > itemsToShow && (
          <div
            className="show-more-items"
            onClick={toggleShowMore}
            data-testid="show-more-items"
          >
            Show More <ArrowIcon />
          </div>
        )}
      </aside>
    </section>
  );
};

export default LatestNews;