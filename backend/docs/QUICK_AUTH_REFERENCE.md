# 🚀 Quick Authentication Reference

Quick reference for admin authentication system.

## Quick Start (3 Steps)

```bash
# 1. Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# Copy output to .env as JWT_SECRET

# 2. Initialize Database
npm run init-db

# 3. Create Admin User
npm run create-admin
```

## API Endpoints Cheat Sheet

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/login` | ❌ No | Login with email/password |
| POST | `/api/auth/logout` | ✅ Yes | Logout current session |
| GET | `/api/auth/verify` | ✅ Yes | Check if token is valid |
| GET | `/api/auth/me` | ✅ Yes | Get current admin profile |
| POST | `/api/auth/refresh` | ✅ Yes | Refresh JWT token |

## cURL Test Commands

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"YourPassword"}' \
  -c cookies.txt -v
```

### Get Profile
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -b cookies.txt
```

### Logout
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -b cookies.txt
```

## Frontend Integration

### Login Example
```javascript
const login = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Important!
    body: JSON.stringify({ email, password })
  });
  return response.json();
};
```

### Protected Request Example
```javascript
const fetchProtectedData = async () => {
  const response = await fetch('http://localhost:5000/api/auth/me', {
    credentials: 'include' // Sends cookies
  });
  return response.json();
};
```

### Logout Example
```javascript
const logout = async () => {
  await fetch('http://localhost:5000/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });
  // Clear local state
  localStorage.removeItem('adminToken');
};
```

## Security Features

| Feature | Details |
|---------|---------|
| 🔒 Password Hashing | bcrypt with 12 rounds |
| 🚫 Account Lockout | 5 failed attempts → 15 min lock |
| 🍪 HTTP-Only Cookies | XSS protection |
| 📊 Session Tracking | Database-backed sessions |
| ⏱️ Token Expiry | 24h (standard), 30d (remember me) |
| 🚦 Rate Limiting | 5 login attempts per 15 min |

## Environment Variables

```env
# Required
NODE_ENV=development
PORT=5000
JWT_SECRET=your_64_char_secret
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=portfolio_db
FRONTEND_URL=http://localhost:5173
```

## Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| "Database connection failed" | Check MySQL running, verify .env credentials |
| "JWT must be provided" | Add JWT_SECRET to .env, restart server |
| "Account locked" | Wait 15 minutes or reset in database |
| CORS errors | Set credentials: 'include' in fetch |
| Cookie not set | Enable credentials in CORS, use HTTPS in prod |

## Database Management

### View All Admins
```sql
SELECT id, email, username, role, is_active, last_login_at 
FROM admin_users;
```

### Unlock Account
```sql
UPDATE admin_users 
SET failed_login_attempts = 0, account_locked_until = NULL 
WHERE email = 'admin@example.com';
```

### View Active Sessions
```sql
SELECT s.session_id, a.email, s.ip_address, s.created_at, s.expires_at
FROM admin_sessions s
JOIN admin_users a ON s.admin_id = a.id
WHERE s.expires_at > NOW();
```

### Cleanup Expired Sessions
```sql
DELETE FROM admin_sessions WHERE expires_at < NOW();
```

## Role Levels

| Role | Access Level |
|------|--------------|
| `super_admin` | Full system access |
| `admin` | Standard administrative access |
| `moderator` | Limited access |

## Protected Route Middleware

```javascript
// Require authentication
router.get('/protected', authenticateToken, handler);

// Require specific role
router.delete('/critical', 
  authenticateToken, 
  authorizeRoles('super_admin'), 
  handler
);

// Multiple roles allowed
router.post('/moderate', 
  authenticateToken, 
  authorizeRoles('super_admin', 'admin'), 
  handler
);
```

## Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (missing fields) |
| 401 | Unauthorized (invalid credentials/token) |
| 403 | Forbidden (insufficient permissions) |
| 423 | Locked (account locked) |
| 429 | Too Many Requests (rate limit) |
| 500 | Server Error |

## Useful Scripts

```bash
# Start development server
npm run dev

# Initialize database
npm run init-db

# Create admin user
npm run create-admin

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

**Need more details?** See [AUTHENTICATION_SETUP_GUIDE.md](./AUTHENTICATION_SETUP_GUIDE.md)
