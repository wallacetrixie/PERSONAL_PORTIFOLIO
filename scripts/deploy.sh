#!/bin/bash

# ============================================================
# Portfolio Docker Deployment Script
# ============================================================
# This script deploys the application using Docker Compose
# ============================================================

set -e  # Exit on error

echo "🚀 Starting deployment process..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_success "Docker version: $(docker --version)"
print_success "Docker Compose version: $(docker-compose --version)"

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_error ".env file not found in root directory"
    print_info "Creating .env from example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_warning "Please update .env with your production values before continuing"
        exit 1
    else
        print_error ".env.example not found. Cannot proceed."
        exit 1
    fi
fi

# Validate critical environment variables
print_info "Validating environment variables..."
source .env

REQUIRED_VARS=("DB_PASSWORD" "JWT_SECRET" "SESSION_SECRET")
MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ] || [[ "${!var}" == *"CHANGE_THIS"* ]] || [[ "${!var}" == *"GENERATE"* ]]; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    print_error "The following environment variables need to be set:"
    for var in "${MISSING_VARS[@]}"; do
        echo "  - $var"
    done
    print_info "Please update .env file with production values"
    exit 1
fi

print_success "Environment variables validated"

# Stop existing containers
print_info "Stopping existing containers..."
docker-compose down 2>/dev/null || true
print_success "Containers stopped"

# Build and start containers
print_info "Building Docker images..."
docker-compose build --no-cache

print_info "Starting containers..."
docker-compose up -d

# Wait for services to be healthy
print_info "Waiting for services to start..."
sleep 10

# Check health of services
print_info "Checking service health..."

# Check database
if docker-compose ps | grep -q "db.*healthy"; then
    print_success "Database is healthy"
else
    print_warning "Database health check pending..."
fi

# Check backend
if docker-compose ps | grep -q "backend.*Up"; then
    print_success "Backend is running"
else
    print_error "Backend failed to start"
    docker-compose logs backend
    exit 1
fi

# Check frontend
if docker-compose ps | grep -q "frontend.*Up"; then
    print_success "Frontend is running"
else
    print_error "Frontend failed to start"
    docker-compose logs frontend
    exit 1
fi

# Summary
echo ""
print_success "============================================"
print_success "Deployment completed successfully!"
print_success "============================================"
echo ""
print_info "Services:"
echo "  - Frontend: http://localhost:8080"
echo "  - Backend API: http://localhost:5000"
echo "  - Database: localhost:3306"
echo ""
print_info "Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop services: docker-compose down"
echo "  - Restart: docker-compose restart"
echo "  - View status: docker-compose ps"
echo ""
print_warning "Don't forget to:"
echo "  1. Initialize database: docker-compose exec backend npm run init-db"
echo "  2. Create admin user: docker-compose exec backend npm run create-admin"
echo ""
