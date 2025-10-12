# Portfolio Backend API

A Node.js/Express backend server with MySQL database for handling portfolio contact form submissions.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Testing with cURL](#testing-with-curl)

## ✨ Features

- RESTful API for contact form submissions
- MySQL database with connection pooling
- Input validation using express-validator
- CORS enabled for frontend integration
- Error handling and logging
- Security headers with Helmet
- Environment-based configuration

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Validation**: express-validator
- **Security**: Helmet, CORS

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MySQL](https://www.mysql.com/) (v8.0 or higher)
- npm or yarn package manager

## 🚀 Installation

1. **Navigate to the backend directory:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

## 🗄️ Database Setup

### Step 1: Start MySQL

Make sure your MySQL server is running:

```bash
# Linux/Mac
sudo systemctl start mysql
# or
sudo service mysql start

# Check status
sudo systemctl status mysql
```

### Step 2: Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit `.env` file with your MySQL credentials:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
DB_PORT=3306

FRONTEND_URL=http://localhost:5173
```

### Step 3: Initialize Database

Run the database initialization script:

```bash
npm run init-db
```

This will:
- Create the `portfolio_db` database
- Create the `contacts` table with proper schema
- Set up necessary indexes

### Database Schema

```sql
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment (development/production) | development |
| `DB_HOST` | MySQL host | localhost |
| `DB_USER` | MySQL username | root |
| `DB_PASSWORD` | MySQL password | - |
| `DB_NAME` | Database name | portfolio_db |
| `DB_PORT` | MySQL port | 3306 |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |

## 🏃 Running the Server

### Development Mode (with auto-restart)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start at `http://localhost:5000`

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### 1. Submit Contact Form

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project with you."
}
```

**Validation Rules:**
- `name`: Required, 2-255 characters
- `email`: Required, valid email format
- `subject`: Optional, max 500 characters
- `message`: Required, 10-5000 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 2. Get All Contacts (Admin)

**Endpoint:** `GET /api/contacts`

**Query Parameters:**
- `limit` (optional): Number of records (default: 100)
- `offset` (optional): Skip records (default: 0)

**Example:**
```
GET /api/contacts?limit=10&offset=0
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Project Inquiry",
      "message": "I would like to discuss...",
      "created_at": "2025-10-07T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

### 3. Get Single Contact

**Endpoint:** `GET /api/contacts/:id`

**Example:**
```
GET /api/contacts/1
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I would like to discuss...",
    "created_at": "2025-10-07T10:30:00.000Z"
  }
}
```

### 4. Delete Contact

**Endpoint:** `DELETE /api/contacts/:id`

**Example:**
```
DELETE /api/contacts/1
```

**Response (200):**
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

### 5. Health Check

**Endpoint:** `GET /api/health`

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-10-07T10:30:00.000Z"
}
```

## 🧪 Testing with cURL

### Submit a contact form:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Testing",
    "message": "This is a test message from the API."
  }'
```

### Get all contacts:

```bash
curl http://localhost:5000/api/contacts
```

### Health check:

```bash
curl http://localhost:5000/api/health
```

## 📁 Project Structure

```
backend/
├── config/
│   ├── database.js           # MySQL connection pool
│   └── init-database.js      # Database initialization script
├── controllers/
│   └── contactController.js  # Request handlers
├── middleware/
│   ├── errorHandler.js       # Error handling middleware
│   └── validation.js         # Validation middleware
├── models/
│   └── Contact.js            # Contact model/database queries
├── routes/
│   └── contact.js            # API routes
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
├── README.md                # This file
└── server.js                # Entry point
```

## 🔒 Security Features

- **Helmet**: Sets security-related HTTP headers
- **CORS**: Configured to allow only specified frontend origin
- **Input Validation**: All inputs are validated and sanitized
- **SQL Injection Prevention**: Using parameterized queries
- **Error Handling**: Sensitive information hidden in production

## 🐛 Troubleshooting

### Database Connection Issues

1. **Check MySQL is running:**
```bash
sudo systemctl status mysql
```

2. **Verify credentials in `.env` file**

3. **Test MySQL connection:**
```bash
mysql -u root -p
```

4. **Check if database exists:**
```sql
SHOW DATABASES;
USE portfolio_db;
SHOW TABLES;
```

### Port Already in Use

If port 5000 is already in use, change the `PORT` in `.env`:
```env
PORT=5001
```

### CORS Issues

Update `FRONTEND_URL` in `.env` to match your frontend URL:
```env
FRONTEND_URL=http://localhost:5173
```

## 📝 License

MIT License - feel free to use this project for your portfolio!

## 👤 Author

Wallace Wambulwa

---

**Happy Coding! 🚀**


