#!/bin/bash

# Admin Authentication Setup Script
# This script helps you set up the authentication system step by step

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Emojis
CHECK="${GREEN}✓${NC}"
CROSS="${RED}✗${NC}"
ARROW="${BLUE}➜${NC}"
INFO="${CYAN}ℹ${NC}"

echo ""
echo "=========================================="
echo "🔐  ADMIN AUTHENTICATION SETUP"
echo "=========================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${CROSS} .env file not found!"
    echo -e "${INFO} Creating .env file from template..."
    exit 1
fi

echo -e "${CHECK} .env file found"


if grep -q "JWT_SECRET=.*" .env; then
    JWT_SECRET=$(grep "JWT_SECRET=" .env | cut -d '=' -f2)
    if [ ${#JWT_SECRET} -gt 30 ]; then
        echo -e "${CHECK} JWT_SECRET is configured (${#JWT_SECRET} characters)"
    else
        echo -e "${CROSS} JWT_SECRET is too short or not set"
        echo -e "${INFO} A secure JWT_SECRET has been generated for you"
    fi
else
    echo -e "${CROSS} JWT_SECRET not found in .env"
fi

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo -e "${CHECK} Dependencies installed"
else
    echo -e "${CROSS} Dependencies not installed"
    echo -e "${ARROW} Run: npm install"
    exit 1
fi

# Check if database is configured
echo ""
echo "Database Configuration:"
DB_HOST=$(grep "DB_HOST=" .env | cut -d '=' -f2)
DB_NAME=$(grep "DB_NAME=" .env | cut -d '=' -f2)
DB_USER=$(grep "DB_USER=" .env | cut -d '=' -f2 | tr -d "'")

echo -e "  Host: ${CYAN}${DB_HOST}${NC}"
echo -e "  Database: ${CYAN}${DB_NAME}${NC}"
echo -e "  User: ${CYAN}${DB_USER}${NC}"

echo ""
echo "=========================================="
echo "📋  SETUP CHECKLIST"
echo "=========================================="
echo ""

echo "1. Environment Setup"
echo -e "   ${CHECK} .env file exists"
echo -e "   ${CHECK} JWT_SECRET configured"
echo -e "   ${CHECK} Database credentials set"
echo ""

echo "2. Next Steps:"
echo ""
echo -e "   ${ARROW} Initialize Database:"
echo "      npm run init-db"
echo ""
echo -e "   ${ARROW} Create Admin User:"
echo "      npm run create-admin"
echo ""
echo -e "   ${ARROW} Start Server:"
echo "      npm run dev"
echo ""
echo -e "   ${ARROW} Test Authentication:"
echo "      node config/test-auth.js"
echo ""

echo "=========================================="
echo "📚  DOCUMENTATION"
echo "=========================================="
echo ""
echo "  • Full Guide: AUTHENTICATION_SETUP_GUIDE.md"
echo "  • Quick Reference: QUICK_AUTH_REFERENCE.md"
echo "  • Summary: IMPLEMENTATION_SUMMARY.md"
echo ""

echo "=========================================="
echo "🔗  API ENDPOINTS"
echo "=========================================="
echo ""
echo "  POST   /api/auth/login     - Admin login"
echo "  POST   /api/auth/logout    - Logout"
echo "  GET    /api/auth/verify    - Verify token"
echo "  GET    /api/auth/me        - Get profile"
echo "  POST   /api/auth/refresh   - Refresh token"
echo ""

echo "=========================================="
echo "🎯  READY TO START"
echo "=========================================="
echo ""
echo -e "${GREEN}Your authentication system is configured!${NC}"
echo ""
echo "Run this command to initialize the database:"
echo -e "  ${CYAN}npm run init-db${NC}"
echo ""
echo "Then create your first admin user:"
echo -e "  ${CYAN}npm run create-admin${NC}"
echo ""

exit 0
