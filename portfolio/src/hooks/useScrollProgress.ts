import { useState, useEffect } from 'react';

// Throttle utility function
const throttle = (func: (...args: any[]) => void, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Custom hook to calculate scroll progress as a percentage (0-100)
 * Useful for progress bars and scroll indicators
 */
export const useScrollProgress = (): number => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate the maximum scrollable distance
      const scrollableDistance = documentHeight - windowHeight;
      
      // Avoid division by zero
      if (scrollableDistance <= 0) {
        setScrollProgress(0);
        return;
      }
      
      // Calculate progress as percentage (0-100)
      const progress = (scrollTop / scrollableDistance) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    const handleScroll = throttle(calculateScrollProgress, 50);

    // Calculate initial progress
    calculateScrollProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return scrollProgress;
};
