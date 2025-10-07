const express = require('express');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const ContactController = require('../controllers/contactController');
const { validateRequest } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Rate limiter for contact form submissions
const contactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    success: false,
    message: 'Too many contact form submissions from this IP. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false
});

// Rate limiter for admin contact management endpoints
const adminContactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  message: {
    success: false,
    message: 'Too many requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Validation rules for contact form
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters')
    .escape(), // XSS protection
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Subject must not exceed 500 characters')
    .escape(),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters')
    .escape() // XSS protection
];

// Public Routes
router.post('/contact', contactFormLimiter, contactValidation, validateRequest, ContactController.createContact);
router.get('/health', ContactController.healthCheck);

// Protected Admin Routes - Require Authentication
router.get('/contacts', authenticateToken, adminContactLimiter, ContactController.getAllContacts);
router.get('/contacts/:id', authenticateToken, adminContactLimiter, ContactController.getContactById);
router.patch('/contacts/:id/status', authenticateToken, adminContactLimiter, ContactController.updateContactStatus);
router.delete('/contacts/:id', authenticateToken, adminContactLimiter, ContactController.deleteContact);

module.exports = router;
