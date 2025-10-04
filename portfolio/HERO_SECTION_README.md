# Hero Section Documentation

## Overview
The Hero section is a stunning, fully-featured landing section for your portfolio that showcases your professional identity with eye-catching animations and modern design.

## ✨ Features Implemented

### 🎨 Visual Design
- **Full viewport height** (100vh) dark-themed container
- **Two-column desktop layout**: Text content on the left, portrait image on the right
- **Mobile-responsive**: Stacked layout on mobile devices with text above the image
- **Dark theme**: Rich gradient background (gray-900 → gray-800 → gray-900)
- **Decorative elements**:
  - Animated gradient orbs (primary blue and purple)
  - Rotating spiral SVG pattern
  - Floating abstract shapes (circles and squares)
  - 20 floating particles with randomized positions and animations

### 🖼️ Portrait Image
- **Circular masked image** with professional styling
- **Gradient border effect** (primary → purple → pink)
- **Floating animation**: Smooth bobbing motion (3s cycle)
- **Decorative rings**: Two rotating rings around the portrait
- **Decorative dots**: Grid of accent dots for visual interest
- **Responsive sizing**: 
  - Mobile: 250px
  - Tablet: 320px
  - Desktop: 400px

### 📝 Content
- **Greeting**: Animated wave emoji with "Hello, I'm" text
- **Headline**: Large, bold name with gradient accent on last name
  - "Wallace Wambulwa" with "Wambulwa" in gradient colors
- **Tagline**: "Software Developer & Founder"
- **Description**: Bio text with company name highlighted
- **Availability badge**: Green pulsing indicator showing "Available for freelance work"

### 🎯 Call-to-Actions
Three styled buttons with hover effects:
1. **Primary CTA**: "View Projects" (gradient background, arrow icon)
2. **Secondary CTA**: "Contact Me" (outlined, mail icon)
3. **Tertiary CTA**: "Download CV" (gray background, download icon)

### 🎭 Animations (Framer Motion)

#### Entrance Animations
- **Text content**: Slides in from left with fade (0.5s duration, 0.2s delay)
- **Portrait image**: Scales up from 0.8 with fade (spring animation, 0.4s delay)
- **Individual elements**: Staggered fade-in-up for greeting, headline, tagline, description, buttons, and badge

#### Continuous Animations
- **Portrait floating**: Smooth vertical oscillation (3s infinite)
- **Gradient orbs**: Pulsing scale and opacity (8s and 10s cycles)
- **Spiral pattern**: 360° rotation (50s infinite)
- **Abstract shapes**: Rotating and scaling (12s and 15s cycles)
- **Floating particles**: Random vertical movement with opacity fade
- **Availability badge**: Pulsing dot indicator (2s infinite)
- **Decorative rings**: Counter-rotating around portrait (20s and 15s)

#### Interactive Animations
- **Button hover**: Scale to 1.05
- **Button tap**: Scale to 0.95
- **Primary button**: Gradient slide-in effect on hover
- **Scroll prompt**: Bouncing animation (1.5s infinite)

### ♿ Accessibility
- **Alt text** on portrait image
- **ARIA label** on scroll prompt button
- **Keyboard accessible** buttons and links
- **High contrast**: Sufficient color contrast ratios
- **Reduced motion support**: All animations respect `prefers-reduced-motion` media query
  - Users who prefer reduced motion see static content without animations
  - Ensures comfort for users with vestibular disorders

### 📱 Responsive Design
- **Mobile-first approach**
- **Breakpoints**:
  - `lg`: 1024px+ (two-column layout)
  - `md`: 768px+ (increased font sizes)
  - `sm`: 640px+ (adjusted spacing)
- **Text sizing**: Responsive clamp-like approach using Tailwind utilities
  - Headline: 4xl → 5xl → 6xl → 7xl
  - Tagline: xl → 2xl → 3xl
- **Button layout**: Stacks on mobile, horizontal on desktop
- **Portrait sizing**: Scales appropriately for each breakpoint

