import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for animating number count up effect
 * @param end - The final number to count up to
 * @param duration - Duration of the animation in milliseconds (default: 2000)
 * @param start - Starting number (default: 0)
 * @returns The current count value
 */
export const useCountUp = (end: number, duration: number = 2000, start: number = 0): number => {
  const [count, setCount] = useState<number>(start);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // If end value is 0, just set it
    if (end === 0) {
      setCount(0);
      return;
    }

    // Reset to start when animation begins
    setCount(start);

    const startTime = Date.now();
    const difference = end - start;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation (easeOutExpo)
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = Math.floor(start + difference * easeOutExpo);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(updateCount);
      } else {
        setCount(end); // Ensure we end exactly at the target
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [end, duration, start]); // Removed 'count' from dependencies

  return count;
};
