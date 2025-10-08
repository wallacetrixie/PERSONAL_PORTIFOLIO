# 🚀 Cloud Deployment Guide

Complete guide for deploying your portfolio application to various cloud platforms.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Docker Deployment](#docker-deployment)
- [Platform-Specific Guides](#platform-specific-guides)
  - [Vercel](#vercel)
  - [Render](#render)
  - [Railway](#railway)
  - [Netlify + Heroku](#netlify--heroku)
  - [AWS/DigitalOcean/GCP](#awsdigitalocean-gcp)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Post-Deployment](#post-deployment)
- [Monitoring & Maintenance](#monitoring--maintenance)

---

## 🚀 Quick Start

### Option 1: Docker Deployment (Recommended)

```bash
# 1. Generate secure secrets
./scripts/generate-secrets.sh

# 2. Configure environment
cp .env.example .env
# Edit .env with your production values

# 3. Deploy with Docker
./scripts/deploy.sh
```

### Option 2: Manual Build

```bash
# 1. Build the application
./scripts/build.sh

# 2. Deploy to your preferred platform
# See platform-specific guides below
```

---

## 📦 Prerequisites

### Required Software

- **Node.js**: v20 or higher
- **npm**: v10 or higher
- **MySQL**: v8.0 or higher (or cloud database)
- **Docker & Docker Compose**: (for Docker deployment)
- **Git**: For version control

### Required Accounts

- Cloud platform account (Vercel, Render, Railway, etc.)
- MySQL database (or use cloud provider's database)
- Email service (Gmail, SendGrid, etc.) for notifications
- Domain name (optional but recommended)

---

## 🐳 Docker Deployment

Perfect for VPS (DigitalOcean, AWS EC2, GCP, Azure) or local deployment.

### 1. Prepare Environment

```bash
# Generate secure secrets
./scripts/generate-secrets.sh

# Copy and configure environment
cp .env.example .env
nano .env  # or use your preferred editor
```

### 2. Configure `.env` File

```bash
# Database
DB_USER=portfolio_user
DB_PASSWORD=your_secure_password_here
DB_NAME=portfolio_db

# Security (use generated values from generate-secrets.sh)
JWT_SECRET=your_64_byte_hex_string
SESSION_SECRET=your_64_byte_hex_string

# URLs
FRONTEND_URL=https://your-domain.com
VITE_API_URL=https://api.your-domain.com

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFICATION_EMAIL=your-email@gmail.com
```

### 3. Deploy

```bash
# Build and start all services
./scripts/deploy.sh

# Or manually with docker-compose
docker-compose up -d --build
```

### 4. Initialize Database

```bash
# Initialize database schema
docker-compose exec backend npm run init-db

# Create admin user
docker-compose exec backend npm run create-admin
```

### 5. Verify Deployment

```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f

# Test endpoints
curl http://localhost:5000/api/health
curl http://localhost:8080
```

### Management Commands

```bash
# Stop services
docker-compose down

# Restart services
docker-compose restart

# View logs
docker-compose logs -f [service-name]

# Update and redeploy
git pull
docker-compose down
docker-compose up -d --build
```

---

## 🌐 Platform-Specific Guides

### Vercel

**Best for**: Frontend hosting with serverless backend

#### Setup

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `backend/.env.production.example`

4. **Deploy**
   ```bash
   vercel --prod
   ```

#### Database
- Use **PlanetScale**, **Railway**, or **AWS RDS** for MySQL
- Update `DB_HOST` in Vercel environment variables

#### Custom Domain
- Vercel Dashboard → Domains → Add your domain
- Update DNS records as instructed

---

### Render

**Best for**: Full-stack deployment with managed database

#### Setup

1. **Create Account**: https://render.com

2. **Deploy Using Blueprint**
   - Connect your GitHub repository
   - Render will detect `render.yaml`
   - Configure environment variables in dashboard

3. **Manual Setup** (alternative)
   
   **Backend Service:**
   - New → Web Service
   - Connect repository
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Add environment variables

   **Frontend Service:**
   - New → Static Site
   - Build Command: `cd portfolio && npm install && npm run build`
   - Publish Directory: `portfolio/dist`

   **Database:**
   - New → PostgreSQL or use external MySQL

4. **Environment Variables**
   - Add all from `backend/.env.production.example`
   - Use Render's database connection string

#### Post-Deploy
```bash
# SSH into backend service (from Render dashboard)
npm run init-db
npm run create-admin
```

---

### Railway

**Best for**: Simple deployment with automatic scaling

#### Setup

1. **Create Account**: https://railway.app

2. **Deploy**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login
   railway login

   # Link project
   railway link

   # Deploy
   railway up
   ```

3. **Or Use GitHub Integration**
   - Connect repository in Railway dashboard
   - Railway detects `railway.json`
   - Configure services (backend, frontend, database)

4. **Environment Variables**
   - Set in Railway dashboard for each service
   - Use Railway's MySQL plugin for database

5. **Initialize Database**
   - Use Railway CLI or web terminal:
   ```bash
   railway run npm run init-db
   railway run npm run create-admin
   ```

---

### Netlify + Heroku

**Best for**: Separate frontend/backend hosting

#### Frontend (Netlify)

1. **Deploy Frontend**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login
   netlify login

   # Deploy from portfolio directory
   cd portfolio
   netlify deploy --prod
   ```

2. **Configure**
   - `netlify.toml` is already configured
   - Set `VITE_API_URL` environment variable in Netlify dashboard

#### Backend (Heroku)

1. **Deploy Backend**
   ```bash
   # Install Heroku CLI
   npm install -g heroku

   # Login
   heroku login

   # Create app
   heroku create your-portfolio-api

   # Add MySQL
   heroku addons:create cleardb:ignite

   # Set environment variables
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_secret
   # ... (all other variables)

   # Deploy
   git subtree push --prefix backend heroku main
   ```

2. **Initialize Database**
   ```bash
   heroku run npm run init-db
   heroku run npm run create-admin
   ```

---

### AWS/DigitalOcean/GCP

**Best for**: Full control with VPS

#### Setup

1. **Create VPS Instance**
   - Ubuntu 22.04 LTS recommended
   - Minimum: 2GB RAM, 2 CPUs, 50GB storage

2. **Connect to Server**
   ```bash
   ssh root@your-server-ip
   ```

3. **Install Dependencies**
   ```bash
   # Update system
   apt update && apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt install -y nodejs

   # Install Docker & Docker Compose
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   apt install -y docker-compose

   # Install MySQL (if not using Docker)
   apt install -y mysql-server
   ```

4. **Clone Repository**
   ```bash
   git clone https://github.com/wallacetrixie/PERSONAL_PORTIFOLIO.git
   cd PERSONAL_PORTIFOLIO
   ```

5. **Configure Environment**
   ```bash
   cp .env.example .env
   nano .env  # Configure with production values
   ```

6. **Deploy with Docker**
   ```bash
   ./scripts/deploy.sh
   ```

7. **Setup Nginx Reverse Proxy** (optional)
   ```bash
   apt install -y nginx

   # Create nginx config
   nano /etc/nginx/sites-available/portfolio
   ```

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:8080;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   # Enable site
   ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

8. **Setup SSL with Let's Encrypt**
   ```bash
   apt install -y certbot python3-certbot-nginx
   certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

9. **Setup Auto-Start** (optional)
   ```bash
   # Create systemd service
   nano /etc/systemd/system/portfolio.service
   ```

   ```ini
   [Unit]
   Description=Portfolio Application
   After=docker.service
   Requires=docker.service

   [Service]
   Type=oneshot
   RemainAfterExit=yes
   WorkingDirectory=/root/PERSONAL_PORTIFOLIO
   ExecStart=/usr/bin/docker-compose up -d
   ExecStop=/usr/bin/docker-compose down

   [Install]
   WantedBy=multi-user.target
   ```

   ```bash
   systemctl enable portfolio
   systemctl start portfolio
   ```

---

## 🔐 Environment Variables

### Backend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `5000` |
| `DB_HOST` | Database host | `db.example.com` |
| `DB_USER` | Database user | `portfolio_user` |
| `DB_PASSWORD` | Database password | `secure_password` |
| `DB_NAME` | Database name | `portfolio_db` |
| `JWT_SECRET` | JWT signing secret | 64-byte hex string |
| `SESSION_SECRET` | Session secret | 64-byte hex string |
| `FRONTEND_URL` | Frontend URL | `https://example.com` |
| `SMTP_HOST` | Email SMTP host | `smtp.gmail.com` |
| `SMTP_PORT` | Email SMTP port | `587` |
| `SMTP_USER` | Email username | `user@gmail.com` |
| `SMTP_PASS` | Email password | `app_password` |
| `NOTIFICATION_EMAIL` | Notification recipient | `admin@example.com` |

### Frontend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.example.com` |

---

## 🗄️ Database Setup

### Option 1: Cloud Database (Recommended)

**PlanetScale** (MySQL)
- Free tier available
- Auto-scaling
- https://planetscale.com

**AWS RDS**
- Fully managed
- High availability
- https://aws.amazon.com/rds

**Railway MySQL**
- Easy setup
- Integrated with Railway deployment
- https://railway.app

### Option 2: Self-Hosted

If using Docker deployment, MySQL is included in `docker-compose.yml`.

### Initialize Database

```bash
# Using Docker
docker-compose exec backend npm run init-db

# Using npm directly
cd backend
npm run init-db
```

### Create Admin User

```bash
# Using Docker
docker-compose exec backend npm run create-admin

# Using npm directly
cd backend
npm run create-admin
```

---

## 📬 Email Configuration

### Gmail Setup

1. **Enable 2-Factor Authentication**
2. **Generate App Password**:
   - Google Account → Security → 2-Step Verification → App passwords
   - Generate password for "Mail" and "Other"
3. **Use in .env**:
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   ```

### SendGrid (Alternative)

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

---

## ✅ Post-Deployment

### 1. Verify Health

```bash
# Check backend health
curl https://api.your-domain.com/api/health

# Expected response:
{
  "success": true,
  "status": "healthy",
  "services": {
    "database": "connected",
    "email": "configured"
  }
}
```

### 2. Test Contact Form

- Visit your site
- Submit a test contact form
- Verify email notification received

### 3. Test Admin Login

- Visit `/admin/login`
- Login with created admin credentials
- Verify dashboard access

### 4. Security Check

- [ ] All `.env` files are gitignored
- [ ] HTTPS is enabled
- [ ] Strong JWT_SECRET and SESSION_SECRET
- [ ] Database has strong password
- [ ] CORS is configured correctly
- [ ] Rate limiting is active
- [ ] Email notifications work

---

## 📊 Monitoring & Maintenance

### Health Check Endpoints

- **Backend**: `https://api.your-domain.com/api/health`
- **Frontend**: `https://your-domain.com`

### Monitoring Services (Optional)

- **UptimeRobot**: Free uptime monitoring
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **New Relic**: Performance monitoring

### Regular Maintenance

```bash
# Update dependencies
npm audit fix

# Backup database (if self-hosted)
docker-compose exec db mysqldump -u root -p portfolio_db > backup.sql

# View logs
docker-compose logs -f

# Check disk space
df -h

# Check memory usage
free -m
```

### Updating the Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart (Docker)
docker-compose down
docker-compose up -d --build

# Or manual
cd backend && npm install && npm start
cd portfolio && npm install && npm run build
```

---

## 🐛 Troubleshooting

### Database Connection Failed

- Verify `DB_HOST`, `DB_USER`, `DB_PASSWORD` are correct
- Check if database allows remote connections
- Ensure IP is whitelisted (cloud databases)

### CORS Errors

- Update `FRONTEND_URL` in backend `.env`
- Ensure URLs match exactly (no trailing slashes)
- Check browser console for specific errors

### Email Not Sending

- Verify SMTP credentials
- Check spam folder
- Test with: `cd backend && npm run test-email`

### Build Failures

- Clear `node_modules`: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be v20+)
- Review build logs for specific errors

### Docker Issues

```bash
# Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d

# Check container logs
docker-compose logs [service-name]
```

---

## 📚 Additional Resources

- [Production Deployment Guide](./PRODUCTION_DEPLOYMENT_GUIDE.md) - Original security guide
- [Backend Documentation](./backend/docs/)
- [Frontend Documentation](./portfolio/docs/)
- [Security Audit Report](./SECURITY_AUDIT_REPORT.md)

---

## 🆘 Support

If you encounter issues:

1. Check logs: `docker-compose logs -f`
2. Verify environment variables
3. Review health check endpoint
4. Check GitHub Issues
5. Contact: wallacewambulwa@gmail.com

---

**🎉 Congratulations on deploying your portfolio!**

Remember to:
- ⭐ Star this repository
- 🔒 Keep secrets secure
- 📊 Monitor your application
- 🔄 Keep dependencies updated
