const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/**
 * Middleware to verify JWT token and authenticate admin users
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies?.adminToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authentication token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if session exists and is valid
    const sessionValid = await Admin.verifySession(decoded.sessionId, decoded.adminId);
    
    if (!sessionValid) {
      return res.status(401).json({
        success: false,
        message: 'Session expired or invalid. Please login again.'
      });
    }

    // Get admin user details
    const admin = await Admin.findById(decoded.adminId);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin user not found or inactive.'
      });
    }

    // Attach admin info to request object
    req.admin = {
      id: admin.id,
      email: admin.email,
      username: admin.username,
      full_name: admin.full_name,
      role: admin.role,
      sessionId: decoded.sessionId
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token.'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Authentication token expired. Please login again.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Authentication failed. Please try again.'
    });
  }
};

/**
 * Middleware to check if admin has specific role
 * @param {Array<string>} roles - Array of allowed roles
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }

    next();
  };
};

/**
 * Optional authentication - continues even if no token
 * Useful for routes that have different behavior for authenticated vs non-authenticated users
 */
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.adminToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
      req.admin = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sessionValid = await Admin.verifySession(decoded.sessionId, decoded.adminId);

    if (sessionValid) {
      const admin = await Admin.findById(decoded.adminId);
      if (admin) {
        req.admin = {
          id: admin.id,
          email: admin.email,
          username: admin.username,
          full_name: admin.full_name,
          role: admin.role,
          sessionId: decoded.sessionId
        };
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    req.admin = null;
    next();
  }
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  optionalAuth
};
