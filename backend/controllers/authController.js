const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const Admin = require('../models/Admin');

/**
 * Get client IP address
 */
const getClientIp = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress;
};

/**
 * Generate JWT token
 */
const generateToken = (adminId, sessionId, rememberMe = false) => {
  const expiresIn = rememberMe ? '30d' : '24h';
  return jwt.sign(
    { adminId, sessionId },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

/**
 * Admin Login
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password, rememberMe = false } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    // Find admin by email
    const admin = await Admin.findByEmail(email);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // Check if account is locked
    if (Admin.isAccountLocked(admin)) {
      const lockUntil = new Date(admin.account_locked_until);
      const minutesLeft = Math.ceil((lockUntil - new Date()) / 60000);
      return res.status(423).json({
        success: false,
        message: `Account is temporarily locked due to multiple failed login attempts. Try again in ${minutesLeft} minute(s).`
      });
    }

    // Verify password
    const isPasswordValid = await Admin.verifyPassword(password, admin.password_hash);

    if (!isPasswordValid) {
      // Increment failed attempts
      const attempts = await Admin.incrementFailedAttempts(email);
      const remainingAttempts = Math.max(0, 5 - attempts);

      if (remainingAttempts === 0) {
        return res.status(423).json({
          success: false,
          message: 'Account locked due to multiple failed login attempts. Try again in 15 minutes.'
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
        remainingAttempts
      });
    }

    // Generate session ID and token
    const sessionId = uuidv4();
    const token = generateToken(admin.id, sessionId, rememberMe);
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Get client info
    const ipAddress = getClientIp(req);
    const userAgent = req.headers['user-agent'] || 'Unknown';

    // Create session in database
    const expiresInHours = rememberMe ? 24 * 30 : 24; // 30 days or 24 hours
    await Admin.createSession(sessionId, admin.id, tokenHash, ipAddress, userAgent, expiresInHours);

    // Update last login info
    await Admin.updateLastLogin(admin.id, ipAddress);

    // Set HTTP-only cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 // 30 days or 24 hours
    });

    // Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          username: admin.username,
          full_name: admin.full_name,
          role: admin.role
        },
        token // Also send in response for localStorage option
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login. Please try again.'
    });
  }
};

/**
 * Admin Logout
 * POST /api/auth/logout
 */
exports.logout = async (req, res) => {
  try {
    const sessionId = req.admin?.sessionId;

    if (sessionId) {
      // Delete session from database
      await Admin.deleteSession(sessionId);
    }

    // Clear cookie
    res.clearCookie('adminToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during logout.'
    });
  }
};

/**
 * Verify Token / Get Current Admin
 * GET /api/auth/verify
 */
exports.verifyToken = async (req, res) => {
  try {
    // If we reach here, the authenticateToken middleware has already verified the token
    res.status(200).json({
      success: true,
      message: 'Token is valid',
      data: {
        admin: req.admin
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during token verification.'
    });
  }
};

/**
 * Get Current Admin Profile
 * GET /api/auth/me
 */
exports.getCurrentAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin user not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          username: admin.username,
          full_name: admin.full_name,
          role: admin.role,
          last_login_at: admin.last_login_at,
          created_at: admin.created_at
        }
      }
    });

  } catch (error) {
    console.error('Get current admin error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching admin profile.'
    });
  }
};

/**
 * Refresh Token
 * POST /api/auth/refresh
 */
exports.refreshToken = async (req, res) => {
  try {
    const { rememberMe = false } = req.body;
    const oldSessionId = req.admin.sessionId;

    // Delete old session
    await Admin.deleteSession(oldSessionId);

    // Generate new session
    const sessionId = uuidv4();
    const token = generateToken(req.admin.id, sessionId, rememberMe);
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const ipAddress = getClientIp(req);
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const expiresInHours = rememberMe ? 24 * 30 : 24;

    await Admin.createSession(sessionId, req.admin.id, tokenHash, ipAddress, userAgent, expiresInHours);

    // Set new cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: { token }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while refreshing token.'
    });
  }
};
