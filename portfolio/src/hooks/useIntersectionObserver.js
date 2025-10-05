import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element is visible in the viewport using Intersection Observer
 * @param {React.RefObject} ref - Reference to the element to observe
 * @param {IntersectionObserverInit} options - Intersection Observer options
 * @returns {boolean} - Whether the element is currently intersecting/visible
 */
export const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    // Extract specific options to avoid dependency issues
    const { threshold, root, rootMargin, triggerOnce } = options;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If triggerOnce is enabled and already triggered, don't update
        if (triggerOnce && hasTriggeredRef.current) {
          return;
        }

        if (entry.isIntersecting && triggerOnce) {
          hasTriggeredRef.current = true;
        }

        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    const element = ref.current;
    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [ref, options.threshold, options.root, options.rootMargin, options.triggerOnce]);

  return isIntersecting;
};
