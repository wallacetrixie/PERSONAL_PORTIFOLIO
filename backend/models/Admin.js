const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class Admin {
  /**
   * Find an admin user by email
   * @param {string} email - Admin email
   * @returns {Promise<Object|null>} Admin user object or null
   */
  static async findByEmail(email) {
    try {
      const result = await pool.query(
        'SELECT * FROM admin_users WHERE email = $1 AND is_active = TRUE',
        [email]
      );
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error finding admin by email:', error);
      throw error;
    }
  }

  /**
   * Find an admin user by ID
   * @param {number} id - Admin user ID
   * @returns {Promise<Object|null>} Admin user object or null
   */
  static async findById(id) {
    try {
      const result = await pool.query(
        'SELECT id, email, username, full_name, role, last_login_at, is_active, email_verified, created_at FROM admin_users WHERE id = $1 AND is_active = TRUE',
        [id]
      );
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error finding admin by ID:', error);
      throw error;
    }
  }

  /**
   * 
   * @param {string} plainPassword - Plain text password
   * @param {string} hashedPassword - Hashed password from database
   * @returns {Promise<boolean>} True if password matches
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error('Error verifying password:', error);
      throw error;
    }
  }

  /**
   * Hash a password
   * @param {string} password 
   * @returns {Promise<string>} 
   */
  static async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(12);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  }

    /** 
   * @param {number} adminId - 
   * @param {string} ipAddress -
   * @returns {Promise<void>}
   */
  static async updateLastLogin(adminId, ipAddress) {
    try {
      await pool.query(
        'UPDATE admin_users SET last_login_at = CURRENT_TIMESTAMP, last_login_ip = $1, failed_login_attempts = 0 WHERE id = $2',
        [ipAddress, adminId]
      );
    } catch (error) {
      console.error('Error updating last login:', error);
      throw error;
    }
  }

  /**
   * Increment failed login attempts
   * @param {string} email - Admin email
   * @returns {Promise<number>} Number of failed attempts
   */
  static async incrementFailedAttempts(email) {
    try {
      // Increment failed attempts
      await pool.query(
        'UPDATE admin_users SET failed_login_attempts = failed_login_attempts + 1 WHERE email = $1',
        [email]
      );

      // Get current count
      const result = await pool.query(
        'SELECT failed_login_attempts FROM admin_users WHERE email = $1',
        [email]
      );

      const attempts = result.rows.length > 0 ? result.rows[0].failed_login_attempts : 0;

      // Lock account if too many attempts (5 or more)
      if (attempts >= 5) {
        const lockDuration = 15; // 15 minutes
        await pool.query(
          'UPDATE admin_users SET account_locked_until = CURRENT_TIMESTAMP + INTERVAL \'$1 minutes\' WHERE email = $2',
          [lockDuration, email]
        );
      }

      return attempts;
    } catch (error) {
      console.error('Error incrementing failed attempts:', error);
      throw error;
    }
  }

  /**
   * Check if account is locked
   * @param {Object} admin - Admin user object
   * @returns {boolean} True if account is locked
   */
  static isAccountLocked(admin) {
    if (!admin.account_locked_until) {
      return false;
    }
    return new Date(admin.account_locked_until) > new Date();
  }

  /**
   * Create a new admin user
   * @param {Object} adminData - Admin user data
   * @returns {Promise<number>} ID of created admin
   */
  static async create(adminData) {
    try {
      const { email, password, username, full_name, role = 'admin' } = adminData;
      const hashedPassword = await this.hashPassword(password);

      const result = await pool.query(
        'INSERT INTO admin_users (email, password_hash, username, full_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [email, hashedPassword, username, full_name, role]
      );

      return result.rows[0].id;
    } catch (error) {
      console.error('Error creating admin user:', error);
      throw error;
    }
  }

  /**
   * Store session in database
   * @param {string} sessionId - Session identifier
   * @param {number} adminId - Admin user ID
   * @param {string} tokenHash - Hashed JWT token
   * @param {string} ipAddress - IP address
   * @param {string} userAgent - User agent string
   * @param {number} expiresInHours - Expiration time in hours
   * @returns {Promise<void>}
   */
  static async createSession(sessionId, adminId, tokenHash, ipAddress, userAgent, expiresInHours = 24) {
    try {
      await pool.query(
        `INSERT INTO admin_sessions (session_id, admin_id, token_hash, ip_address, user_agent, expires_at) 
         VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP + INTERVAL '${expiresInHours} hours')`,
        [sessionId, adminId, tokenHash, ipAddress, userAgent]
      );
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  /**
   * Verify session exists and is valid
   * @param {string} sessionId - Session identifier
   * @param {number} adminId - Admin user ID
   * @returns {Promise<boolean>} True if session is valid
   */
  static async verifySession(sessionId, adminId) {
    try {
      const result = await pool.query(
        'SELECT * FROM admin_sessions WHERE session_id = $1 AND admin_id = $2 AND expires_at > CURRENT_TIMESTAMP',
        [sessionId, adminId]
      );
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error verifying session:', error);
      throw error;
    }
  }

  /**
   * Delete session (logout)
   * @param {string} sessionId - Session identifier
   * @returns {Promise<void>}
   */
  static async deleteSession(sessionId) {
    try {
      await pool.query(
        'DELETE FROM admin_sessions WHERE session_id = $1',
        [sessionId]
      );
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  }

  /**
   * Clean up expired sessions
   * @returns {Promise<void>}
   */
  static async cleanupExpiredSessions() {
    try {
      await pool.query(
        'DELETE FROM admin_sessions WHERE expires_at < CURRENT_TIMESTAMP'
      );
    } catch (error) {
      console.error('Error cleaning up expired sessions:', error);
      throw error;
    }
  }
}

module.exports = Admin;
