-- PostgreSQL Schema for Portfolio Database
-- Compatible with Supabase

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  -- Primary Key
  id SERIAL PRIMARY KEY,
  
  -- Contact Information
  name VARCHAR(100) NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) NOT NULL CHECK (char_length(subject) >= 5 AND char_length(subject) <= 200),
  message TEXT NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 1000),
  
  -- Metadata
  ip_address VARCHAR(45) DEFAULT NULL,
  user_agent TEXT DEFAULT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP DEFAULT NULL
);

-- Create indexes for contacts table
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_status_created ON contacts(status, created_at DESC);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for contacts table
COMMENT ON TABLE contacts IS 'Contact form submissions from portfolio visitors';
COMMENT ON COLUMN contacts.id IS 'Unique identifier for each contact submission';
COMMENT ON COLUMN contacts.name IS 'Full name of the person contacting (2-100 characters)';
COMMENT ON COLUMN contacts.email IS 'Email address for correspondence';
COMMENT ON COLUMN contacts.subject IS 'Brief subject of the message (5-200 characters)';
COMMENT ON COLUMN contacts.message IS 'Detailed message content (10-1000 characters)';
COMMENT ON COLUMN contacts.ip_address IS 'IP address of the submitter (supports IPv4 and IPv6)';
COMMENT ON COLUMN contacts.user_agent IS 'Browser/device information';
COMMENT ON COLUMN contacts.status IS 'Processing status of the message';
COMMENT ON COLUMN contacts.created_at IS 'When the message was submitted';
COMMENT ON COLUMN contacts.updated_at IS 'When the record was last modified';
COMMENT ON COLUMN contacts.read_at IS 'When the message was first read';


-- Admin Users Table for Authentication
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
  
  -- Security Fields
  last_login_at TIMESTAMP DEFAULT NULL,
  last_login_ip VARCHAR(45) DEFAULT NULL,
  failed_login_attempts INTEGER DEFAULT 0,
  account_locked_until TIMESTAMP DEFAULT NULL,
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

-- Create trigger to update admin_users updated_at timestamp
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for admin_users table
COMMENT ON TABLE admin_users IS 'Admin users with authentication and security features';
COMMENT ON COLUMN admin_users.id IS 'Unique identifier for admin user';
COMMENT ON COLUMN admin_users.email IS 'Admin email address for login';
COMMENT ON COLUMN admin_users.password_hash IS 'Bcrypt hashed password';
COMMENT ON COLUMN admin_users.username IS 'Admin username';
COMMENT ON COLUMN admin_users.full_name IS 'Admin full name';
COMMENT ON COLUMN admin_users.role IS 'Admin role level';
COMMENT ON COLUMN admin_users.last_login_at IS 'Last successful login timestamp';
COMMENT ON COLUMN admin_users.last_login_ip IS 'IP address of last login';
COMMENT ON COLUMN admin_users.failed_login_attempts IS 'Counter for failed login attempts';
COMMENT ON COLUMN admin_users.account_locked_until IS 'Account lock expiration time';
COMMENT ON COLUMN admin_users.password_reset_token IS 'Token for password reset';
COMMENT ON COLUMN admin_users.password_reset_expires IS 'Password reset token expiration';
COMMENT ON COLUMN admin_users.is_active IS 'Whether the account is active';
COMMENT ON COLUMN admin_users.email_verified IS 'Whether email is verified';
COMMENT ON COLUMN admin_users.created_at IS 'When the admin account was created';
COMMENT ON COLUMN admin_users.updated_at IS 'When the record was last modified';


-- Admin Sessions Table for Session Management
CREATE TABLE IF NOT EXISTS admin_sessions (
  -- Primary Key
  session_id VARCHAR(255) PRIMARY KEY,
  
  -- Foreign Key
  admin_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  
  -- Session Data
  session_data TEXT,
  token_hash VARCHAR(255) NOT NULL,
  
  -- Security
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

-- Create trigger to update admin_sessions last_activity_at timestamp
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
COMMENT ON TABLE admin_sessions IS 'Admin session tracking for security and authentication';
COMMENT ON COLUMN admin_sessions.session_id IS 'Unique session identifier';
COMMENT ON COLUMN admin_sessions.admin_id IS 'Reference to admin user';
COMMENT ON COLUMN admin_sessions.session_data IS 'Serialized session data';
COMMENT ON COLUMN admin_sessions.token_hash IS 'Hashed JWT token for validation';
COMMENT ON COLUMN admin_sessions.ip_address IS 'IP address of the session';
COMMENT ON COLUMN admin_sessions.user_agent IS 'Browser/device information';
COMMENT ON COLUMN admin_sessions.created_at IS 'When session was created';
COMMENT ON COLUMN admin_sessions.expires_at IS 'When session expires';
COMMENT ON COLUMN admin_sessions.last_activity_at IS 'Last activity timestamp';
