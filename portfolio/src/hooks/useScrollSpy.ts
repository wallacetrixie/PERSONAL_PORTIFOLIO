import { useState, useEffect } from 'react';

interface UseScrollSpyOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Custom hook to detect which section is currently visible in the viewport
 * Uses Intersection Observer API for performance
 * 
 * @param sectionIds - Array of section IDs to observe (e.g., ['home', 'about', 'projects'])
 * @param options - Intersection Observer options
 * @returns The ID of the currently active section
 */
export const useScrollSpy = (
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
): string => {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');
  
  const { threshold = 0.3, rootMargin = '-20% 0px -35% 0px' } = options;

  useEffect(() => {
    // Store intersection ratios for all sections
    const sectionIntersections = new Map<string, number>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        
        if (entry.isIntersecting) {
          // Store the intersection ratio for this section
          sectionIntersections.set(sectionId, entry.intersectionRatio);
        } else {
          // Remove from map when not intersecting
          sectionIntersections.delete(sectionId);
        }
      });

      // Find the section with the highest intersection ratio
      if (sectionIntersections.size > 0) {
        let maxRatio = 0;
        let mostVisibleSection = '';

        sectionIntersections.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleSection = id;
          }
        });

        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin,
    });

    // Observe all sections
    const elements: Element[] = [];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        elements.push(element);
      }
    });

    // Cleanup
    return () => {
      elements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, [sectionIds, threshold, rootMargin]);

  return activeSection;
};

/**
 * Helper hook that maps section IDs to their corresponding route paths
 * Useful for navigation links
 */
export const useScrollSpyNav = (
  sectionToPathMap: Record<string, string>,
  sectionIds: string[],
  options?: UseScrollSpyOptions
): string => {
  const activeSection = useScrollSpy(sectionIds, options);
  return sectionToPathMap[activeSection] || sectionToPathMap[sectionIds[0]] || '/';
};
