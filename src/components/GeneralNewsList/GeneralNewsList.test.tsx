import { render, screen } from '@testing-library/react';
import { GeneralNewsList } from './GeneralNewsList';
import { NewsData } from '../../hooks/useFetchNews';
import IkeaImg from '../../assets/ikea-img.jpg';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../hooks/useSortByPopularity', () => ({
  __esModule: true,
  default: (news: NewsData[]) => ({
    data: news.sort((a, b) => b.popularity - a.popularity),
  }),
}));

vi.mock('../Image', () => ({
  __esModule: true,
  default: ({
    alt,
    title,
    src,
  }: {
    alt: string;
    title: string;
    src: string;
  }) => <img alt={alt} title={title} src={src} />,
}));

const mockNewsData: NewsData[] = [
  {
    id: '1',
    title: 'News 1',
    popularity: 0.9,
    timestamp: '2023-02-16T07:39:55.793Z',
  },
  {
    id: '2',
    title: 'News 2',
    popularity: 0.8,
    timestamp: '2023-02-16T07:39:55.793Z',
  },
  {
    id: '3',
    title: 'News 3',
    popularity: 0.7,
    timestamp: '2023-02-16T07:39:55.793Z',
  },
];

describe('GeneralNewsList', () => {
  it('renders the most popular news as a hero article', () => {
    render(<GeneralNewsList news={mockNewsData} />);

    const heroImage = screen.getByAltText('News 1');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', IkeaImg);
  });

  it('renders a list of news articles', () => {
    render(<GeneralNewsList news={mockNewsData} />);

    const articles = screen.getAllByRole('listitem');
    expect(articles).toHaveLength(mockNewsData.length);

    mockNewsData.forEach((newsItem) => {
      expect(screen.getByText(newsItem.title)).toBeInTheDocument();
    });
  });

  it('returns null if there is no most popular news', () => {
    render(<GeneralNewsList news={[]} />);

    const heroImage = screen.queryByAltText('News 1');
    expect(heroImage).not.toBeInTheDocument();
  });
});
