#!/bin/bash

# ============================================================
# Portfolio Build Script
# ============================================================
# This script builds both frontend and backend for production
# ============================================================

set -e  # Exit on error

echo "🚀 Starting build process..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

print_success "Node.js version: $(node --version)"
print_success "npm version: $(npm --version)"

# Build Backend
print_info "Building backend..."
cd backend

if [ ! -d "node_modules" ]; then
    print_info "Installing backend dependencies..."
    npm ci --only=production
else
    print_success "Backend dependencies already installed"
fi

print_success "Backend build complete"
cd ..

# Build Frontend
print_info "Building frontend..."
cd portfolio

if [ ! -d "node_modules" ]; then
    print_info "Installing frontend dependencies..."
    npm ci
else
    print_success "Frontend dependencies already installed"
fi

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    print_error ".env.production not found. Creating from example..."
    if [ -f ".env.production.example" ]; then
        cp .env.production.example .env.production
        print_info "Please update .env.production with your production values"
    fi
fi

print_info "Running production build..."
npm run build

if [ -d "dist" ]; then
    print_success "Frontend build complete (dist folder created)"
    print_info "Build size:"
    du -sh dist
else
    print_error "Frontend build failed - dist folder not created"
    exit 1
fi

cd ..

# Summary
echo ""
print_success "============================================"
print_success "Build completed successfully!"
print_success "============================================"
echo ""
print_info "Next steps:"
echo "  1. Review .env files in backend/ and portfolio/"
echo "  2. Test locally: npm start (in backend/) and npm preview (in portfolio/)"
echo "  3. Deploy using ./scripts/deploy.sh or your cloud platform"
echo ""
