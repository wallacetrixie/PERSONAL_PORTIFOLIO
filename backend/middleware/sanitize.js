/**
 * Input Sanitization Middleware
 * Provides additional XSS protection beyond express-validator
 */

const xss = require('xss');
const sanitizeInputs = (req, res, next) => {
  // Sanitize body
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  // Sanitize query parameters
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  // Sanitize URL parameters
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
};

/**
 * Recursively sanitize an object
 */
const sanitizeObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return sanitizeValue(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  const sanitized = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      sanitized[key] = sanitizeObject(obj[key]);
    }
  }
  return sanitized;
};

/**
 * Sanitize a single value
 */
const sanitizeValue = (value) => {
  if (typeof value === 'string') {
    // Remove any potential XSS threats
    return xss(value, {
      whiteList: {}, // No HTML tags allowed
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script', 'style']
    });
  }
  return value;
};

/**
 * Sanitize HTML content (for fields that may contain safe HTML)
 
 */
const sanitizeHTML = (html) => {
  return xss(html, {
    whiteList: {
      p: [],
      br: [],
      strong: [],
      em: [],
      u: [],
      a: ['href', 'title'],
      ul: [],
      ol: [],
      li: []
    },
    stripIgnoreTag: true
  });
};

module.exports = {
  sanitizeInputs,
  sanitizeHTML
};
