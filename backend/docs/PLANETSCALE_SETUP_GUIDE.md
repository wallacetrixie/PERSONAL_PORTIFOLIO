# 🌍 PlanetScale Database Setup Guide

## Complete Guide to Setting Up MySQL Database on PlanetScale

This comprehensive guide walks you through setting up a production-ready MySQL database on PlanetScale for your portfolio backend.

---

## 📋 Table of Contents

1. [Why PlanetScale?](#why-planetscale)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Setup](#step-by-step-setup)
4. [Schema Migration](#schema-migration)
5. [Connection Configuration](#connection-configuration)
6. [Database Management](#database-management)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Why PlanetScale?

### Key Advantages

✅ **Serverless MySQL** - No server management, auto-scaling
✅ **Generous Free Tier** - 5GB storage, 1B reads/month, 10M writes/month
✅ **No Credit Card Required** - True free tier
✅ **Git-like Branching** - Create database branches for development
✅ **Zero-Downtime Migrations** - Deploy schema changes without downtime
✅ **Built on Vitess** - Battle-tested (powers YouTube, Slack, GitHub)
✅ **Automatic Backups** - Daily backups included
✅ **Global Edge Network** - Low latency worldwide
✅ **Web Console** - Built-in SQL editor and database explorer

### vs. Other Options

| Feature | PlanetScale | Railway | Supabase |
|---------|-------------|---------|----------|
| **Free Tier Storage** | 5 GB | ~500 MB | 500 MB |
| **Free Tier Reads** | 1B/month | Limited | 2GB transfer |
| **Free Tier Writes** | 10M/month | Limited | 2GB transfer |
| **Credit Card Required** | ❌ No | ✅ Yes | ❌ No |
| **Branching** | ✅ Yes | ❌ No | ❌ No |
| **Zero-Downtime DDL** | ✅ Yes | ❌ No | ❌ No |
| **SSL Required** | ✅ Yes | Optional | ✅ Yes |
| **MySQL Compatible** | ✅ Yes | ✅ Yes | ❌ PostgreSQL |

---

## Prerequisites

### What You Need:

- ✅ Email address or GitHub account
- ✅ 10-15 minutes
- ✅ No credit card required!
- ✅ Basic SQL knowledge (helpful but not required)

### What You'll Get:

- 📦 Fully configured MySQL database
- 🔐 Secure connection credentials
- 🌐 Global database access
- 💾 Automatic daily backups
- 📊 Web-based management console

---

## Step-by-Step Setup

### Step 1: Create PlanetScale Account (2 minutes)

1. **Go to** [planetscale.com](https://planetscale.com/)
2. **Click "Sign up"** in the top right
3. **Choose signup method:**
   - **GitHub** (Recommended) - One-click signup
   - **Email** - Enter email and create password
   - **Google** - Use Google account
4. **Verify email** (if using email signup)
5. **Complete profile:**
   - Organization name (optional, can use your name)
   - Use case: Select "Personal project"

### Step 2: Create Your Database (3 minutes)

1. **After login**, you'll see the PlanetScale dashboard
2. **Click "New database"** button
3. **Configure database:**

   ```
   Name: portfolio-db
   (lowercase, hyphens allowed, 3-32 characters)
   ```

4. **Select Region** (Important for performance!)

   Choose the region closest to:
   - Your Render backend location
   - Your users' location

   **Available Regions:**
   - **AWS US East (Northern Virginia)** - `us-east-1`
   - **AWS US West (Oregon)** - `us-west-2`
   - **AWS EU West (Dublin)** - `eu-west-1`
   - **AWS Asia Pacific (Mumbai)** - `ap-south-1`
   - **AWS Asia Pacific (Singapore)** - `ap-southeast-1`
   - **GCP US East** - `us-east4`

   💡 **Tip:** Match with your Render region for lowest latency

5. **Select Plan:**
   - Choose **"Hobby"** (Free plan)
   - No credit card required!

6. **Click "Create database"**

7. **Wait ~30 seconds** for provisioning

8. **Success!** You'll see your database dashboard

### Step 3: Understand Database Branches (1 minute)

PlanetScale uses **branches** (like Git branches) for schema management:

- **`main` branch** - Your production database (created automatically)
- **`dev` branch** - For development (you can create this later)

By default, you'll work with the `main` branch.

**Branch Benefits:**
- Test schema changes safely
- Create deploy requests to merge changes
- Rollback if needed
- No downtime during changes

### Step 4: Create Database Tables (5 minutes)

#### Option A: Using PlanetScale Web Console (Recommended)

1. **In your database dashboard**, click **"Console"** tab
2. **Select branch:** `main` (should be selected by default)
3. **You'll see a SQL editor** - ready to execute queries!

4. **Copy and paste this SQL** (first table):

```sql
CREATE TABLE IF NOT EXISTS contacts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  ip_address VARCHAR(45) DEFAULT NULL,
  user_agent TEXT DEFAULT NULL,
  status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  read_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at DESC),
  INDEX idx_status (status),
  INDEX idx_status_created (status, created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

5. **Click "Execute"** or press **Ctrl+Enter** (Cmd+Enter on Mac)
6. **You should see:** ✅ "Query executed successfully"

7. **Now create the admin users table:**

```sql
CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  role ENUM('super_admin', 'admin', 'moderator') DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMP NULL DEFAULT NULL,
  failed_login_attempts INT UNSIGNED DEFAULT 0,
  locked_until TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_last_login (last_login_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

8. **Execute this query** too
9. **Success!** Both tables created ✅

10. **Verify tables exist:**

```sql
SHOW TABLES;
```

You should see:
```
+-------------------------+
| Tables_in_portfolio-db  |
+-------------------------+
| admin_users            |
| contacts               |
+-------------------------+
```

11. **Check table structures:**

```sql
DESCRIBE contacts;
DESCRIBE admin_users;
```

#### Option B: Using PlanetScale CLI (For Advanced Users)

```bash
# Install PlanetScale CLI
# macOS
brew install planetscale/tap/pscale

# Windows (using Scoop)
scoop install pscale

# Linux
curl -fsSL https://get.planetscale.com | sh

# Authenticate
pscale auth login

# List your databases
pscale database list

# Connect to database shell
pscale shell portfolio-db main

# Now you're in MySQL prompt
# Paste the CREATE TABLE statements from Option A
```

### Step 5: Create Connection Credentials (3 minutes)

**⚠️ IMPORTANT:** You'll see these credentials **ONLY ONCE**. Copy them immediately!

1. **In database dashboard**, click **"Settings"** tab
2. **In left sidebar**, click **"Passwords"**
3. **Click "New password"** button

4. **Configure password:**
   - **Name:** `render-backend` (or any descriptive name like `production-app`)
   - **Branch:** `main`
   - **Role:** `Can read & write` (default, recommended)

5. **Click "Create password"**

6. **⚠️ COPY CREDENTIALS IMMEDIATELY** - They'll only show once!

   **You'll see:**
   ```
   Host: aws.connect.psdb.cloud
   Username: xxxxxxxxxxxx
   Password: pscale_pw_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   Database: portfolio-db
   Port: 3306
   ```

   **Connection String Options:**
   - **Prisma:** For Prisma ORM users
   - **Node.js:** For mysql2 package
   - **General:** Individual fields (we'll use this)

7. **Save these values** in one of these ways:
   - **Password Manager** (1Password, LastPass, Bitwarden)
   - **Download .env file** (button provided)
   - **Copy to secure note**
   - **Add to Render environment variables** (next step)

8. **⚠️ Click "I've saved these credentials"** to close the modal

9. **You can't retrieve them again!** But you can:
   - Create a new password anytime
   - Delete old passwords if compromised

### Step 6: Configure Database Access (2 minutes)

#### Enable Direct Access to Main Branch

By default, PlanetScale's `main` branch is protected (safe migrations only).

**For this tutorial, we'll enable direct access:**

1. **Go to "Settings"** tab
2. **Scroll to "Production branches"** section
3. **Find "Safe migrations"** toggle
4. **Click "Disable safe migrations"** (or "Enable direct access")
5. **Confirm the warning**

**Why?** This allows your backend to INSERT, UPDATE, DELETE directly on main branch.

**For production apps with teams**, you'd want safe migrations enabled.

#### Connection Pooling Settings (Optional)

PlanetScale has built-in connection pooling, so you don't need to configure much:

- **Your app connection limit:** 5-10 connections
- **PlanetScale handles the rest** with their infrastructure

### Step 7: Verify Setup (2 minutes)

1. **Go to "Console"** tab
2. **Run verification queries:**

```sql
-- Check tables exist
SHOW TABLES;

-- Check contacts table structure
DESCRIBE contacts;

-- Check admin_users table structure
DESCRIBE admin_users;

-- Verify both tables are empty
SELECT COUNT(*) as contact_count FROM contacts;
SELECT COUNT(*) as admin_count FROM admin_users;
```

**Expected results:**
- ✅ Both tables listed
- ✅ Table structures match schema
- ✅ Counts are 0 (empty tables)

3. **Try inserting test data:**

```sql
-- Insert test contact (we'll delete it later)
INSERT INTO contacts (name, email, subject, message, status) 
VALUES ('Test User', 'test@example.com', 'Test Subject', 'This is a test message', 'new');

-- Verify it was inserted
SELECT * FROM contacts;

-- Delete test data
DELETE FROM contacts WHERE email = 'test@example.com';

-- Verify deletion
SELECT COUNT(*) FROM contacts;
```

If all queries work ✅ - **Your database is ready!**

---

## Schema Migration

### PlanetScale-Specific Considerations

#### What's Different?

PlanetScale is built on **Vitess**, which has some differences from standard MySQL:

❌ **Not Supported:**
- Foreign key constraints
- CREATE DATABASE statements  
- USE database statements
- TRIGGER (in safe migration mode)

✅ **Fully Supported:**
- All standard MySQL data types
- Indexes (single and compound)
- UNIQUE constraints
- AUTO_INCREMENT
- Stored procedures (with limitations)
- Views

#### Migrating from Standard MySQL

If you have an existing schema with foreign keys:

**Original schema:**
```sql
CREATE TABLE contacts (
  id INT PRIMARY KEY,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**PlanetScale version:**
```sql
CREATE TABLE contacts (
  id INT PRIMARY KEY,
  user_id INT,
  INDEX idx_user_id (user_id)  -- Just an index, no FK
);
```

**Handle referential integrity in your application code.**

### Using Database Branches

#### Create Development Branch

```bash
# Using PlanetScale CLI
pscale branch create portfolio-db dev

# Or in Web Console
# Database → Branches → New branch → Name: dev
```

#### Make Schema Changes Safely

1. **Create dev branch**
2. **Make changes on dev branch**
3. **Test changes thoroughly**
4. **Create deploy request** to merge to main
5. **Review and deploy**

**Example workflow:**

```bash
# Create dev branch
pscale branch create portfolio-db dev

# Connect to dev branch
pscale shell portfolio-db dev

# Add new column
ALTER TABLE contacts ADD COLUMN phone VARCHAR(20);

# Test in your app pointed to dev branch

# Create deploy request
pscale deploy-request create portfolio-db dev

# Review in web console and deploy
```

---

## Connection Configuration

### Environment Variables

Create these environment variables in Render:

```bash
DB_HOST=aws.connect.psdb.cloud
DB_USER=xxxxxxxxxxxx
DB_PASSWORD=pscale_pw_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
DB_NAME=portfolio-db
DB_PORT=3306
```

### Node.js Configuration

**Option A: Update existing config/database.js**

```javascript
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: {
    rejectUnauthorized: true  // ⚠️ Required for PlanetScale
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

const promisePool = pool.promise();

const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log('✅ PlanetScale MySQL Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ MySQL connection error:', error.message);
    return false;
  }
};

module.exports = { pool, promisePool, testConnection };
```

**Option B: Use new config/database-planetscale.js**

We've created a PlanetScale-specific config file for you at:
`backend/config/database-planetscale.js`

To use it, update your imports:

```javascript
// Change from:
const { promisePool } = require('./config/database');

// To:
const { promisePool } = require('./config/database-planetscale');
```

### Connection String Format

If you prefer connection string format:

```javascript
const connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?ssl={"rejectUnauthorized":true}`;
```

### Test Connection Locally

Before deploying, test PlanetScale connection locally:

```bash
# Create .env.planetscale file
cp .env .env.planetscale

# Add PlanetScale credentials
# DB_HOST=aws.connect.psdb.cloud
# DB_USER=your-username
# DB_PASSWORD=pscale_pw_...
# DB_NAME=portfolio-db

# Test connection
node -e "
require('dotenv').config({ path: '.env.planetscale' });
const { testConnection } = require('./config/database-planetscale');
testConnection();
"
```

---

## Database Management

### Using PlanetScale Console

#### View Data

1. Go to **"Console"** tab
2. Write SELECT queries:

```sql
-- View all contacts
SELECT * FROM contacts ORDER BY created_at DESC;

-- View contacts by status
SELECT * FROM contacts WHERE status = 'new';

-- Count contacts
SELECT status, COUNT(*) as count 
FROM contacts 
GROUP BY status;
```

#### Update Data

```sql
-- Mark contact as read
UPDATE contacts 
SET status = 'read', read_at = NOW() 
WHERE id = 1;

-- Update admin info
UPDATE admin_users 
SET full_name = 'New Name' 
WHERE email = 'admin@example.com';
```

#### Delete Data

```sql
-- Delete specific contact
DELETE FROM contacts WHERE id = 1;

-- Delete old contacts (older than 1 year)
DELETE FROM contacts 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);
```

### Using PlanetScale CLI

```bash
# Connect to database shell
pscale shell portfolio-db main

# Or execute single query
pscale shell portfolio-db main --execute "SELECT COUNT(*) FROM contacts;"

# Export data
pscale shell portfolio-db main --execute "SELECT * FROM contacts;" --format csv > contacts.csv
```

### Backups

#### Automatic Backups

PlanetScale Hobby plan includes:
- ✅ Daily automatic backups
- ✅ Retained for 1 day
- ✅ Restore from backup in web console

**To restore:**
1. Go to **"Backups"** tab
2. Find the backup you want
3. Click **"Restore"**
4. Choose to restore to new branch or replace existing

#### Manual Backups

```bash
# Export full database
pscale shell portfolio-db main --execute "
SELECT * FROM contacts 
INTO OUTFILE '/tmp/contacts_backup.csv';" > contacts_$(date +%Y%m%d).csv

# Or use mysqldump-compatible tool
pscale database dump portfolio-db main
```

### Insights & Analytics

1. **Go to "Insights" tab** in PlanetScale dashboard
2. **View metrics:**
   - Queries per second
   - Query response time
   - Storage usage
   - Row operations (reads/writes)
   - Connection count

3. **Identify slow queries**
4. **Monitor usage against free tier limits**

---

## Best Practices

### Security

✅ **Use separate passwords for each environment**
- Production: One password
- Staging: Different password
- Development: Another password

✅ **Rotate passwords regularly**
- Every 90 days recommended
- Especially after team member changes

✅ **Never commit credentials**
```bash
# Add to .gitignore
.env
.env.production
.env.planetscale
```

✅ **Use environment variables everywhere**
- Never hardcode credentials
- Use secrets management in CI/CD

### Performance

✅ **Add indexes for frequent queries**
```sql
-- If you query by email often
CREATE INDEX idx_email ON contacts(email);

-- Compound index for common filters
CREATE INDEX idx_status_date ON contacts(status, created_at);
```

✅ **Use connection pooling**
- Set `connectionLimit: 10` in your app
- PlanetScale handles the rest

✅ **Monitor query performance**
- Check "Insights" tab regularly
- Optimize slow queries

✅ **Use SELECT specific columns**
```sql
-- Bad (slow)
SELECT * FROM contacts;

-- Good (fast)
SELECT id, name, email, created_at FROM contacts;
```

### Schema Management

✅ **Use branches for schema changes**
- Never change schema directly on main (in production)
- Test on dev branch first
- Use deploy requests

✅ **Document schema changes**
- Keep migration notes
- Update schema.sql file

✅ **Handle referential integrity in code**
```javascript
// Check if user exists before inserting contact
const [user] = await pool.query('SELECT id FROM users WHERE id = ?', [userId]);
if (!user) throw new Error('User not found');

// Then insert contact
await pool.query('INSERT INTO contacts (user_id, ...) VALUES (?, ...)', [userId, ...]);
```

### Monitoring

✅ **Set up usage alerts**
- Monitor storage usage (5GB limit)
- Monitor read operations (1B/month limit)
- Monitor write operations (10M/month limit)

✅ **Check database health weekly**
- Review slow queries
- Check error rates
- Verify backup status

✅ **Use PlanetScale Insights**
- Track query patterns
- Identify optimization opportunities

---

## Troubleshooting

### Common Issues

#### Issue 1: Connection Refused

**Error:** `Error: connect ECONNREFUSED`

**Cause:** Missing SSL configuration

**Solution:**
```javascript
// Add SSL to your config
ssl: {
  rejectUnauthorized: true
}
```

#### Issue 2: Authentication Failed

**Error:** `Access denied for user`

**Causes:**
- Wrong username/password
- Using old/deleted password
- Extra spaces in credentials

**Solutions:**
1. Create new password in PlanetScale
2. Copy credentials carefully
3. Check environment variables:
   ```bash
   # In Render shell
   echo $DB_USER
   echo $DB_HOST
   # Don't echo password in prod!
   ```

#### Issue 3: Unknown Database

**Error:** `Unknown database 'portfolio-db'`

**Causes:**
- Wrong database name
- Database doesn't exist
- Typo in DB_NAME

**Solutions:**
1. Check database name in PlanetScale dashboard
2. Ensure DB_NAME matches exactly (case-sensitive)
3. Verify database is active (not deleted)

#### Issue 4: Foreign Key Constraint Error

**Error:** `Foreign key constraint failed`

**Cause:** Trying to use foreign keys (not supported)

**Solution:** Remove foreign keys from schema:
```sql
-- Instead of:
FOREIGN KEY (user_id) REFERENCES users(id)

-- Use just:
INDEX idx_user_id (user_id)

-- Handle integrity in application code
```

#### Issue 5: Table Doesn't Exist

**Error:** `Table 'portfolio-db.contacts' doesn't exist`

**Causes:**
- Schema not initialized
- Wrong database branch
- Typo in table name

**Solutions:**
1. Go to PlanetScale Console
2. Run SHOW TABLES; to verify
3. Re-run CREATE TABLE statements if needed
4. Check you're connected to correct branch

#### Issue 6: Rate Limit Exceeded (Free Tier)

**Error:** Query limit exceeded

**Causes:**
- Exceeded 1B reads/month
- Exceeded 10M writes/month
- Inefficient queries

**Solutions:**
1. Check usage in PlanetScale Insights
2. Optimize queries (add indexes)
3. Reduce query frequency
4. Cache results in application
5. Upgrade to paid plan if needed ($29/month)

### Testing Connection

```bash
# Test from command line
mysql -h aws.connect.psdb.cloud \
  -u your-username \
  -p'pscale_pw_...' \
  --ssl-mode=REQUIRED \
  portfolio-db

# Test from Node.js
node -e "
const mysql = require('mysql2/promise');
(async () => {
  const conn = await mysql.createConnection({
    host: 'aws.connect.psdb.cloud',
    user: 'your-username',
    password: 'pscale_pw_...',
    database: 'portfolio-db',
    ssl: { rejectUnauthorized: true }
  });
  console.log('✅ Connected!');
  await conn.end();
})();
"
```

### Getting Help

1. **PlanetScale Docs:** https://planetscale.com/docs
2. **PlanetScale Community:** https://github.com/planetscale/discussion/discussions
3. **Support:** support@planetscale.com (Pro plan)
4. **Status Page:** https://www.planetscalestatus.com

---

## Next Steps

After setting up PlanetScale:

1. ✅ **Add credentials to Render** environment variables
2. ✅ **Update database config** to include SSL
3. ✅ **Deploy backend** to Render
4. ✅ **Create admin user** via backend
5. ✅ **Test contact form** end-to-end
6. ✅ **Monitor usage** in PlanetScale dashboard
7. ✅ **Set up backups** (automatic daily backups included)

---

## Quick Reference

### Essential Commands

```sql
-- View all tables
SHOW TABLES;

-- Describe table structure
DESCRIBE contacts;

-- Count records
SELECT COUNT(*) FROM contacts;

-- View recent contacts
SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10;

-- Check database size
SELECT 
  table_name AS 'Table',
  ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'portfolio-db';
```

### Important URLs

- **Dashboard:** https://app.planetscale.com
- **Your Database:** https://app.planetscale.com/your-org/portfolio-db
- **Docs:** https://planetscale.com/docs
- **CLI Docs:** https://planetscale.com/docs/concepts/planetscale-cli

### Free Tier Limits

- **Storage:** 5 GB
- **Reads:** 1 billion rows/month
- **Writes:** 10 million rows/month
- **Databases:** 1
- **Branches:** 2 (1 production + 1 development)
- **Backups:** Daily (1 day retention)

---

## Conclusion

You now have a production-ready PlanetScale MySQL database! 🎉

**What you achieved:**
- ✅ Created serverless MySQL database
- ✅ Set up tables with proper schema
- ✅ Generated secure connection credentials
- ✅ Learned database management
- ✅ Configured for zero-downtime operations

**Your database is:**
- 🚀 Fast (global edge network)
- 🔐 Secure (SSL required, automatic backups)
- 💰 Free (generous free tier)
- 📈 Scalable (serverless auto-scaling)
- 🛠️ Easy to manage (web console + CLI)

**Next:** Connect your Render backend to this database!

See [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md) for complete deployment instructions.

---

**Need Help?**

Check the troubleshooting section above or refer to:
- PlanetScale Documentation: https://planetscale.com/docs
- Your deployment guide: `backend/docs/PRODUCTION_DEPLOYMENT_GUIDE.md`
