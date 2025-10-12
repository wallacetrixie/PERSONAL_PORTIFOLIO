#!/usr/bin/env node
/**
 * Email Service Test Script
 * Tests the email notification functionality
 */

require('dotenv').config();
const { sendContactNotification, verifyEmailConfig } = require('./services/emailService');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}\n`),
};

async function testEmailService() {
  log.header('📧 Email Service Test');

  // Check if email is configured
  log.info('Checking email configuration...');
  
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    log.error('Email service is not configured!');
    log.warning('Please set the following environment variables in your .env file:');
    console.log('  - SMTP_HOST');
    console.log('  - SMTP_PORT');
    console.log('  - SMTP_USER');
    console.log('  - SMTP_PASS');
    console.log('  - NOTIFICATION_EMAIL');
    console.log('\nSee EMAIL_SETUP_GUIDE.md for detailed instructions.');
    process.exit(1);
  }

  log.info(`SMTP Host: ${process.env.SMTP_HOST}`);
  log.info(`SMTP Port: ${process.env.SMTP_PORT || 587}`);
  log.info(`SMTP User: ${process.env.SMTP_USER}`);
  log.info(`Notification Email: ${process.env.NOTIFICATION_EMAIL}`);

  // Step 1: Verify SMTP connection
  log.header('Step 1: Verifying SMTP connection...');
  try {
    const isValid = await verifyEmailConfig();
    if (isValid) {
      log.success('SMTP connection verified successfully!');
    } else {
      log.error('SMTP connection verification failed');
      process.exit(1);
    }
  } catch (error) {
    log.error(`SMTP verification error: ${error.message}`);
    log.warning('Common issues:');
    console.log('  1. Incorrect SMTP credentials');
    console.log('  2. App Password not generated (for Gmail)');
    console.log('  3. 2-Step Verification not enabled');
    console.log('  4. Firewall blocking SMTP port');
    process.exit(1);
  }

  // Step 2: Send test email
  log.header('Step 2: Sending test email...');
  
  const testContact = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Email Service Test',
    message: 'This is a test message from your portfolio email service.\n\nIf you receive this email, your email notification system is working correctly! 🎉',
    created_at: new Date().toISOString(),
  };

  try {
    const result = await sendContactNotification(testContact);
    log.success(`Test email sent successfully!`);
    log.info(`Message ID: ${result.messageId}`);
    log.header('✨ Email service is working correctly!');
    console.log(`\n📬 Check your inbox at: ${process.env.NOTIFICATION_EMAIL}`);
    console.log('💡 Don\'t forget to check your spam folder if you don\'t see it.');
  } catch (error) {
    log.error(`Failed to send test email: ${error.message}`);
    log.warning('Possible issues:');
    console.log('  1. Invalid email credentials');
    console.log('  2. SMTP server rejecting connection');
    console.log('  3. Network/firewall issues');
    console.log(`\nFull error: ${error.stack}`);
    process.exit(1);
  }
}

// Run the test
testEmailService()
  .then(() => {
    console.log('\n✅ All tests passed!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  });
