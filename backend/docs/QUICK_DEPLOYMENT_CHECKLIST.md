# ⚡ Quick Deployment Checklist

Use this checklist to deploy your portfolio stack in ~30 minutes.

---

## 🗂️ Pre-Deployment

- [ ] Code pushed to GitHub
- [ ] `.env` is in `.gitignore`
- [ ] Frontend already deployed to Vercel ✅
- [ ] Have strong passwords ready

---

## 📊 Step 1: Supabase (10 mins)

- [ ] Create account at [supabase.com](https://supabase.com)
- [ ] Create new project (`portfolio-database`)
- [ ] **Save database password securely** 🔒
- [ ] Copy **pooler connection string** from Settings → Database
- [ ] Run `backend/database/schema.sql` in SQL Editor
- [ ] Verify tables created:
  ```sql
  SELECT tablename FROM pg_tables WHERE schemaname = 'public';
  ```

**Connection String Format:**
```
postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

---

## 🚀 Step 2: Render Backend (15 mins)

- [ ] Create account at [render.com](https://render.com)
- [ ] Connect GitHub account
- [ ] Create new Web Service
- [ ] Select `PERSONAL_PORTIFOLIO` repository
- [ ] Configure:
  - **Root Directory**: `backend`
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`

### Environment Variables:
```bash
NODE_ENV=production
DATABASE_URL=[SUPABASE_POOLER_URL]
JWT_SECRET=[32-char-random-string]
SESSION_SECRET=[32-char-random-string]
FRONTEND_URL=https://[your-vercel-domain].vercel.app
BACKEND_URL=https://[your-render-service].onrender.com
EMAIL_USER=[your-email]
EMAIL_PASS=[app-password]
EMAIL_FROM=[your-email]
EMAIL_TO=[your-email]
CORS_ORIGINS=https://[your-vercel-domain].vercel.app
```

- [ ] Generate secrets:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (~5-10 mins)
- [ ] Copy your Render URL

---

## 🎨 Step 3: Update Vercel Frontend (5 mins)

- [ ] Go to Vercel Dashboard
- [ ] Select your portfolio project
- [ ] Settings → Environment Variables
- [ ] Add variables:
  ```bash
  VITE_API_URL=https://[your-render-service].onrender.com
  VITE_BACKEND_URL=https://[your-render-service].onrender.com
  VITE_API_BASE_URL=https://[your-render-service].onrender.com/api
  VITE_NODE_ENV=production
  ```
- [ ] Redeploy frontend

---

## 🔐 Step 4: Create Admin User (2 mins)

- [ ] Go to Render Dashboard → Your Service → Shell
- [ ] Run: `node setup-super-admin.js`
- [ ] Follow prompts to create admin account
- [ ] **Save credentials securely** 🔒

---

## ✅ Step 5: Test Everything (5 mins)

### Backend Health:
```bash
curl https://[your-render-service].onrender.com/health
```
Expected: `{"status":"ok",...}`

### Contact Form:
- [ ] Visit your Vercel site
- [ ] Submit test contact form
- [ ] Check Supabase → Table Editor → `contacts` table
- [ ] Verify entry appears

### Admin Panel:
- [ ] Visit `https://[your-vercel-domain].vercel.app/admin/login`
- [ ] Login with admin credentials
- [ ] Verify dashboard loads
- [ ] Check if test contact appears

### CORS:
- [ ] Open browser DevTools → Network tab
- [ ] Submit contact form
- [ ] Verify no CORS errors

---

## 🎯 Post-Deployment (Optional)

- [ ] Set up custom domain in Vercel
- [ ] Configure email SMTP settings
- [ ] Enable Supabase backups (Settings → Database → Backups)
- [ ] Set up UptimeRobot to keep Render awake
- [ ] Add monitoring/analytics
- [ ] Update documentation with your URLs

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Check Render logs, verify build succeeded |
| CORS Error | Verify FRONTEND_URL in Render matches Vercel URL exactly |
| Can't connect to DB | Check DATABASE_URL format, use pooler connection string |
| Tables don't exist | Run schema.sql in Supabase SQL Editor |
| Admin login fails | Verify admin user created, check email/password |
| Render service sleeping | Free tier sleeps after 15min, upgrade or use keep-alive |

---

## 📝 Important URLs to Save

```
Frontend:     https://[your-portfolio].vercel.app
Backend:      https://[your-service].onrender.com
Admin Panel:  https://[your-portfolio].vercel.app/admin
Supabase DB:  https://supabase.com/dashboard/project/[project-id]
Render Dash:  https://dashboard.render.com
```

---

## 🔑 Credentials to Save Securely

- [ ] Supabase database password
- [ ] Admin email and password
- [ ] JWT_SECRET
- [ ] SESSION_SECRET
- [ ] Email app password

**Store these in a password manager!** 🔐

---

## ⏱️ Total Time: ~30-40 minutes

✨ **You're Done!** Your portfolio is now live with:
- Frontend on Vercel (Already done ✅)
- Backend on Render (Just deployed ✅)
- Database on Supabase (Just configured ✅)

---

## 📞 Need Help?

Refer to the full guide: `SUPABASE_RENDER_DEPLOYMENT_GUIDE.md`
