import { useState, useEffect } from 'react';

interface Breakpoint {
  width: number;
  items: number;
}

export const screenSize = {
  xlarge: 1920,
  large: 1200,
  medium: 1024,
  small: 768,
  xsmall: 480,
};

const useResponsiveItems = (breakpoints: Breakpoint[]) => {
  const [itemsToShow, setItemsToShow] = useState(() => {
    const defaultItems =
      breakpoints.find((b) => window.innerWidth >= b.width)?.items ||
      breakpoints[breakpoints.length - 1].items; // If no breakpoints match, use the items count from the last breakpoint

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
