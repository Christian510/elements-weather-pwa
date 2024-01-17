/*
 - DB connect
 - Pre defined db functions
*/

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});


// if no Locations table exits create one.
// async function createLocationsTable() {
//     try {
//         const result = await pool.query(`
//         CREATE TABLE IF NOT EXISTS locations 
//         (location_id VARCHAR(255) PRIMARY KEY, session_id VARCHAR(255))`);
//         console.log('result: ', result[0]);
//         pool.end();
//         return result[0];
//       } catch (error) {
//         console.error('Error creating locations table:', error);
//         throw error; // Re-throw to handle it appropriately in calling code
//       }
// }

// Get Locations

async function getSessions() {
    try {
      const result = await pool.query(`SELECT * FROM sessions`);
      console.log('sessions: ', result[0]);
      // pool.end();
      return result[0];
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error; // Re-throw to handle it appropriately in calling code
    }
}
// getSessions()

async function getLocations(sessionID) {
    try {
        const result = await pool.query(`SELECT * FROM locations WHERE session_id = ?`, [sessionID]);
        console.log('locations: ', result[0]);
        // pool.end();
        return result[0];
      } catch (error) {
        console.error('Error fetching locations:', error);
        throw error; // Re-throw to handle it appropriately in calling code
      }
}
// getLocations('7tvrVX2rMmXDwaP-FRW6XxUuTN1JbbN6')

// Insert one Location
async function insertLocation(location) {
    const [rows, fields] = await pool.execute('INSERT INTO locations (location_id, session_id) VALUES (?, ?)', location);
    console.log('updatedd locations: ', rows);
    return rows;
}

// insertLocation(['12345', '7tvrVX2rMmXDwaP-FRW6XxUuTN1JbbN6'])


// // Delete a Location
// async function deleteLocation(location) {
//     const [rows, fields] = await pool.execute('DELETE FROM locations WHERE location_id = ?', location);
//     return rows;
// }

// // If no users table exits create one
// async function createUsersTable() {
//     const [rows, fields] = await pool.execute(`
//     CREATE TABLE IF NOT EXISTS users 
//     (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), 
//     password VARCHAR(255))`);
//     return rows;
// }
// // Insert One User
// async function insertUser(user) {
//     const [rows, fields] = await pool.execute('INSERT INTO users (username, password) VALUES (?, ?)', user);
//     return rows;
// }

// // Get User
// async function getUser(user) {
//     const [rows, fields] = await pool.execute('SELECT * FROM users WHERE username = ?', user);
//     return rows;
// }

// // Update User
// async function updateUser(user) {
//     const [rows, fields] = await pool.execute('UPDATE users SET password = ? WHERE username = ?', user);
//     return rows;
// }

// // Delete User
// async function deleteUser(user) {
//     const [rows, fields] = await pool.execute('DELETE FROM users WHERE username = ?', user);
//     return rows;
// }
// Save Session

// Get Session

// Delete Session

module.exports = pool;
