# 🚀 Admin Login System - Quick Reference

## ⚡ Installation (One-Time Setup)

```bash
# 1. Install dependencies (already done)
cd backend && npm install

# 2. Add to .env file:
JWT_SECRET=your_generated_secret_here
SESSION_SECRET=your_generated_secret_here

# Generate secrets:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# 3. Initialize database
npm run init-db

# 4. Create first admin
npm run create-admin
```

## 🎯 Usage

### Login
- URL: `http://localhost:5173/admin/login`
- Use credentials created with `npm run create-admin`

### Protected Routes
All routes under `/admin/*` (except `/admin/login`) require authentication.

## 🔐 Security Features

✅ Bcrypt password hashing (12 rounds)  
✅ JWT tokens with HTTP-only cookies  
✅ Rate limiting (5 login attempts per 15 min)  
✅ Account lockout after 5 failed attempts  
✅ Session tracking in database  
✅ Input validation & sanitization  
✅ CORS protection  
✅ XSS protection  

## 📍 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | ❌ | Admin login |
| POST | `/api/auth/logout` | ✅ | Logout admin |
| GET | `/api/auth/verify` | ✅ | Verify token |
| GET | `/api/auth/me` | ✅ | Get admin profile |
| POST | `/api/auth/refresh` | ✅ | Refresh token |

## 🎨 Pages

- **Login:** `/admin/login` - Secure login page
- **Dashboard:** `/admin/dashboard` - Admin control panel

## 🛠️ Commands

```bash
# Backend
npm run dev              # Start dev server
npm run create-admin     # Create new admin user
npm run init-db          # Initialize/update database

# Frontend (in portfolio directory)
npm run dev              # Start frontend dev server
```

## 🐛 Quick Fixes

**Can't login?**
- Check backend is running on port 5000
- Verify .env has JWT_SECRET
- Clear browser cookies/localStorage

**Account locked?**
- Wait 15 minutes OR
- Reset: `UPDATE admin_users SET failed_login_attempts=0, account_locked_until=NULL WHERE email='your@email.com';`

**Database error?**
- Run: `npm run init-db`

## 📦 What Was Created

### Backend Files
- `models/Admin.js` - Admin user model & methods
- `controllers/authController.js` - Login/logout logic
- `middleware/auth.js` - JWT verification
- `routes/auth.js` - Auth endpoints
- `config/create-admin.js` - Admin creation script
- Database tables: `admin_users`, `admin_sessions`

### Frontend Files
- `pages/AdminLogin.tsx` - Beautiful login page
- `pages/AdminDashboard.tsx` - Admin dashboard
- `contexts/AuthContext.tsx` - Auth state management
- `components/ProtectedRoute.tsx` - Route protection

## 🎭 Features

✨ Smooth fade-in animations  
✨ Dark/Light theme toggle  
✨ Show/hide password  
✨ Remember me (30 days vs 24 hours)  
✨ Error shake animation  
✨ Loading states  
✨ Responsive design  
✨ Glass morphism effects  
✨ Gradient accents  

## 💡 Next Steps

1. Run `npm run create-admin` to create your admin account
2. Visit `http://localhost:5173/admin/login`
3. Login with your credentials
4. Explore the dashboard!

Future enhancements:
- View contact messages
- Manage projects
- Analytics
- Password reset via email
- 2FA authentication
- Audit logs

---

**Need help?** Check `README_ADMIN_AUTH.md` for detailed documentation.
