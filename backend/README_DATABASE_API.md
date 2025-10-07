# Portfolio Contact System - Database & API Documentation

## Table of Contents
- [Overview](#overview)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Setup Guide](#setup-guide)
- [Environment Configuration](#environment-configuration)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## Overview

This document provides comprehensive information about the contact management system for the portfolio application, including database schema, API endpoints, and setup instructions.

### Technology Stack
- **Database**: MySQL 8.0+
- **Backend**: Node.js + Express.js
- **Frontend**: React + TypeScript + Axios
- **Validation**: Zod (frontend) + express-validator (backend)

---

## Database Schema

### Table: `contacts`

Stores all contact form submissions from portfolio visitors.

```sql
CREATE TABLE contacts (
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

### Field Descriptions

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `id` | INT UNSIGNED | Auto-incrementing primary key | - |
| `name` | VARCHAR(100) | Visitor's full name | 2-100 chars, letters/spaces/hyphens/apostrophes only |
| `email` | VARCHAR(255) | Contact email address | Valid email format |
| `subject` | VARCHAR(200) | Message subject line | 5-200 chars, no numbers |
| `message` | TEXT | Detailed message content | 10-1000 chars |
| `ip_address` | VARCHAR(45) | Submitter's IP (IPv4/IPv6) | Optional, for analytics |
| `user_agent` | TEXT | Browser/device info | Optional, for analytics |
| `status` | ENUM | Processing status | 'new', 'read', 'replied', 'archived' |
| `created_at` | TIMESTAMP | Submission timestamp | Auto-generated |
| `updated_at` | TIMESTAMP | Last modification time | Auto-updated |
| `read_at` | TIMESTAMP | First read timestamp | NULL until read |

### Indexes

- **idx_email**: Fast lookup by email address
- **idx_created_at**: Chronological sorting
- **idx_status**: Filter by processing status
- **idx_status_created**: Combined status and date filtering

---

## API Endpoints

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: Configure in environment variables

### 1. Submit Contact Form

**Endpoint**: `POST /api/contact`

**Description**: Submit a new contact form message

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a potential project collaboration..."
}
```

**Validation Rules**:
- `name`: 2-100 characters, letters/spaces/hyphens/apostrophes only
- `email`: Valid email format
- `subject`: 5-200 characters, no numbers
- `message`: 10-1000 characters

**Success Response** (201 Created):
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    }
  ]
}
```

**Error Response** (500 Internal Server Error):
```json
{
  "success": false,
  "message": "Failed to submit contact form",
  "error": "Database connection error" // Only in development
}
```

### 2. Get All Contacts (Admin)

**Endpoint**: `GET /api/contacts`

**Description**: Retrieve all contact submissions with pagination

**Query Parameters**:
- `limit` (optional): Number of records per page (default: 100)
- `offset` (optional): Starting position (default: 0)

**Example**: `GET /api/contacts?limit=20&offset=0`

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "subject": "Project Inquiry",
      "message": "I would like to discuss...",
      "created_at": "2025-10-07T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 145,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

### 3. Get Single Contact (Admin)

**Endpoint**: `GET /api/contacts/:id`

**Description**: Retrieve a specific contact submission by ID

**Example**: `GET /api/contacts/123`

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Project Inquiry",
    "message": "I would like to discuss a potential project...",
    "created_at": "2025-10-07T10:30:00.000Z"
  }
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "message": "Contact not found"
}
```

### 4. Delete Contact (Admin)

**Endpoint**: `DELETE /api/contacts/:id`

**Description**: Delete a specific contact submission

**Example**: `DELETE /api/contacts/123`

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

### 5. Health Check

**Endpoint**: `GET /api/health`

**Description**: Check API and database connectivity

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "API is healthy",
  "database": "connected",
  "timestamp": "2025-10-07T10:30:00.000Z"
}
```

---

## Setup Guide

### Prerequisites

1. **Node.js** (v18+ recommended)
2. **MySQL** (v8.0+ recommended)
3. **npm** or **yarn** package manager

### Step 1: Database Setup

1. **Install MySQL** (if not already installed)
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install mysql-server
   
   # macOS (using Homebrew)
   brew install mysql
   
   # Windows: Download from https://dev.mysql.com/downloads/mysql/
   ```

