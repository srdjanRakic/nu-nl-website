import { useMemo } from 'react';
import { NewsData } from './useFetchNews';

const useSortByDate = (data: NewsData[]) => {
  const currentTime = new Date().getTime();

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const timeDiffA = Math.abs(currentTime - new Date(a.timestamp).getTime());
      const timeDiffB = Math.abs(currentTime - new Date(b.timestamp).getTime());
      return timeDiffA - timeDiffB;
    });
  }, [data, currentTime]);

  return { data: sortedData };
};

export default useSortByDate;
