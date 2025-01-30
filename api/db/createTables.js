/*
 - DB create tables
 - Pre defined db functions
*/
import dotenv from 'dotenv';
import mysql from 'mysql2/promise.js';
dotenv.config({ path: './.env' });

async function initDB() {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    // if no Locations table exits create one.

    await connection.execute(`
    CREATE TABLE IF NOT EXISTS locations (
    location_id INT BINARY,
    name VARCHAR(255),
    state VARCHAR(255),
    country_code VARCHAR(255),
    lat DECIMAL(10,3),
    lng DECIMAL(10, 5)
    )
    `);
    console.log('Locations table created');

    // if no session_favorites table exits create one.
    await connection.execute(`
    CREATE TABLE IF NOT EXISTS session_favorites (
    s_id VARCHAR(128),
    l_id INT BINARY,
    l_name VARCHAR(45),
    )
    `);
    console.log('session_favorites table created');

    connection.end();
    
}

initDB().catch(err => {
  console.error('Error creating locations table:', err);
  throw err; // Re-throw to handle it appropriately in calling code
});