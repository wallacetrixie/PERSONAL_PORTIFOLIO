# Projects Section - Visual & Style Guide

## 🎨 Color Palette

### Light Mode
```
Background:       #f9fafb (light-bg)
Card Background:  #ffffff (white)
Text Primary:     #1f2937 (gray-900)
Text Secondary:   #4b5563 (gray-600)
```

### Dark Mode
```
Background:       #0a0a0f (dark-bg)
Card Background:  #111827 (dark-card)
Text Primary:     #f4f4f4 (white)
Text Secondary:   #c9c9c9 (gray-400)
```

### Accent Colors
```
Primary Gradient: #0ea5e9 → #a855f7 (Blue to Purple)
Frontend Badge:   #3b82f6 (Blue)
Backend Badge:    #10b981 (Green)
Featured Badge:   Gradient (Primary to Purple)
```

---

## 📐 Layout Specifications

### Grid System
```
Mobile (< 768px):    1 column  | gap: 32px (8 units)
Tablet (768-1024px): 2 columns | gap: 32px
Desktop (> 1024px):  3 columns | gap: 32px
```

### Card Dimensions
```
Image Height:  256px (h-64)
Card Width:    Auto (spans grid column)
Padding:       24px (p-6)
Border Radius: 12px (rounded-xl)
```

### Spacing
```
Section Padding:  80px vertical (py-20)
Max Width:        1280px (max-w-7xl)
Header Margin:    64px bottom (mb-16)
Grid Gap:         32px (gap-8)
```

---

## ✨ Animation Specifications

### Card Reveal Animation
```
Initial State:
  - opacity: 0
  - translateY: 50px

Final State:
  - opacity: 1
  - translateY: 0

Timing:
  - Duration: 0.5s
  - Delay: index × 0.1s (stagger)
  - Easing: [0.4, 0, 0.2, 1] (ease-out)
```

### Hover Effects

#### Image Zoom
```
Scale: 1 → 1.05
Duration: 0.3s
Overflow: hidden (on container)
```

#### Overlay Fade
```
Opacity: 0 → 1
Duration: 0.3s
Background: Gradient to black
```

#### Button Hover
```
Scale: 1 → 1.05
Tap Scale: 0.95
Duration: 0.2s
```

### Category Filter Animation
```
Active Background:
  - Uses layoutId="activeCategory"
  - Spring transition
  - Stiffness: 300
  - Damping: 30
```

---

## 🎭 Component Hierarchy

```
Projects Page
├── Header Section
│   ├── Subtitle (Portfolio)
│   ├── Title (Selected Projects)
│   └── Description
│
├── Category Filter
│   ├── All Projects (9)
│   ├── Frontend (3)
│   └── Backend (6)
│
├── Projects Grid
│   ├── ProjectCard × N
│   │   ├── Image Container
│   │   │   ├── Image (with zoom)
│   │   │   ├── Hover Overlay
│   │   │   │   ├── Tech Stack Chips
│   │   │   │   └── Action Buttons
│   │   │   └── Featured Badge
│   │   │
│   │   └── Content Area
│   │       ├── Category Badge
│   │       ├── Title
│   │       ├── Description
│   │       └── Tech Stack (static)
│   │
│
├── Stats Section
│   ├── Total Projects
│   ├── Frontend Count
│   └── Backend Count
│
└── Call to Action
    ├── Title & Description
    └── Action Buttons
        ├── Get in Touch
        └── View GitHub
```

---

## 🖼️ Image Guidelines

### Recommended Specs
```
Format:     PNG or WebP
Dimensions: 1920×1080 (16:9 ratio)
Size:       < 500KB per image
Quality:    80-90%
```

### Display Behavior
```
Object Fit:    cover
Object Position: center
Lazy Loading: enabled
Alt Text:     Required
```

### Hover Effect
```
Transform:  scale(1.05)
Transition: 0.3s ease
Container:  overflow-hidden
```

---

## 📱 Responsive Behavior

### Breakpoints
```tsx
// Mobile First Approach
sm:  640px   (not used in this component)
md:  768px   → 2 columns
lg:  1024px  → 3 columns
xl:  1280px  (inherits lg)
2xl: 1536px  (inherits lg)
```

### Typography Scale
```
Title:
  Mobile:  text-4xl (36px)
  Tablet:  text-5xl (48px)
  Desktop: text-6xl (60px)

Card Title:
  All:     text-xl (20px)

Description:
  All:     text-sm (14px)
```

### Button Sizes
```
Desktop:
  Padding: 16px 32px (px-8 py-4)
  Font:    16px semibold

Mobile: (auto-adjusts)
  Padding: 12px 24px
  Font:    14px semibold
```

---

## 🎯 Interactive States

### Category Filter Tabs

#### Default State
```
Background:  white / dark-card
Text:        gray-700 / gray-300
Border:      none
```

#### Hover State
```
Background:  gray-100 / gray-800
Scale:       1.05
Cursor:      pointer
```

#### Active State
```
Background:  gradient (primary → purple)
Text:        white
Scale:       1.0
```

### Project Cards

#### Default State
```
Shadow:      lg (large)
Transform:   none
```

