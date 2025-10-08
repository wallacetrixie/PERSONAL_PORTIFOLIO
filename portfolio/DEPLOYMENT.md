# Deploying to Vercel

This guide will help you deploy your portfolio to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free)
- Your portfolio code pushed to GitHub, GitLab, or Bitbucket

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import your project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it as a Vite project

3. **Configure the project**
   - **Framework Preset**: Vite
   - **Root Directory**: `portfolio`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Environment Variables** (if needed)
   - No environment variables are required since there's no backend
   - If you add them later, go to Project Settings → Environment Variables

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your site
   - You'll get a live URL like `https://your-portfolio.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to your portfolio directory**
   ```bash
   cd portfolio
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   
   For production deployment:
   ```bash
   vercel --prod
   ```

## Configuration Files

The following files have been configured for Vercel deployment:

### `vercel.json`
- Configures SPA routing (all routes redirect to index.html)
- Sets up caching headers for optimal performance
- Adds security headers

### `.env.production`
- Production environment variables
- No backend API URL since there's no backend

### `.gitignore`
- Excludes Vercel-specific files from version control

## Post-Deployment

### Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain and follow DNS setup instructions

### Automatic Deployments
- Every push to your `main` branch will trigger a new deployment
- Preview deployments are created for pull requests

### Build Logs
- View build logs in the Vercel dashboard
- Troubleshoot any deployment issues

## Project Structure

```
portfolio/
├── src/                 # Source code
├── public/              # Static assets
├── dist/                # Build output (auto-generated)
├── vercel.json          # Vercel configuration
├── .env.production      # Production environment variables
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Important Notes

1. **No Backend**: This is a frontend-only deployment. The admin features require a backend API to function.

2. **Admin Routes**: The admin login and dashboard routes are included but won't work without a backend API. Consider:
   - Removing admin routes if not needed
   - Deploying a separate backend API
   - Using a headless CMS or serverless functions

3. **Image Optimization**: Images in `src/assets/images/` are automatically optimized during build

4. **Performance**: The site uses:
   - Code splitting for optimal load times
   - Asset caching for faster subsequent visits
   - Lazy loading for images

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Test build locally: `npm run build`

### 404 Errors on Refresh
- This is handled by `vercel.json` rewrites
- All routes redirect to `index.html` for client-side routing

### Environment Variables Not Working
- Ensure variables are prefixed with `VITE_`
- Add them in Vercel Project Settings → Environment Variables
- Redeploy after adding variables

## Useful Commands

```bash
# Test production build locally
npm run build
npm run preview

# Check for TypeScript errors
npm run type-check

# Run linter
npm run lint

# Format code
npm run format
```

## Support

For Vercel-specific issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Your Project Dashboard](https://vercel.com/dashboard)

## Next Steps

After deployment:
1. ✅ Test all pages and routes
2. ✅ Verify images load correctly
3. ✅ Check responsive design on mobile devices
4. ✅ Test performance with Lighthouse
5. ✅ Set up analytics (optional)
6. ✅ Add custom domain (optional)

---

**Happy Deploying! 🚀**
