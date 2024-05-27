import { renderHook } from '@testing-library/react';
import useFormattedTime from './useFormattedTime';
import { describe, expect, it } from 'vitest';

describe('useFormattedTime', () => {
  it('should format the timestamp correctly using UTC format', () => {
    const { result } = renderHook(() =>
      useFormattedTime('2023-01-01T12:34:56Z')
    );
    expect(result.current).toBe('12:34');
  });

  it('should format the timestamp correctly for a number input using UTC format', () => {
    const timestamp = new Date('2023-01-01T12:34:56Z').getTime();
    const { result } = renderHook(() => useFormattedTime(timestamp));
    expect(result.current).toBe('12:34');
  });

  it('should format the timestamp correctly for a Date object using UTC format', () => {
    const timestamp = new Date('2023-01-01T12:34:56Z');
    const { result } = renderHook(() => useFormattedTime(timestamp));
    expect(result.current).toBe('12:34');
  });

  it('should update the formatted time when the timestamp changes using UTC format', () => {
    const { result, rerender } = renderHook(
      ({ timestamp }) => useFormattedTime(timestamp),
      {
        initialProps: { timestamp: '2023-01-01T12:34:56Z' },
      }
    );
    expect(result.current).toBe('12:34');

    rerender({ timestamp: '2023-01-01T15:30:00Z' });
    expect(result.current).toBe('15:30');
  });
});