#### Hover State
```
Shadow:      2xl (extra large)
Image:       scale(1.05)
Overlay:     opacity 1
```

#### Focus State (Keyboard)
```
Outline:     2px primary-500
Outline Offset: 2px
```

---

## 🏷️ Badge Styles

### Category Badges

#### Frontend
```
Background:   blue-100 / blue-900/30
Text:         blue-600 / blue-400
Padding:      12px 16px
Border Radius: 9999px (full)
Font Size:    12px
Font Weight:  600
```

#### Backend
```
Background:   green-100 / green-900/30
Text:         green-600 / green-400
(Same dimensions as Frontend)
```

### Featured Badge
```
Position:     absolute top-4 right-4
Background:   gradient (primary → purple)
Text:         white
Padding:      8px 12px
Font Size:    12px
Font Weight:  700
Shadow:       lg
```

### Tech Stack Chips (Overlay)
```
Background:   white/20 with backdrop-blur
Border:       1px white/30
Text:         white
Padding:      8px 12px
Border Radius: 9999px
Font Size:    12px
Font Weight:  500
```

---

## 🔘 Button Styles

### Primary Button (View Live)
```
Background:   primary-500
Hover:        primary-600
Text:         white
Icon:         ExternalLink (16px)
```

### Secondary Button (Demo)
```
Background:   accent-purple
Hover:        purple-600
Text:         white
Icon:         Play (16px)
```

### Tertiary Button (Code)
```
Background:   white/10 with backdrop-blur
Border:       1px white/30
Hover:        white/20
Text:         white
Icon:         Github (16px)
```

### CTA Primary
```
Background:   white
Text:         primary-500
Shadow:       lg → xl on hover
```

### CTA Secondary
```
Background:   white/10 with backdrop-blur
Border:       2px white/30
Text:         white
Hover:        white/20
```

---

## 📊 Typography Hierarchy

```
Page Title:          60px / 48px / 36px (lg/md/sm)
Section Title:       48px / 36px / 30px
Card Title:          20px (all)
Description:         16px (section), 14px (card)
Button Text:         14px (sm), 16px (md)
Badge Text:          12px
Subtitle:            14px uppercase
Stats Numbers:       36px
Stats Labels:        14px
```

---

## 🌈 Gradient Definitions

### Primary Gradient
```css
.gradient-primary {
  background: linear-gradient(to right, #0ea5e9, #a855f7);
}
```

### Overlay Gradient
```css
.gradient-overlay {
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.9) 0%,
    rgba(0,0,0,0.6) 50%,
    rgba(0,0,0,0) 100%
  );
}
```

### Text Gradient
```css
.text-gradient {
  background: linear-gradient(to right, #0ea5e9, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 🎬 Animation Timing Reference

```
Fast:        0.15s - 0.2s  (button hover)
Normal:      0.3s - 0.4s   (card hover, overlay)
Slow:        0.5s - 0.6s   (page entrance)
Stagger:     0.1s delay    (per card)
Spring:      300/30        (category filter)
```

---

## 🧩 Component Props

### ProjectCard
```typescript
interface ProjectCardProps {
  project: Project;      // Project data object
  index: number;         // For stagger delay
}
```

### CategoryFilter
```typescript
interface CategoryFilterProps {
  categories: Category[];           // Array of categories
  activeCategory: string;          // Current active ID
  onCategoryChange: (id) => void;  // Callback function
}
```

---

## 💅 CSS Custom Classes (if needed)

Add to `index.css` for additional effects:

```css
/* Smooth backdrop blur */
.backdrop-blur-custom {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Custom gradient glow */
.gradient-glow {
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.3);
}

/* Image overlay gradient */
.image-overlay {
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.6) 60%,
    rgba(0, 0, 0, 0.9) 100%
  );
}
```

---

## 🎯 Design Tokens Summary

```javascript
const designTokens = {
  colors: {
    primary: '#0ea5e9',
    secondary: '#a855f7',
    frontend: '#3b82f6',
    backend: '#10b981',
  },
  spacing: {
    cardGap: '32px',
    sectionPadding: '80px',
    cardPadding: '24px',
  },
  borderRadius: {
    card: '12px',
    badge: '9999px',
    button: '8px',
  },
  shadows: {
    card: '0 10px 15px -3px rgba(0,0,0,0.1)',
    cardHover: '0 25px 50px -12px rgba(0,0,0,0.25)',
  },
  animations: {
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.5s',
    },
    stagger: '0.1s',
  },
};
```

---

## 📐 Accessibility Standards

### Color Contrast
```
Text on white:     ≥ 4.5:1 (WCAG AA)
Text on gradient:  ≥ 4.5:1
Badge text:        ≥ 3:1 (large text)
```

### Focus Indicators
```
Outline:           2px solid
Outline Color:     primary-500
Outline Offset:    2px
Border Radius:     matches element
```

### Touch Targets
```
Minimum Size:      44×44px
Button Padding:    12px minimum
Tap Area:          Full card on mobile
```

---

This style guide ensures consistency across the Projects section and makes it easy to maintain or extend the design! 🎨
