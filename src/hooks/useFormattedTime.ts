import { useMemo } from 'react';

const useFormattedTime = (timestamp: string | number | Date): string => {
  const formattedTime = useMemo(() => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    });
  }, [timestamp]);

  return formattedTime;
};

export default useFormattedTime;
