# 🎨 Deployment Architecture Diagram

## Full Stack Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                         🌐 END USERS (Browsers)                         │
│                                                                         │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             │ HTTPS
                             │
        ┌────────────────────┴────────────────────┐
        │                                         │
        │                                         │
        ▼                                         ▼
┌──────────────────┐                    ┌──────────────────┐
│                  │                    │                  │
│  📱 FRONTEND     │◄───────────────────│  🔐 ADMIN       │
│                  │                    │  DASHBOARD      │
│  Vercel          │                    │                  │
│  React/Vite      │                    │  React          │
│                  │                    │                  │
│  ✅ DEPLOYED     │                    │  Login/Manage   │
│                  │                    │                  │
└────────┬─────────┘                    └────────┬─────────┘
         │                                       │
         │ API Calls (fetch/axios)               │ Auth API
         │ https://backend.onrender.com/api      │
         │                                       │
         └───────────────┬───────────────────────┘
                         │
                         │ HTTPS
                         │
                ┌────────▼────────┐
                │                 │
                │  🚀 BACKEND     │
                │                 │
                │  Render         │
                │  Node.js/Express│
                │                 │
                │  • REST API     │
                │  • Auth (JWT)   │
                │  • Rate Limiting│
                │  • CORS         │
                │  • Validation   │
                │                 │
                └────────┬────────┘
                         │
                         │ PostgreSQL Protocol
                         │ Connection Pooling
                         │
                ┌────────▼────────┐
                │                 │
                │  💾 DATABASE    │
                │                 │
                │  Supabase       │
                │  PostgreSQL     │
                │                 │
                │  • Contacts     │
                │  • Admin Users  │
                │  • Sessions     │
                │  • Activity Log │
                │                 │
                └─────────────────┘
```

---

## Data Flow: Contact Form Submission

```
┌──────────┐     1. Form Submit      ┌──────────┐
│          │────────────────────────►│          │
│  USER    │                         │ FRONTEND │
│ Browser  │                         │ (Vercel) │
│          │◄────────────────────────│          │
└──────────┘     7. Success UI       └─────┬────┘
                                           │
                                           │ 2. POST /api/contact
                                           │    + Validation
                                           │    + CORS Check
                                           ▼
                                     ┌──────────┐
                                     │          │
                                     │ BACKEND  │
                                     │ (Render) │
                                     │          │
                                     └─────┬────┘
                                           │
                                           │ 3. Validate & Sanitize
                                           │ 4. INSERT INTO contacts
                                           ▼
                                     ┌──────────┐
                                     │          │
                                     │ DATABASE │
                                     │(Supabase)│
                                     │          │
                                     └─────┬────┘
                                           │
                                           │ 5. Return inserted row
                                           ▼
                                     ┌──────────┐
                                     │          │
                                     │ BACKEND  │
                                     │ (Render) │
                                     │          │
                                     └─────┬────┘
                                           │
                                           │ 6. Send email notification
                                           │    Return JSON response
                                           ▼
                                     ┌──────────┐
                                     │  Email   │
                                     │  Service │
                                     │  (SMTP)  │
                                     └──────────┘
```

---

## Data Flow: Admin Login

```
┌──────────┐     1. Login Form       ┌──────────┐
│          │────────────────────────►│          │
│  ADMIN   │                         │ FRONTEND │
│ Browser  │                         │ (Vercel) │
│          │◄────────────────────────│          │
└──────────┘     6. Redirect to      └─────┬────┘
                    Dashboard              │
                                           │ 2. POST /api/auth/login
                                           │    {email, password}
                                           ▼
                                     ┌──────────┐
                                     │          │
                                     │ BACKEND  │
                                     │ (Render) │
                                     │          │
                                     └─────┬────┘
                                           │
                                           │ 3. SELECT * FROM admin_users
                                           │    WHERE email = $1
                                           ▼
                                     ┌──────────┐
                                     │          │
                                     │ DATABASE │
                                     │(Supabase)│
                                     │          │
                                     └─────┬────┘
                                           │
                                           │ 4. Return user data
                                           ▼
                                     ┌──────────┐
                                     │          │
                                     │ BACKEND  │
                                     │ (Render) │
                                     │          │
                                     │ • Verify password (bcrypt)
                                     │ • Generate JWT token
                                     │ • Create session
                                     │ • Update last_login_at
                                     │          │
                                     └─────┬────┘
                                           │
                                           │ 5. Return JWT + user info
                                           ▼
                                     Store token in
                                     localStorage/cookie
