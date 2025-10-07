const express = require('express');
const { body } = require('express-validator');
const ContactController = require('../controllers/contactController');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Validation rules for contact form
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  
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
    .withMessage('Subject must not exceed 500 characters'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters')
];

// Routes
router.post('/contact', contactValidation, validateRequest, ContactController.createContact);
router.get('/contacts', ContactController.getAllContacts);
router.get('/contacts/:id', ContactController.getContactById);
router.delete('/contacts/:id', ContactController.deleteContact);
router.get('/health', ContactController.healthCheck);

module.exports = router;
