const { promisePool } = require('../config/database');

class ContactModel {
  // Create a new contact entry
  static async create(contactData) {
    const { name, email, subject, message } = contactData;
    
    const query = `
      INSERT INTO contacts (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `;
    
    try {
      const [result] = await promisePool.query(query, [name, email, subject, message]);
      return {
        id: result.insertId,
        name,
        email,
        subject,
        message,
        created_at: new Date()
      };
    } catch (error) {
      throw error;
    }
  }

  // Get all contacts (for admin purposes)
  static async getAll(limit = 100, offset = 0) {
    const query = `
      SELECT id, name, email, subject, message, status, created_at, read_at
      FROM contacts
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    try {
      const [rows] = await promisePool.query(query, [limit, offset]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get contact by ID
  static async getById(id) {
    const query = `
      SELECT id, name, email, subject, message, created_at
      FROM contacts
      WHERE id = ?
    `;
    
    try {
      const [rows] = await promisePool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get total count of contacts
  static async getCount() {
    const query = 'SELECT COUNT(*) as total FROM contacts';
    
    try {
      const [rows] = await promisePool.query(query);
      return rows[0].total;
    } catch (error) {
      throw error;
    }
  }

  // Delete a contact by ID
  static async deleteById(id) {
    const query = 'DELETE FROM contacts WHERE id = ?';
    
    try {
      const [result] = await promisePool.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Update contact status
  static async updateStatus(id, status) {
    const query = `
      UPDATE contacts 
      SET status = ?, 
          read_at = CASE WHEN ? IN ('read', 'replied', 'archived') AND read_at IS NULL THEN NOW() ELSE read_at END
      WHERE id = ?
    `;
    
    try {
      const [result] = await promisePool.query(query, [status, status, id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Get contacts by status
  static async getByStatus(status, limit = 100, offset = 0) {
    const query = `
      SELECT id, name, email, subject, message, status, created_at, read_at
      FROM contacts
      WHERE status = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    try {
      const [rows] = await promisePool.query(query, [status, limit, offset]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get count by status
  static async getCountByStatus(status) {
    const query = 'SELECT COUNT(*) as total FROM contacts WHERE status = ?';
    
    try {
      const [rows] = await promisePool.query(query, [status]);
      return rows[0].total;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ContactModel;
