import { FC } from 'react';
import { useFormattedTime, NewsData } from '../../hooks';
import ArrowIcon from '../ArrowIcon';

interface Props {
  item: NewsData;
}

export const NewsFeedItem: FC<Props> = ({ item }) => {
  const formattedTime = useFormattedTime(item.timestamp);

  return (
    <li className="news-item">
      <article className="news-item-content">
        <time className="news-item-timestamp" dateTime={item.timestamp}>
          {formattedTime}
        </time>
        <a href="#" className="news-item__link">
          <span className="news-item-title">{item.title}</span>
          <ArrowIcon />
        </a>
      </article>
    </li>
  );
};
