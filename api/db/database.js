/*
 - DB connect
 - Pre defined db functions
*/

// const { json } = require('body-parser');
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}).promise();

function executeQuery(query, values) {
  console.log('query: ', query);
  console.log('values: ', [...values]);
  return pool.execute(query, [...values])
    .then(result => {
      // console.log('result: ', result);
      return result;
    })
    .catch(err => {
      console.log('error msg: ', err)
    });
}

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
    return result;
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error; // Re-throw to handle it appropriately in calling code
  }
}
// getSessions();

function findOneById(table, col, id) {
  console.log('table: ', table);
  console.log('col: ', col);
  console.log('id: ', id);
  // return pool.execute('SELECT * FROM ' + table + ' WHERE ' + col + ' = ? LIMIT 1', [id])
  //   .then(result => {
  //     // console.log('result: ', result[0]);
  //     if (result[0].length === 1) {
  //       return result[0];
  //     } else {
  //       return null;
  //     }
  //   })
  //   .catch(err => {
  //     console.log('error msg: ', err)
  //   });
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

// returns all locations for a session_id
async function findAllById(table, col, session_id = '') {
  console.log('session_id: ', session_id);
  const query_ids = `SELECT * FROM ${table} WHERE ${col} = ?`;
  const query_data = `SELECT * FROM locations WHERE location_id = ?`;
  const favorites = [];
  const [rows] = await executeQuery(query_ids, [session_id])
  // console.log('rows: ', rows);
  if (rows.length === 0) {
    return [];
  }
  if (rows.length > 0) {
    for (let i = 0; i < rows.length; i++) {
      const [data] = await executeQuery(query_data, [rows[i].l_id])
      favorites.push(data[0]);
    }
  }
  // console.log('favorites: ', favorites);
  return favorites;
}
async function insertOne(params = null, session_id = null) {
  console.log('params: ', params);
  console.log('session_id: ', session_id);
  let result = null;
  const sf_query = `SELECT * FROM session_favorites WHERE l_id = ? AND s_id = ?;`;
  const [sf] = await executeQuery(sf_query, [params.location_id, session_id])
  // console.log('sf query: ', sf)

  const l_query = `SELECT * FROM locations WHERE location_id = ?;`;
  const [location] = await executeQuery(l_query, [params.location_id])
  // console.log('location query: ', location)

  const sf_insert_query = `INSERT INTO session_favorites (s_id, l_id, l_name) VALUES (?, ?, ?)`;

  if (sf.length < 1 && location.length < 1) {
    console.log('add location to session_favorites')
    // params.name = params.name || 'Unknown';
    // console.log('params: ', params);
    const [sf] = await executeQuery(sf_insert_query, [session_id, params.location_id, params.name]);
    // console.log('sf: ', sf.affectedRows);
    console.log('add location to location db');

    const l_insert_query = `
                    INSERT INTO locations (location_id, name, state, country_code, lat, lng)
                    VALUES (?, ?, ?, ?, ?, ?)`;
    const [loc] = await executeQuery(l_insert_query, [params.location_id, params.name, params.state, params.country_code, params.lat, params.lng]);
    if (sf.affectedRows === 0 || loc.affectedRows === 0) result = 0; // Message: 'db session_favorites not saved'
    if (sf.affectedRows === 1 && loc.affectedRows === 1) result = 1;
    // console.log('loc affected rows: ', loc.affectedRows);

  }
  if (sf.length < 1 && location.length > 0) {
    console.log('add to session_favorites')
    const [sf] = await executeQuery(sf_insert_query, [session_id, params.location_id, params.name]);
    // console.log('sf affected rows: ', sf.affectedRows);
    result = sf.affectedRows;
  }
  if (sf.length > 0) {
    console.log('Already exists -- do nothing.');
    result = 0
  }
  console.log(' final result: ', result);
  return result;
}

// // Delete a Location
async function deleteOne(s_id, l_id) {
  console.log(`delete location by id: ${l_id} & session: ${s_id}`)
  const query = `DELETE FROM session_favorites
                  WHERE s_id = ?
                  AND l_id = ?
                  LIMIT 1;`;
  const [rows] = await executeQuery(query, [s_id, l_id])
  console.log('deleted rows: ', rows);
  return rows;
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