```

---

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                        │
└─────────────────────────────────────────────────────────────┘

Layer 1: Network Security
┌─────────────────────────────────────────┐
│ • HTTPS (TLS 1.3)                       │
│ • SSL Certificates (Auto by platforms)  │
│ • DDoS Protection (Vercel/Render/Supabase)│
└─────────────────────────────────────────┘

Layer 2: Application Security
┌─────────────────────────────────────────┐
│ • CORS (Whitelist specific origins)     │
│ • Rate Limiting (100 req/15min per IP)  │
│ • Helmet.js (Security headers)          │
│ • Input Validation (express-validator)  │
│ • XSS Protection (xss package)          │
│ • SQL Injection Protection (parameterized)│
└─────────────────────────────────────────┘

Layer 3: Authentication Security
┌─────────────────────────────────────────┐
│ • JWT Tokens (32+ char secret)          │
│ • Bcrypt Password Hashing (12 rounds)   │
│ • Session Management (database-backed)  │
│ • Account Lockout (5 failed attempts)   │
│ • Password Strength Requirements        │
└─────────────────────────────────────────┘

Layer 4: Database Security
┌─────────────────────────────────────────┐
│ • Connection Pooling (Supabase)         │
│ • SSL Connections                        │
│ • Parameterized Queries (no string concat)│
│ • Row Level Security (Supabase RLS)     │
│ • Regular Backups                        │
└─────────────────────────────────────────┘
```

---

## Environment Variables Flow

```
┌──────────────────────────────────────────────────────────────┐
│                   ENVIRONMENT CONFIGURATION                   │
└──────────────────────────────────────────────────────────────┘

LOCAL DEVELOPMENT (.env file)
┌─────────────────────────────────────┐
│ NODE_ENV=development                │
│ DATABASE_URL=postgresql://...       │
│ JWT_SECRET=local-secret             │
│ FRONTEND_URL=http://localhost:5173  │
└─────────────────────────────────────┘
                  │
                  │ Never committed to Git!
                  │ (.gitignore)
                  ▼

PRODUCTION (Platform Environment Variables)

┌─────────────────────────────────────┐
│         VERCEL (Frontend)           │
├─────────────────────────────────────┤
│ VITE_API_URL=https://backend...    │
│ VITE_BACKEND_URL=https://...       │
│ VITE_NODE_ENV=production           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         RENDER (Backend)            │
├─────────────────────────────────────┤
│ NODE_ENV=production                 │
│ DATABASE_URL=postgresql://...       │
│ JWT_SECRET=[32-char-random]        │
│ SESSION_SECRET=[32-char-random]    │
│ FRONTEND_URL=https://vercel...     │
│ EMAIL_USER=email@gmail.com         │
│ EMAIL_PASS=app-password            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│       SUPABASE (Database)           │
├─────────────────────────────────────┤
│ Managed by Supabase                │
│ Connection string provided          │
│ SSL enabled automatically           │
└─────────────────────────────────────┘
```

---

## Request/Response Cycle

```
Frontend Request:
┌──────────────────────────────────────────────────────────┐
│ fetch('https://backend.onrender.com/api/contact', {     │
│   method: 'POST',                                        │
│   headers: {                                             │
│     'Content-Type': 'application/json',                  │
│     'Authorization': 'Bearer <JWT_TOKEN>' // if auth    │
│   },                                                     │
│   body: JSON.stringify({                                │
│     name: 'John Doe',                                    │
│     email: 'john@example.com',                           │
│     subject: 'Hello',                                    │
│     message: 'Test message'                              │
│   })                                                     │
│ })                                                       │
└──────────────────────────────────────────────────────────┘
                            │
                            ▼
Backend Processing:
┌──────────────────────────────────────────────────────────┐
│ 1. CORS Check                                            │
│    ✓ Origin matches FRONTEND_URL                         │
│                                                           │
│ 2. Rate Limiting                                          │
│    ✓ IP not exceeded limit                               │
│                                                           │
│ 3. Input Validation                                       │
│    ✓ Email format valid                                  │
│    ✓ Name length 2-100 chars                             │
│    ✓ Subject length 5-200 chars                          │
│    ✓ Message length 10-1000 chars                        │
│                                                           │
│ 4. Sanitization                                           │
│    ✓ Remove XSS attempts                                 │
│    ✓ Trim whitespace                                     │
│                                                           │
│ 5. Database Insert                                        │
│    INSERT INTO contacts (name, email, subject, message)  │
│    VALUES ($1, $2, $3, $4) RETURNING *                   │
│                                                           │
│ 6. Email Notification                                     │
│    Send via SMTP to admin email                          │
│                                                           │
│ 7. Response                                               │
│    Status: 201 Created                                    │
│    Body: { success: true, message: '...', data: {...} }  │
└──────────────────────────────────────────────────────────┘
```

