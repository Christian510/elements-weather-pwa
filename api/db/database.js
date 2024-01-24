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

function findOneById(table, col, id) {
  return pool.execute('SELECT * FROM ' + table + ' WHERE ' + col + ' = ? LIMIT 1', [id])
    .then(result => {
      // console.log('session: ', result[0]);
      if (result[0].length === 1) {
        pool.end();
        return result[0];
      } else {
        pool.end();
        return null;
      }
    })
    .catch(err => {
      console.log('error msg: ', err)
    });
}
// findOneById('sessions', 'session', '7tvrVX2rMmXDwaP-FRW6XxUuTN1JbbN6')
// findOneById('locations', 'location_id', '5391811')

// function getFavorites(sessionID) {
//     return pool.execute(`SELECT * FROM locations WHERE session_id = ?`, [sessionID])
//         .then(result => {
//             console.log('locations: ', result[0]);
//             pool.end();
//             return result[0];
//         })
//         .catch(err => {
//             console.log('error msg: ', err)
//         });
// }

function findAllById(table, col, id) {
  return pool.execute('SELECT * FROM ' + table + ' WHERE ' + col + ' = ?', [id])
    .then(result => {
      pool.end();
      return result[0];
    })
    .catch(err => {
      console.log('error msg: ', err)
    });
}
// getAllById('locations', 'session_id', '7tvrVX2rMmXDwaP-FRW6XxUuTN1JbbN6')


// Insert one Location
function insertOne(table, col = [], values = []) {
  const query = `INSERT INTO ${table} (${col.join(', ')}) VALUES (${values.map(v => pool.escape(v)).join(', ')})`;
  return pool.execute(query)
    .then(result => {
      console.log('result: ', result[0]);
      pool.end();
      return result[0];
    })
    .catch(err => {
      console.log('error msg: ', err);
      throw new Error('Unable to insert location: ', err);
    });
}
// insertOne('locations', 
// ['location_id', 'session_id', 'name', 'fetch_url', 'lat', 'lng', ], 
// ['5586437', '7tvrVX2rMmXDwaP-FRW6XxUuTN1JbbN6', 'Boise ID', 'https://api.weather.gov/gridpoints/BOI/133,86/forecast', '43.6135', '-116.2035'])

//   return db.execute(`
//   SELECT *` +
//   `FROM locations
//   JOIN sessions ON locations.session_id = sessions.session_id
//   WHERE locations.location_id = :location_id AND sessions.session_id = :session_id
//   INSERT INTO locations (location_id, session_id, name, fetch_URL, lat, lng) VALUES (?, ?)
//   `,
//     [req.body.id, req.sessionID])



// // Delete a Location
function deleteOne(table, col, id) {
  return pool.execute('DELETE FROM ' + table + ' WHERE ' + col + '_id = ?', [id])
    .then(result => {
      console.log('result: ', result[0]);
      pool.end();
      return result[0];
    })
    .catch(err => {
      console.log('error msg: ', err)
      throw new Error('Unable to delete location: ', err);
    })
}

// // If no users table exits create one
// async function createUsersTable() {
//     const [rows, fields] = await pool.execute(`
//     CREATE TABLE IF NOT EXISTS users 
//     (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), 
//     password VARCHAR(255))`);
//     return rows;
// }

// Insert One User

// Get User

// Update User

// Delete User

// Save Session

// Get Session

// Delete Session

// module.exports = pool;
module.exports = {
  pool,
  findAllById,
}
