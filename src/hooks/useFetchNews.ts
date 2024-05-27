import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export interface NewsData {
  id: string;
  title: string;
  popularity: number;
  timestamp: string;
}

const useFetchNews = () => {
  const [data, setData] = useState<NewsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/news-source.csv');

        if (!response.ok) {
          throw new Error(`Error fetching the file: ${response.statusText}`);
        }
        const text = await response.text();

        const parsedData = Papa.parse<NewsData>(text, {
          header: true,
          skipEmptyLines: true,
        }).data;

        setData(parsedData);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return { data, error };
};

export default useFetchNews;
