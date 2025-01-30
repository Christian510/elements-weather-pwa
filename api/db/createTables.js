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

    // await connection.execute(`
    // CREATE TABLE IF NOT EXISTS users (
    // id INT AUTO_INCREMENT PRIMARY KEY,
    // username VARCHAR(255),
    // password VARCHAR(255),
    // favorites VARCHAR(255)
    // )
    // `);
    // console.log('users table created');

    connection.end(); 
}

initDB().catch(err => {
  console.error('Error creating locations table:', err);
  throw err; // Re-throw to handle it appropriately in calling code
});

/* 
 -Future update to creating and querying tables:

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE locations (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    location_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE,
    UNIQUE (user_id, location_id) -- Prevents duplicate favorites
);

INSERT INTO favorites (user_id, location_id) 
VALUES (1, 435964);

SELECT locations.id, locations.name 
FROM locations
JOIN favorites ON locations.id = favorites.location_id
WHERE favorites.user_id = 1;

SELECT users.id, users.name 
FROM users
JOIN favorites ON users.id = favorites.user_id
WHERE favorites.location_id = 435964;

DELETE FROM favorites 
WHERE user_id = 1 AND location_id = 435964;

DELETE FROM favorites WHERE user_id = 1;

 */