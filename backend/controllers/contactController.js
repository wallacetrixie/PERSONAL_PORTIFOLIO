const ContactModel = require('../models/Contact');
const { sendContactNotification } = require('../services/emailService');

class ContactController {
  static async createContact(req, res) {
    try {
      const { name, email, subject, message } = req.body;

      const contact = await ContactModel.create({ name, email, subject, message });

      sendContactNotification(contact)
        .then(() => {
          console.log('✅ Email notification sent for contact:', contact.id);
        })
        .catch((error) => {
          console.error('❌ Failed to send email notification:', error.message);
        });

      res.status(201).json({
        success: true,
        message: 'Contact form submitted successfully',
        data: {
          id: contact.id,
          name: contact.name,
          email: contact.email
        }
      });
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit contact form',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  static async getAllContacts(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 100;
      const offset = parseInt(req.query.offset) || 0;

      const contacts = await ContactModel.getAll(limit, offset);
      const total = await ContactModel.getCount();

      res.status(200).json({
        success: true,
        data: contacts,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch contacts',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  static async getContactById(req, res) {
    try {
      const { id } = req.params;
      const contact = await ContactModel.getById(id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }

      res.status(200).json({
        success: true,
        data: contact
      });
    } catch (error) {
      console.error('Error fetching contact:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch contact',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  static async deleteContact(req, res) {
    try {
      const { id } = req.params;
      const deleted = await ContactModel.deleteById(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Contact deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete contact',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Update contact status
  static async updateContactStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = ['new', 'read', 'replied', 'archived'];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
      }

      const updated = await ContactModel.updateStatus(id, status);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Contact status updated successfully',
        data: { id, status }
      });
    } catch (error) {
      console.error('Error updating contact status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update contact status',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Comprehensive health check endpoint for cloud monitoring
  static async healthCheck(req, res) {
    const healthStatus = {
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      services: {
        database: 'unknown',
        email: 'unknown'
      },
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB'
      }
    };

    // Check database connection
    try {
      const { pool } = require('../config/database');
      await pool.query('SELECT 1');
      healthStatus.services.database = 'connected';
    } catch (error) {
      healthStatus.services.database = 'disconnected';
      healthStatus.success = false;
      healthStatus.status = 'unhealthy';
    }

    // Check email service configuration
    try {
      const { verifyEmailConfig } = require('../services/emailService');
      const isEmailConfigured = await verifyEmailConfig();
      healthStatus.services.email = isEmailConfigured ? 'configured' : 'not-configured';
    } catch (error) {
      healthStatus.services.email = 'not-configured';
      // Email is optional, so don't mark as unhealthy
    }

    const statusCode = healthStatus.success ? 200 : 503;
    res.status(statusCode).json(healthStatus);
  }
}

module.exports = ContactController;
