#!/usr/bin/env node

/**
 * Production Deployment Configuration Helper
 * Helps generate secure secrets and validate environment variables
 */

const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🚀 Portfolio Backend - Production Deployment Helper\n');
console.log('This tool will help you:');
console.log('1. Generate secure secrets');
console.log('2. Create environment variables template');
console.log('3. Validate your configuration\n');

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function generateSecret() {
  return crypto.randomBytes(64).toString('hex');
}

async function main() {
  console.log('='.repeat(60));
  console.log('STEP 1: Generate Secure Secrets');
  console.log('='.repeat(60));
  
  const jwtSecret = generateSecret();
  const sessionSecret = generateSecret();
  
  console.log('\n✅ Generated JWT_SECRET:');
  console.log(jwtSecret);
  console.log('\n✅ Generated SESSION_SECRET:');
  console.log(sessionSecret);
  
  console.log('\n' + '='.repeat(60));
  console.log('STEP 2: Collect Information');
  console.log('='.repeat(60));
  
  console.log('\n📋 Please provide the following information:\n');
  
  const frontendUrl = await question('Frontend URL (e.g., https://yoursite.com): ');
  const railwayHost = await question('Railway DB_HOST (from Railway Variables tab): ');
  const railwayPort = await question('Railway DB_PORT (default: 6123): ') || '6123';
  const railwayUser = await question('Railway DB_USER (default: root): ') || 'root';
  const railwayPassword = await question('Railway DB_PASSWORD: ');
  const railwayDatabase = await question('Railway DB_NAME (default: railway): ') || 'railway';
  
  console.log('\n📧 Email Configuration:\n');
  const smtpUser = await question('Gmail Email Address: ');
  const smtpPass = await question('Gmail App Password (16 characters): ');
  const notificationEmail = await question('Notification Email (or press Enter for same): ') || smtpUser;
  
  console.log('\n' + '='.repeat(60));
  console.log('STEP 3: Environment Variables Configuration');
  console.log('='.repeat(60));
  
  const envConfig = `
# ============================================================
# PRODUCTION ENVIRONMENT VARIABLES FOR RENDER
# Copy and paste these into Render Environment Variables
# ============================================================

# Server Configuration
NODE_ENV=production
PORT=5000

# MySQL Database Configuration (from Railway)
DB_HOST=${railwayHost}
DB_USER=${railwayUser}
DB_PASSWORD=${railwayPassword}
DB_NAME=${railwayDatabase}
DB_PORT=${railwayPort}

# CORS Configuration
FRONTEND_URL=${frontendUrl}

# JWT Authentication (Generated Securely)
JWT_SECRET=${jwtSecret}
JWT_EXPIRES_IN=7d

# Session Secret (Generated Securely)
SESSION_SECRET=${sessionSecret}

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=${smtpUser}
SMTP_PASS=${smtpPass}
NOTIFICATION_EMAIL=${notificationEmail}

# Rate Limiting (Optional - recommended defaults)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CONTACT_RATE_LIMIT=3
LOGIN_RATE_LIMIT=5

# Security (Optional - recommended defaults)
BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=900000
`;

  console.log('\n✅ Your Production Environment Variables:\n');
  console.log(envConfig);
  
  console.log('\n' + '='.repeat(60));
  console.log('STEP 4: Validation');
  console.log('='.repeat(60));
  
  const validations = [
    {
      name: 'JWT_SECRET length',
      valid: jwtSecret.length === 128,
      message: 'Should be 128 characters (64 bytes hex)'
    },
    {
      name: 'SESSION_SECRET length',
      valid: sessionSecret.length === 128,
      message: 'Should be 128 characters (64 bytes hex)'
    },
    {
      name: 'Frontend URL format',
      valid: frontendUrl.startsWith('http://') || frontendUrl.startsWith('https://'),
      message: 'Should start with http:// or https://'
    },
    {
      name: 'Railway DB_HOST format',
      valid: railwayHost.includes('railway.app') || railwayHost.includes('.'),
      message: 'Should be a valid hostname'
    },
    {
      name: 'Railway DB_PORT',
      valid: !isNaN(railwayPort) && parseInt(railwayPort) > 0,
      message: 'Should be a valid port number'
    },
    {
      name: 'Gmail Email format',
      valid: smtpUser.includes('@'),
      message: 'Should be a valid email address'
    },
    {
      name: 'Gmail App Password length',
      valid: smtpPass.replace(/\s/g, '').length === 16,
      message: 'Should be 16 characters (may include spaces)'
    },
    {
      name: 'Railway Password',
      valid: railwayPassword.length > 0,
      message: 'Should not be empty'
    }
  ];
  
  console.log('\n🔍 Configuration Validation:\n');
  
  let allValid = true;
  validations.forEach(v => {
    const status = v.valid ? '✅' : '❌';
    console.log(`${status} ${v.name}: ${v.valid ? 'PASS' : 'FAIL'}`);
    if (!v.valid) {
      console.log(`   → ${v.message}`);
      allValid = false;
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('STEP 5: Next Steps');
  console.log('='.repeat(60));
  
  if (allValid) {
    console.log('\n✅ All validations passed!\n');
    console.log('📋 To deploy to Render:');
    console.log('1. Copy the environment variables above');
    console.log('2. Go to Render.com → Your Web Service → Environment');
    console.log('3. Add each variable one by one');
    console.log('4. Save and deploy\n');
  } else {
    console.log('\n⚠️  Some validations failed. Please review and correct.\n');
  }
  
  console.log('📚 For detailed deployment instructions, see:');
  console.log('   backend/docs/PRODUCTION_DEPLOYMENT_GUIDE.md\n');
  
  const saveToFile = await question('Save configuration to file? (yes/no): ');
  
  if (saveToFile.toLowerCase() === 'yes' || saveToFile.toLowerCase() === 'y') {
    const fs = require('fs');
    const filename = '.env.production';
    fs.writeFileSync(filename, envConfig);
    console.log(`\n✅ Configuration saved to: ${filename}`);
    console.log('⚠️  DO NOT commit this file to Git!\n');
  }
  
  console.log('='.repeat(60));
  console.log('🎉 Configuration Complete!');
  console.log('='.repeat(60));
  
  rl.close();
}

// Run the script
main().catch(error => {
  console.error('\n❌ Error:', error.message);
  rl.close();
  process.exit(1);
});
