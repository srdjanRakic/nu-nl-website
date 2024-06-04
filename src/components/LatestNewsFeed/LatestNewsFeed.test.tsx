import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { LatestNewsFeed } from "./LatestNewsFeed";
import useSortByDate from '../../hooks/useSortByDate';
import { NewsData } from '../../hooks/useFetchNews';

vi.mock('../../hooks/useSortByDate');
vi.mock('../ArrowIcon', () => ({
  __esModule: true,
  default: () => <div>ArrowIcon</div>,
}));
vi.mock('./NewsItem', () => ({
  __esModule: true,
  default: ({ item }: { item: NewsData }) => <li>{item.title}</li>,
}));
vi.mock('./Divider', () => ({
  __esModule: true,
  Divider: () => (
    <div className="divider">
      <hr />
    </div>
  ),
}));

const mockNewsData: NewsData[] = Array.from({ length: 12 }, (_, index) => ({
  id: String(index + 1),
  timestamp: new Date().toISOString(),
  title: `News ${index + 1}`,
  popularity: Math.random(),
}));

describe('LatestNewsFeed component', () => {
  beforeEach(() => {
    (useSortByDate as unknown as Mock).mockReturnValue({
      data: mockNewsData,
    });
  });

  it('renders latest news items correctly', () => {
    render(<LatestNewsFeed news={mockNewsData} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(6);
    expect(screen.getByTestId('show-more-items')).toBeInTheDocument();
  });

  it('renders "Show More" button and shows more news items when clicked', () => {
    render(<LatestNewsFeed news={mockNewsData} />);

    const showMoreButton = screen.getByTestId('show-more-items');
    expect(showMoreButton).toBeInTheDocument();

    fireEvent.click(showMoreButton);
    expect(screen.getAllByRole('listitem')).toHaveLength(10);
    expect(screen.queryByTestId('show-more-items')).not.toBeInTheDocument();
  });

  it('handles showing more news items correctly based on breakpoint', () => {
    const { rerender } = render(<LatestNewsFeed news={mockNewsData} />);

    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    rerender(<LatestNewsFeed news={mockNewsData} />);
    fireEvent.click(screen.getByTestId('show-more-items'));
    expect(screen.getAllByRole('listitem')).toHaveLength(12);
  });
});
