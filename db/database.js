/*
 - DB connect
 - Pre defined db functions
*/

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
})

module.exports = pool.promise();

// if no Locations table exits create one.

// Save a Location

// Delete a Location

// Get Locations

// If no users table exits create one

// Save User

// Get User

// Update User

// Delete User

// Save Session

// Get Session

// Delete Session

