import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  ref: RefObject<HTMLElement | null>,
  options?: IntersectionObserverOptions
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { triggerOnce, ...observerOptions } = options || {};

    const observer = new IntersectionObserver(([entry]) => {
      // If triggerOnce is enabled and already triggered, don't update
      if (triggerOnce && hasTriggeredRef.current) {
        return;
      }

      if (entry.isIntersecting && triggerOnce) {
        hasTriggeredRef.current = true;
      }

      setIsIntersecting(entry.isIntersecting);
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
    // Stringify options to avoid dependency issues with object references
  }, [ref, JSON.stringify(options)]);

  return isIntersecting;
};
