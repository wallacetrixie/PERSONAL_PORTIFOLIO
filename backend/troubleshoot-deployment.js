#!/usr/bin/env node

/**
 * Production Deployment Troubleshooting Script
 * Helps diagnose common deployment issues
 */

const https = require('https');
const http = require('http');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🔧 Portfolio Backend - Deployment Troubleshooting Tool\n');

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function testUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          success: true,
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Request timeout (10s)'
      });
    });
  });
}

async function testBackend(backendUrl) {
  console.log('\n' + '='.repeat(60));
  console.log('Testing Backend Connection');
  console.log('='.repeat(60));
  
  console.log(`\n🔍 Testing: ${backendUrl}`);
  
  const result = await testUrl(backendUrl);
  
  if (!result.success) {
    console.log('❌ Connection Failed');
    console.log(`   Error: ${result.error}`);
    console.log('\n💡 Possible Causes:');
    console.log('   - Backend URL is incorrect');
    console.log('   - Render service is down or spinning up');
    console.log('   - Network/firewall blocking request');
    console.log('\n🔧 Solutions:');
    console.log('   1. Verify backend URL is correct');
    console.log('   2. Check Render dashboard for service status');
    console.log('   3. Wait 30-60 seconds for service to spin up');
    return false;
  }
  
  console.log(`✅ Connection Successful`);
  console.log(`   Status Code: ${result.statusCode}`);
  
  if (result.statusCode === 200) {
    try {
      const json = JSON.parse(result.body);
      if (json.success && json.message) {
        console.log('✅ Backend is responding correctly');
        console.log(`   Message: ${json.message}`);
        console.log(`   Version: ${json.version || 'N/A'}`);
        console.log(`   Environment: ${json.environment || 'N/A'}`);
        return true;
      }
    } catch (e) {
      console.log('⚠️  Response is not valid JSON');
      console.log(`   Body: ${result.body.substring(0, 100)}`);
    }
  } else {
    console.log(`⚠️  Unexpected status code: ${result.statusCode}`);
  }
  
  return true;
}

async function testHealthEndpoint(backendUrl) {
  console.log('\n' + '='.repeat(60));
  console.log('Testing Health Endpoint');
  console.log('='.repeat(60));
  
  const healthUrl = `${backendUrl}/api/health`;
  console.log(`\n🔍 Testing: ${healthUrl}`);
  
  const result = await testUrl(healthUrl);
  
  if (!result.success) {
    console.log('❌ Health Check Failed');
    console.log(`   Error: ${result.error}`);
    return false;
  }
  
  if (result.statusCode === 200) {
    try {
      const json = JSON.parse(result.body);
      console.log('✅ Health Endpoint Working');
      console.log(`   Status: ${json.success ? 'Healthy' : 'Unhealthy'}`);
      if (json.database) {
        console.log(`   Database: ${json.database.connected ? '✅ Connected' : '❌ Disconnected'}`);
      }
      return true;
    } catch (e) {
      console.log('⚠️  Invalid JSON response');
    }
  } else {
    console.log(`❌ Unexpected status code: ${result.statusCode}`);
  }
  
  return false;
}

async function testCORS(backendUrl, frontendUrl) {
  console.log('\n' + '='.repeat(60));
  console.log('Testing CORS Configuration');
  console.log('='.repeat(60));
  
  console.log(`\nℹ️  Frontend URL: ${frontendUrl}`);
  console.log(`ℹ️  Backend URL: ${backendUrl}`);
  
  const result = await testUrl(backendUrl);
  
  if (!result.success) {
    console.log('❌ Cannot test CORS - backend not reachable');
    return false;
  }
  
  const corsHeader = result.headers['access-control-allow-origin'];
  
  if (corsHeader) {
    console.log(`✅ CORS Header Found: ${corsHeader}`);
    
    if (corsHeader === '*') {
      console.log('⚠️  Warning: CORS allows all origins (not recommended for production)');
    } else if (corsHeader === frontendUrl || corsHeader.includes(frontendUrl)) {
      console.log('✅ CORS correctly configured for your frontend');
    } else {
      console.log(`⚠️  CORS configured for: ${corsHeader}`);
      console.log(`   But your frontend is: ${frontendUrl}`);
      console.log('\n🔧 Solution:');
      console.log('   Update FRONTEND_URL in Render environment variables to:');
      console.log(`   FRONTEND_URL=${frontendUrl}`);
      return false;
    }
  } else {
    console.log('❌ No CORS header found');
    console.log('\n💡 This might cause issues in browser');
  }
  
  return true;
}

async function testContactEndpoint(backendUrl) {
  console.log('\n' + '='.repeat(60));
  console.log('Testing Contact Form Endpoint');
  console.log('='.repeat(60));
  
  const contactUrl = `${backendUrl}/api/contact`;
  console.log(`\n🔍 Testing: ${contactUrl}`);
  
  const testData = JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message from troubleshooting script.'
  });
  
  const url = new URL(contactUrl);
  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': testData.length
    }
  };
  
  return new Promise((resolve) => {
    const protocol = url.protocol === 'https:' ? https : http;
    
    const req = protocol.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log('✅ Contact Endpoint Working');
          try {
            const json = JSON.parse(data);
            console.log(`   Message: ${json.message || 'Success'}`);
          } catch (e) {
            console.log('   Response received but not JSON');
          }
          resolve(true);
        } else if (res.statusCode === 429) {
          console.log('⚠️  Rate Limit Reached');
          console.log('   Too many requests - this is actually a good sign!');
          console.log('   It means the endpoint is working but rate limited.');
          resolve(true);
        } else {
          console.log(`❌ Unexpected status code: ${res.statusCode}`);
          console.log(`   Response: ${data.substring(0, 200)}`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (error) => {
      console.log('❌ Request Failed');
      console.log(`   Error: ${error.message}`);
      resolve(false);
    });
    
    req.write(testData);
    req.end();
  });
}