2. **Start MySQL Service**
   ```bash
   # Ubuntu/Debian
   sudo systemctl start mysql
   
   # macOS
   brew services start mysql
   
   # Windows: Use MySQL Workbench or Services panel
   ```

3. **Create Database User** (optional but recommended)
   ```sql
   -- Login to MySQL as root
   mysql -u root -p
   
   -- Create a dedicated user for the portfolio
   CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'secure_password_here';
   GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

4. **Run Database Schema**
   ```bash
   # Option 1: Using MySQL command line
   mysql -u portfolio_user -p < backend/database/schema.sql
   
   # Option 2: Using the init script
   cd backend
   npm run init-db
   ```

### Step 2: Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy example environment file
   cp .env.example .env
   
   # Edit .env with your actual values
   nano .env  # or use your preferred editor
   ```

   Update these values in `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=portfolio_user
   DB_PASSWORD=your_secure_password
   DB_NAME=portfolio_db
   DB_PORT=3306
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

4. **Initialize the database**
   ```bash
   npm run init-db
   ```

5. **Start the backend server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

   You should see:
   ```
   ✅ MySQL Database connected successfully
   🚀 Server is running!
   📍 Port: 5000
   🌍 Environment: development
   🔗 API URL: http://localhost:5000
   📧 Contact endpoint: http://localhost:5000/api/contact
   ```

### Step 3: Frontend Setup

1. **Navigate to portfolio directory**
   ```bash
   cd ../portfolio
   ```

2. **Install dependencies** (including axios)
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy example environment file
   cp .env.example .env
   
   # Edit .env if needed
   nano .env
   ```

   Update `VITE_API_URL` if your backend runs on a different port:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the frontend development server**
   ```bash
   npm run dev
   ```

   The application should open at `http://localhost:5173`

### Step 4: Verify Setup

1. **Test backend health endpoint**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Test contact form**
   - Open your browser to `http://localhost:5173`
   - Navigate to the Contact section
   - Fill out and submit the form
   - Check the backend terminal for logs
   - Verify data in MySQL:
     ```sql
     mysql -u portfolio_user -p
     USE portfolio_db;
     SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5;
     ```

---

## Environment Configuration

### Backend Environment Variables

```env
# Server
NODE_ENV=development          # development | production
PORT=5000                     # Server port

# Database
DB_HOST=localhost             # MySQL host
DB_USER=portfolio_user        # MySQL user
DB_PASSWORD=your_password     # MySQL password
DB_NAME=portfolio_db          # Database name
DB_PORT=3306                  # MySQL port

# CORS
FRONTEND_URL=http://localhost:5173  # Frontend URL for CORS
```

### Frontend Environment Variables

```env
# API Configuration
VITE_API_URL=http://localhost:5000  # Backend API URL
```

**Note**: Vite requires environment variables to be prefixed with `VITE_` to be accessible in the frontend.

---

## Testing

### Manual Testing

1. **Test Form Validation**
   - Try submitting empty form
   - Try invalid email format
   - Try name with numbers
   - Try subject with numbers
   - Try message that's too short

2. **Test API Endpoints**
   ```bash
   # Test contact submission
   curl -X POST http://localhost:5000/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "subject": "Testing API",
       "message": "This is a test message to verify the API is working correctly."
     }'
   
   # Test get all contacts
   curl http://localhost:5000/api/contacts
   
   # Test health check
   curl http://localhost:5000/api/health
   ```

### Database Queries for Testing

```sql
-- View all contacts
SELECT * FROM contacts ORDER BY created_at DESC;

-- Count total contacts
SELECT COUNT(*) as total FROM contacts;

-- View contacts by status
SELECT status, COUNT(*) as count 
FROM contacts 
GROUP BY status;

-- View recent contacts (last 7 days)
SELECT * FROM contacts 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY created_at DESC;

-- Search by email
SELECT * FROM contacts 
WHERE email LIKE '%example.com%'
ORDER BY created_at DESC;
```

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed

