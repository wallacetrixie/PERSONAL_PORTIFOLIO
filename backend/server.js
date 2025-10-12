const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { testConnection } = require('./config/database');
const { verifyEmailConfig } = require('./services/emailService');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { sanitizeInputs } = require('./middleware/sanitize');

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced Helmet configuration for production security
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  frameguard: {
    action: 'deny'
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));


const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie']
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '10kb' })); // Limit body size to prevent DoS
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

// Input sanitization middleware - applies to all routes
app.use(sanitizeInputs);

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

app.use('/api', contactRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio Backend API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      contact: 'POST /api/contact',
      getContacts: 'GET /api/contacts (Protected)',
      getContact: 'GET /api/contacts/:id (Protected)',
      updateContactStatus: 'PATCH /api/contacts/:id/status (Protected)',
      deleteContact: 'DELETE /api/contacts/:id (Protected)',
      health: 'GET /api/health',
      login: 'POST /api/auth/login',
      logout: 'POST /api/auth/logout (Protected)',
      verifyToken: 'GET /api/auth/verify (Protected)',
      getCurrentAdmin: 'GET /api/auth/me (Protected)',
      refreshToken: 'POST /api/auth/refresh (Protected)'
    }
  });
});

app.use(notFound);
app.use(errorHandler);

// Validate required environment variables
const validateEnv = () => {
  const required = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.join(', '));
    console.log('💡 Please check your .env file');
    process.exit(1);
  }

  // Validate JWT_SECRET strength
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.error('❌ JWT_SECRET is too weak. Must be at least 32 characters.');
    process.exit(1);
  }

  // Warn about development mode in production
  if (process.env.NODE_ENV === 'production' && process.env.FRONTEND_URL?.includes('localhost')) {
    console.warn('⚠️  WARNING: FRONTEND_URL contains localhost in production environment');
  }
};

const startServer = async () => {
  try {
    // Validate environment variables first
    validateEnv();

    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('⚠️  Database connection failed. Please check your configuration.');
      console.log('💡 Run "npm run init-db" to initialize the database first.');
      process.exit(1);
    }

    verifyEmailConfig()
      .then((isVerified) => {
        if (isVerified) {
          console.log('✅ Email service is configured and ready');
        } else {
          console.warn('⚠️  Email service configuration needs attention');
          console.log('💡 Check EMAIL_SETUP_GUIDE.md for configuration instructions');
        }
      })
      .catch((error) => {
        console.warn('⚠️  Email service not configured:', error.message);
        console.log('💡 Contact form will work but email notifications are disabled');
      });

    app.listen(PORT, () => {
      console.log('\n🚀 Server is running!');
      console.log(`📍 Port: ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API URL: http://localhost:${PORT}`);
      console.log(`📧 Contact endpoint: http://localhost:${PORT}/api/contact`);
      
      if (process.env.NODE_ENV === 'production') {
        console.log('\n🔒 Production mode: Security features enabled');
      } else {
        console.log('\n⚠️  Development mode: Some security features relaxed');
      }
      console.log('');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // In production, gracefully shutdown
  if (process.env.NODE_ENV === 'production') {
    console.log('Shutting down server due to unhandled rejection...');
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.log('Shutting down server due to uncaught exception...');
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});
