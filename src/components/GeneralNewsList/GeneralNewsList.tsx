import { FC } from 'react';
import Image from '../Image';
import { useSortByPopularity, NewsData, useResponsiveItems } from '../../hooks';
import IkeaImg from '../../assets/ikea-img.jpg';
import './news-list.scss';

interface Props {
  news: NewsData[];
}

const breakpoints = [
  { width: 1200, items: 12 },
  { width: 768, items: 10 },
  { width: 0, items: 6 },
];

export const GeneralNewsList: FC<Props> = ({ news }) => {
  const { data } = useSortByPopularity(news);

  const itemsToShow = useResponsiveItems(breakpoints);

  console.log(data);

  const mostPopularNewsArticle = data[0];

  if (!mostPopularNewsArticle) return null;

  return (
    <section className="article-container">
      <div className="article-image">
        <Image
          alt={mostPopularNewsArticle.title}
          title={mostPopularNewsArticle.title}
          src={IkeaImg}
        />
      </div>
      <ul className="article-list">
        {data.slice(0, itemsToShow).map((item, index) => (
          <li className="article-list__item" key={index}>
            <article>
              <a href="#" className="article-list__link">
                <span className="article-list__title">{item.title}</span>
              </a>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};
