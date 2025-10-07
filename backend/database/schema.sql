
CREATE DATABASE IF NOT EXISTS portfolio_db
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio_db;


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


-- Admin Users Table for Authentication
CREATE TABLE IF NOT EXISTS admin_users (
  -- Primary Key
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for admin user',
  
  -- Authentication Credentials
  email VARCHAR(255) NOT NULL UNIQUE COMMENT 'Admin email address for login',
  password_hash VARCHAR(255) NOT NULL COMMENT 'Bcrypt hashed password',
  username VARCHAR(50) NOT NULL UNIQUE COMMENT 'Admin username',
  
  -- Profile Information
  full_name VARCHAR(100) NOT NULL COMMENT 'Admin full name',
  role ENUM('super_admin', 'admin', 'moderator') DEFAULT 'admin' COMMENT 'Admin role level',
  
  -- Security Fields
  last_login_at TIMESTAMP NULL DEFAULT NULL COMMENT 'Last successful login timestamp',
  last_login_ip VARCHAR(45) DEFAULT NULL COMMENT 'IP address of last login',
  failed_login_attempts INT DEFAULT 0 COMMENT 'Counter for failed login attempts',
  account_locked_until TIMESTAMP NULL DEFAULT NULL COMMENT 'Account lock expiration time',
  password_reset_token VARCHAR(255) DEFAULT NULL COMMENT 'Token for password reset',
  password_reset_expires TIMESTAMP NULL DEFAULT NULL COMMENT 'Password reset token expiration',
  
  -- Account Status
  is_active BOOLEAN DEFAULT TRUE COMMENT 'Whether the account is active',
  email_verified BOOLEAN DEFAULT FALSE COMMENT 'Whether email is verified',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'When the admin account was created',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'When the record was last modified',
  
  -- Indexes for Performance
  INDEX idx_email (email) COMMENT 'Fast lookup by email',
  INDEX idx_username (username) COMMENT 'Fast lookup by username',
  INDEX idx_active (is_active) COMMENT 'Filter active accounts'
  
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci 
  COMMENT='Admin users with authentication and security features';


-- Admin Sessions Table for Session Management
CREATE TABLE IF NOT EXISTS admin_sessions (
  -- Primary Key
  session_id VARCHAR(255) PRIMARY KEY COMMENT 'Unique session identifier',
  
  -- Foreign Key
  admin_id INT UNSIGNED NOT NULL COMMENT 'Reference to admin user',
  
  -- Session Data
  session_data TEXT COMMENT 'Serialized session data',
  token_hash VARCHAR(255) NOT NULL COMMENT 'Hashed JWT token for validation',
  
  -- Security
  ip_address VARCHAR(45) DEFAULT NULL COMMENT 'IP address of the session',
  user_agent TEXT DEFAULT NULL COMMENT 'Browser/device information',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'When session was created',
  expires_at TIMESTAMP NOT NULL COMMENT 'When session expires',
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last activity timestamp',
  
  -- Foreign Key Constraint
  FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE,
  
  -- Indexes
  INDEX idx_admin_id (admin_id) COMMENT 'Fast lookup by admin user',
  INDEX idx_expires_at (expires_at) COMMENT 'Cleanup expired sessions'
  
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci 
  COMMENT='Admin session tracking for security and authentication';
