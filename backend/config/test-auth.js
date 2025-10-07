#!/usr/bin/env node


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}`),
};

// Test configuration
const API_URL = process.env.API_URL || 'http://localhost:5000';
let authToken = null;
let testEmail = '';
let testPassword = '';

/**
 * Make HTTP request
 */
const makeRequest = async (endpoint, method = 'GET', body = null, useAuth = false) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (useAuth && authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const options = {
    method,
    headers
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    return { status: response.status, data, ok: response.ok };
  } catch (error) {
    return { error: error.message, ok: false };
  }
};

/**
 * Test server connection
 */
const testServerConnection = async () => {
  log.section('Testing Server Connection');
  
  try {
    const result = await makeRequest('/');
    
    if (result.ok) {
      log.success('Server is running');
      log.info(`Version: ${result.data.version || 'Unknown'}`);
      return true;
    } else {
      log.error('Server returned an error');
      return false;
    }
  } catch (error) {
    log.error(`Cannot connect to server at ${API_URL}`);
    log.warning('Make sure the server is running (npm run dev)');
    return false;
  }
};

/**
 * Test login endpoint
 */
const testLogin = async () => {
  log.section('Testing Login Endpoint');
  
  // Test with invalid credentials first
  log.info('Testing with invalid credentials...');
  const invalidResult = await makeRequest('/api/auth/login', 'POST', {
    email: 'invalid@example.com',
    password: 'wrongpassword'
  });

  if (invalidResult.status === 401) {
    log.success('Correctly rejected invalid credentials');
  } else {
    log.warning(`Expected 401, got ${invalidResult.status}`);
  }

  // Test with valid credentials
  log.info('Testing with valid credentials...');
  const validResult = await makeRequest('/api/auth/login', 'POST', {
    email: testEmail,
    password: testPassword,
    rememberMe: false
  });

  if (validResult.ok && validResult.data.success) {
    log.success('Login successful');
    authToken = validResult.data.data.token;
    log.info(`Token received: ${authToken.substring(0, 20)}...`);
    return true;
  } else {
    log.error('Login failed');
    console.log('Response:', validResult.data);
    return false;
  }
};

/**
 * Test verify token endpoint
 */
const testVerifyToken = async () => {
  log.section('Testing Verify Token Endpoint');
  
  const result = await makeRequest('/api/auth/verify', 'GET', null, true);

  if (result.ok && result.data.success) {
    log.success('Token is valid');
    const admin = result.data.data.admin;
    log.info(`Authenticated as: ${admin.email} (${admin.role})`);
    return true;
  } else {
    log.error('Token verification failed');
    console.log('Response:', result.data);
    return false;
  }
};

/**
 * Test get current admin endpoint
 */
const testGetCurrentAdmin = async () => {
  log.section('Testing Get Current Admin Endpoint');
  
  const result = await makeRequest('/api/auth/me', 'GET', null, true);

  if (result.ok && result.data.success) {
    log.success('Successfully retrieved admin profile');
    const admin = result.data.data.admin;
    console.log('\nAdmin Profile:');
    console.log(`  Email: ${admin.email}`);
    console.log(`  Username: ${admin.username}`);
    console.log(`  Full Name: ${admin.full_name}`);
    console.log(`  Role: ${admin.role}`);
    console.log(`  Last Login: ${admin.last_login_at || 'Never'}`);
    return true;
  } else {
    log.error('Failed to retrieve admin profile');
    console.log('Response:', result.data);
    return false;
  }
};

/**
 * Test refresh token endpoint
 */
const testRefreshToken = async () => {
  log.section('Testing Refresh Token Endpoint');
  
  const oldToken = authToken;
  const result = await makeRequest('/api/auth/refresh', 'POST', { rememberMe: false }, true);

  if (result.ok && result.data.success) {
    log.success('Token refreshed successfully');
    authToken = result.data.data.token;
    
    if (oldToken !== authToken) {
      log.success('New token is different from old token');
    } else {
      log.warning('New token is same as old token (unexpected)');
    }
    return true;
  } else {
    log.error('Token refresh failed');
    console.log('Response:', result.data);
    return false;
  }
};

/**
 * Test logout endpoint
 */
const testLogout = async () => {
  log.section('Testing Logout Endpoint');
  
  const result = await makeRequest('/api/auth/logout', 'POST', null, true);

  if (result.ok && result.data.success) {
    log.success('Logout successful');
    
    // Try to use the old token (should fail)
    log.info('Verifying old token is invalid...');
    const verifyResult = await makeRequest('/api/auth/verify', 'GET', null, true);
    
    if (!verifyResult.ok) {
      log.success('Old token correctly invalidated');
    } else {
      log.warning('Old token still works (unexpected)');
    }
    
    authToken = null;
    return true;
  } else {
    log.error('Logout failed');
    console.log('Response:', result.data);
    return false;
  }
};

/**
 * Test rate limiting
 */
const testRateLimiting = async () => {
  log.section('Testing Rate Limiting');
  
  log.info('Making 6 rapid login attempts...');
  let rateLimited = false;
  
  for (let i = 1; i <= 6; i++) {
    const result = await makeRequest('/api/auth/login', 'POST', {
      email: 'test@example.com',
      password: 'wrongpassword'
    });
    
    if (result.status === 429) {
      rateLimited = true;
      log.success(`Rate limit triggered on attempt ${i}`);
      break;
    }
    
    // Small delay to prevent overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  if (!rateLimited) {
    log.warning('Rate limit not triggered (may need more attempts or different timing)');
  }
  
  return true;
};

/**
 * Test account lockout
 */
const testAccountLockout = async () => {
  log.section('Testing Account Lockout');
  
  log.warning('This test will make 5 failed login attempts');
  log.warning('Your account will be locked for 15 minutes');
  
  const confirm = await question('Continue? (yes/no): ');
  
  if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
    log.info('Skipping account lockout test');
    return true;
  }
  
  log.info('Making 5 failed login attempts...');
  let lockoutTriggered = false;
  
  for (let i = 1; i <= 5; i++) {
    const result = await makeRequest('/api/auth/login', 'POST', {
      email: testEmail,
      password: 'wrongpassword123'
    });
    
    console.log(`Attempt ${i}: Status ${result.status}`);
    
    if (result.status === 423) {
      lockoutTriggered = true;
      log.success('Account lockout triggered');
      break;
    }
    
    if (result.data.remainingAttempts !== undefined) {
      log.info(`Remaining attempts: ${result.data.remainingAttempts}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  if (!lockoutTriggered) {
    log.warning('Account lockout not triggered (manual database check may be needed)');
  }
  
  return true;
};

