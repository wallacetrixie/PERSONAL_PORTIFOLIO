import { useState, useEffect } from 'react';

// Throttle utility function
const throttle = <T extends unknown[]>(func: (...args: T) => void, limit: number) => {
  let inThrottle: boolean;
  return function(this: unknown, ...args: T) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const useScrollPosition = (): number => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollPosition(window.pageYOffset);
    }, 100); // Throttle to once every 100ms

    // Set initial scroll position
    setScrollPosition(window.pageYOffset);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};
