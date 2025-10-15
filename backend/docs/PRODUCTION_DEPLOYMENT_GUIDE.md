# 🚀 Production Deployment Guide: Render + PlanetScale

## Complete Guide to Deploy Your Portfolio Backend & Database

This guide walks you through deploying your Node.js/Express backend to **Render** (free tier) and MySQL database to **PlanetScale** (free tier), then connecting them to your live frontend.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Part 1: Deploy MySQL Database on PlanetScale](#part-1-deploy-mysql-database-on-planetscale)
3. [Part 2: Deploy Backend on Render](#part-2-deploy-backend-on-render)
4. [Part 3: Connect Frontend to Backend](#part-3-connect-frontend-to-backend)
5. [Part 4: Testing & Verification](#part-4-testing--verification)
6. [Part 5: Maintenance & Monitoring](#part-5-maintenance--monitoring)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### What You Need:
- ✅ GitHub account (to connect with Render & PlanetScale)
- ✅ Your backend code pushed to GitHub repository
- ✅ Gmail account (for sending contact form emails)
- ✅ No credit card required for free tiers!
- ✅ Live frontend URL (e.g., your Vercel deployment)

### Prepare Your Repository:
```bash
# Make sure your backend is committed and pushed
cd backend
git add .
git commit -m "Prepare backend for production deployment"
git push origin main
```

---

## Part 1: Deploy MySQL Database on PlanetScale

### Why PlanetScale?

PlanetScale is a MySQL-compatible serverless database platform built on Vitess (YouTube's database). Benefits:
- ✅ **Generous free tier** - 5GB storage, 1 billion row reads/month, 10 million row writes/month
- ✅ **No credit card required** for Hobby (free) plan
- ✅ **Automatic backups** and point-in-time recovery
- ✅ **Branching** - Create database branches like Git
- ✅ **Zero-downtime schema changes**
- ✅ **Built-in connection pooling**
- ✅ **Global edge network** for low latency
- ✅ **Web-based SQL console**

### Step 1.1: Create PlanetScale Account

1. Go to [PlanetScale.com](https://planetscale.com/)
2. Click **"Sign up"** or **"Get Started"**
3. Sign up with one of these methods:
   - GitHub (recommended)
   - Email
   - Google
4. Verify your email address if using email signup

### Step 1.2: Create Your First Database

1. **After login, you'll see the dashboard**
   - Click **"Create a database"** or **"New database"**

2. **Configure database settings:**
   - **Name:** `portfolio-db` (or your preferred name, lowercase, hyphens allowed)
   - **Region:** Choose closest to your users and Render backend:
     - `US East (Northern Virginia)` - For US East Coast
     - `US West (Oregon)` - For US West Coast
     - `EU West (Dublin)` - For Europe
     - `Asia (Mumbai)` - For Asia
   - **Plan:** Select **"Hobby"** (Free tier)

3. **Click "Create database"**
   - PlanetScale will provision your database (~30 seconds)
   - You'll see a confirmation screen

### Step 1.3: Initialize Your Database Branch

PlanetScale uses branches (like Git) for database schemas. By default, you get a `main` branch.

1. **Click on your database** (portfolio-db)
2. **Go to "Console" tab** (web-based SQL editor)
3. **Select branch:** `main` (default)

### Step 1.4: Create Database Tables

**Important:** PlanetScale doesn't support some MySQL features like:
- ❌ `CREATE DATABASE` statements (database already exists)
- ❌ Foreign key constraints (handled at application level)
- ❌ `USE database;` statements (already connected)

We need to modify your schema for PlanetScale compatibility.

**Option A: Use PlanetScale Console** (Recommended)

1. In PlanetScale Console, copy and paste this **modified schema**:

```sql
-- ============================================================
-- CONTACTS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS contacts (
  -- Primary Key
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for each contact submission',
  
  -- Contact Information
  name VARCHAR(100) NOT NULL COMMENT 'Full name of the person contacting (2-100 characters)',
  email VARCHAR(255) NOT NULL COMMENT 'Email address for correspondence',
  subject VARCHAR(200) NOT NULL COMMENT 'Brief subject of the message (5-200 characters)',
  message TEXT NOT NULL COMMENT 'Detailed message content (10-1000 characters)',
  
  -- Metadata
  ip_address VARCHAR(45) DEFAULT NULL COMMENT 'IP address of the submitter (supports IPv4 and IPv6)',
  user_agent TEXT DEFAULT NULL COMMENT 'Browser/device information',
  status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new' COMMENT 'Processing status of the message',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'When the message was submitted',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'When the record was last modified',
  read_at TIMESTAMP NULL DEFAULT NULL COMMENT 'When the message was first read',
  
  -- Indexes for Performance
  INDEX idx_email (email) COMMENT 'Fast lookup by email address',
  INDEX idx_created_at (created_at DESC) COMMENT 'Chronological sorting and filtering',
  INDEX idx_status (status) COMMENT 'Filter by processing status',
  INDEX idx_status_created (status, created_at DESC) COMMENT 'Combined status and date filtering'
  
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci 
  COMMENT='Contact form submissions from portfolio visitors';
```

2. Click **"Execute"** or press **Ctrl+Enter**
3. You should see: ✅ "Query executed successfully"

4. Now create the admin users table:

```sql
-- ============================================================
-- ADMIN USERS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_users (
  -- Primary Key
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for admin user',
  
  -- Authentication Credentials
  email VARCHAR(255) NOT NULL UNIQUE COMMENT 'Admin email address for login',
  password_hash VARCHAR(255) NOT NULL COMMENT 'Bcrypt hashed password',
  username VARCHAR(50) NOT NULL UNIQUE COMMENT 'Admin username',
  
  -- Profile Information
  full_name VARCHAR(100) NOT NULL COMMENT 'Full name of the admin',
  
  -- Role and Permissions
  role ENUM('super_admin', 'admin', 'moderator') DEFAULT 'admin' COMMENT 'Admin role level',
  
  -- Account Status
  is_active BOOLEAN DEFAULT TRUE COMMENT 'Whether account is active',
  
  -- Security
  last_login_at TIMESTAMP NULL DEFAULT NULL COMMENT 'Last successful login timestamp',
  failed_login_attempts INT UNSIGNED DEFAULT 0 COMMENT 'Count of consecutive failed logins',
  locked_until TIMESTAMP NULL DEFAULT NULL COMMENT 'Account locked until this time',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'When the admin account was created',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'When the record was last modified',
  
  -- Indexes
  INDEX idx_email (email) COMMENT 'Fast lookup by email',
  INDEX idx_username (username) COMMENT 'Fast lookup by username',
  INDEX idx_last_login (last_login_at DESC) COMMENT 'Track login activity'
  
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci 
  COMMENT='Admin users for authentication and access control';
```

5. Click **"Execute"** again
6. Verify both tables exist: Go to **"Schema"** tab and you should see `contacts` and `admin_users`

**Option B: Use PlanetScale CLI** (For advanced users)

```bash
# Install PlanetScale CLI
brew install planetscale/tap/pscale         # macOS
scoop install pscale                        # Windows
# Or download from: https://github.com/planetscale/cli

# Authenticate
pscale auth login

# Connect to your database
pscale shell portfolio-db main

# Then paste the SQL commands from Option A
```

### Step 1.5: Get Database Connection Credentials

PlanetScale provides connection strings in different formats.

**Method 1: Create a Password (Recommended for Production)**

1. In your database dashboard, go to **"Settings"** tab
2. Click **"Passwords"** in the left sidebar
3. Click **"New password"** button
4. **Configure password:**
   - **Name:** `render-backend` (or any descriptive name)
   - **Branch:** `main`
   - **Role:** `Can read & write` (default)
5. Click **"Create password"**

6. **⚠️ IMPORTANT:** You'll see connection details **ONLY ONCE**. Copy them immediately:

```
Host: aws.connect.psdb.cloud
Username: xxxxxxxxxxxx
Password: pscale_pw_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
Database: portfolio-db
Port: 3306 (default)
```

**Connection String Formats Available:**

- **Node.js (mysql2):** `mysql://user:pass@host/database?ssl={"rejectUnauthorized":true}`
- **General:** Individual fields (we'll use this)
- **Prisma:** Special format for Prisma ORM
- **Other formats:** Django, Rails, etc.

7. **Save these credentials securely** - you won't be able to see them again!
   - Use a password manager
   - Or download the `.env` file they provide

### Step 1.6: Important PlanetScale Configuration

**SSL/TLS Connection (Required):**

PlanetScale **requires** SSL connections. Your database connection must include SSL configuration:

```javascript
// config/database.js will need SSL config
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: {
    rejectUnauthorized: true  // Required for PlanetScale
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

**Connection Pooling:**

PlanetScale includes built-in connection pooling, so you can configure your app pool more conservatively:
- **connectionLimit:** 5-10 (PlanetScale handles the rest)
- **queueLimit:** 0 (unlimited queue)

### Step 1.7: Enable Production Access

By default, PlanetScale main branch is protected. For production:

**Option A: Use Safe Migrations (Recommended)**

1. Create a development branch:
   ```bash
   # In PlanetScale Console or CLI
   pscale branch create portfolio-db dev
   ```

2. Make schema changes on `dev` branch
3. Create deploy request to merge changes to `main`
4. Review and deploy

**Option B: Enable Direct Access to Main** (Simpler for beginners)

1. Go to database **"Settings"**
2. Click **"Enable direct access to main"**
3. Confirm the warning
4. Now you can modify `main` branch directly

**For this tutorial, we'll use Option B** for simplicity.

### Step 1.8: Verify Database Setup

1. **Go to "Console" tab**
2. **Run test queries:**

```sql
-- Check if tables exist
SHOW TABLES;

-- Verify contacts table structure
DESCRIBE contacts;

-- Verify admin_users table structure  
DESCRIBE admin_users;

-- Check if tables are empty (should return 0)
SELECT COUNT(*) FROM contacts;
SELECT COUNT(*) FROM admin_users;
```

3. **All queries should execute successfully** ✅

### Step 1.9: Create Initial Admin User (Later)

We'll create the admin user after deploying the backend to Render, as it's easier to use your application code's bcrypt hashing.

**Note:** You can also create it now if you want:

```sql
-- Generate hash locally first with:
-- node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourPassword123!', 12));"

INSERT INTO admin_users (
  email, 
  password_hash, 
  username, 
  full_name, 
  role, 
  is_active
) VALUES (
  'your-email@example.com',
  'PASTE_BCRYPT_HASH_HERE',
  'admin',
  'Your Full Name',
  'super_admin',
  TRUE
);
```

### Step 1.10: PlanetScale Free Tier Limits

**Hobby Plan (Free Forever):**
- ✅ **Storage:** 5 GB
- ✅ **Row reads:** 1 billion per month
- ✅ **Row writes:** 10 million per month
- ✅ **Databases:** 1 database
- ✅ **Branches:** 1 production branch + 1 development branch
- ✅ **Automatic backups:** Daily (retained for 1 day)
- ✅ **Horizontal sharding:** No (Pro plan feature)
- ✅ **Support:** Community support

**For a portfolio contact form, these limits are MORE than enough!**

Estimated usage for typical portfolio:
- **Storage:** ~1-10 MB for thousands of contacts
- **Reads:** ~1000-10,000 per month
- **Writes:** ~50-500 per month (contact submissions)

**You'll likely use < 1% of the free tier limits!** 🎉

---

## Part 2: Deploy Backend on Render

### Step 2.1: Create Render Account

1. Go to [Render.com](https://render.com/)
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with GitHub
4. Authorize Render to access your repositories

### Step 2.2: Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. **Connect your GitHub repository:**
   - If first time: Click **"Configure GitHub"** and grant access
   - Select your portfolio repository
   - Click **"Connect"**

### Step 2.3: Configure Web Service

Fill in the following settings:

**Basic Settings:**
- **Name:** `portfolio-backend` (or your preferred name)
- **Region:** Choose closest to your users (e.g., `Oregon (US West)`)
- **Branch:** `main` (or your deployment branch)
- **Root Directory:** `backend` (important!)
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **"Free"** tier
  - Free tier includes:
    - 750 hours/month (enough for one service)
    - Spins down after 15 minutes of inactivity
    - Automatic wake on request (may take 30-60 seconds)

### Step 2.4: Add Environment Variables

Click **"Advanced"** and add these environment variables:

```bash
# Server Configuration
NODE_ENV=production
PORT=5000

# MySQL Database (from PlanetScale)
DB_HOST=aws.connect.psdb.cloud
DB_USER=your-planetscale-username
DB_PASSWORD=pscale_pw_your-password-here
DB_NAME=portfolio-db
DB_PORT=3306

# CORS - Your Live Frontend URL
FRONTEND_URL=https://your-portfolio-domain.com

# JWT Secret (Generate secure random string)
JWT_SECRET=your-64-byte-hex-string
JWT_EXPIRES_IN=7d

# Session Secret (Generate another secure random string)
SESSION_SECRET=your-another-64-byte-hex-string

# Email Configuration (Gmail App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
NOTIFICATION_EMAIL=your-email@gmail.com

# Rate Limiting (Optional)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CONTACT_RATE_LIMIT=3
LOGIN_RATE_LIMIT=5

# Security (Optional)
BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=900000
```

**How to generate secure secrets:**

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate SESSION_SECRET (run again for different value)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**How to get Gmail App Password:**

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (required)
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Select **"Mail"** and **"Other (Custom name)"**
5. Enter "Portfolio Backend" as the name
6. Click **"Generate"**
7. Copy the 16-character password (use this for `SMTP_PASS`)

### Step 2.5: Deploy

1. Click **"Create Web Service"** button at the bottom
2. Render will start building and deploying
3. Watch the logs for any errors
4. Wait for deployment to complete (usually 2-5 minutes)

**You'll see in the logs:**
```
==> Building...
==> Installing dependencies...
==> Starting server...
✅ MySQL Database connected successfully
🚀 Server running on port 5000
```

5. Once deployed, you'll get a URL like:
   ```
   https://portfolio-backend-xxxx.onrender.com
   ```

### Step 2.6: Create Admin User (If not done in Railway)

1. In Render dashboard, click **"Shell"** tab
2. Run the admin creation script:

```bash
node config/create-admin.js
```

Or directly create an admin:

```bash
node -e "
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function createAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  const email = 'your-email@example.com';
  const password = 'YourStrongPassword123!';
  const username = 'admin';
  const fullName = 'Your Full Name';
  
  const hash = await bcrypt.hash(password, 12);
  
  await connection.execute(
    'INSERT INTO admin_users (email, password_hash, username, full_name, role, is_active) VALUES (?, ?, ?, ?, ?, ?)',
    [email, hash, username, fullName, 'super_admin', true]
  );
  
  console.log('✅ Admin created successfully!');
  await connection.end();
}

createAdmin().catch(console.error);
"
```

### Step 2.7: Test Backend Deployment

1. Visit your Render URL: `https://portfolio-backend-xxxx.onrender.com`
2. You should see JSON response:
   ```json
   {
     "success": true,
     "message": "Portfolio Backend API",
     "version": "1.0.0",
     "environment": "production"
   }
   ```

3. Test health endpoint: `https://portfolio-backend-xxxx.onrender.com/api/health`

---

## Part 3: Connect Frontend to Backend

### Step 3.1: Update Frontend Environment Variables

**If using Vercel:**

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Settings** → **Environment Variables**
3. Add or update:
   ```
   VITE_API_URL=https://portfolio-backend-xxxx.onrender.com
   VITE_API_BASE_URL=https://portfolio-backend-xxxx.onrender.com/api
   ```
4. Click **"Save"**
5. Redeploy your frontend:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

**If using Netlify:**

1. Go to **Site Settings** → **Environment Variables**
2. Add the same variables as above
3. Trigger a new deployment

**If using other hosting:**
- Update your environment variables according to your platform
- Ensure the backend URL is accessible

### Step 3.2: Update Frontend API Code

Check your frontend API configuration file (usually `src/api/config.js` or similar):

```javascript
// Example: src/config/api.ts or src/api/config.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
                     import.meta.env.VITE_API_URL ||
                     'http://localhost:5000/api';

export const API_ENDPOINTS = {
  contact: `${API_BASE_URL}/contact`,
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
  // ... other endpoints
};

// Ensure credentials are included for CORS
export const fetchConfig = {
  credentials: 'include', // Important for cookies/sessions
  headers: {
    'Content-Type': 'application/json',
  },
};
```

### Step 3.3: Update CORS in Backend (If Needed)

If you have a custom domain or multiple frontend URLs:

1. Go to Render dashboard
2. Click your backend service
3. Go to **Environment** tab
4. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-custom-domain.com,https://yourapp.vercel.app
   ```
5. Save and wait for automatic redeployment

---

## Part 4: Testing & Verification

### Step 4.1: Test Contact Form

1. **Open your live frontend** in browser
2. **Fill out the contact form** with test data
3. **Submit the form**
4. **Check for success message**

**Expected behavior:**
- Form submits successfully
- You receive confirmation message
- You receive email notification
- No CORS errors in browser console

### Step 4.2: Test Admin Login

1. **Navigate to admin login page** (e.g., `/admin` or `/login`)
2. **Enter admin credentials** you created earlier
3. **Check if login succeeds**
4. **Verify you can access admin dashboard**

**Expected behavior:**
- Login successful
- Dashboard loads
- Can view contact submissions
- JWT token stored in cookies

### Step 4.3: Verify Database Connection

**Check Railway logs:**
1. Go to Railway dashboard
2. Click MySQL service
3. Go to **Metrics** tab
4. Verify active connections when backend is accessed

**Check Render logs:**
1. Go to Render dashboard
2. Click your backend service
3. Go to **Logs** tab
4. Look for: `✅ MySQL Database connected successfully`

### Step 4.4: Test API Endpoints

Use Postman, Thunder Client, or curl:

```bash
# Test health endpoint
curl https://portfolio-backend-xxxx.onrender.com/api/health

# Test contact form (should work)
curl -X POST https://portfolio-backend-xxxx.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -H "Origin: https://your-frontend-domain.com" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message from production."
  }'

# Test admin login
curl -X POST https://portfolio-backend-xxxx.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-admin@example.com",
    "password": "YourPassword123!"
  }'
```

---

## Part 5: Maintenance & Monitoring

### Monitoring Your Services

**Render Monitoring:**
- **Dashboard**: Shows service status, CPU, memory usage
- **Logs**: Real-time logs for debugging
- **Metrics**: Response times, request counts
- **Alerts**: Set up email alerts for errors

**Railway Monitoring:**
- **Metrics**: Database connections, memory, CPU
- **Usage**: Track your $5 monthly credit usage
- **Logs**: Database query logs

### Keep Your Services Active

**Render Free Tier Limitations:**
- Spins down after 15 minutes of inactivity
- Takes 30-60 seconds to wake up on first request
- 750 hours/month (one service can run continuously)

**Solution: Use a keep-alive service** (Optional)

Create a simple cron job or use [UptimeRobot](https://uptimerobot.com/):

1. Sign up at UptimeRobot (free)
2. Add new monitor:
   - Monitor Type: HTTP(s)
   - URL: `https://portfolio-backend-xxxx.onrender.com/api/health`
   - Monitoring Interval: 5 minutes
3. This will ping your backend every 5 minutes, keeping it warm

**Railway Free Tier:**
- $5 credit per month (~500 hours)
- No automatic sleep for databases
- Monitor usage in dashboard

### Regular Maintenance Tasks

**Weekly:**
- Check Render logs for errors
- Monitor Railway credit usage
- Test contact form functionality

**Monthly:**
- Review database size and optimize if needed
- Update dependencies (security patches)
- Backup database (see backup section below)

### Database Backups

**Option 1: Railway Automated Backups** (Pro plan only)

**Option 2: Manual Backups** (Free)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and link
railway login
railway link

# Create backup
railway run mysqldump -u root -p railway > backup-$(date +%Y%m%d).sql

# Or use direct connection
mysqldump -h containers-us-west-xxx.railway.app \
  -P 6123 \
  -u root \
  -p railway > backup.sql
```

**Option 3: Automated backup script** (Run locally via cron)

Create `backup-database.sh`:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

mysqldump -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 backups
cd $BACKUP_DIR && ls -t | tail -n +8 | xargs rm -f
```

---

## Troubleshooting

### Common Issues & Solutions

#### 1. **Render Build Fails**

**Error:** `Cannot find module 'xxx'`

**Solution:**
```bash
# Ensure all dependencies are in package.json
cd backend
npm install --save <missing-module>
git add package.json package-lock.json
git commit -m "Add missing dependencies"
git push
```

**Error:** `Root directory not found`

**Solution:**
- In Render settings, set **Root Directory** to `backend`
- Make sure your repo structure has `/backend` folder

#### 2. **Database Connection Fails**

**Error:** `MySQL connection error: ECONNREFUSED`

**Solution:**
1. Verify Railway database is running (check Railway dashboard)
2. Check environment variables in Render:
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
3. Ensure Railway MySQL has public access enabled
4. Test connection from local machine first:
   ```bash
   mysql -h containers-us-west-xxx.railway.app -P 6123 -u root -p
   ```

**Error:** `Access denied for user`

**Solution:**
- Copy exact credentials from Railway Variables tab
- Check for extra spaces in environment variables
- Verify database name is `railway` (default)

#### 3. **CORS Errors in Browser**

**Error:** `Access-Control-Allow-Origin` error

**Solution:**
1. Update `FRONTEND_URL` in Render environment variables
2. Ensure frontend URL is exact (including https://, no trailing slash)
3. Check `server.js` CORS configuration:
   ```javascript
   const corsOptions = {
     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
     credentials: true,
     optionsSuccessStatus: 200
   };
   ```
4. If multiple frontends, use array:
   ```javascript
   origin: [
     'https://your-domain.com',
     'https://your-vercel-domain.vercel.app'
   ]
   ```

#### 4. **Service Keeps Sleeping**

**Problem:** Render free tier sleeps after 15 minutes

**Solution:**
- Use UptimeRobot to ping every 5 minutes (see Monitoring section)
- Or upgrade to paid plan ($7/month for always-on)

#### 5. **Email Not Sending**

**Error:** `Invalid login credentials`

**Solution:**
1. Verify you're using Gmail App Password (not regular password)
2. Ensure 2-Step Verification is enabled on Google Account
3. Check `SMTP_USER` and `SMTP_PASS` in Render environment
4. Test email configuration:
   ```bash
   # In Render shell
   node test-email.js
   ```

**Error:** `Connection timeout`

**Solution:**
- Verify `SMTP_HOST=smtp.gmail.com` and `SMTP_PORT=587`
- Check firewall settings (Railway allows outbound SMTP)

#### 6. **JWT Token Issues**

**Error:** `Invalid token` or `Token expired`

**Solution:**
1. Verify `JWT_SECRET` is set correctly (64-byte hex string)
2. Check `JWT_EXPIRES_IN` is set (e.g., `7d`)
3. Ensure frontend sends token in Authorization header or cookie
4. Clear browser cookies and login again

#### 7. **Railway Credit Running Out**

**Problem:** Running out of $5 monthly credit

**Solution:**
1. Optimize database queries (add indexes)
2. Reduce connection pool size
3. Consider upgrading to paid plan
4. Monitor usage in Railway dashboard

---

## Cost Summary

### Free Tier Limits

**Render (Backend Hosting):**
- ✅ **FREE:** 750 hours/month
- ✅ Automatic HTTPS
- ✅ Automatic deployments from GitHub
- ⚠️ Spins down after 15 minutes inactivity
- ⚠️ 100GB bandwidth/month

**Railway (Database Hosting):**
- ✅ **$5 FREE credit** per month
- ✅ ~500 hours of usage
- ✅ 100GB bandwidth
- ✅ 1GB RAM
- ⚠️ Credit card required (won't be charged unless you exceed)

**Total Monthly Cost: $0** (if staying within limits)

### Paid Upgrade Options (Optional)

**Render:**
- **Starter:** $7/month - No spin down, more resources
- **Standard:** $25/month - Higher resources, priority support

**Railway:**
- **Usage-based:** $5 credit + pay-as-you-go
- **Pro:** $20/month - Increased limits, priority support

---

## Security Best Practices

### 1. **Environment Variables**
- ✅ Never commit `.env` files to Git
- ✅ Use strong, random secrets (64-byte hex strings)
- ✅ Rotate secrets periodically (every 3-6 months)

### 2. **Database Security**
- ✅ Use strong passwords (Railway generates these)
- ✅ Limit connections to only Render IP (if possible)
- ✅ Regularly backup database
- ✅ Use prepared statements (you already do this)

### 3. **API Security**
- ✅ Enable rate limiting (already configured)
- ✅ Use HTTPS only (Render provides this)
- ✅ Validate all inputs (already implemented)
- ✅ Use helmet.js for security headers (already configured)

### 4. **Monitoring**
- ✅ Set up error alerts in Render
- ✅ Monitor Railway usage
- ✅ Check logs regularly
- ✅ Enable 2FA on all accounts (Render, Railway, GitHub)

---

## Next Steps After Deployment

1. ✅ Test all functionality thoroughly
2. ✅ Set up UptimeRobot for keep-alive
3. ✅ Configure database backups
4. ✅ Set up error monitoring/alerts
5. ✅ Document admin credentials securely (use password manager)
6. ✅ Create backup admin account
7. ✅ Test disaster recovery procedure
8. ✅ Monitor usage and costs
9. ✅ Set up staging environment (optional)
10. ✅ Configure custom domain (optional)

---

## Quick Reference

### Important URLs

```bash
# Render Backend
https://portfolio-backend-xxxx.onrender.com

# Railway Database
https://railway.app/project/your-project-id

# Frontend
https://your-portfolio-domain.com

# Admin Dashboard
https://your-portfolio-domain.com/admin
```

### Environment Variables Checklist

```bash
# Backend (Render)
✅ NODE_ENV=production
✅ PORT=5000
✅ DB_HOST=<from Railway>
✅ DB_USER=<from Railway>
✅ DB_PASSWORD=<from Railway>
✅ DB_NAME=<from Railway>
✅ DB_PORT=<from Railway>
✅ FRONTEND_URL=<your live frontend>
✅ JWT_SECRET=<64-byte hex>
✅ SESSION_SECRET=<64-byte hex>
✅ SMTP_USER=<your email>
✅ SMTP_PASS=<Gmail app password>
✅ NOTIFICATION_EMAIL=<your email>

# Frontend (Vercel/Netlify)
✅ VITE_API_URL=<Render backend URL>
```

---

## Support & Resources

### Documentation
- **Render Docs:** https://render.com/docs
- **Railway Docs:** https://docs.railway.app
- **Node.js Best Practices:** https://github.com/goldbergyoni/nodebestpractices

### Community
- **Render Community:** https://community.render.com
- **Railway Discord:** https://discord.gg/railway

### Your Project
- **Backend Repository:** Check your GitHub repo
- **Database Schema:** `backend/database/schema.sql`
- **API Documentation:** `backend/docs/`

---

## Conclusion

You now have a fully deployed, production-ready portfolio with:
- ✅ Backend API running on Render (free)
- ✅ MySQL database on Railway (free)
- ✅ Secure authentication and authorization
- ✅ Email notifications for contact form
- ✅ HTTPS encryption
- ✅ Rate limiting and security measures
- ✅ Connected to live frontend

**Total Setup Time:** ~30-45 minutes  
**Total Cost:** $0/month (within free tier limits)  
**Maintenance:** ~15 minutes/week

---

**Need Help?**  
Review the troubleshooting section or check the logs in Render/Railway dashboards for specific error messages.

**Happy Deploying! 🚀**
