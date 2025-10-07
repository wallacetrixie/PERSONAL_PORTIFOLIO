const mysql = require('mysql2');
require('dotenv').config();

// Create database and tables
const initDatabase = async () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306
  });

  try {
    // Create database if it doesn't exist
    await connection.promise().query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`✅ Database '${process.env.DB_NAME}' created or already exists`);

    // Use the database
    await connection.promise().query(`USE ${process.env.DB_NAME}`);

    // Create contacts table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await connection.promise().query(createTableQuery);
    console.log('✅ Contacts table created successfully');

    console.log('\n🎉 Database initialization completed!');
    console.log('You can now start the server with: npm start or npm run dev\n');

    connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    connection.end();
    process.exit(1);
  }
};

initDatabase();
