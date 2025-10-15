const { Pool } = require('pg');
require('dotenv').config();

// Create database and tables
const initDatabase = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    console.log('🔄 Initializing PostgreSQL database...');

    // Create contacts table
    const createContactsTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500),
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
        ip_address VARCHAR(45) DEFAULT NULL,
        user_agent TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        read_at TIMESTAMP DEFAULT NULL
      );
    `;

    await pool.query(createContactsTableQuery);
    console.log('✅ Contacts table created successfully');

    // Create indexes for contacts table
    await pool.query('CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);');
    console.log('✅ Contacts table indexes created successfully');

    // Create trigger function for updated_at
    const createTriggerFunctionQuery = `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ language 'plpgsql';
    `;

    await pool.query(createTriggerFunctionQuery);
    console.log('✅ Trigger function created successfully');

    // Create trigger for contacts table
    const createTriggerQuery = `
      DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
      CREATE TRIGGER update_contacts_updated_at 
      BEFORE UPDATE ON contacts
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `;

    await pool.query(createTriggerQuery);
    console.log('✅ Contacts table trigger created successfully');

    console.log('\n🎉 Database initialization completed!');
    console.log('You can now start the server with: npm start or npm run dev\n');

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    await pool.end();
    process.exit(1);
  }
};

initDatabase();
