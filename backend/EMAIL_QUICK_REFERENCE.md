# Email Service - Quick Reference

## 🚀 Quick Setup (Gmail)

1. **Get Gmail App Password:**
   - Visit: https://myaccount.google.com/apppasswords
   - Generate a new app password
   - Copy the 16-character password

2. **Update .env file:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_16_char_app_password
   NOTIFICATION_EMAIL=your_email@gmail.com
   ```

3. **Restart server:**
   ```bash
   npm start
   ```

## ✅ Verify It Works

```bash
# Test email config
node -e "require('./services/emailService').verifyEmailConfig().then(console.log)"

# Or submit a test contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Testing email"}'
```

## 📁 Files Created

- `/backend/services/emailService.js` - Email service with Nodemailer
- `/backend/EMAIL_SETUP_GUIDE.md` - Full setup documentation
- Updated `/backend/controllers/contactController.js` - Added email notifications
- Updated `/backend/.env.example` - Added email configuration

## 🎯 How It Works

1. User submits contact form
2. Message saved to database
3. Email notification sent to your email address
4. Email includes sender's info with reply-to functionality
5. You can reply directly from your email client

## 🔧 Customize Email Template

Edit `/backend/services/emailService.js`:
- Line 52-59: HTML template
- Line 45-48: Email styling colors
- Line 112-116: Email sender info

## ⚠️ Common Issues

**Email not arriving?**
- Check spam folder
- Verify SMTP credentials in .env
- Check server logs for errors

**Authentication failed?**
- Use App Password (not regular password)
- Enable 2-Step Verification on Gmail
- Double-check email/password in .env

**Still not working?**
- See full guide: `EMAIL_SETUP_GUIDE.md`
- Check console logs when form is submitted
- Verify email config: `node -e "require('./services/emailService').verifyEmailConfig()"`
