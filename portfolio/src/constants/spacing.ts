// ============================================================================
// SECTION SPACING CONSTANTS
// ============================================================================

/**
 * Standardized section spacing for consistent layout
 */
export const SECTION_SPACING = {
  hero: 'min-h-screen',
  full: 'min-h-screen py-20 lg:py-section-lg',
  standard: 'py-20 lg:py-section',
  compact: 'py-16 lg:py-section-sm',
} as const;

/**
 * Standardized container classes
 */
export const CONTAINER = {
  default: 'container mx-auto max-w-container px-4 sm:px-6 lg:px-8',
  narrow: 'container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8',
  wide: 'container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
  full: 'w-full px-4 sm:px-6 lg:px-8',
} as const;

/**
 * Standardized gap/spacing values
 */
export const GAP = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
} as const;

/**
 * Standardized margin bottom values
 */
export const MARGIN_BOTTOM = {
  xs: 'mb-4',
  sm: 'mb-6',
  md: 'mb-8',
  lg: 'mb-12',
  xl: 'mb-16',
  xxl: 'mb-20',
} as const;

// ============================================================================
// TYPOGRAPHY SCALE
// ============================================================================

/**
 * Standardized heading sizes
 */
export const HEADING = {
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-poppins',
  h2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-poppins',
  h3: 'text-2xl sm:text-3xl md:text-4xl font-bold font-poppins',
  h4: 'text-xl sm:text-2xl md:text-3xl font-semibold font-poppins',
  h5: 'text-lg sm:text-xl md:text-2xl font-semibold font-poppins',
  h6: 'text-base sm:text-lg md:text-xl font-semibold font-poppins',
} as const;

/**
 * Standardized body text sizes
 */
export const TEXT = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
} as const;

// ============================================================================
// GRID LAYOUTS
// ============================================================================

/**
 * Standardized grid configurations
 */
export const GRID = {
  cols1: 'grid grid-cols-1',
  cols2: 'grid grid-cols-1 sm:grid-cols-2',
  cols3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  cols4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  cols6: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
} as const;
