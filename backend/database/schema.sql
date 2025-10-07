
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
