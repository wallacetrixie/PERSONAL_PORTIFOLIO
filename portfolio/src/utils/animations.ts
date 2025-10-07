import type { Variants } from 'framer-motion';

/**
 * Fade in animation from opacity 0 to 1
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

/**
 * Fade in with upward movement
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

/**
 * Fade in with downward movement
 */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

/**
 * Slide in from right
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

/**
 * Scale up animation (zoom in)
 */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

/**
 * Container with staggered children
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

/**
 * Container with staggered children (faster)
 */
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0
    }
  }
};

/**
 * Card hover animation
 */
export const cardHover = {
  scale: 1.05,
  y: -5,
  transition: { duration: 0.3, ease: 'easeOut' }
};

/**
 * Button hover animation
 */
export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2, ease: 'easeOut' }
};

/**
 * Button tap animation
 */
export const buttonTap = {
  scale: 0.95,
  transition: { duration: 0.1 }
};

// ============================================================================
// ANIMATION PRESETS
// ============================================================================

/**
 * Common animation duration presets
 */
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

/**
 * Common easing functions
 */
export const EASING = {
  easeOut: 'easeOut',
  easeIn: 'easeIn',
  easeInOut: 'easeInOut',
  spring: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
  bounce: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

/**
 * Stagger delay presets
 */
export const STAGGER_DELAY = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Create a custom fade in variant with custom duration
 */
export const createFadeIn = (duration: number = 0.6): Variants => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration, ease: 'easeOut' }
  }
});

/**
 * Create a custom stagger container
 */
export const createStaggerContainer = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0.1
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

/**
 * Create a fade in up variant with custom values
 */
export const createFadeInUp = (
  y: number = 30,
  duration: number = 0.6,
  delay: number = 0
): Variants => ({
  hidden: { opacity: 0, y },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration, delay, ease: 'easeOut' }
  }
});