function diagnoseCommonIssues() {
  console.log('\n' + '='.repeat(60));
  console.log('Common Issues Checklist');
  console.log('='.repeat(60));
  
  console.log('\n📋 Please check the following:\n');
  
  const checks = [
    {
      issue: 'Railway MySQL is running',
      check: 'Go to Railway dashboard and verify MySQL service is active'
    },
    {
      issue: 'Render backend is deployed',
      check: 'Check Render dashboard for green "Live" indicator'
    },
    {
      issue: 'Environment variables are set',
      check: 'Verify all required env vars in Render Environment tab'
    },
    {
      issue: 'Database credentials are correct',
      check: 'Copy exact values from Railway Variables tab'
    },
    {
      issue: 'Frontend URL matches',
      check: 'FRONTEND_URL in Render should match your live site exactly'
    },
    {
      issue: 'JWT_SECRET is set',
      check: 'Should be 128 character hex string'
    },
    {
      issue: 'SESSION_SECRET is set',
      check: 'Should be different from JWT_SECRET'
    },
    {
      issue: 'Gmail App Password is correct',
      check: '16-character password from Google App Passwords'
    },
    {
      issue: 'No build errors in Render',
      check: 'Check Render logs for build/start errors'
    },
    {
      issue: 'Database schema initialized',
      check: 'Run schema.sql in Railway Query tab'
    }
  ];
  
  checks.forEach((item, index) => {
    console.log(`${index + 1}. ☐ ${item.issue}`);
    console.log(`      → ${item.check}\n`);
  });
}

function showQuickFixes() {
  console.log('\n' + '='.repeat(60));
  console.log('Quick Fixes');
  console.log('='.repeat(60));
  
  console.log('\n🔧 Most Common Issues & Solutions:\n');
  
  console.log('1. CORS Error in Browser');
  console.log('   Problem: Access-Control-Allow-Origin error');
  console.log('   Solution: Update FRONTEND_URL in Render environment');
  console.log('   Command: Set exact frontend URL (including https://)\n');
  
  console.log('2. Database Connection Failed');
  console.log('   Problem: Cannot connect to MySQL');
  console.log('   Solution: Verify Railway credentials in Render');
  console.log('   Check: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME\n');
  
  console.log('3. Backend Spinning Up');
  console.log('   Problem: First request takes 30-60 seconds');
  console.log('   Solution: This is normal on free tier');
  console.log('   Fix: Use UptimeRobot to keep backend warm\n');
  
  console.log('4. Email Not Sending');
  console.log('   Problem: SMTP authentication failed');
  console.log('   Solution: Use Gmail App Password, not regular password');
  console.log('   Steps: Google Account → Security → 2FA → App Passwords\n');
  
  console.log('5. Build Fails on Render');
  console.log('   Problem: npm install fails');
  console.log('   Solution: Commit package-lock.json to repository');
  console.log('   Command: git add package-lock.json && git commit && git push\n');
  
  console.log('6. Admin Login Fails');
  console.log('   Problem: Invalid credentials');
  console.log('   Solution: Create admin user in Render shell');
  console.log('   Command: node config/create-admin.js\n');
}

async function main() {
  try {
    console.log('This tool will help diagnose deployment issues.\n');
    
    const backendUrl = await question('Enter your Render backend URL (e.g., https://portfolio-backend-xxxx.onrender.com): ');
    
    if (!backendUrl.startsWith('http')) {
      console.log('\n❌ Invalid URL. Must start with http:// or https://');
      rl.close();
      return;
    }
    
    // Test backend
    const backendOk = await testBackend(backendUrl);
    
    if (backendOk) {
      // Test health endpoint
      await testHealthEndpoint(backendUrl);
      
      // Test CORS
      const frontendUrl = await question('\nEnter your frontend URL (e.g., https://yoursite.com): ');
      if (frontendUrl) {
        await testCORS(backendUrl, frontendUrl);
      }
      
      // Test contact endpoint
      const testContact = await question('\nTest contact form endpoint? (yes/no): ');
      if (testContact.toLowerCase() === 'yes' || testContact.toLowerCase() === 'y') {
        await testContactEndpoint(backendUrl);
      }
    }
    
    // Show diagnostics
    diagnoseCommonIssues();
    showQuickFixes();
    
    console.log('\n' + '='.repeat(60));
    console.log('Troubleshooting Complete');
    console.log('='.repeat(60));
    
    console.log('\n📚 For more help, see:');
    console.log('   - backend/docs/PRODUCTION_DEPLOYMENT_GUIDE.md');
    console.log('   - backend/docs/VISUAL_DEPLOYMENT_GUIDE.md');
    console.log('   - Render logs: https://dashboard.render.com');
    console.log('   - Railway logs: https://railway.app/dashboard\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

// Run the script
main();
