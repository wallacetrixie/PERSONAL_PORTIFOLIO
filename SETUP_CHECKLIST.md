# ✅ Admin Login System - Setup Checklist

Follow these steps in order to get your admin authentication system working:

## 📦 Step 1: Backend Environment Setup

- [ ] Navigate to `backend` directory
- [ ] Copy `.env.example` to `.env` (if not already done)
- [ ] Update database credentials in `.env`:
  - [ ] `DB_USER`
  - [ ] `DB_PASSWORD`
  - [ ] `DB_NAME`
- [ ] Generate and add security secrets to `.env`:
  ```bash
  # Run this command twice to generate JWT_SECRET and SESSION_SECRET
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
  - [ ] Add `JWT_SECRET=<generated_secret_1>` to `.env`
  - [ ] Add `SESSION_SECRET=<generated_secret_2>` to `.env`

## 🗄️ Step 2: Database Initialization

- [ ] Ensure MySQL is running
- [ ] Run database initialization:
  ```bash
  cd backend
  npm run init-db
  ```
- [ ] Verify tables created: `admin_users`, `admin_sessions`, `contacts`

## 👤 Step 3: Create Admin User

- [ ] Run the admin creation script:
  ```bash
  cd backend
  npm run create-admin
  ```
- [ ] Follow the prompts:
  - [ ] Enter email address
  - [ ] Enter password (min 8 characters)
  - [ ] Confirm password
  - [ ] Enter username
  - [ ] Enter full name
  - [ ] Select role (1=super_admin, 2=admin, 3=moderator)
  - [ ] Confirm creation
- [ ] Note down your credentials securely!

## 🎨 Step 4: Frontend Environment Setup

- [ ] Navigate to `portfolio` directory
- [ ] Ensure `.env` exists with:
  ```
  VITE_API_URL=http://localhost:5000
  ```
- [ ] If different port, update accordingly

## 🚀 Step 5: Start Servers

Backend:
- [ ] Open terminal in `backend` directory
- [ ] Run: `npm run dev`
- [ ] Verify: "Server is running!" message appears
- [ ] Verify: "MySQL Database connected successfully"

Frontend:
- [ ] Open another terminal in `portfolio` directory
- [ ] Run: `npm run dev`
- [ ] Note the local URL (usually `http://localhost:5173`)

## 🧪 Step 6: Test Admin Login

- [ ] Open browser to: `http://localhost:5173/admin/login`
- [ ] Verify login page loads with:
  - [ ] Email field
  - [ ] Password field
  - [ ] Remember me checkbox
  - [ ] Login button
  - [ ] Smooth animations
- [ ] Enter your admin credentials
- [ ] Click "Login"
- [ ] Verify redirect to `/admin/dashboard`
- [ ] Verify dashboard displays:
  - [ ] Welcome message with your name
  - [ ] Statistics cards
  - [ ] Quick action buttons
  - [ ] Admin info card
  - [ ] Theme toggle button
  - [ ] Logout button

## 🔒 Step 7: Test Security Features

- [ ] Test wrong password:
  - [ ] Enter correct email, wrong password
  - [ ] Verify error message shows
  - [ ] Verify remaining attempts shown
- [ ] Test account lockout (optional):
  - [ ] Try wrong password 5 times
  - [ ] Verify "Account locked" message
  - [ ] Wait 15 minutes or reset in database
- [ ] Test protected routes:
  - [ ] Without logging in, try visiting: `http://localhost:5173/admin/dashboard`
  - [ ] Verify redirect to login page
- [ ] Test logout:
  - [ ] Login successfully
  - [ ] Click logout button
  - [ ] Verify redirect to login page
  - [ ] Try accessing `/admin/dashboard` again
  - [ ] Verify redirect to login (session cleared)

## 🎭 Step 8: Test Features

- [ ] Test theme toggle:
  - [ ] Login to dashboard
  - [ ] Click sun/moon icon
  - [ ] Verify theme switches
  - [ ] Verify preference persists on refresh
- [ ] Test "Remember Me":
  - [ ] Login with "Remember me" checked
  - [ ] Close browser completely
  - [ ] Reopen and visit dashboard
  - [ ] Verify still logged in (30-day token)
- [ ] Test "Back to Portfolio":
  - [ ] Click "Back to Portfolio" link
  - [ ] Verify navigates to home page

## 🐛 Troubleshooting

If something doesn't work:

### Backend won't start:
- [ ] Check MySQL is running
- [ ] Verify `.env` file exists with correct values
- [ ] Check port 5000 is not in use
- [ ] Run `npm install` to ensure dependencies

### Frontend won't start:
- [ ] Check port 5173 is not in use
- [ ] Run `npm install` to ensure dependencies
- [ ] Verify `VITE_API_URL` in `.env`

### Can't login:
- [ ] Check backend console for errors
- [ ] Check browser console for errors
- [ ] Verify backend is running on port 5000
- [ ] Verify CORS configuration
- [ ] Clear browser cookies/localStorage
- [ ] Try creating admin user again

### Database errors:
- [ ] Run `npm run init-db` again
- [ ] Check MySQL credentials
- [ ] Verify database exists

### "Network Error":
- [ ] Ensure backend is running
- [ ] Check `VITE_API_URL` matches backend URL
- [ ] Check firewall settings

## ✨ Optional Enhancements

Future improvements you can add:

- [ ] View and manage contact form submissions
- [ ] Add/edit/delete portfolio projects
- [ ] Analytics and statistics
- [ ] Password reset via email
- [ ] Two-factor authentication (2FA)
- [ ] Admin activity logs
- [ ] Multiple admin users management
- [ ] Email notifications
- [ ] File upload for projects

## 📚 Documentation

Refer to these files for more information:

- `backend/ADMIN_QUICK_START.md` - Quick reference
- `backend/README_ADMIN_AUTH.md` - Detailed documentation
- Backend API endpoints at: `http://localhost:5000/`

## 🎉 Success!

If all checkboxes are checked, congratulations! Your admin authentication system is fully set up and ready to use.

**Default Routes:**
- Admin Login: `http://localhost:5173/admin/login`
- Admin Dashboard: `http://localhost:5173/admin/dashboard`
- Portfolio Home: `http://localhost:5173/`

**Next Steps:**
1. Bookmark your admin login page
2. Store credentials securely (password manager recommended)
3. In production, use HTTPS and update environment variables
4. Consider adding 2FA for extra security

---

**Need Help?** Check the troubleshooting section or review the detailed documentation.
