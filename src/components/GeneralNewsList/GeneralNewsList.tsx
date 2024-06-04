import { FC, useState, useEffect } from "react";
import Image from "../Image";
import { useSortByPopularity, NewsData, useResponsiveItems } from "../../hooks";
import IkeaImg from "../../assets/ikea-img.jpg";
import { screenSize } from "../../hooks/useResponsiveItems";
import "./news-list.scss";
import React from "react";
import { Line } from "../Skeleton/Line";

interface Props {
  news: NewsData[];
}

const breakpoints = [
  { width: screenSize.large, items: 12 },
  { width: screenSize.small, items: 10 },
];

export const GeneralNewsList: FC<Props> = ({ news }) => {
  const [loading, setLoading] = useState(true);
  const { data } = useSortByPopularity(news);
  const itemsToShow = useResponsiveItems(breakpoints);
  const mostPopularNewsArticle = data[0];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
      {loading ? (
        <div className="loading-skeleton">
          {[...Array(itemsToShow)].map((_, index) => (
            <React.Fragment key={index}>
              <Line />
              <br />
            </React.Fragment>
          ))}
        </div>
      ) : (
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
      )}
    </section>
  );
};
