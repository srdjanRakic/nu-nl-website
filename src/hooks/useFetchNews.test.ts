import {} from '@testing-library/react';
import { waitFor, renderHook } from '@testing-library/react';
import useFetchNews from './useFetchNews';
import { Mock, afterEach, describe, expect, it, vi } from 'vitest';

global.fetch = vi.fn();

describe('useFetchNews', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and parse the CSV data correctly', async () => {
    const mockNewsData = [
      {
        id: '1',
        title: 'Test News 1',
        popularity: '10',
        timestamp: '2023-01-01T12:00:00Z',
      },
      {
        id: '2',
        title: 'Test News 2',
        popularity: '20',
        timestamp: '2023-01-02T12:00:00Z',
      },
    ];

    const mockCsvData = `id,title,popularity,timestamp
1,Test News 1,10,2023-01-01T12:00:00Z
2,Test News 2,20,2023-01-02T12:00:00Z`;

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      text: vi.fn().mockResolvedValueOnce(mockCsvData),
    });

    const { result } = renderHook(() => useFetchNews());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockNewsData);
    });

    expect(result.current.error).toBeNull();
  });

  it('should set an error when the fetch fails', async () => {
    const mockErrorMessage = 'Error fetching the file: Internal Server Error';

    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    });

    const { result } = renderHook(() => useFetchNews());

    await waitFor(() => {
      expect(result.current.error).toBe(mockErrorMessage);
    });

    expect(result.current.data).toEqual([]);
  });

  it('should set an error when the fetch throws an exception', async () => {
    const mockErrorMessage = 'Network Error';

    (fetch as Mock).mockRejectedValueOnce(new Error(mockErrorMessage));

    const { result } = renderHook(() => useFetchNews());

    await waitFor(() => {
      expect(result.current.error).toBe(mockErrorMessage);
    });

    expect(result.current.data).toEqual([]);
  });
});
