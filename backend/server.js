const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { testConnection } = require('./config/database');
const contactRoutes = require('./routes/contact');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use('/api', contactRoutes);

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
      deleteContact: 'DELETE /api/contacts/:id',
      health: 'GET /api/health'
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
