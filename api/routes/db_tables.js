const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'elements_weather_app'
});


router.get('/create-tables', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`
            CREATE TABLE IF NOT EXISTS locations (
                location_id INT NOT NULL,
                name VARCHAR(45) NOT NULL,
                state VARCHAR(45) NOT NULL,
                country_code VARCHAR(45) NOT NULL,
                lat DECIMAL(8,5) NOT NULL,
                lng DECIMAL(8,5) NOT NULL,
                PRIMARY KEY (location_id)
            );

            CREATE TABLE IF NOT EXISTS session_favorites (
                s_id VARCHAR(128) NOT NULL,
                l_id INT NOT NULL,
                l_name VARCHAR(45) NULL,
            );

            CREATE TABLE IF NOT EXISTS users (
                user_id INT NOT NULL AUTO_INCREMENT,
                username VARCHAR(45) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(255) NOT NULL,
                PRIMARY KEY (user_id),
                UNIQUE KEY (username),
                UNIQUE KEY (email)
            );
        `);
        connection.release();
        res.send('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
        res.status(500).send('Error creating tables.');
    }
});

module.exports = router;