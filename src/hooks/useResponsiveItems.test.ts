import { renderHook, act } from '@testing-library/react';
import useResponsiveItems from './useResponsiveItems';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('useResponsiveItems', () => {
  const originalInnerWidth = window.innerWidth;
  const breakpoints = [
    { width: 1200, items: 12 },
    { width: 768, items: 6 },
    { width: 0, items: 4 },
  ];

  beforeEach(() => {
    window.innerWidth = originalInnerWidth;
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    window.dispatchEvent(new Event('resize'));
  });

  it('should show 4 items for small screens', () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useResponsiveItems(breakpoints));

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(4);
  });

  it('should show 6 items for medium screens', () => {
    window.innerWidth = 800;
    const { result } = renderHook(() => useResponsiveItems(breakpoints));

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(6);
  });

  it('should show 12 items for large screens', () => {
    window.innerWidth = 1300;
    const { result } = renderHook(() => useResponsiveItems(breakpoints));

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(12);
  });
});
