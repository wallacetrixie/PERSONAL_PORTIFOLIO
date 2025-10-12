# Email Notification Setup Guide

This guide will help you configure email notifications for your portfolio contact form using Nodemailer and SMTP.

## 📋 Overview

When someone submits a contact form on your portfolio, you'll automatically receive an email notification with all the details.

## 🔧 Configuration Steps

### 1. Environment Variables

Add the following variables to your `.env` file (copy from `.env.example`):

```env
# Email Configuration - SMTP Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password

# Notification Email - Where contact form submissions will be sent
NOTIFICATION_EMAIL=your_email@gmail.com
```

### 2. Gmail Setup (Recommended)

If you're using Gmail:

#### Step 1: Enable 2-Step Verification
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled

#### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" as the app
3. Select "Other" as the device and name it (e.g., "Portfolio Contact Form")
4. Click **Generate**
5. Copy the 16-character password (remove spaces)
6. Use this password in `SMTP_PASS` environment variable

#### Step 3: Update .env File
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_actual_email@gmail.com
SMTP_PASS=your_16_character_app_password
NOTIFICATION_EMAIL=your_actual_email@gmail.com
```

### 3. Other Email Providers

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_password
```

#### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@yahoo.com
SMTP_PASS=your_app_password
```

#### Custom SMTP Server
```env
SMTP_HOST=your_smtp_host.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_username
SMTP_PASS=your_password
```

## ✅ Testing the Email Service

### Option 1: Using the Verification Script

Create a test script to verify your email configuration:

```bash
cd backend
node -e "require('./services/emailService').verifyEmailConfig().then(console.log)"
```

### Option 2: Test with a Real Contact Form Submission

1. Start your server:
   ```bash
   cd backend
   npm start
   ```

2. Submit a test contact form (using curl or your frontend):
   ```bash
   curl -X POST http://localhost:5000/api/contacts \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "subject": "Test Subject",
       "message": "This is a test message"
     }'
   ```

3. Check your email inbox for the notification

## 📧 Email Features

### What You'll Receive

Each email notification includes:
- **Sender's Name**
- **Sender's Email** (clickable to reply)
- **Subject Line**
- **Full Message Content**
- **Timestamp** of when the message was received
- **Professional HTML formatting** with your brand colors

### Reply Functionality

The notification emails are configured with `replyTo` field, which means:
- You can click "Reply" in your email client
- Your reply will go directly to the person who submitted the form
- No need to copy their email address manually

## 🔍 Troubleshooting

### Issue: "Authentication Failed"

**Solution:**
- For Gmail: Make sure you're using an App Password, not your regular password
- Check that 2-Step Verification is enabled
- Verify the email and password are correct in `.env`

### Issue: "Connection Timeout"

**Solution:**
- Check your firewall settings
- Verify the SMTP host and port are correct
- Try using port 465 with `SMTP_SECURE=true` instead of 587

### Issue: "No Email Received"

**Solution:**
1. Check spam/junk folder
2. Verify `NOTIFICATION_EMAIL` is correct
3. Check server logs for error messages:
   ```bash
   # Look for email-related logs
   npm start
   ```

### Issue: "Self-Signed Certificate Error"

**Solution:**
Add this to your email service configuration (not recommended for production):
```javascript
// In emailService.js, add to transporter options:
tls: {
  rejectUnauthorized: false
}
```

## 🔒 Security Best Practices

1. **Never commit `.env` file** to version control
2. **Use App Passwords** instead of regular passwords
3. **Enable 2FA** on your email account
4. **Use environment variables** for all sensitive data
5. **Set strong passwords** for production email accounts
6. **Monitor email logs** for suspicious activity

## 📊 Server Logs

When an email is sent successfully, you'll see:
```
✅ Email sent successfully: <message-id>
✅ Email notification sent for contact: 123
```

When an email fails:
```
❌ Failed to send email notification: [error message]
❌ Error sending email: [detailed error]
```

## 🎨 Customization

### Modify Email Template

Edit `/backend/services/emailService.js`:

1. **Change colors**: Update the `#4F46E5` hex color
2. **Add logo**: Insert an `<img>` tag in the header
3. **Modify layout**: Edit the HTML structure
4. **Change sender name**: Update the `from` field

### Example Customization:

```javascript
// Change the from name
from: `"Your Name - Portfolio" <${process.env.SMTP_USER}>`,

// Add your logo
<div class="header">
  <img src="https://your-domain.com/logo.png" alt="Logo" style="height: 50px;">
  <h2>📧 New Contact Form Submission</h2>
</div>
```

## 🚀 Production Deployment

When deploying to production:

1. **Update environment variables** on your hosting platform
2. **Use a dedicated email account** for your portfolio
3. **Enable email logging** for monitoring
4. **Set up email alerts** for failed deliveries
5. **Consider using a transactional email service** (SendGrid, AWS SES, Mailgun) for better deliverability

### Recommended Production Services:

- **SendGrid**: Free tier (100 emails/day)
- **AWS SES**: Very affordable ($0.10 per 1000 emails)
- **Mailgun**: Free tier (5,000 emails/month for 3 months)
- **Postmark**: Developer-friendly with excellent deliverability

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833)
- [SMTP Configuration Guide](https://nodemailer.com/smtp/)

## ❓ Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review server logs for error messages
3. Verify all environment variables are set correctly
4. Test with the verification script first
