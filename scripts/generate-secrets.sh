#!/bin/bash

# ============================================================
# Generate Secure Secrets Script
# ============================================================
# Generates secure random strings for JWT and session secrets
# ============================================================

echo "🔐 Generating secure secrets for production..."
echo ""
echo "Add these to your .env file:"
echo ""
echo "# JWT Secret (64 bytes)"
echo "JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")"
echo ""
echo "# Session Secret (64 bytes)"
echo "SESSION_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")"
echo ""
echo "# Database Password (32 bytes)"
echo "DB_PASSWORD=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")"
echo ""
echo "⚠️  Keep these secrets safe and never commit them to version control!"