### 🎬 Smooth Scrolling
- **Scroll prompt button** at the bottom center
- **Smooth scroll behavior** to the next section (About)
- **Animated chevron** with bouncing effect
- **HTML smooth scroll** enabled globally in CSS

## 🎨 Color Palette

### Primary Colors
- **Primary 400**: `#38bdf8` (Light blue for accents)
- **Primary 500**: `#0ea5e9` (Main brand blue)
- **Primary 600**: `#0284c7` (Darker blue for gradients)

### Accent Colors
- **Purple 500**: `#a855f7` (Used in gradients)
- **Pink 500**: `#ec4899` (Used in borders)
- **Green 400**: `#10b981` (Availability indicator)

### Background Colors
- **Gray 900**: `#111827` (Primary dark background)
- **Gray 800**: `#1f2937` (Secondary dark background)
- **Gray 700**: `#374151` (Tertiary elements)

## 🛠️ Technologies Used
- **React 19** with TypeScript
- **Framer Motion 12** for animations
- **Tailwind CSS 3** for styling
- **Lucide React** for icons (ChevronDown, Download, Mail, ArrowRight)

## 📁 File Structure
```
src/
├── components/
│   └── sections/
│       └── Hero.tsx          # Main Hero component
├── pages/
│   └── Home.tsx              # Home page with Hero integration
├── constants/
│   └── index.ts              # Personal info and constants
├── assets/
│   └── images/
│       └── Potrait.jpg       # Portrait image
└── index.css                 # Global styles with smooth scroll
```

## 🔧 Customization Guide

### Change Personal Information
Edit `/src/constants/index.ts`:
```typescript
export const PERSONAL_INFO = {
  name: 'Your Name',
  title: 'Your Title',
  company: 'Your Company',
  bio: 'Your bio text...',
  email: 'your.email@example.com',
  availability: 'Your availability status',
};
```

### Adjust Colors
Edit `/tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Customize primary color shades
  },
}
```

### Modify Animations
In `/src/components/sections/Hero.tsx`:
- Change duration values in `transition` props
- Adjust `animate` prop arrays for different motion paths
- Modify delay values for stagger effects

### Replace Portrait Image
Replace `/src/assets/images/Potrait.jpg` with your professional photo

### Update Button Links
Modify href values in the Hero component:
- `#projects` → Navigate to projects section
- `#contact` → Navigate to contact section
- `/cv.pdf` → Link to your CV file

## 🚀 Performance Optimizations
- **Reduced motion support** for accessibility
- **Optimized animations** using CSS transforms
- **Lazy image loading** (can be added with `loading="lazy"`)
- **Minimal re-renders** with proper React patterns
- **Efficient Framer Motion** usage with appropriate animation types

## 🎯 Next Steps
To further enhance the Hero section:
1. Add a video background option
2. Implement typewriter effect for tagline
3. Add social media links with hover animations
4. Create light mode variant
5. Add particle.js for more elaborate backgrounds
6. Implement parallax scrolling for background elements
7. Add achievement/stats counter animation
8. Create an animated background mesh gradient

## 📝 Notes
- The Hero section is fully integrated into the Home page
- Smooth scrolling works seamlessly across all sections
- All animations are performance-optimized
- The component is fully accessible and responsive
- Dark mode is the default theme

## 🐛 Troubleshooting

### Portrait image not showing
- Ensure the image path is correct in the import
- Check that Potrait.jpg exists in `/src/assets/images/`
- Verify image file permissions

### Animations not working
- Check that Framer Motion is installed: `npm install framer-motion`
- Verify no conflicting CSS that sets `animation: none`
- Check browser console for errors

### Scroll not smooth
- Ensure `scroll-behavior: smooth` is in index.css
- Check that section IDs match (`id="about"`)
- Verify no JavaScript errors preventing scroll

## 📄 License
This component is part of your personal portfolio project.
