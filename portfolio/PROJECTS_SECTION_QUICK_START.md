# Projects Section - Quick Start Guide

## ⚡ Quick Setup (5 Minutes)

### 1. Install Dependencies (if needed)
```bash
npm install framer-motion lucide-react
```

### 2. Files Created
The following files have been created for you:

```
✅ src/pages/Projects.tsx              - Main projects page
✅ src/components/ui/ProjectCard.tsx   - Project card component
✅ src/components/ui/CategoryFilter.tsx - Category filter tabs
✅ src/constants/index.ts              - Project data (updated)
✅ src/types/index.ts                  - TypeScript types (updated)
```

### 3. Verify Images
Make sure your project images are in the correct location:

```
src/assets/images/
├── project1 GREEN STORE.png
├── project 2 AI Health companion.png
├── project 3 SolutionHub.png
├── project 4 ForAuth.png
├── project 5 Taskify.png
├── project 6 EVENT_MANAGEMENT_SYSTEM.png
├── project 7 RESUME-MAKER.png
├── project 8 Conten Guard.png
└── project 9 CHAT APP.png
```

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Navigate to Projects
Open your browser and go to:
```
http://localhost:5173/projects
```

---

## 🎨 Customization Checklist

### Update Project Links
Edit `/src/constants/index.ts` and replace placeholder URLs:

```typescript
// Change these for each project:
githubUrl: 'https://github.com/wallacetrixie/YOUR-REPO',
liveUrl: 'https://your-live-site.com',
demoUrl: 'https://your-demo.com',
```

### Update Images
If you want to use different images:

1. Add images to `/src/assets/images/`
2. Update the `image` property in `PROJECTS` array
3. Use format: `/src/assets/images/your-image.png`

### Customize Colors
Main gradient (Title, Featured Badge, CTA):
```tsx
// Current: Blue to Purple
className="bg-gradient-to-r from-primary-500 to-accent-purple"

// Change to your colors:
className="bg-gradient-to-r from-blue-500 to-pink-500"
```

---

## 🧪 Testing Checklist

After setup, test these features:

- [ ] All 9 projects display correctly
- [ ] Images load properly
- [ ] Category filter works (All, Frontend, Backend)
- [ ] Hover effects work on cards
- [ ] Action buttons (View Live, GitHub, Demo) appear on hover
- [ ] Links open in new tabs
- [ ] Responsive layout (mobile, tablet, desktop)
- [ ] **Mobile: Only 3 projects show initially with "View More" button**
- [ ] **Mobile: "View Less" button appears after expanding**
- [ ] **Mobile: Smooth scroll to top when clicking "View Less"**
- [ ] Dark mode toggle works
- [ ] Animations are smooth (60fps)
- [ ] Stats section shows correct counts

---

## 📱 Responsive Breakpoints

The layout automatically adjusts:

- **Mobile** (< 768px): 1 column + **View More/View Less buttons** (shows 3 projects initially)
- **Tablet** (768px - 1024px): 2 columns (shows all projects)
- **Desktop** (> 1024px): 3 columns (shows all projects)

Test by resizing your browser window.

### 📱 New Mobile Feature: View More/View Less
- On mobile devices, only **3 projects** are shown initially
- Click **"View More Projects"** to see all projects
- Click **"View Less"** to collapse back to 3 projects
- Automatically resets when switching categories
- Desktop and tablet users see all projects by default

---

## 🐛 Common Issues & Fixes

### Issue: Images not showing
**Fix:** Check the image paths in `/src/constants/index.ts`. They should match your actual file names.

### Issue: Animations laggy
**Fix:** Make sure you're using optimized images (< 500KB each). Convert to WebP if possible.

### Issue: Category filter not working
**Fix:** Ensure you're importing `PROJECT_CATEGORIES` from constants and passing it to `CategoryFilter`.

### Issue: Dark mode colors wrong
**Fix:** Check your Tailwind config has dark mode enabled and proper color definitions.

---

## 🚀 Next Steps

### Add Real Project Data
1. Open `/src/constants/index.ts`
2. Update the `PROJECTS` array with your actual project information
3. Replace placeholder URLs with real links

### Optimize Images
```bash
# Install image optimizer (optional)
npm install -g sharp-cli

# Optimize images
npx sharp -i src/assets/images/*.png -o src/assets/images/optimized/ --format webp
```

### Add More Projects
Just add new entries to the `PROJECTS` array:

```typescript
{
  id: '10',
  title: 'New Project',
  description: 'Description here',
  technologies: ['Tech1', 'Tech2'],
  category: 'frontend',
  image: '/src/assets/images/new-project.png',
  githubUrl: 'https://github.com/...',
  featured: false,
}
```

The category counts will update automatically!

---

## 💡 Pro Tips

1. **Featured Projects**: Set `featured: true` for your best 2-3 projects
2. **Tech Stack**: Limit to 5-6 technologies per project for clean display
3. **Descriptions**: Keep under 150 characters for consistent card heights
4. **High-Quality Images**: Use 1920x1080 screenshots, they'll be auto-scaled
5. **Loading Performance**: Use WebP format for 30% smaller file sizes

---

## 🎯 Feature Highlights

### What Works Out of the Box
- ✅ Smooth scroll animations
- ✅ Hover overlay with tech stack
- ✅ Category filtering with counts
- ✅ Featured project badges
- ✅ Responsive grid layout
- ✅ Dark mode support
- ✅ Action buttons (Live, Demo, GitHub)
- ✅ Stats section
- ✅ Call-to-action section
- ✅ Empty state handling
- ✅ Lazy image loading

---

## 📚 Learn More

- Full documentation: `PROJECTS_SECTION_DOCUMENTATION.md`
- Framer Motion docs: https://www.framer.com/motion/
- Tailwind CSS docs: https://tailwindcss.com/docs

---

## 🆘 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify all files are created correctly
3. Ensure dependencies are installed
4. Check image paths match your files
5. Review the documentation file

---

**That's it! Your projects section is ready to showcase your work! 🎉**
