
## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Initial Setup](#initial-setup)
4. [Creating Admin Users](#creating-admin-users)
5. [Environment Variables](#environment-variables)
6. [API Endpoints](#api-endpoints)
7. [Security Features](#security-features)
8. [Testing the System](#testing-the-system)
9. [Troubleshooting](#troubleshooting)

---

## Overview

This authentication system provides:

- ✅ **Secure JWT-based authentication**
- ✅ **Password hashing with bcrypt** (12 rounds)
- ✅ **Session management** with database tracking
- ✅ **Account lockout** after failed login attempts
- ✅ **HTTP-only cookies** for token storage
- ✅ **Role-based access control** (super_admin, admin, moderator)
- ✅ **Rate limiting** on auth endpoints
- ✅ **IP tracking** and user agent logging

---

## Prerequisites

Before setting up authentication, ensure you have:

1. ✅ MySQL/MariaDB installed and running
2. ✅ Node.js and npm installed
3. ✅ Backend dependencies installed (`npm install`)
4. ✅ Database initialized (`npm run init-db`)

---

## Initial Setup

### 1. Generate JWT Secret

Generate a secure JWT secret key:

```bash
# Generate a random 64-byte hex string
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and add it to your `.env` file.

### 2. Update `.env` File

Edit `/backend/.env` and add/update the following:

```env
# JWT Configuration
JWT_SECRET=your_generated_secret_from_step_1

# Optional: For reference only (actual admin stored in database)
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_USERNAME=admin
```

⚠️ **IMPORTANT**: 
- Keep `JWT_SECRET` secure and never commit it to version control
- Change the JWT_SECRET in production
- Use a strong, random secret (at least 32 characters)

### 3. Initialize Database

If you haven't already, initialize the database:

```bash
cd backend
npm run init-db
```

This will create:
- `contacts` table
- `admin_users` table
- `admin_sessions` table

---

## Creating Admin Users

### Interactive Method (Recommended)

Run the admin creation script:

```bash
npm run create-admin
```

You'll be prompted for:
- **Email**: Valid email address
- **Password**: Minimum 8 characters (confirm password required)
- **Username**: Minimum 3 characters
- **Full Name**: Admin's full name
- **Role**: Select from:
  - `super_admin` - Full access to all features
  - `admin` - Standard administrative access
  - `moderator` - Limited access

Example session:
```
🔐 Admin User Creation Script
================================

Testing database connection...
✅ Database connected successfully!

Enter admin email: admin@example.com
Enter admin password (min 8 characters): ********
Confirm password: ********
Enter admin username (min 3 characters): admin
Enter admin full name: John Doe

Select admin role:
  1. super_admin (Full access)
  2. admin (Standard access)
  3. moderator (Limited access)
Enter choice (1-3): 1

📋 Summary:
─────────────────────────
Email:     admin@example.com
Username:  admin
Full Name: John Doe
Role:      super_admin
─────────────────────────

Create this admin user? (yes/no): yes

✅ Admin user created successfully!

Admin ID: 1
Email:    admin@example.com
Username: admin
Role:     super_admin
```

### Programmatic Method

If you need to create an admin user programmatically:

```javascript
const Admin = require('./models/Admin');

const adminData = {
  email: 'admin@example.com',
  password: 'SecurePassword123!',
  username: 'admin',
  full_name: 'Admin User',
  role: 'super_admin'
};

const adminId = await Admin.create(adminData);
console.log('Admin created with ID:', adminId);
```

---

## Environment Variables

### Required Variables

```env
# Server
NODE_ENV=development          # development | production
PORT=5000                      # Server port

# Database
DB_HOST=localhost
DB_USER=wallace
DB_PASSWORD=your_db_password
DB_NAME=portfolio_db
DB_PORT=3306

# JWT
JWT_SECRET=your_64_character_secret_key

# Frontend
FRONTEND_URL=http://localhost:5173
```

### Production Considerations

For production, update:

```env
NODE_ENV=production
JWT_SECRET=use_a_different_secret_in_production
FRONTEND_URL=https://your-domain.com
```

---

## API Endpoints

### 1. **Admin Login**

**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "admin@example.com",
  "password": "your_password",
  "rememberMe": false
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {
      "id": 1,
      "email": "admin@example.com",
      "username": "admin",
      "full_name": "Admin User",
      "role": "super_admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses**:
- `400`: Missing email or password
- `401`: Invalid credentials
- `423`: Account locked (too many failed attempts)

**Cookie Set**: `adminToken` (HTTP-only, secure in production)

**Rate Limit**: 5 requests per 15 minutes per IP

---

### 2. **Admin Logout**

**Endpoint**: `POST /api/auth/logout`

**Authentication**: Required (JWT token)

**Success Response** (200):
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**What happens**:
- Session deleted from database
- Cookie cleared from browser
- User must login again

---

### 3. **Verify Token**

**Endpoint**: `GET /api/auth/verify`

**Authentication**: Required (JWT token)

**Success Response** (200):
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "admin": {
      "id": 1,
      "email": "admin@example.com",
      "username": "admin",
      "full_name": "Admin User",
      "role": "super_admin",
      "sessionId": "uuid-v4-session-id"
    }
  }
}
```

**Use case**: Check if user is authenticated before rendering protected pages

---

### 4. **Get Current Admin Profile**

**Endpoint**: `GET /api/auth/me`

**Authentication**: Required (JWT token)

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "admin": {
      "id": 1,
      "email": "admin@example.com",
      "username": "admin",
      "full_name": "Admin User",
      "role": "super_admin",
      "last_login_at": "2025-10-07T10:30:00.000Z",
      "created_at": "2025-10-01T12:00:00.000Z"
    }
  }
}
```

---

### 5. **Refresh Token**

**Endpoint**: `POST /api/auth/refresh`

**Authentication**: Required (JWT token)

**Request Body**:
```json
{
  "rememberMe": false
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "token": "new_jwt_token_here"
  }
}
```

**What happens**:
- Old session deleted
- New session created with new token
- New cookie set

---

## Security Features

### 1. **Password Security**

- **Hashing**: bcrypt with 12 salt rounds
- **Minimum length**: 8 characters (enforced in create-admin script)
- **Stored**: Only hashed password stored in database, never plain text

### 2. **Account Lockout**

- **Failed attempts**: Account locks after 5 failed login attempts
- **Lock duration**: 15 minutes
- **Auto-unlock**: Automatically unlocks after timeout
- **Reset on success**: Failed attempts counter resets on successful login

### 3. **Session Management**

- **Session tracking**: Each login creates a unique session in database
- **Token validation**: JWT token verified against database session
- **Expiration**: 
  - Standard: 24 hours
  - Remember me: 30 days
- **IP tracking**: Session IP address logged for security audit

### 4. **HTTP-Only Cookies**

- **Cookie name**: `adminToken`
- **HTTP-only**: JavaScript cannot access (XSS protection)
- **Secure**: HTTPS only in production
- **SameSite**: Strict (CSRF protection)

### 5. **Rate Limiting**

- **Login endpoint**: 5 requests per 15 minutes per IP
- **Auth endpoints**: 20 requests per 15 minutes per IP
- **Successful requests**: Not counted toward login rate limit

### 6. **Role-Based Access**

Three role levels:
- **super_admin**: Full system access
- **admin**: Standard administrative access
- **moderator**: Limited access

Use middleware to protect routes:

```javascript
const { authenticateToken, authorizeRoles } = require('./middleware/auth');

// Require any authenticated admin
router.get('/admin-only', authenticateToken, handler);

// Require super_admin only
router.delete('/critical', authenticateToken, authorizeRoles('super_admin'), handler);

// Allow super_admin or admin
router.post('/moderate', authenticateToken, authorizeRoles('super_admin', 'admin'), handler);
```

---

## Testing the System

### 1. **Start the Server**

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server is running!
📍 Port: 5000
🌍 Environment: development
🔗 API URL: http://localhost:5000
```

### 2. **Test Login with cURL**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your_password"
  }' \
  -c cookies.txt
```

### 3. **Test Protected Endpoint**

```bash
# Using cookie from previous request
curl -X GET http://localhost:5000/api/auth/me \
  -b cookies.txt
```

### 4. **Test Logout**

```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -b cookies.txt
```

### 5. **Test with Frontend**

Create a simple login form in your React app:

```jsx
// AdminLogin.tsx
const handleLogin = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Important: Send cookies
      body: JSON.stringify({
        email,
        password,
        rememberMe
      })
    });

    const data = await response.json();

    if (data.success) {
      // Store token in localStorage (optional, cookie is primary)
      localStorage.setItem('adminToken', data.data.token);
      
      // Redirect to dashboard
      navigate('/admin/dashboard');
    } else {
      setError(data.message);
    }
  } catch (error) {
    setError('Login failed. Please try again.');
  }
};
```

---

## Troubleshooting

### Problem: "Database connection failed"

**Solution**:
1. Check if MySQL is running: `sudo systemctl status mysql`
2. Verify credentials in `.env` file
3. Ensure database exists: `npm run init-db`

### Problem: "JWT must be provided"

**Solution**:
1. Check if `JWT_SECRET` is set in `.env`
2. Restart server after changing `.env`
3. Verify JWT_SECRET is at least 32 characters

### Problem: "Invalid authentication token"

**Solution**:
1. Token may be expired - login again
2. JWT_SECRET may have changed - clear sessions and login again
3. Clear browser cookies and try again

### Problem: "Account locked"

**Solution**:
1. Wait 15 minutes for automatic unlock
2. Or manually reset in database:
```sql
UPDATE admin_users 
SET failed_login_attempts = 0, account_locked_until = NULL 
WHERE email = 'admin@example.com';
```

### Problem: CORS errors in browser

**Solution**:
1. Verify `FRONTEND_URL` in `.env` matches your React app URL
2. Ensure `credentials: 'include'` is set in fetch requests
3. Check CORS configuration in `server.js`

### Problem: Cookie not being set

**Solution**:
1. Check if using HTTPS in production (required for secure cookies)
2. Ensure `credentials: 'include'` in frontend requests
3. Verify CORS credentials are allowed in backend

---

## Security Best Practices

### ✅ DO:

- Use strong, unique JWT_SECRET (64+ characters)
- Enable HTTPS in production
- Keep dependencies updated
- Monitor failed login attempts
- Regularly review active sessions
- Use environment variables for secrets
- Implement CSRF protection in production
- Add security headers (helmet already configured)

### ❌ DON'T:

- Commit `.env` file to version control
- Use weak passwords
- Share JWT secrets
- Disable HTTP-only cookies
- Store passwords in plain text
- Skip rate limiting
- Ignore security warnings

---

## Database Cleanup

### Remove Expired Sessions

Add this to a cron job or scheduled task:

```sql
DELETE FROM admin_sessions WHERE expires_at < NOW();
```

Or create a cleanup script:

```javascript
// config/cleanup-sessions.js
const { promisePool } = require('./database');

const cleanupExpiredSessions = async () => {
  try {
    const [result] = await promisePool.execute(
      'DELETE FROM admin_sessions WHERE expires_at < NOW()'
    );
    console.log(`Cleaned up ${result.affectedRows} expired sessions`);
  } catch (error) {
    console.error('Session cleanup error:', error);
  }
};

cleanupExpiredSessions();
```

Run daily:
```bash
node config/cleanup-sessions.js
```

---

## Additional Resources

- [JWT.io](https://jwt.io/) - JWT debugger
- [bcrypt documentation](https://www.npmjs.com/package/bcryptjs)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

---

## Support

If you encounter issues:

1. Check the server logs for detailed error messages
2. Review the troubleshooting section above
3. Verify all environment variables are set correctly
4. Ensure database is properly initialized

---

**Last Updated**: October 7, 2025
