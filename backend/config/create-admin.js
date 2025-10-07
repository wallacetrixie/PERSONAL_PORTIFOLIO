const readline = require('readline');
const Admin = require('../models/Admin');
const { testConnection } = require('./database');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const createAdminUser = async () => {
  console.log('\n🔐 Admin User Creation Script');
  console.log('================================\n');

  try {
    // Test database connection
    console.log('Testing database connection...');
    const dbConnected = await testConnection();

    if (!dbConnected) {
      console.error('\n❌ Database connection failed!');
      console.log('Please ensure:');
      console.log('  1. MySQL is running');
      console.log('  2. Database credentials in .env are correct');
      console.log('  3. Database has been initialized (npm run init-db)\n');
      process.exit(1);
    }

    // Get admin details
    let email, password, username, fullName, role;

    // Email
    do {
      email = await question('Enter admin email: ');
      if (!validateEmail(email)) {
        console.log('❌ Invalid email format. Please try again.');
      }
    } while (!validateEmail(email));

    // Check if email already exists
    const existingAdmin = await Admin.findByEmail(email);
    if (existingAdmin) {
      console.log('\n❌ An admin user with this email already exists!');
      rl.close();
      process.exit(1);
    }

    // Password
    do {
      password = await question('Enter admin password (min 8 characters): ');
      if (password.length < 8) {
        console.log('❌ Password must be at least 8 characters long.');
      }
    } while (password.length < 8);

    const confirmPassword = await question('Confirm password: ');
    if (password !== confirmPassword) {
      console.log('\n❌ Passwords do not match!');
      rl.close();
      process.exit(1);
    }

    // Username
    do {
      username = await question('Enter admin username (min 3 characters): ');
      if (username.length < 3) {
        console.log('❌ Username must be at least 3 characters long.');
      }
    } while (username.length < 3);

    // Full Name
    do {
      fullName = await question('Enter admin full name: ');
      if (fullName.trim().length < 2) {
        console.log('❌ Full name must be at least 2 characters long.');
      }
    } while (fullName.trim().length < 2);

    // Role
    console.log('\nSelect admin role:');
    console.log('  1. super_admin (Full access)');
    console.log('  2. admin (Standard access)');
    console.log('  3. moderator (Limited access)');
    
    let roleChoice;
    do {
      roleChoice = await question('Enter choice (1-3): ');
    } while (!['1', '2', '3'].includes(roleChoice));

    const roles = { '1': 'super_admin', '2': 'admin', '3': 'moderator' };
    role = roles[roleChoice];

    // Confirm
    console.log('\n📋 Summary:');
    console.log('─────────────────────────');
    console.log(`Email:     ${email}`);
    console.log(`Username:  ${username}`);
    console.log(`Full Name: ${fullName}`);
    console.log(`Role:      ${role}`);
    console.log('─────────────────────────\n');

    const confirm = await question('Create this admin user? (yes/no): ');
    
    if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
      console.log('\n❌ Admin user creation cancelled.');
      rl.close();
      process.exit(0);
    }

    // Create admin user
    console.log('\n⏳ Creating admin user...');
    
    const adminId = await Admin.create({
      email,
      password,
      username,
      full_name: fullName,
      role
    });

    console.log('\n✅ Admin user created successfully!');
    console.log(`\nAdmin ID: ${adminId}`);
    console.log(`Email:    ${email}`);
    console.log(`Username: ${username}`);
    console.log(`Role:     ${role}`);
    
    console.log('\n🎉 You can now login at: http://localhost:5173/admin/login');
    console.log('\n⚠️  Security Reminder:');
    console.log('   • Store this password securely');
    console.log('   • Never share your admin credentials');
    console.log('   • Use a strong, unique password\n');

  } catch (error) {
    console.error('\n❌ Error creating admin user:', error.message);
    console.error('Details:', error);
  } finally {
    rl.close();
    process.exit(0);
  }
};

// Run the script
createAdminUser();
