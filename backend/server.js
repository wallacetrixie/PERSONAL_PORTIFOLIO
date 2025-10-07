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

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());


const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Request logging middleware (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use('/api', contactRoutes);
app.use('/api/auth', authRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      contact: 'POST /api/contact',
      getContacts: 'GET /api/contacts',
      getContact: 'GET /api/contacts/:id',
      updateContactStatus: 'PATCH /api/contacts/:id/status',
      deleteContact: 'DELETE /api/contacts/:id',
      health: 'GET /api/health',
      // Auth endpoints
      login: 'POST /api/auth/login',
      logout: 'POST /api/auth/logout',
      verifyToken: 'GET /api/auth/verify',
      getCurrentAdmin: 'GET /api/auth/me',
      refreshToken: 'POST /api/auth/refresh'
    }
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('⚠️  Database connection failed. Please check your configuration.');
      console.log('💡 Run "npm run init-db" to initialize the database first.');
      process.exit(1);
    }

    // Verify email configuration (non-blocking)
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
      console.log(`📧 Contact endpoint: http://localhost:${PORT}/api/contact\n`);
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
  process.exit(1);
});
