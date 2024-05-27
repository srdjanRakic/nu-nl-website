import { renderHook } from '@testing-library/react';
import useSortByPopularity from './useSortByPopularity';
import { NewsData } from './useFetchNews';
import { describe, expect, it } from 'vitest';

describe('useSortByPopularity', () => {
  it('should return data sorted by popularity in descending order', () => {
    const unsortedData: NewsData[] = [
      { id: '1', title: 'News 1', popularity: 5, timestamp: '2024-01-02' },
      { id: '2', title: 'News 2', popularity: 10, timestamp: '2024-01-01' },
      { id: '3', title: 'News 3', popularity: 8, timestamp: '2024-01-03' },
    ];

    const expectedSortedData: NewsData[] = [
      { id: '2', title: 'News 2', popularity: 10, timestamp: '2024-01-01' },
      { id: '3', title: 'News 3', popularity: 8, timestamp: '2024-01-03' },
      { id: '1', title: 'News 1', popularity: 5, timestamp: '2024-01-02' },
    ];

    const { result } = renderHook(() => useSortByPopularity(unsortedData));

    expect(result.current.data).toEqual(expectedSortedData);
  });

  it('should return an empty array if data is empty', () => {
    const unsortedData: NewsData[] = [];

    const { result } = renderHook(() => useSortByPopularity(unsortedData));

    expect(result.current.data).toEqual([]);
  });

  it('should handle data with same popularity correctly', () => {
    const unsortedData: NewsData[] = [
      { id: '1', title: 'News 1', popularity: 10, timestamp: '2024-01-01' },
      { id: '2', title: 'News 2', popularity: 10, timestamp: '2024-01-02' },
      { id: '3', title: 'News 3', popularity: 5, timestamp: '2024-01-03' },
    ];

    const expectedSortedData: NewsData[] = [
      { id: '1', title: 'News 1', popularity: 10, timestamp: '2024-01-01' },
      { id: '2', title: 'News 2', popularity: 10, timestamp: '2024-01-02' },
      { id: '3', title: 'News 3', popularity: 5, timestamp: '2024-01-03' },
    ];

    const { result } = renderHook(() => useSortByPopularity(unsortedData));

    expect(result.current.data).toEqual(expectedSortedData);
  });
});
