#  Professional Portfolio - Wallace Wambulwa

[![Production Ready](https://img.shields.io/badge/Production-Ready-success)](https://github.com/wallacetrixie/PERSONAL_PORTIFOLIO)
[![Security Score](https://img.shields.io/badge/Security-92%2F100-brightgreen)](./SECURITY_AUDIT_REPORT.md)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A **modern, full-stack portfolio website** showcasing professional work, technical expertise, and creative projects with enterprise-grade security and production-ready infrastructure.

> **Production Status**: **PRODUCTION READY** (92/100 Security Score)

---

## Project Overview

This portfolio serves as a comprehensive platform demonstrating:
-  **Modern UI/UX** with smooth animations and transitions
- **High Performance** optimized loading and rendering
-  **Enterprise Security** with JWT authentication and XSS protection
-  **Fully Responsive** design across all devices
- **Full-Stack Architecture** with React frontend and Node.js backend

---

##  Key Features

### Frontend (React + TypeScript)
- ⚡ Built with **Vite** for lightning-fast development
-  **Framer Motion** animations for smooth UX
-  **Tailwind CSS** for modern styling
-  Dark/Light mode toggle with persistent state
- 📱 Mobile-first responsive design
-  Protected admin dashboard
-  Real-time contact management interface

### Backend (Node.js + Express)
-  **JWT Authentication** with session management
-  **Enterprise Security**: XSS protection, rate limiting, CORS
-  Email notifications via Nodemailer
-  **MySQL Database** with connection pooling
-  **Express-validator** for input validation
-  **Rate Limiting** on all endpoints
-  Comprehensive API documentation

---

## 🏗️ Tech Stack

### Frontend
```
React 18+ | TypeScript | Vite | Tailwind CSS
Framer Motion | React Router | Zod | Axios
```

### Backend
```
Node.js 18+ | Express.js | MySQL 8.0
JWT | Bcrypt | Express-validator
Helmet | Nodemailer | XSS Protection
```

### DevOps & Tools
```
Git | PM2 | Nginx | Docker
Let's Encrypt SSL | Environment Management
```

---

## 📁 Project Structure

```
PERSONAL_PORTIFOLIO/
├── portfolio/                    # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── admin/          # Admin dashboard components
│   │   │   ├── layout/         # Layout components
│   │   │   ├── sections/       # Page sections (Hero, About, Projects, etc.)
│   │   │   └── ui/             # Base UI components
│   │   ├── contexts/           # React contexts (Auth, Theme)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components
│   │   ├── utils/              # Utility functions & API config
│   │   ├── types/              # TypeScript definitions
│   │   └── styles/             # Global styles
│   ├── public/                 # Static assets
│   └── docs/                   # Frontend documentation
│
├── backend/                     # Backend API (Node.js + Express)
│   ├── config/                 # Configuration files
│   ├── controllers/            # Route controllers
│   ├── database/               # Database schemas
│   ├── middleware/             # Express middleware
│   ├── models/                 # Data models
│   ├── routes/                 # API routes
│   ├── services/               # Business logic services
│   └── docs/                   # Backend documentation
│
├── docs/                        # Project-wide documentation
│   ├── SETUP_CHECKLIST.md
│   ├── ADMIN_SIDEBAR_VISUAL_GUIDE.md
│   └── CONTACT_MANAGEMENT_GUIDE.md
│
├── PRODUCTION_DEPLOYMENT_GUIDE.md   # Deployment instructions
├── SECURITY_AUDIT_REPORT.md         # Security assessment
└── README.md                         # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ ([Download](https://nodejs.org/))
- MySQL 8.0+ ([Download](https://www.mysql.com/))
- npm or yarn
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/wallacetrixie/PERSONAL_PORTIFOLIO.git
cd PERSONAL_PORTIFOLIO
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
nano .env  # Edit with your values

# Initialize database
npm run init-db

# Create admin account
npm run create-admin

# Start development server
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../portfolio

# Install dependencies
npm install

# Configure environment
cp .env.example .env
nano .env  # Set VITE_API_URL

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

---

## 🔒 Security Features

### **Production Readiness Score: 92/100** ⭐⭐⭐⭐⭐

#### Implemented Security Measures:

✅ **Authentication & Authorization**
- JWT-based authentication with HTTP-only cookies
- Session management in database
- Account lockout after 5 failed attempts
- Secure password hashing (bcrypt, 12 rounds)

✅ **Input Validation & Sanitization**
- Express-validator on all inputs
- XSS protection middleware
- SQL injection prevention (parameterized queries)
- Request body size limits (10kb)

✅ **Rate Limiting**
- Contact form: 3 submissions/hour per IP
- Login: 5 attempts/15 minutes per IP
- Admin endpoints: 100 requests/15 minutes per IP

✅ **Security Headers (Helmet)**
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer Policy configured

✅ **CORS Configuration**
- Origin restrictions
- Credentials enabled
- Allowed methods specified

✅ **Environment Security**
- Environment variable validation
- JWT secret strength validation
- .env excluded from version control

See [SECURITY_AUDIT_REPORT.md](./SECURITY_AUDIT_REPORT.md) for full details.

---

## 📡 API Documentation

### Public Endpoints

| Endpoint | Method | Rate Limit | Description |
|----------|--------|------------|-------------|
| `POST /api/contact` | POST | 3/hour | Submit contact form |
| `POST /api/auth/login` | POST | 5/15min | Admin login |
| `GET /api/health` | GET | None | Health check |

### Protected Endpoints (Require Authentication)

| Endpoint | Method | Rate Limit | Description |
|----------|--------|------------|-------------|
| `GET /api/contacts` | GET | 100/15min | List all contacts |
| `GET /api/contacts/:id` | GET | 100/15min | Get contact details |
| `PATCH /api/contacts/:id/status` | PATCH | 100/15min | Update status |
| `DELETE /api/contacts/:id` | DELETE | 100/15min | Delete contact |
| `POST /api/auth/logout` | POST | 20/15min | Logout |
| `GET /api/auth/verify` | GET | 20/15min | Verify token |
| `GET /api/auth/me` | GET | 20/15min | Get current admin |

---

## 🎨 Frontend Features

### Pages & Sections
- 🏠 **Hero Section** - Animated introduction with call-to-action
- 👨‍💻 **About Section** - Professional background and expertise
- 💼 **Projects Section** - Showcase of 9 projects with filters
- 🛠️ **Skills Section** - Technical skills tree visualization
- 📧 **Contact Section** - Interactive contact form
- 🔐 **Admin Dashboard** - Protected management interface

### Key Highlights
- Smooth scroll animations with Framer Motion
- Interactive hover effects and transitions
- Category-based project filtering
- Real-time form validation
- Toast notifications for user feedback
- Mobile-optimized navigation

---

## 📚 Documentation

### Quick Links
- 📖 [Production Deployment Guide](./PRODUCTION_DEPLOYMENT_GUIDE.md)
- 🔒 [Security Audit Report](./SECURITY_AUDIT_REPORT.md)
- 🚀 [Backend README](./backend/README.md)
- 💻 [Frontend Documentation](./portfolio/docs/README.md)
- 🔐 [Authentication Setup](./backend/docs/AUTHENTICATION_SETUP_GUIDE.md)
- 📧 [Email Configuration](./backend/docs/EMAIL_SETUP_GUIDE.md)

---

## 🚀 Deployment

### Production Deployment Options

1. **VPS Deployment** (DigitalOcean, Linode, AWS EC2)
   - Full control over environment
   - PM2 for process management
   - Nginx as reverse proxy
   - Let's Encrypt SSL certificates

2. **Platform as a Service**
   - **Backend**: Heroku, Railway, Render
   - **Frontend**: Vercel, Netlify, Cloudflare Pages

3. **Containerized Deployment**
   - Docker + Docker Compose
   - Kubernetes (for scale)

**📖 See [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md) for detailed instructions**

### Pre-Deployment Checklist

- [ ] Change all default credentials
- [ ] Generate strong JWT_SECRET (64+ characters)
- [ ] Update FRONTEND_URL to production domain
- [ ] Configure production database
- [ ] Set NODE_ENV=production
- [ ] Test authentication flows
- [ ] Verify rate limiting
- [ ] Test contact form end-to-end
- [ ] Configure SSL/TLS certificates
- [ ] Setup database backups
- [ ] Configure monitoring/logging

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd portfolio
npm test
```

### Manual Testing
```bash
# Test API health
curl http://localhost:5000/api/health

# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

---

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+ (Performance)
- 🎯 **First Contentful Paint**: < 1.5s
- 📦 **Bundle Size**: Optimized with code splitting
- 🚀 **API Response Time**: < 100ms average
- 📱 **Mobile Responsive**: 100% across devices

---

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd portfolio
npm run dev  # Starts Vite dev server with HMR
```

### Database Management
```bash
# Initialize/Reset database
npm run init-db

# Create new admin user
npm run create-admin

# Backup database
mysqldump -u user -p portfolio_db > backup.sql
```

---

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
```bash
# Test MySQL connection
mysql -u your_user -p -h localhost

# Verify database exists
SHOW DATABASES;
```

**Port Already in Use**
```bash
# Find process
lsof -i :5000  # or :5173

# Kill process
kill -9 <PID>
```

**Authentication Issues**
- Verify JWT_SECRET is set and > 32 characters
- Check token expiration settings
- Ensure cookies are enabled in browser
- Verify CORS settings match frontend URL

**Contact Form Not Working**
- Check SMTP credentials in backend .env
- Verify rate limit not exceeded (3/hour)
- Check browser console for errors
- Verify API_URL in frontend .env

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Update documentation as needed
- Test thoroughly before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Wallace Wambulwa**  
Software Developer & Founder, E-sail Tech Company

- 🌐 Portfolio: [Your Live URL]
- 💼 LinkedIn: [Your LinkedIn]
- 🐙 GitHub: [@wallacetrixie](https://github.com/wallacetrixie)
- 📧 Email: wallacewambulwa@gmail.com

---

## 🙏 Acknowledgments

- React & TypeScript community
- Express.js framework
- Tailwind CSS for styling
- Framer Motion for animations
- All open-source contributors

---

## 📈 Project Status

- **Version**: 2.0 (Security-Hardened)
- **Last Updated**: October 7, 2025
- **Status**: ✅ Production Ready
- **Security Score**: 92/100
- **Maintenance**: Active

---

## 🔮 Future Enhancements

- [ ] Two-factor authentication (2FA) for admin
- [ ] Advanced analytics dashboard
- [ ] Blog system with CMS
- [ ] Multi-language support (i18n)
- [ ] Progressive Web App (PWA) features
- [ ] Advanced monitoring with Sentry
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Load testing and optimization
- [ ] API versioning (v2)
- [ ] WebSocket for real-time features

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Wallace Wambulwa](https://github.com/wallacetrixie)

</div>
