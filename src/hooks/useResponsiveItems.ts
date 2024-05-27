import { useState, useEffect } from 'react';

interface Breakpoint {
  width: number;
  items: number;
}

const useResponsiveItems = (breakpoints: Breakpoint[]) => {
  const [itemsToShow, setItemsToShow] = useState(() => {
    const defaultItems =
      breakpoints.find((b) => window.innerWidth >= b.width)?.items ||
      breakpoints[breakpoints.length - 1].items;

    return defaultItems;
  });

  useEffect(() => {
    const handleResize = () => {
      const matchingBreakpoint =
        breakpoints.find((b) => window.innerWidth >= b.width) ||
        breakpoints[breakpoints.length - 1];

      setItemsToShow(matchingBreakpoint.items);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoints]);

  return itemsToShow;
};

export default useResponsiveItems;
