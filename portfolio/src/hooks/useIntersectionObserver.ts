import { useState, useEffect, useRef, useMemo } from 'react';
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

  // Memoize options to avoid re-creating observer on every render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedOptions = useMemo(() => options, [
    options?.root,
    options?.rootMargin,
    options?.threshold,
    options?.triggerOnce
  ]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { triggerOnce, ...observerOptions } = memoizedOptions || {};

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
  }, [ref, memoizedOptions]);

  return isIntersecting;
};