**Error**: `❌ MySQL connection error: Access denied`

**Solution**:
- Verify MySQL is running: `sudo systemctl status mysql`
- Check credentials in `.env` file
- Ensure database user has proper permissions
- Test connection: `mysql -u your_user -p`

#### 2. Database Not Found

**Error**: `❌ MySQL connection error: Unknown database 'portfolio_db'`

**Solution**:
```bash
# Run the database initialization script
cd backend
npm run init-db
```

#### 3. CORS Errors in Browser

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- Restart the backend server after changing `.env`
- Check that both frontend and backend are running

#### 4. Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find process using the port
lsof -i :5000

# Kill the process (replace PID with actual process ID)
kill -9 PID

# Or change the PORT in .env file
```

#### 5. Axios Timeout Errors

**Error**: `Request timeout`

**Solution**:
- Verify backend server is running
- Check `VITE_API_URL` in frontend `.env`
- Ensure no firewall is blocking the connection
- Increase timeout in ContactSection.tsx if needed

#### 6. Form Validation Not Working

**Issue**: Form submits with invalid data

**Solution**:
- Check Zod schema in `ContactSection.tsx`
- Verify backend validation in `middleware/validation.js`
- Check browser console for validation errors

### Logging

Enable detailed logging for debugging:

```javascript
// In backend server.js, ensure development logging is active
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log('Body:', req.body);
    next();
  });
}
```

### Database Maintenance

```sql
-- Check table structure
DESCRIBE contacts;

-- View table indexes
SHOW INDEX FROM contacts;

-- Check table size
SELECT 
  table_name AS `Table`,
  round(((data_length + index_length) / 1024 / 1024), 2) AS `Size (MB)`
FROM information_schema.TABLES
WHERE table_schema = 'portfolio_db'
AND table_name = 'contacts';

-- Optimize table (run periodically)
OPTIMIZE TABLE contacts;
```

---

## Production Deployment

### Environment Variables for Production

**Backend**:
```env
NODE_ENV=production
PORT=5000
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-secure-production-password
DB_NAME=portfolio_db
FRONTEND_URL=https://your-domain.com
```

**Frontend**:
```env
VITE_API_URL=https://api.your-domain.com
```

### Security Considerations

1. **Never commit `.env` files** to version control
2. **Use strong database passwords** (20+ characters, mixed case, numbers, symbols)
3. **Enable SSL/TLS** for database connections in production
4. **Implement rate limiting** to prevent spam
5. **Add authentication** for admin endpoints (GET, DELETE)
6. **Sanitize inputs** to prevent SQL injection (already handled by mysql2 library)
7. **Enable HTTPS** for both frontend and backend
8. **Regular backups** of the database
9. **Monitor logs** for suspicious activity
10. **Keep dependencies updated** (`npm audit` and `npm update`)

### Backup Strategy

```bash
# Create backup
mysqldump -u your_user -p portfolio_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
mysql -u your_user -p portfolio_db < backup_20251007_103000.sql

# Automate daily backups (cron job)
# Add to crontab (crontab -e):
0 2 * * * mysqldump -u your_user -pYourPassword portfolio_db > /path/to/backups/backup_$(date +\%Y\%m\%d).sql
```

---

## Support & Resources

### Documentation
- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Axios Documentation](https://axios-http.com/)
- [Zod Validation](https://zod.dev/)

### Useful Commands

```bash
# Backend
npm run dev          # Start development server
npm start           # Start production server
npm run init-db     # Initialize database

# Frontend
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build

# Database
mysql -u user -p    # Connect to MySQL
mysqldump          # Backup database
mysql              # Restore database
```

---

## License

MIT License - See LICENSE file for details

---

**Last Updated**: October 7, 2025
**Version**: 1.0.0
