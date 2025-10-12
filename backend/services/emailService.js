const nodemailer = require('nodemailer');

/**
 * Email Service
 * Handles sending email notifications using SMTP
 */

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

/**
 * Send new contact notification email
 * @param {Object} contactData - Contact form data
 * @returns {Promise} - Email send result
 */
const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();

    const { name, email, subject, message, created_at } = contactData;

    // Email HTML template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #4F46E5;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 5px 5px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .field {
              margin-bottom: 20px;
            }
            .label {
              font-weight: bold;
              color: #4F46E5;
              display: block;
              margin-bottom: 5px;
            }
            .value {
              padding: 10px;
              background-color: #f5f5f5;
              border-left: 3px solid #4F46E5;
              border-radius: 3px;
            }
            .message-box {
              padding: 15px;
              background-color: #f5f5f5;
              border-radius: 5px;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📧 New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <span class="label">Email:</span>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="field">
                <span class="label">Subject:</span>
                <div class="value">${subject}</div>
              </div>
              
              <div class="field">
                <span class="label">Message:</span>
                <div class="message-box">${message}</div>
              </div>
              
              <div class="field">
                <span class="label">Received at:</span>
                <div class="value">${new Date(created_at).toLocaleString()}</div>
              </div>
              
              <div class="footer">
                <p>This is an automated notification from your portfolio contact form.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Received at: ${new Date(created_at).toLocaleString()}

---
This is an automated notification from your portfolio contact form.
    `;

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFICATION_EMAIL, 
      subject: `New Contact: ${subject}`,
      text: textContent,
      html: htmlContent,
      replyTo: email, 
    });

    console.log('✅ Email sent successfully:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

/**
 * Verify email configuration
 * @returns {Promise<boolean>} 
 */
const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ SMTP server is ready to send emails');
    return true;
  } catch (error) {
    console.error('❌ SMTP configuration error:', error.message);
    return false;
  }
};

module.exports = {
  sendContactNotification,
  verifyEmailConfig,
};
