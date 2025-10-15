const { pool } = require('../config/database');

class ContactModel {
  // Create a new contact entry
  static async create(contactData) {
    const { name, email, subject, message } = contactData;
    
    const query = `
      INSERT INTO contacts (name, email, subject, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, subject, message, created_at
    `;
    
    try {
      const result = await pool.query(query, [name, email, subject, message]);
      return result.rows[0];
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
      LIMIT $1 OFFSET $2
    `;
    
    try {
      const result = await pool.query(query, [limit, offset]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get contact by ID
  static async getById(id) {
    const query = `
      SELECT id, name, email, subject, message, created_at
      FROM contacts
      WHERE id = $1
    `;
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get total count of contacts
  static async getCount() {
    const query = 'SELECT COUNT(*) as total FROM contacts';
    
    try {
      const result = await pool.query(query);
      return result.rows[0].total;
    } catch (error) {
      throw error;
    }
  }

  // Delete a contact by ID
  static async deleteById(id) {
    const query = 'DELETE FROM contacts WHERE id = $1';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  }

  // Update contact status
  static async updateStatus(id, status) {
    const query = `
      UPDATE contacts 
      SET status = $1, 
          read_at = CASE WHEN $2 IN ('read', 'replied', 'archived') AND read_at IS NULL THEN CURRENT_TIMESTAMP ELSE read_at END
      WHERE id = $3
    `;
    
    try {
      const result = await pool.query(query, [status, status, id]);
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  }

  // Get contacts by status
  static async getByStatus(status, limit = 100, offset = 0) {
    const query = `
      SELECT id, name, email, subject, message, status, created_at, read_at
      FROM contacts
      WHERE status = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;
    
    try {
      const result = await pool.query(query, [status, limit, offset]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get count by status
  static async getCountByStatus(status) {
    const query = 'SELECT COUNT(*) as total FROM contacts WHERE status = $1';
    
    try {
      const result = await pool.query(query, [status]);
      return result.rows[0].total;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ContactModel;
