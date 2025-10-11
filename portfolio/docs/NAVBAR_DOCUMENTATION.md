# Navbar Component Documentation

## Overview
A modern, fully-featured navigation bar built with React, TypeScript, Framer Motion, and Tailwind CSS. The navbar provides smooth animations, responsive design, and excellent accessibility.

## Features

### Visual Design
- **Transparent Initial State**: Starts with a semi-transparent background with backdrop blur when at the top of the page
- **Scroll Transformation**: Smoothly transitions to a solid background with shadow after scrolling 80px
- **Gradient Brand**: "Wallace Wambulwa" brand name with gradient accent (cyan to blue to emerald)
- **Decorative Accent**: Orbiting gradient effect behind the brand on hover

### Animations
- **Entry Animation**: Navbar slides down from top on page load with smooth easing
- **Link Hover Effects**: 
  - Smooth color transition
  - Animated underline that grows from left to right
  - Subtle upward movement on hover
- **Active Link Styling**: Gradient underline for the current page
- **Theme Toggle**: Rotating animation (180°) when switching themes
- **Mobile Menu**: 
  - Smooth slide-in from right
  - Staggered fade-in for menu items
  - Backdrop blur overlay

### Responsive Design
- **Desktop (lg+)**:
  - Full horizontal navigation with all links visible
  - Theme toggle on the right
  - Hover effects and smooth transitions
  
- **Mobile (< lg)**:
  - Hamburger menu icon
  - Full-screen overlay menu that slides from right
  - Staggered animations for menu items
  - Social links at the bottom
  - Theme toggle in header

### Accessibility
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **ARIA Labels**: Proper labels for screen readers
  - `aria-label` on buttons and links
  - `aria-expanded` on menu toggle
  - `aria-modal` on mobile overlay
- **Focus Management**: Visible focus states on all interactive elements
- **Semantic HTML**: Proper use of `nav`, `header`, and landmark roles

### Performance Optimizations
- **Throttled Scroll**: Scroll event handler throttled to once every 100ms
- **Passive Event Listeners**: Used for scroll events to improve scroll performance
- **Conditional Rendering**: Mobile menu only rendered when open
- **Framer Motion**: Tree-shakable animation library
- **Body Scroll Lock**: Prevents background scrolling when mobile menu is open

### Navigation Links
1. Home (/)
2. About (/about)
3. Projects (/projects)
4. Skills (/skills)
5. Contact (/contact)

## Component Structure

```
Navbar
├── Fixed Header Container
│   ├── Brand Logo (with decorative accent)
│   ├── Desktop Navigation
│   │   ├── Nav Links (with hover effects)
│   │   └── Theme Toggle
│   └── Mobile Controls
│       ├── Theme Toggle
│       └── Hamburger Menu Button
│
└── Mobile Menu Overlay (AnimatePresence)
    ├── Backdrop (click to close)
    └── Slide-in Panel
        ├── Menu Header (with close button)
        ├── Navigation Links (staggered animation)
        └── Social Links (GitHub, LinkedIn, Email)
```

## Customization

### Colors
The navbar uses Tailwind CSS classes with the following color scheme:
- **Accent Gradient**: `from-cyan-500 via-blue-500 to-emerald-500`
- **Light Theme**: White background with dark text
- **Dark Theme**: Dark gray background with light text

You can customize these in `tailwind.config.js`.

### Scroll Threshold
Change the `SCROLL_THRESHOLD` constant in the component:
```typescript
const SCROLL_THRESHOLD = 80; // pixels
```

### Animation Timing
Modify the animation variants:
```typescript
const navbarVariants: Variants = {
  animate: { 
    transition: {
      duration: 0.6, // Change this value
      ease: [0.22, 1, 0.36, 1] // Custom cubic bezier
    }
  }
};
```

### Social Links
Update social links in the mobile menu:
```tsx
<a href="https://github.com/wallacetrixie" ...>
<a href="https://linkedin.com/in/yourprofile" ...>
<a href="mailto:your.email@example.com" ...>
```

## Dependencies
- `react`: ^19.1.1
- `react-router-dom`: ^7.9.3
- `framer-motion`: ^12.23.22
- `lucide-react`: ^0.544.0
- `tailwindcss`: ^3.4.18

## Hooks Used
- `useDarkMode`: Custom hook for theme management
- `useScrollPosition`: Custom hook for scroll position (throttled)
- `useLocation`: React Router hook for active link detection
- `useState`, `useEffect`: React built-in hooks

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Supports prefers-color-scheme for automatic theme detection
- Graceful degradation for browsers without backdrop-filter support

## Testing Recommendations
1. Test keyboard navigation (Tab, Enter, Escape)
2. Test with screen readers
3. Verify smooth scrolling performance on low-end devices
4. Test mobile menu on various screen sizes
5. Verify theme persistence across page reloads
6. Test touch interactions on mobile devices

## Future Enhancements
- [ ] Add search functionality
- [ ] Implement smooth scroll to section anchors
- [ ] Add notification badge support
- [ ] Include breadcrumb navigation for multi-level routes
- [ ] Add language switcher
- [ ] Implement progress indicator for long pages
