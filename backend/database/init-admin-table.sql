-- ========================================
-- PORTFOLIO ADMIN AUTHENTICATION SETUP
-- PostgreSQL Version (Compatible with Supabase)
-- ========================================
-- This script creates the necessary tables for admin authentication
-- Run this script to set up the admin system for your portfolio

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS admin_users (
  -- Primary Key
  id SERIAL PRIMARY KEY,
  
  -- Authentication Credentials
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  
  -- Profile Information
  full_name VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'moderator')),
  
  -- Security & Session Management
  last_login_at TIMESTAMP DEFAULT NULL,
  last_login_ip VARCHAR(45) DEFAULT NULL,
  failed_login_attempts INTEGER DEFAULT 0,
  account_locked_until TIMESTAMP DEFAULT NULL,
  
  -- Password Reset
  password_reset_token VARCHAR(255) DEFAULT NULL,
  password_reset_expires TIMESTAMP DEFAULT NULL,
  
  -- Account Status
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for admin_users table
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for admin_users table
COMMENT ON TABLE admin_users IS 'Admin users with authentication, security features, and role-based access control';
COMMENT ON COLUMN admin_users.id IS 'Unique identifier for admin user';
COMMENT ON COLUMN admin_users.email IS 'Admin email address for login (unique)';
COMMENT ON COLUMN admin_users.password_hash IS 'Bcrypt hashed password (never store plain text)';
COMMENT ON COLUMN admin_users.username IS 'Admin username (unique)';
COMMENT ON COLUMN admin_users.full_name IS 'Admin full name for display';
COMMENT ON COLUMN admin_users.role IS 'Admin role level - super_admin has full access';
COMMENT ON COLUMN admin_users.last_login_at IS 'Timestamp of last successful login';
COMMENT ON COLUMN admin_users.last_login_ip IS 'IP address of last login (supports IPv4 and IPv6)';
COMMENT ON COLUMN admin_users.failed_login_attempts IS 'Counter for failed login attempts (reset on successful login)';
COMMENT ON COLUMN admin_users.account_locked_until IS 'Account lock expiration time (after too many failed attempts)';
COMMENT ON COLUMN admin_users.password_reset_token IS 'Token for password reset functionality';
COMMENT ON COLUMN admin_users.password_reset_expires IS 'Password reset token expiration timestamp';
COMMENT ON COLUMN admin_users.is_active IS 'Whether the account is active (can be used to disable accounts)';
COMMENT ON COLUMN admin_users.email_verified IS 'Whether email is verified (for enhanced security)';
COMMENT ON COLUMN admin_users.created_at IS 'When the admin account was created';
COMMENT ON COLUMN admin_users.updated_at IS 'When the record was last modified';


-- ========================================
-- ADMIN SESSIONS TABLE
-- ========================================
-- Stores active admin sessions for JWT token validation and session management

CREATE TABLE IF NOT EXISTS admin_sessions (
  -- Primary Key
  session_id VARCHAR(255) PRIMARY KEY,
  
  -- Foreign Key to Admin User
  admin_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  
  -- Session Data
  session_data TEXT,
  token_hash VARCHAR(255) NOT NULL,
  
  -- Security Information
  ip_address VARCHAR(45) DEFAULT NULL,
  user_agent TEXT DEFAULT NULL,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for admin_sessions table
CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_id ON admin_sessions(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token_hash ON admin_sessions(token_hash);

-- Create trigger to update last_activity_at timestamp
CREATE OR REPLACE FUNCTION update_last_activity_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_activity_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admin_sessions_last_activity BEFORE UPDATE ON admin_sessions
    FOR EACH ROW EXECUTE FUNCTION update_last_activity_at_column();

-- Comments for admin_sessions table
COMMENT ON TABLE admin_sessions IS 'Admin session management for JWT authentication and logout tracking';
COMMENT ON COLUMN admin_sessions.session_id IS 'Unique session identifier (UUID)';
COMMENT ON COLUMN admin_sessions.admin_id IS 'Reference to admin user who owns this session';
COMMENT ON COLUMN admin_sessions.session_data IS 'Serialized session data (JSON)';
COMMENT ON COLUMN admin_sessions.token_hash IS 'Hashed JWT token for validation';
COMMENT ON COLUMN admin_sessions.ip_address IS 'IP address of the session';
COMMENT ON COLUMN admin_sessions.user_agent IS 'Browser/device information';
COMMENT ON COLUMN admin_sessions.created_at IS 'When session was created';
COMMENT ON COLUMN admin_sessions.expires_at IS 'When session expires (for automatic cleanup)';
COMMENT ON COLUMN admin_sessions.last_activity_at IS 'Last activity timestamp';


-- ========================================
-- ADMIN ACTIVITY LOG TABLE (Optional)
-- ========================================
-- Tracks admin actions for security auditing

CREATE TABLE IF NOT EXISTS admin_activity_log (
  -- Primary Key
  id SERIAL PRIMARY KEY,
  
  -- Foreign Key to Admin User
  admin_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  
  -- Activity Information
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50) DEFAULT NULL,
  resource_id INTEGER DEFAULT NULL,
  details TEXT DEFAULT NULL,
  
  -- Request Information
  ip_address VARCHAR(45) DEFAULT NULL,
  user_agent TEXT DEFAULT NULL,
  
  -- Timestamp
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for admin_activity_log table
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_admin_id ON admin_activity_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_action ON admin_activity_log(action);
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_created_at ON admin_activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_resource ON admin_activity_log(resource_type, resource_id);

-- Comments for admin_activity_log table
COMMENT ON TABLE admin_activity_log IS 'Audit log for admin actions and security monitoring';
COMMENT ON COLUMN admin_activity_log.id IS 'Unique identifier for log entry';
COMMENT ON COLUMN admin_activity_log.admin_id IS 'Admin user who performed the action';
COMMENT ON COLUMN admin_activity_log.action IS 'Action performed (e.g., "login", "logout", "update_contact", "delete_message")';
COMMENT ON COLUMN admin_activity_log.resource_type IS 'Type of resource affected (e.g., "contact", "admin_user")';
COMMENT ON COLUMN admin_activity_log.resource_id IS 'ID of the affected resource';
COMMENT ON COLUMN admin_activity_log.details IS 'Additional details about the action (JSON format)';
COMMENT ON COLUMN admin_activity_log.ip_address IS 'IP address from which action was performed';
COMMENT ON COLUMN admin_activity_log.user_agent IS 'Browser/device information';
COMMENT ON COLUMN admin_activity_log.created_at IS 'When the action was performed';


