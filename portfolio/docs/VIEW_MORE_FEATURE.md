# View More/View Less Feature - Implementation Notes

## 📱 Mobile Optimization Update

### What Changed
Added a "View More/View Less" feature specifically for mobile screens (< 768px) to improve initial load performance and user experience.

---

## ✨ Feature Details

### Initial Display (Mobile Only)
- **Shows:** First 3 projects
- **Behavior:** Users see a quick preview without overwhelming content
- **Performance:** Faster initial render, less scroll fatigue

### View More Button
- **Location:** Appears below the 3 visible projects
- **Design:** Gradient button matching the site theme
- **Icon:** ChevronDown icon
- **Animation:** Scale on hover (1.05×) and tap (0.95×)

### View Less Button
- **Location:** Appears at the bottom after expanding all projects
- **Design:** Outlined button with border
- **Icon:** ChevronUp icon
- **Behavior:** Scrolls back to top of projects section smoothly
- **Animation:** Same hover/tap effects

---

## 🎯 Implementation Logic

### Responsive Detection
```typescript
const [isMobile, setIsMobile] = useState<boolean>(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  return () => window.removeEventListener('resize', checkMobile);
}, []);
```

### Display Logic
```typescript
// Show only 3 projects on mobile when not expanded
const displayedProjects = isMobile && !showAll 
  ? filteredProjects.slice(0, 3) 
  : filteredProjects;

// Check if there are more than 3 projects to show button
const hasMoreProjects = isMobile && filteredProjects.length > 3;
```

### Category Reset
```typescript
// Reset expansion when user changes category
useEffect(() => {
  setShowAll(false);
}, [activeCategory]);
```

---

## 🎨 Button Styles

### View More Button
```tsx
className="flex items-center gap-2 px-8 py-4 
  bg-gradient-to-r from-primary-500 to-accent-purple 
  text-white font-semibold rounded-xl shadow-lg 
  hover:shadow-xl transition-all duration-300"
```

### View Less Button
```tsx
className="flex items-center gap-2 px-8 py-4 
  bg-white dark:bg-dark-card 
  text-primary-500 dark:text-primary-400 
  font-semibold rounded-xl shadow-lg hover:shadow-xl 
  transition-all duration-300 
  border-2 border-primary-500 dark:border-primary-400"
```

---

## 📱 User Experience Flow

### Scenario 1: Mobile User (9 projects)
1. Page loads → Sees 3 projects
2. Clicks "View More Projects" → Sees all 9 projects
3. Scrolls through projects
4. Clicks "View Less" → Collapses back to 3 projects + smooth scroll to top

### Scenario 2: Tablet/Desktop User
1. Page loads → Sees all projects in grid
2. No "View More/View Less" buttons appear
3. Standard grid layout (2 or 3 columns)

### Scenario 3: Category Filtering (Mobile)
1. User expands to see all Frontend projects
2. User switches to Backend category
3. View automatically resets to show first 3 Backend projects
4. "View More" button appears again if more than 3 exist

---

## 🎬 Animations

### Button Entrance
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.4, duration: 0.5 }}
```

### Button Interactions
```typescript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Smooth Scroll (View Less)
```typescript
const projectsSection = document.getElementById('projects');
if (projectsSection) {
  projectsSection.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start' 
  });
}
```

---

## 🔧 Technical Details

### State Management
- `showAll`: Controls expanded/collapsed state
- `isMobile`: Detects if viewport is mobile
- Auto-reset on category change

### Performance Benefits
- **Mobile:** Renders 3 cards initially (66% fewer DOM nodes)
- **Desktop:** No change (renders all projects)
- **Lazy loading:** Still applies to all images

### Breakpoint
- **Mobile:** < 768px (md breakpoint)
- **Tablet+:** ≥ 768px (no buttons, show all)

---

## ✅ Testing Checklist

- [ ] Mobile (< 768px): Only 3 projects show initially
- [ ] "View More" button appears on mobile when > 3 projects
- [ ] Clicking "View More" shows all projects
- [ ] "View Less" button appears after expanding
- [ ] Clicking "View Less" collapses and scrolls to top
- [ ] Changing category resets to 3 projects on mobile
- [ ] Tablet/Desktop: All projects show, no buttons
- [ ] Resizing window updates mobile detection
- [ ] Animations are smooth
- [ ] Dark mode styles work correctly

---

## 🎯 Edge Cases Handled

### Case 1: Exactly 3 Projects
- **Behavior:** No buttons appear (nothing to expand)
- **Logic:** `hasMoreProjects` is false

### Case 2: Less than 3 Projects
- **Behavior:** Shows all projects, no buttons
- **Logic:** Slice doesn't affect arrays < 3 items

### Case 3: Category with Few Projects
- **Behavior:** If Backend has only 2 projects, shows both
- **Logic:** Dynamic based on `filteredProjects.length`

### Case 4: Window Resize
- **Behavior:** Mobile → Desktop removes buttons
- **Logic:** Event listener updates `isMobile` state

---

## 🚀 Future Enhancements

Possible improvements:
- [ ] Customizable number (3, 6, or 9)
- [ ] "Load More" pagination instead of expand all
- [ ] Animation when expanding (fade in new cards)
- [ ] Remember user preference (localStorage)
- [ ] Add count indicator: "Showing 3 of 9 projects"

---

## 📊 Impact

### Before
- Mobile users see all 9 projects immediately
- Long scroll on mobile devices
- Higher initial render time

### After
- Mobile users see 3 projects first
- Cleaner, less overwhelming interface
- Faster initial page load
- User controls content visibility
- Better mobile UX

---

## 💡 Pro Tips

1. **Optimal Count:** 3 projects is ideal for mobile preview
2. **Smooth Scroll:** Essential for good UX when collapsing
3. **Category Reset:** Prevents confusion when switching filters
4. **Button Visibility:** Only show when needed (> 3 projects)
5. **Desktop Unchanged:** Don't limit desktop users

---

**Implementation Complete! ✅**

The View More/View Less feature is now active on mobile devices, providing a better user experience without affecting desktop layouts.
