# Authentication & Security Implementation Guide

## Overview
This document outlines the security measures implemented for the admin authentication system in the portfolio application.

## 🔐 Security Features Implemented

### 1. JWT Token Authentication
- **Token Generation**: Server generates JWT tokens upon successful login
- **Token Storage**: Tokens stored in both:
  - HTTP-only cookies (primary, secure against XSS)
  - localStorage (fallback for Authorization header)
- **Token Expiration**: 
  - Regular login: 24 hours
  - "Remember Me": 30 days
- **Token Verification**: All protected endpoints verify token validity

### 2. Session Management
- **Session Tracking**: Each login creates a unique session ID
- **Session Storage**: Sessions stored in database with:
  - Session ID (UUID v4)
  - Token hash (SHA-256)
  - IP address
  - User agent
  - Expiration time
- **Session Invalidation**: Sessions deleted on logout

### 3. Account Security
- **Password Hashing**: Bcrypt with salt rounds (10)
- **Failed Login Protection**:
  - Max 5 failed attempts
  - 15-minute account lockout after exceeded attempts
  - Remaining attempts counter shown to user
- **Brute Force Protection**: Rate limiting on login endpoint (5 attempts per 15 min)

### 4. API Security

#### Backend Protections
- **Helmet.js**: Security headers (CSP, HSTS, XSS Protection, etc.)
- **CORS**: Configured with credentials and specific origin
- **Rate Limiting**: Different limits for auth vs admin endpoints
- **Input Validation**: express-validator on all endpoints
- **Input Sanitization**: XSS protection via sanitization middleware
- **SQL Injection Protection**: Parameterized queries

#### Frontend Protections
- **Automatic Token Injection**: `apiClient` automatically adds Authorization header
- **401 Auto-Logout**: Unauthorized responses clear token and redirect to login
- **Protected Routes**: `ProtectedRoute` component guards admin pages
- **CSRF Protection**: Credentials included in all requests

## 📁 File Structure

### Backend Files
```
backend/
├── middleware/
│   ├── auth.js              # JWT verification & role authorization
│   ├── sanitize.js          # Input sanitization
│   ├── validation.js        # Request validation helpers
│   └── errorHandler.js      # Centralized error handling
├── controllers/
│   └── authController.js    # Login, logout, token verification
├── models/
│   └── Admin.js            # Admin user model with security methods
└── routes/
    ├── auth.js             # Authentication routes with rate limits
    └── contact.js          # Protected admin routes
```

### Frontend Files
```
portfolio/src/
├── contexts/
│   └── AuthContext.tsx     # Authentication state management
├── components/
│   └── ProtectedRoute.tsx  # Route protection component
├── utils/
│   └── api.ts             # Secured API client with auto-token injection
└── pages/
    ├── AdminLogin.tsx     # Login page
    └── admin/
        └── AdminMessages.tsx  # Protected admin page example
```

## 🔑 Authentication Flow

### Login Process
1. User submits email and password
2. Backend validates credentials
3. Backend checks account lock status
4. Backend verifies password hash
5. Backend generates JWT token and session
6. Backend returns token and admin info
7. Frontend stores token in localStorage
8. Frontend sets admin state
9. User redirected to admin dashboard

### Protected Request Process
1. Frontend makes API call via `apiClient`
2. `apiClient` retrieves token from localStorage
3. `apiClient` adds Authorization header with Bearer token
4. Backend receives request
5. `authenticateToken` middleware verifies JWT
6. Middleware checks session validity in database
7. Middleware attaches admin info to request
8. Controller processes authenticated request
9. Response returned to frontend

### Logout Process
1. User clicks logout
2. Frontend calls logout endpoint with token
3. Backend deletes session from database
4. Backend clears HTTP-only cookie
5. Frontend removes token from localStorage
6. Frontend clears admin state
7. User redirected to login page

## 🛡️ Security Best Practices

### What We're Doing Right
✅ JWT tokens with expiration
✅ HTTP-only cookies for token storage
✅ HTTPS enforcement in production
✅ Password hashing with bcrypt
✅ Rate limiting on sensitive endpoints
✅ Input validation and sanitization
✅ SQL injection protection
✅ XSS protection
✅ CSRF protection via SameSite cookies
✅ Session tracking and management
✅ Failed login attempt protection
✅ Automatic token refresh capability

### Additional Recommendations
- Consider implementing 2FA for super admin accounts
- Add password complexity requirements
- Implement password change functionality
- Add session activity logging
- Consider IP whitelisting for super admin
- Implement automated security scanning
- Add API request logging for audit trail

## 🔧 Configuration

### Environment Variables (Backend)
```bash
# Required for authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
SESSION_SECRET=your_session_secret_key

# CORS configuration
FRONTEND_URL=http://localhost:5173

# Set to 'production' for enhanced security
NODE_ENV=development
```

### Environment Variables (Frontend)
```bash
# Backend API URL
VITE_API_URL=http://localhost:5000
```

## 🧪 Testing the Authentication

### 1. Test Login
```bash
# From frontend
POST http://localhost:5000/api/auth/login
Body: {
  "email": "admin@example.com",
  "password": "your_password",
  "rememberMe": false
}
```

### 2. Test Protected Endpoint
```bash
# From frontend (token auto-injected)
GET http://localhost:5000/api/contacts
Headers: {
  "Authorization": "Bearer your_jwt_token"
}
```

### 3. Test Logout
```bash
# From frontend
POST http://localhost:5000/api/auth/logout
Headers: {
  "Authorization": "Bearer your_jwt_token"
}
```

## 🐛 Troubleshooting

### "Authentication required" Error
- Check if token exists in localStorage
- Verify token hasn't expired
- Check if backend JWT_SECRET matches
- Ensure Authorization header is being sent

### "Session expired" Error
- Token may have expired
- Session may have been deleted from database
- Try logging in again

### CORS Errors
- Verify FRONTEND_URL in backend .env
- Ensure credentials: 'include' in API calls
- Check CORS configuration in server.js

### Token Not Being Sent
- Check `apiClient` implementation
- Verify token is stored in localStorage
- Check browser console for errors

## 📊 Security Headers

The following security headers are set via Helmet.js:

- `Content-Security-Policy`: Prevents XSS attacks
- `Strict-Transport-Security`: Enforces HTTPS
- `X-Frame-Options`: Prevents clickjacking
- `X-Content-Type-Options`: Prevents MIME sniffing
- `X-XSS-Protection`: Browser XSS protection
- `Referrer-Policy`: Controls referrer information

## 🔒 Admin Account Management

### Create Super Admin
```bash
cd backend
npm run create-admin
```

### Reset Password
Currently manual via database or `setup-super-admin.js` script.

## 📝 API Endpoints

### Public Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

### Authentication Endpoints
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout (Protected)
- `GET /api/auth/verify` - Verify token (Protected)
- `GET /api/auth/me` - Get current admin (Protected)
- `POST /api/auth/refresh` - Refresh token (Protected)

### Protected Admin Endpoints
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get specific contact
- `PATCH /api/contacts/:id/status` - Update contact status
- `DELETE /api/contacts/:id` - Delete contact

## 🎯 Quick Reference

### Token Storage Location
- **Primary**: HTTP-only cookie (secure)
- **Fallback**: localStorage (for Authorization header)

### Token Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Session Duration
- Standard: 24 hours
- Remember Me: 30 days

### Rate Limits
- Login: 5 attempts per 15 minutes
- Other auth endpoints: 20 requests per 15 minutes
- Admin endpoints: 100 requests per 15 minutes

---

**Last Updated**: October 12, 2025
**Version**: 1.0
