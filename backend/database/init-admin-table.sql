-- ========================================
-- PORTFOLIO ADMIN AUTHENTICATION SETUP
-- ========================================
-- This script creates the necessary tables for admin authentication
-- Run this script to set up the admin system for your portfolio

-- Use the portfolio database
USE portfolio_db;

CREATE TABLE IF NOT EXISTS admin_users (
  -- Primary Key
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for admin user',
  
  -- Authentication Credentials
  email VARCHAR(255) NOT NULL UNIQUE COMMENT 'Admin email address for login (unique)',
  password_hash VARCHAR(255) NOT NULL COMMENT 'Bcrypt hashed password (never store plain text)',
  username VARCHAR(50) NOT NULL UNIQUE COMMENT 'Admin username (unique)',
  
  -- Profile Information
  full_name VARCHAR(100) NOT NULL COMMENT 'Admin full name for display',
  role ENUM('super_admin', 'admin', 'moderator') DEFAULT 'admin' COMMENT 'Admin role level - super_admin has full access',
  
  -- Security & Session Management
  last_login_at TIMESTAMP NULL DEFAULT NULL COMMENT 'Timestamp of last successful login',
  last_login_ip VARCHAR(45) DEFAULT NULL COMMENT 'IP address of last login (supports IPv4 and IPv6)',
  failed_login_attempts INT DEFAULT 0 COMMENT 'Counter for failed login attempts (reset on successful login)',
  account_locked_until TIMESTAMP NULL DEFAULT NULL COMMENT 'Account lock expiration time (after too many failed attempts)',
  
  -- Password Reset
  password_reset_token VARCHAR(255) DEFAULT NULL COMMENT 'Token for password reset functionality',
  password_reset_expires TIMESTAMP NULL DEFAULT NULL COMMENT 'Password reset token expiration timestamp',
  
  -- Account Status
  is_active BOOLEAN DEFAULT TRUE COMMENT 'Whether the account is active (can be used to disable accounts)',
  email_verified BOOLEAN DEFAULT FALSE COMMENT 'Whether email is verified (for enhanced security)',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'When the admin account was created',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'When the record was last modified',
  
  -- Indexes for Performance
  INDEX idx_email (email) COMMENT 'Fast lookup by email for login',
  INDEX idx_username (username) COMMENT 'Fast lookup by username',
  INDEX idx_active (is_active) COMMENT 'Filter active accounts',
  INDEX idx_role (role) COMMENT 'Filter by role level'
  
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci 
  COMMENT='Admin users with authentication, security features, and role-based access control';


-- ========================================
-- ADMIN SESSIONS TABLE
-- ========================================
-- Stores active admin sessions for JWT token validation and session management

CREATE TABLE IF NOT EXISTS admin_sessions (
  -- Primary Key
  session_id VARCHAR(255) PRIMARY KEY COMMENT 'Unique session identifier (UUID)',
  
  -- Foreign Key to Admin User
  admin_id INT UNSIGNED NOT NULL COMMENT 'Reference to admin user who owns this session',
  
  -- Session Data
  session_data TEXT COMMENT 'Serialized session data (JSON)',
  token_hash VARCHAR(255) NOT NULL COMMENT 'Hashed JWT token for validation',
  
  -- Security Information
  ip_address VARCHAR(45) DEFAULT NULL COMMENT 'IP address of the session',
  user_agent TEXT DEFAULT NULL COMMENT 'Browser/device information',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'When session was created',
  expires_at TIMESTAMP NOT NULL COMMENT 'When session expires (for automatic cleanup)',
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last activity timestamp',
  
  -- Foreign Key Constraint
  FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE,
  
  -- Indexes for Performance
  INDEX idx_admin_id (admin_id) COMMENT 'Fast lookup by admin user',
  INDEX idx_expires_at (expires_at) COMMENT 'Fast cleanup of expired sessions',
  INDEX idx_token_hash (token_hash) COMMENT 'Fast token validation'
  
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci 
  COMMENT='Admin session management for JWT authentication and logout tracking';


-- ========================================
-- ADMIN ACTIVITY LOG TABLE (Optional)
-- ========================================
-- Tracks admin actions for security auditing

CREATE TABLE IF NOT EXISTS admin_activity_log (
  -- Primary Key
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for log entry',
  
  -- Foreign Key to Admin User
  admin_id INT UNSIGNED NOT NULL COMMENT 'Admin user who performed the action',
  
  -- Activity Information
  action VARCHAR(100) NOT NULL COMMENT 'Action performed (e.g., "login", "logout", "update_contact", "delete_message")',
  resource_type VARCHAR(50) DEFAULT NULL COMMENT 'Type of resource affected (e.g., "contact", "admin_user")',
  resource_id INT UNSIGNED DEFAULT NULL COMMENT 'ID of the affected resource',
  details TEXT DEFAULT NULL COMMENT 'Additional details about the action (JSON format)',
  
  -- Request Information
  ip_address VARCHAR(45) DEFAULT NULL COMMENT 'IP address from which action was performed',
  user_agent TEXT DEFAULT NULL COMMENT 'Browser/device information',
  
  -- Timestamp
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'When the action was performed',
  
  -- Foreign Key Constraint
  FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE,
  
  -- Indexes for Performance
  INDEX idx_admin_id (admin_id) COMMENT 'Fast lookup by admin user',
  INDEX idx_action (action) COMMENT 'Filter by action type',
  INDEX idx_created_at (created_at DESC) COMMENT 'Chronological sorting',
  INDEX idx_resource (resource_type, resource_id) COMMENT 'Lookup by affected resource'
  
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci 
  COMMENT='Audit log for admin actions and security monitoring';


-- ========================================
-- VERIFICATION & SAMPLE QUERIES
-- ========================================

-- Verify tables were created
SHOW TABLES LIKE 'admin%';

-- Show admin_users table structure
DESCRIBE admin_users;

-- Show admin_sessions table structure
DESCRIBE admin_sessions;

-- Show admin_activity_log table structure
DESCRIBE admin_activity_log;
