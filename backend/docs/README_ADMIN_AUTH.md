# Admin Authentication System - Setup Guide

## 🎯 Overview

This guide will help you set up the secure admin authentication system for your portfolio. The system includes:

- **Secure Login Page**: Beautiful, responsive admin login interface
- **JWT Authentication**: Token-based authentication with HTTP-only cookies
- **Session Management**: Database-backed session tracking
- **Protected Routes**: Automatic route protection for admin areas
- **Brute Force Protection**: Rate limiting and account lockout
- **Admin Dashboard**: Modern dashboard with theme toggle

---

## 📋 Prerequisites

- Node.js installed (v14 or higher)
- MySQL database running
- Backend and frontend development servers

---

## 🚀 Quick Start

### Step 1: Update Database Schema

Run the database initialization to create admin tables:

```bash
cd backend
npm run init-db
```

This creates:
- `admin_users` table - Stores admin credentials and security info
- `admin_sessions` table - Tracks active sessions

### Step 2: Configure Environment Variables

Create/update your `.env` file in the `backend` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
DB_PORT=3306

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# JWT Authentication (REQUIRED - Generate secure secrets!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Session Configuration (REQUIRED)
SESSION_SECRET=your_super_secret_session_key_change_this_too
# Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**⚠️ IMPORTANT:** Generate secure random secrets for production!

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 3: Create Frontend Environment File

Create/update `.env` file in the `portfolio` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000
```

### Step 4: Create Admin User

Run the interactive admin creation script:

```bash
cd backend
npm run create-admin
```

Follow the prompts to create your first admin user:
- Email address
- Password (min 8 characters)
- Username (min 3 characters)
- Full name
- Role (super_admin, admin, or moderator)

### Step 5: Start the Servers

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd portfolio
npm run dev
```

### Step 6: Access Admin Panel

1. Navigate to: `http://localhost:5173/admin/login`
2. Enter your admin credentials
3. You'll be redirected to the dashboard on successful login

---

## 🔒 Security Features

### 1. Password Security
- Passwords hashed with bcrypt (12 rounds)
- Minimum 8 characters required
- Never stored in plain text

### 2. Brute Force Protection
- Max 5 failed login attempts
- 15-minute account lockout after 5 failures
- Rate limiting on login endpoint (5 requests per 15 min)

### 3. Session Security
- JWT tokens with expiration
- HTTP-only cookies (not accessible via JavaScript)
- Database-backed session validation
- Automatic cleanup of expired sessions

### 4. API Security
- Rate limiting on all auth endpoints
- CORS protection
- Helmet security headers
- Input validation and sanitization

---

## 📁 File Structure

```
backend/
├── config/
│   ├── create-admin.js       # Admin user creation script
│   ├── database.js            # Database connection
│   └── init-database.js       # Database initialization
├── controllers/
│   └── authController.js      # Authentication logic
├── middleware/
│   ├── auth.js                # JWT verification middleware
│   └── validation.js          # Input validation
├── models/
│   └── Admin.js               # Admin user model
├── routes/
│   └── auth.js                # Authentication routes
└── database/
    └── schema.sql             # Database schema

portfolio/src/
├── components/
│   └── ProtectedRoute.tsx     # Route protection component
├── contexts/
│   └── AuthContext.tsx        # Authentication context
└── pages/
    ├── AdminLogin.tsx         # Login page
    └── AdminDashboard.tsx     # Admin dashboard
```

---

## 🛣️ API Endpoints

### Authentication

#### POST `/api/auth/login`
Login with email and password
```json
{
  "email": "admin@example.com",
  "password": "yourpassword",
  "rememberMe": false
}
```

#### POST `/api/auth/logout`
Logout current admin (requires authentication)

#### GET `/api/auth/verify`
Verify current token validity (requires authentication)

#### GET `/api/auth/me`
Get current admin profile (requires authentication)

#### POST `/api/auth/refresh`
Refresh authentication token (requires authentication)

---

## 🎨 Admin Pages

### Login Page (`/admin/login`)
- Email/password form
- Remember me option
- Show/hide password toggle
- Error message display
- Smooth animations
- Dark/Light theme support
- Back to portfolio link

### Dashboard (`/admin/dashboard`)
- Welcome message
- Statistics cards
- Quick action buttons
- Admin info display
- Theme toggle
- Logout button
- Future: Contact messages, Project management

---

## 🔧 Common Commands

```bash
# Backend
npm run init-db          # Initialize database
npm run create-admin     # Create admin user
npm run dev              # Start dev server
npm start                # Start production server

# Frontend
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
```

---

## 🐛 Troubleshooting

### Database Connection Failed
1. Ensure MySQL is running
2. Check .env credentials
3. Verify database exists: `npm run init-db`

### Login Not Working
1. Verify backend server is running
2. Check VITE_API_URL in frontend .env
3. Clear browser cookies/localStorage
4. Check browser console for errors

### Token Expired Messages
1. This is normal after 24 hours (or 30 days with "Remember Me")
2. Simply login again
3. Token duration can be adjusted in `authController.js`

### Account Locked
- Wait 15 minutes after 5 failed attempts
- Or manually unlock via database:
```sql
UPDATE admin_users 
SET failed_login_attempts = 0, account_locked_until = NULL 
WHERE email = 'your@email.com';
```

---

## 🚀 Production Deployment

### Backend

1. **Set Environment Variables:**
   - Generate new JWT_SECRET and SESSION_SECRET
   - Set NODE_ENV=production
   - Update FRONTEND_URL to production URL
   - Use environment variables, don't commit .env

2. **Enable HTTPS:**
   - Cookies require HTTPS in production
   - Use reverse proxy (nginx/Apache)
   - Configure SSL certificate

3. **Database Security:**
   - Use strong database passwords
   - Restrict database access
   - Enable SSL for database connections

### Frontend

1. **Build Production Bundle:**
```bash
npm run build
```

2. **Set API URL:**
   - Update VITE_API_URL to production backend URL

3. **Deploy:**
   - Upload `dist` folder to hosting
   - Configure routing for SPA

---

## 📝 Additional Notes

### Creating More Admins
Run `npm run create-admin` as many times as needed.

### Admin Roles
- **super_admin**: Full system access (future features)
- **admin**: Standard administrative access
- **moderator**: Limited access for content moderation

### Password Reset
Currently shows "coming soon" message. To implement:
1. Add email service configuration
2. Generate reset tokens
3. Create reset password page
4. Update authController with reset logic

---

## 🆘 Support

For issues or questions:
1. Check console logs (browser & server)
2. Verify environment variables
3. Ensure all dependencies are installed
4. Check database connection

---

## 📄 License

MIT License - Feel free to use and modify for your projects.

---

**Created with ❤️ for Wallace's Portfolio**