---

## Deployment Timeline

```
Week 1: PREPARATION
├── Day 1: Convert MySQL to PostgreSQL ✅
├── Day 2: Update all queries to use pg ✅
├── Day 3: Test locally with Supabase ✅
└── Day 4: Update documentation ✅

Week 2: DEPLOYMENT
├── Day 1: Set up Supabase database
│   ├── Create project
│   ├── Run schema.sql
│   └── Get connection string
│
├── Day 2: Deploy backend to Render
│   ├── Connect GitHub repo
│   ├── Configure environment variables
│   ├── Deploy and test
│   └── Create admin user
│
├── Day 3: Update frontend on Vercel
│   ├── Add backend URL to env vars
│   ├── Redeploy
│   └── Test API connections
│
└── Day 4: Testing & Monitoring
    ├── End-to-end testing
    ├── Set up monitoring
    └── Performance optimization
```

---

## Cost Breakdown

```
FREE TIER (Perfect for Portfolio)
┌─────────────────────────────────────────────────────┐
│ Vercel:     FREE                                    │
│   • Unlimited sites                                 │
│   • 100GB bandwidth/month                           │
│   • Custom domains                                  │
│   • Auto SSL                                        │
│                                                     │
│ Render:     FREE                                    │
│   • 750 hours/month                                 │
│   • Sleeps after 15min inactivity                   │
│   • 0.5GB RAM, shared CPU                          │
│                                                     │
│ Supabase:   FREE                                    │
│   • 500MB database                                  │
│   • 2GB bandwidth                                   │
│   • 50,000 monthly active users                     │
│   • Daily backups (7 days retention)                │
│                                                     │
│ TOTAL:      $0/month 🎉                             │
└─────────────────────────────────────────────────────┘

PAID TIER (For Production Traffic)
┌─────────────────────────────────────────────────────┐
│ Vercel Pro:     $20/month                           │
│   • 1TB bandwidth                                   │
│   • Priority support                                │
│   • Advanced analytics                              │
│                                                     │
│ Render:         $7/month                            │
│   • Always on (no sleep)                            │
│   • 0.5GB RAM                                       │
│   • Faster builds                                   │
│                                                     │
│ Supabase Pro:   $25/month                           │
│   • 8GB database                                    │
│   • 50GB bandwidth                                  │
│   • Daily backups (30 days retention)               │
│   • Priority support                                │
│                                                     │
│ TOTAL:          $52/month                           │
└─────────────────────────────────────────────────────┘
```

---

## Monitoring & Logging

```
┌────────────────────────────────────────────────────────────┐
│                   MONITORING STACK                         │
└────────────────────────────────────────────────────────────┘

Application Logs
┌─────────────────────────────────────┐
│ Vercel Logs:                        │
│  • Function logs                    │
│  • Build logs                       │
│  • Runtime errors                   │
│                                     │
│ Render Logs:                        │
│  • Application stdout/stderr        │
│  • Request logs                     │
│  • Error traces                     │
│                                     │
│ Supabase Logs:                      │
│  • Query logs                       │
│  • Connection logs                  │
│  • Slow queries                     │
└─────────────────────────────────────┘

Uptime Monitoring (Optional)
┌─────────────────────────────────────┐
│ UptimeRobot (Free):                 │
│  • Ping backend every 5 minutes     │
│  • Email alerts on downtime         │
│  • Keeps Render service awake       │
│                                     │
│ Alternative: Cron-job.org           │
└─────────────────────────────────────┘

Error Tracking (Optional)
┌─────────────────────────────────────┐
│ Sentry (Free tier):                 │
│  • Real-time error tracking         │
│  • Stack traces                     │
│  • User context                     │
│                                     │
│ Alternative: LogRocket              │
└─────────────────────────────────────┘
```

---

*Last Updated: October 15, 2025*
