#!/usr/bin/env node

/**
 * Super Admin Setup Script
 * 
 * This script creates a single super admin user in the database
 * for your portfolio website. Run this ONCE during initial setup.
 * 
 * Usage:
 *   node setup-super-admin.js
 * 
 * The script will prompt you for:
 *   - Email address
 *   - Password (will be hashed with bcrypt)
 *   - Full name
 *   - Username
 */

const readline = require('readline');
const Admin = require('./models/Admin');
const { promisePool } = require('./config/database');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Prompt user for input
 */
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
function isStrongPassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return password.length >= 8 &&
         /[A-Z]/.test(password) &&
         /[a-z]/.test(password) &&
         /[0-9]/.test(password);
}

/**
 * Check if super admin already exists
 */
async function checkExistingSuperAdmin() {
  try {
    const [rows] = await promisePool.execute(
      'SELECT COUNT(*) as count FROM admin_users WHERE role = "super_admin"'
    );
    return rows[0].count > 0;
  } catch (error) {
    console.error('Error checking existing super admin:', error);
    throw error;
  }
}

/**
 * Check if email already exists
 */
async function emailExists(email) {
  try {
    const admin = await Admin.findByEmail(email);
    return admin !== null;
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
}

/**
 * Main setup function
 */
async function setupSuperAdmin() {
  console.log(`\n${colors.bright}${colors.cyan}========================================`);
  console.log(`  SUPER ADMIN SETUP FOR PORTFOLIO`);
  console.log(`========================================${colors.reset}\n`);

  try {
    // Check if super admin already exists
    const superAdminExists = await checkExistingSuperAdmin();
    
    if (superAdminExists) {
      console.log(`${colors.yellow}⚠️  A super admin already exists in the database!${colors.reset}\n`);
      const overwrite = await question('Do you want to create another admin user? (yes/no): ');
      
      if (overwrite.toLowerCase() !== 'yes' && overwrite.toLowerCase() !== 'y') {
        console.log(`${colors.blue}Setup cancelled.${colors.reset}\n`);
        rl.close();
        process.exit(0);
      }
    }

    // Collect admin information
    console.log(`${colors.bright}Please enter the super admin details:${colors.reset}\n`);

    // Email
    let email;
    while (true) {
      email = await question('Email address: ');
      
      if (!isValidEmail(email)) {
        console.log(`${colors.red}❌ Invalid email format. Please try again.${colors.reset}`);
        continue;
      }

      const exists = await emailExists(email);
      if (exists) {
        console.log(`${colors.red}❌ This email already exists. Please use a different email.${colors.reset}`);
        continue;
      }

      break;
    }

    // Password
    let password;
    while (true) {
      password = await question('Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number): ');
      
      if (!isStrongPassword(password)) {
        console.log(`${colors.red}❌ Password is too weak. Please use at least 8 characters with 1 uppercase, 1 lowercase, and 1 number.${colors.reset}`);
        continue;
      }

      const confirmPassword = await question('Confirm password: ');
      
      if (password !== confirmPassword) {
        console.log(`${colors.red}❌ Passwords do not match. Please try again.${colors.reset}`);
        continue;
      }

      break;
    }

    // Full name
    const fullName = await question('Full name: ');

    // Username
    let username;
    while (true) {
      username = await question('Username (3-50 characters): ');
      
      if (username.length < 3 || username.length > 50) {
        console.log(`${colors.red}❌ Username must be between 3 and 50 characters.${colors.reset}`);
        continue;
      }

      // Check if username exists
      try {
        const [rows] = await promisePool.execute(
          'SELECT id FROM admin_users WHERE username = ?',
          [username]
        );
        
        if (rows.length > 0) {
          console.log(`${colors.red}❌ Username already exists. Please choose another.${colors.reset}`);
          continue;
        }
      } catch (error) {
        console.error('Error checking username:', error);
      }

      break;
    }

    // Confirm details
    console.log(`\n${colors.bright}${colors.cyan}Please confirm the details:${colors.reset}`);
    console.log(`${colors.bright}Email:${colors.reset}     ${email}`);
    console.log(`${colors.bright}Full Name:${colors.reset} ${fullName}`);
    console.log(`${colors.bright}Username:${colors.reset}  ${username}`);
    console.log(`${colors.bright}Role:${colors.reset}      super_admin\n`);

    const confirm = await question('Create this super admin? (yes/no): ');

    if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
      console.log(`${colors.blue}Setup cancelled.${colors.reset}\n`);
      rl.close();
      process.exit(0);
    }

    // Create super admin
    console.log(`\n${colors.yellow}Creating super admin...${colors.reset}`);

    const adminId = await Admin.create({
      email,
      password,
      username,
      full_name: fullName,
      role: 'super_admin'
    });

    // Mark email as verified for super admin
    await promisePool.execute(
      'UPDATE admin_users SET email_verified = TRUE WHERE id = ?',
      [adminId]
    );

    console.log(`\n${colors.bright}${colors.green}✅ SUCCESS!${colors.reset}`);
    console.log(`${colors.green}Super admin created successfully!${colors.reset}\n`);
    console.log(`${colors.bright}${colors.cyan}Admin Details:${colors.reset}`);
    console.log(`${colors.bright}ID:${colors.reset}        ${adminId}`);
    console.log(`${colors.bright}Email:${colors.reset}     ${email}`);
    console.log(`${colors.bright}Username:${colors.reset}  ${username}`);
    console.log(`${colors.bright}Role:${colors.reset}      super_admin`);
    console.log(`\n${colors.yellow}⚠️  IMPORTANT: Keep these credentials safe!${colors.reset}`);
    console.log(`${colors.yellow}You will use these to log into your admin dashboard.${colors.reset}\n`);

    console.log(`${colors.bright}${colors.cyan}Next Steps:${colors.reset}`);
    console.log(`1. Start the server: ${colors.green}npm start${colors.reset}`);
    console.log(`2. Navigate to: ${colors.green}http://localhost:5000/admin/login${colors.reset}`);
    console.log(`3. Log in with your email and password\n`);

  } catch (error) {
    console.error(`\n${colors.red}❌ Error creating super admin:${colors.reset}`, error.message);
    
    if (error.code === 'ER_DUP_ENTRY') {
      console.log(`${colors.yellow}This email or username already exists in the database.${colors.reset}\n`);
    }
  } finally {
    rl.close();
    process.exit(0);
  }
}

// Test database connection first
async function testConnection() {
  try {
    await promisePool.execute('SELECT 1');
    console.log(`${colors.green}✅ Database connection successful${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}❌ Database connection failed:${colors.reset}`, error.message);
    console.log(`\n${colors.yellow}Please check your database configuration in .env file${colors.reset}\n`);
    return false;
  }
}

// Run the setup
(async () => {
  const connected = await testConnection();
  if (connected) {
    await setupSuperAdmin();
  } else {
    rl.close();
    process.exit(1);
  }
})();
