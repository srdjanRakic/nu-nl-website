import { render, screen, act } from "@testing-library/react";
import { NewsData } from "../../hooks/useFetchNews";
import IkeaImg from "../../assets/ikea-img.jpg";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { NewsList } from "./NewsList";

vi.mock("../../hooks/useSortByPopularity", () => ({
  __esModule: true,
  default: (news: NewsData[]) => ({
    data: news.sort((a, b) => b.popularity - a.popularity),
  }),
}));

vi.mock("../Image", () => ({
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
    id: "1",
    title: "News 1",
    popularity: 0.9,
    timestamp: "2023-02-16T07:39:55.793Z",
  },
  {
    id: "2",
    title: "News 2",
    popularity: 0.8,
    timestamp: "2023-02-16T07:39:55.793Z",
  },
  {
    id: "3",
    title: "News 3",
    popularity: 0.7,
    timestamp: "2023-02-16T07:39:55.793Z",
  },
];

describe("GeneralNewsList", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("renders the loading skeleton initially", () => {
    render(<NewsList news={mockNewsData} />);

    const loadingSkeletons = screen.getAllByTestId('loading-line');
    expect(loadingSkeletons.length).toBeGreaterThan(0);
  });

  it("renders the most popular news as a hero article after loading", () => {
    render(<NewsList news={mockNewsData} />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const heroImage = screen.getByAltText("News 1");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", IkeaImg);
  });

  it("renders a list of news articles after loading", () => {
    render(<NewsList news={mockNewsData} />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const articles = screen.getAllByRole("listitem");
    expect(articles).toHaveLength(mockNewsData.length);

    mockNewsData.forEach((newsItem) => {
      expect(screen.getByText(newsItem.title)).toBeInTheDocument();
    });
  });

  it("returns null if there is no most popular news", () => {
    render(<NewsList news={[]} />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const heroImage = screen.queryByAltText("News 1");
    expect(heroImage).not.toBeInTheDocument();
  });
});
