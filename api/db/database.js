/*
 - DB connect
 - Pre defined db functions
*/

const { json } = require('body-parser');
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}).promise();

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
    // console.log('sessions: ', result[0]);
    return result[0];
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error; // Re-throw to handle it appropriately in calling code
  }
}
// getSessions();

function findOneById(table, col, id) {
  return pool.execute('SELECT * FROM ' + table + ' WHERE ' + col + ' = ? LIMIT 1', [id])
    .then(result => {
      // console.log('result: ', result[0]);
      if (result[0].length === 1) {
        return result[0];
      } else {
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

// returns a stringifyed json object
function findAllById(table, col, id) {
  return pool.execute('SELECT * FROM ' + table + ' WHERE ' + col + ' = ?', [id])
    .then(result => {
      return result[0];
    })
    .catch(err => {
      console.log('error msg: ', err)
    });
}

// findAllById('locations', 'session_id', '7tvrVX2rMmXDwaP-FRW6XxUuTN1JbbN6')

// Insert one Location
async function insertOne(session_id='', location_id='') {
  // Does the location exist in locations and session_favorite db?
  const query1 = `SELECT s.*, sf.*, l.*
                  FROM sessions s
                  LEFT JOIN session_favorites sf ON s.session_id = sf.s_id
                  LEFT JOIN locations l ON l.location_id = sf.l_id
                  WHERE sf.l_id = ?
                  AND sf.s_id = ?;`;
  const [value] = await pool.execute(query1, [location_id, session_id])
  console.log('value: ', value.length > 0);

  if (value.length === 0) {
    console.log(`${value[0]}: location does not exist`)
  // const query2 = `UPDATE ${table} 
  //                 SET ${col} = JSON_ARRAY_APPEND(${col},'$',CAST(? AS JSON))
  //                 WHERE session_id = ?;`;

  // return await pool.execute(query2, [jsonStr, session])
  //   .then(result => {
  //     console.log('result: ', result[0]);
  //     return result[0];
  //   })
  //   .catch(err => {
  //     console.log('error msg: ', err);
  //     throw new Error('Unable to insert location: ', err);
  //   });
  } else if (value.length === 1) {
    console.log(`${value[0].id_exists}: location already exists`)
    // return;
  }
}
insertOne('7tvrVX2rMmXDwaP-FRW6XxUuTN1JbbN6', '5666630')

// // Delete a Location
function deleteOne(table, col, session_id, index=null) {
  // console.log('location_id: ', typeof parseInt(location_id), location_id);
  // console.log('session_id: ', typeof session_id, session_id);
  // console.log('table: ', typeof table, table);
  const i = parseInt(index);
  // console.log('index: ', typeof i, i);
  const query = `UPDATE ${table} 
  SET ${col} = JSON_REMOVE(${col},'$[0]')
  WHERE session_id = ?;`;
  return pool.execute(query, [index, session_id])
    .then(result => {
      console.log('result: ', result);
      return result[0];
    })
    .catch(err => {
      console.log('error msg: ', err)
      throw new Error('Unable to delete favorite: ', err);
    })
}

function deleteExpiredSession() {
  // this will need to delete expired session and all locations associated with that session.
  const query = `DELETE FROM sessions WHERE expires < NOW()`
  return pool.execute(query)
    .then(result => {
      console.log('result: ', result[0]);
      return result[0];
    })
    .catch(err => {
      console.log('error msg: ', err)
      throw new Error('Unable to delete location: ', err);
    })
}
// deleteExpiredSession();

function CreateUserTable() {
  const query = `CREATE TABLE IF NOT EXISTS users 
  (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), 
  password VARCHAR(255))`;
  return pool.execute(query)
    .then(result => {
      console.log('result: ', result[0]);
      return result[0];
    })
    .catch(err => {
      console.log('error msg: ', err)
      throw new Error('Unable to create users table: ', err);
    })
}

// Insert One User

// Get User

// Update User

// Delete User

module.exports = {
  pool,
  findAllById,
  findOneById,
  insertOne,
  deleteOne,
}