/**
 * Run all tests
 */
const runAllTests = async () => {
  console.log('\n' + '='.repeat(60));
  console.log('🔐  AUTHENTICATION SYSTEM TEST SUITE');
  console.log('='.repeat(60));
  
  // Get test credentials
  console.log('\nEnter test admin credentials:');
  testEmail = await question('Email: ');
  testPassword = await question('Password: ');
  
  console.log(`\nTesting against: ${API_URL}\n`);
  
  const tests = [
    { name: 'Server Connection', fn: testServerConnection },
    { name: 'Login', fn: testLogin },
    { name: 'Verify Token', fn: testVerifyToken },
    { name: 'Get Current Admin', fn: testGetCurrentAdmin },
    { name: 'Refresh Token', fn: testRefreshToken },
    { name: 'Logout', fn: testLogout },
    { name: 'Rate Limiting', fn: testRateLimiting },
  ];
  
  const results = [];
  
  for (const test of tests) {
    try {
      const passed = await test.fn();
      results.push({ name: test.name, passed });
    } catch (error) {
      log.error(`Test "${test.name}" threw an error: ${error.message}`);
      results.push({ name: test.name, passed: false });
    }
  }
  
  // Optional: Account lockout test
  const testLockout = await question('\nTest account lockout? This will lock your account for 15 minutes. (yes/no): ');
  if (testLockout.toLowerCase() === 'yes' || testLockout.toLowerCase() === 'y') {
    try {
      const passed = await testAccountLockout();
      results.push({ name: 'Account Lockout', passed });
    } catch (error) {
      log.error(`Account lockout test threw an error: ${error.message}`);
      results.push({ name: 'Account Lockout', passed: false });
    }
  }
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('TEST SUMMARY');
  console.log('='.repeat(60) + '\n');
  
  let passed = 0;
  let failed = 0;
  
  results.forEach(result => {
    if (result.passed) {
      log.success(result.name);
      passed++;
    } else {
      log.error(result.name);
      failed++;
    }
  });
  
  console.log('\n' + '-'.repeat(60));
  console.log(`Total: ${results.length} | Passed: ${passed} | Failed: ${failed}`);
  console.log('='.repeat(60) + '\n');
  
  if (failed === 0) {
    log.success('All tests passed! 🎉');
  } else {
    log.warning(`${failed} test(s) failed. Review the output above.`);
  }
};

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.error('Error: This script requires Node.js 18 or higher (native fetch support)');
  console.log('Alternative: Install node-fetch package');
  process.exit(1);
}

// Run tests
runAllTests()
  .then(() => {
    rl.close();
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    rl.close();
    process.exit(1);
  });
