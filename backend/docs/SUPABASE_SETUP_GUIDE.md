# 🚀 Supabase Setup Guide for Portfolio Backend

This guide will help you set up and deploy your portfolio backend using Supabase as your PostgreSQL database provider.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Create Supabase Project](#create-supabase-project)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)
5. [Database Schema Migration](#database-schema-migration)
6. [Create Super Admin](#create-super-admin)
7. [Testing the Connection](#testing-the-connection)
8. [Deployment](#deployment)
9. [Security Best Practices](#security-best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- ✅ Node.js installed (v14 or higher)
- ✅ A Supabase account (free tier available at [supabase.com](https://supabase.com))
- ✅ Basic knowledge of PostgreSQL
- ✅ Git installed for version control

---

## 🎯 Create Supabase Project

### Step 1: Sign Up/Login to Supabase

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click on **"New Project"**

### Step 2: Configure Your Project

Fill in the project details:

- **Name**: `portfolio-backend` (or your preferred name)
- **Database Password**: Create a strong password (save this securely!)
- **Region**: Choose the region closest to your users
- **Pricing Plan**: Free tier is sufficient for most portfolios

Click **"Create new project"** and wait for initialization (takes ~2 minutes).

---

## 💾 Database Setup

### Step 1: Get Connection String

1. In your Supabase dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Select **URI** tab
4. Copy the connection string (it looks like this):

```
postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

⚠️ **Important**: Replace `[YOUR-PASSWORD]` with your actual database password!

### Step 2: Enable Required Extensions

In the Supabase dashboard:

1. Go to **Database** → **Extensions**
2. Search for and enable:
   - `uuid-ossp` (for UUID generation)
   - `pg_trgm` (optional, for better text search)

---

## ⚙️ Environment Configuration

### Step 1: Update .env File

Create or update your `.env` file in the `backend` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# PostgreSQL Database (Supabase)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Email Configuration (Optional - for contact form notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO=your-email@gmail.com
```

### Step 2: Production Environment Variables

For production deployment (Vercel, Render, Railway, etc.), set these environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `DATABASE_URL` | Supabase connection string | `postgresql://postgres:...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secure-random-string` |
| `FRONTEND_URL` | Your frontend URL | `https://yourportfolio.com` |
| `PORT` | Server port (often auto-set) | `5000` |

---

## 🗄️ Database Schema Migration

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Run Database Initialization

Initialize the contacts table and triggers:

```bash
npm run init-db
```

This creates:
- ✅ `contacts` table with all necessary columns
- ✅ Indexes for performance optimization
- ✅ Triggers for automatic timestamp updates

### Step 3: Create Admin Tables

Run the admin table creation script in Supabase:

1. Go to **SQL Editor** in Supabase dashboard
2. Click **"New query"**
3. Copy the contents of `backend/database/init-admin-table.sql`
4. Paste and click **"Run"**

This creates:
- ✅ `admin_users` table for authentication
- ✅ `admin_sessions` table for session management
- ✅ `admin_activity_log` table for audit logging
- ✅ All necessary indexes and triggers

### Alternative: Use Schema File

You can also run the complete schema:

```bash
# Copy contents of backend/database/schema.sql
# Paste in Supabase SQL Editor and run
```

---

## 👤 Create Super Admin

### Step 1: Run Setup Script

Create your first admin user:

```bash
npm run setup-super-admin
```

Follow the prompts:
- Email address
- Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
- Full name
- Username

### Alternative: Manual Creation via SQL

In Supabase SQL Editor:

```sql
-- Replace values with your actual credentials
INSERT INTO admin_users (
  email,
  password_hash,
  username,
  full_name,
  role,
  is_active,
  email_verified
) VALUES (
  'admin@yourportfolio.com',
  -- Generate hash using bcrypt (12 rounds) - use Node.js script for this
  '$2a$12$YOUR_BCRYPT_HASH_HERE',
  'admin',
  'Your Full Name',
  'super_admin',
  TRUE,
  TRUE
);
```

---

## 🧪 Testing the Connection

### Step 1: Start the Server

```bash
npm run dev
```

You should see:
```
✅ PostgreSQL Database connected successfully
🚀 Server running on port 5000
```

### Step 2: Test API Endpoints

Test the health endpoint:

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "database": "connected"
}
```

### Step 3: Test Admin Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@yourportfolio.com","password":"YourPassword123"}'
```

---

## 🚀 Deployment

### Deploy to Vercel/Render/Railway

1. **Connect your repository** to your deployment platform
2. **Set environment variables** (see Environment Configuration section)
3. **Deploy**!

### Important Deployment Settings

**Build Command**:
```bash
npm install
```

**Start Command**:
```bash
npm start
```

**Node Version**: `18.x` or higher

---

## 🔒 Security Best Practices

### Database Security

1. **Enable Row Level Security (RLS)** in Supabase:

```sql
-- Enable RLS on contacts table
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access only
CREATE POLICY "Enable read access for authenticated users only"
ON contacts FOR SELECT
USING (auth.role() = 'authenticated');
```

2. **Use connection pooling** for production
3. **Regularly rotate database passwords**
4. **Enable audit logging** in Supabase settings

### Application Security

- ✅ Use strong JWT secrets (min 32 characters)
- ✅ Enable CORS only for your frontend domain
- ✅ Use HTTPS in production
- ✅ Implement rate limiting (already configured)
- ✅ Regularly update dependencies

---

## 🐛 Troubleshooting

### Connection Issues

**Problem**: "Error: connection refused"

**Solution**:
1. Check your `DATABASE_URL` is correct
2. Verify your database password
3. Ensure your IP is not blocked by Supabase
4. Check if the Supabase project is active

### Migration Issues

**Problem**: "Error: relation already exists"

**Solution**:
```sql
-- Drop existing tables if needed (⚠️ This deletes data!)
DROP TABLE IF EXISTS admin_activity_log CASCADE;
DROP TABLE IF EXISTS admin_sessions CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;

-- Then re-run your schema
```

### Authentication Issues

**Problem**: "Invalid credentials"

**Solution**:
1. Verify admin user exists:
```sql
SELECT email, username, role, is_active FROM admin_users;
```
2. Check password was hashed correctly
3. Verify JWT_SECRET is set correctly

### Performance Issues

**Problem**: Slow queries

**Solution**:
1. Check indexes are created:
```sql
SELECT * FROM pg_indexes WHERE tablename IN ('contacts', 'admin_users');
```
2. Enable connection pooling
3. Consider upgrading Supabase plan for more resources

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js pg Library](https://node-postgres.com/)
- [Bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)

---

## 🆘 Need Help?

If you encounter issues:

1. Check the [Supabase Status Page](https://status.supabase.com/)
2. Review application logs: `npm run dev` with verbose logging
3. Check Supabase logs in the dashboard
4. Test database connection manually using a PostgreSQL client

---

## ✅ Checklist

Before going to production:

- [ ] Database connection string configured
- [ ] All tables created successfully
- [ ] Super admin user created and tested
- [ ] Environment variables set in deployment platform
- [ ] Frontend URL configured in CORS
- [ ] SSL/HTTPS enabled
- [ ] Rate limiting configured
- [ ] Email service configured (if using contact form)
- [ ] Backup strategy in place
- [ ] Monitoring set up (e.g., Sentry, LogRocket)

---

**Congratulations! 🎉** Your portfolio backend is now configured with Supabase PostgreSQL!
