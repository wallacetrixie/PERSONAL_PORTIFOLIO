const ContactModel = require('../models/Contact');

class ContactController {
  // Handle contact form submission
  static async createContact(req, res) {
    try {
      const { name, email, subject, message } = req.body;

      // Create contact in database
      const contact = await ContactModel.create({ name, email, subject, message });

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

  // Get all contacts (admin endpoint)
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

  // Get single contact by ID
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

  // Delete contact by ID
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

  // Health check endpoint
  static async healthCheck(req, res) {
    res.status(200).json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = ContactController;
