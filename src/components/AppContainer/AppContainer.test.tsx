import { render, screen } from '@testing-library/react';
import useFetchNews from '../../hooks/useFetchNews';
import { NewsData } from '../../hooks/useFetchNews';
import { Mock, describe, expect, it, vi } from 'vitest';
import { AppContainer } from './AppContainer';

vi.mock('../../hooks/useFetchNews');

const mockNewsData: NewsData[] = [
  {
    id: '1',
    title: 'Breaking News: Test News 1',
    popularity: 1,
    timestamp: '2023-02-16T07:39:55.793Z',
  },
  {
    id: '2',
    title: 'Latest Update: Test News 2',
    popularity: 2,
    timestamp: '2023-02-16T22:51:21.660Z',
  },
];

describe('AppContainer component', () => {
  it('renders the current date and news header', () => {
    (useFetchNews as Mock).mockReturnValue({
      data: mockNewsData,
      error: null,
    });

    render(<AppContainer />);

    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    expect(
      screen.getByText(`${formattedDate} | The latest news first on NU.nl`)
    ).toBeInTheDocument();
  });

  it('renders an error message when there is an error', () => {
    (useFetchNews as Mock).mockReturnValue({
      data: null,
      error: 'Failed to fetch news',
    });

    render(<AppContainer />);

    expect(screen.getByText('Error: Failed to fetch news')).toBeInTheDocument();
  });
});
