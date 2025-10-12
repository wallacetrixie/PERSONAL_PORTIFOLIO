const express = require('express');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const authController = require('../controllers/authController');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: {
    success: false,
    message: 'Too many login attempts. Please try again in 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skipSuccessfulRequests: true // Don't count successful requests
});

// General rate limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Validation rules for login
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('rememberMe')
    .optional()
    .isBoolean().withMessage('Remember me must be a boolean value')
];

/**
 * @route   POST /api/auth/login
 * @desc    Admin login
 * @access  Public
 */
router.post(
  '/login',
  loginLimiter,
  loginValidation,
  handleValidationErrors,
  authController.login
);

/**
 * @route   POST /api/auth/logout
 * @desc    Admin logout
 * @access  Private
 */
router.post(
  '/logout',
  authLimiter,
  authenticateToken,
  authController.logout
);

/**
 * @route   GET /api/auth/verify
 * @desc    Verify token and get admin status
 * @access  Private
 */
router.get(
  '/verify',
  authLimiter,
  authenticateToken,
  authController.verifyToken
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current admin profile
 * @access  Private
 */
router.get(
  '/me',
  authLimiter,
  authenticateToken,
  authController.getCurrentAdmin
);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh authentication token
 * @access  Private
 */
router.post(
  '/refresh',
  authLimiter,
  authenticateToken,
  authController.refreshToken
);

module.exports = router;
