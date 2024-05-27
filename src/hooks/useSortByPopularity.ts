// src/hooks/useSortByPopularity.ts
import { useMemo } from 'react';
import { NewsData } from './useFetchNews';

const useSortByPopularity = (data: NewsData[]) => {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.popularity - a.popularity);
  }, [data]);

  return { data: sortedData };
};

export default useSortByPopularity;
