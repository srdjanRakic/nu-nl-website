import { renderHook } from '@testing-library/react';
import useSortByDate from './useSortByDate';
import { describe, expect, it } from 'vitest';

describe('useSortByDate', () => {
  it('should sort data by date', () => {
    const data = [
      {
        id: '1',
        timestamp: '2023-05-01T10:00:00.000Z',
        title: 'News 1',
        popularity: 0.9,
      },
      {
        id: '2',
        timestamp: '2023-05-01T09:00:00.000Z',
        title: 'News 1',
        popularity: 0.5,
      },
      {
        id: '3',
        timestamp: '2023-05-01T11:00:00.000Z',
        title: 'News 1',
        popularity: 0.3,
      },
    ];

    const { result } = renderHook(() => useSortByDate(data));

    const sortedData = result.current.data;

    expect(sortedData).toHaveLength(3);
    expect(sortedData[0].id).toBe('3');
    expect(sortedData[1].id).toBe('1');
    expect(sortedData[2].id).toBe('2');
  });

  it('should return an empty array if data is empty', () => {
    const data: any[] = [];

    const { result } = renderHook(() => useSortByDate(data));

    const sortedData = result.current.data;

    expect(sortedData).toHaveLength(0);
  });
});
