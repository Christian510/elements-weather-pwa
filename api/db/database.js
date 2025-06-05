/*
 - DB connect
 - Pre defined db functions
*/
import dotenv from 'dotenv';
import mysql from 'mysql2/promise.js';
const path = process.env.NODE_ENV === 'production' ? './.env.production' : './.env.development';
dotenv.config({ path: path });

class Database {
  constructor() {

    // Create a connection pool
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      connectionLimit: 10, // Adjust based on your needs
      waitForConnections: true,
      queueLimit: 0,
    });

    this.executeQuery = this.executeQuery.bind(this);
    this.createLocationsTable = this.createLocationsTable.bind(this);
    this.createSessionFavoritesTable = this.createSessionFavoritesTable.bind(this);
    this.createWeatherIconsTable = this.createWeatherIconsTable.bind(this);
    this.createTablesIfNonExist = this.createTablesIfNonExist.bind(this);
    this.findAllById = this.findAllById.bind(this);
    this.insertOne = this.insertOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.addIconsToDB = this.addIconsToDB.bind(this);
  }

  /**
   * Executes a query using the connection pool.
   * @param {string} query - The SQL query string.
   * @param {Array} values - The values to bind to the query.
   * @returns {Promise<any>} - The result of the query.
   */
  async executeQuery(query, values=[]) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      await conn.beginTransaction();
      const [result] = await conn.execute(query, values);
      await conn.commit();
  
      return result;
  
    } catch (err) {
      if (conn) await conn.rollback();
      console.error(err);
      throw err; // Propagate the error for further handling
    } finally {
      if (conn) conn.release();
    }
  }

  // Test DB Connection // this needs to be moved to a test file.
// executeQuery('SELECT 1')
// .then(result => console.log('Test query result:', result))
// .catch(err => console.error('Test query error:', err));

// Table Verioning
async createTablesIfNonExist() {
const versionQuery = `
  CREATE TABLE IF NOT EXISTS schema_version (
    version INT PRIMARY KEY
  )`;
await this.executeQuery(versionQuery);

const [rows] = await this.executeQuery('SELECT version FROM schema_version');
let result = {};
if (Array.isArray(rows) && rows.length === 0) {
  result.location = await this.createLocationsTable();
  result.session_favorites = await this.createSessionFavoritesTable();
  // Add other table creation functions here
  result.version = await this.executeQuery('INSERT INTO schema_version (version) VALUES (1)');
  result.weather_icons = await this.createWeatherIconsTable();
  // console.log('Tables created: ', result);
  return result;
}
}

// if no Locations table exits create one.
async createLocationsTable() {
  try {
      const query = `
      CREATE TABLE IF NOT EXISTS locations (
      location_id int NOT NULL,
      name varchar(45) NOT NULL,
      state varchar(45) NOT NULL,
      country_code varchar(45) NOT NULL,
      lat decimal(8,5) NOT NULL,
      lng decimal(8,5) NOT NULL,
      PRIMARY KEY (location_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
      await this.executeQuery(query);
      console.log('Locations table created or already exists.');
    } catch (error) {
      console.error('Error creating locations table:', error);
      throw error; // Re-throw to handle it appropriately in calling code
    }
}

async createSessionFavoritesTable() {
try {
  const query = `
    CREATE TABLE IF NOT EXISTS session_favorites (
    s_id varchar(128) NOT NULL,
    l_id int NOT NULL COMMENT 'This table joins locations and sessions so that I can have a many to many relationship between these two.  
    Since I will be storing many location data that will need to be shared with potentially hundreds or thousands of unique sessions. 
    If I want to delete a location from a session then all I have to do is remove the relationship between the two.',
    l_name varchar(45) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
  await this.executeQuery(query);
  console.log('session_favorites table created or already exists.');
} catch (error) {
  console.error('Error creating session_favorites table:', error);
  throw error; // Re-throw to handle it appropriately in calling code
}
}

async createWeatherIconsTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS weather_icons (
        id INT PRIMARY KEY AUTO_INCREMENT,
        icon VARCHAR(16) NOT NULL,
        description VARCHAR(64) NOT NULL,
        weather_icon_day VARCHAR(64) NOT NULL,
        weather_icon_night VARCHAR(64) NOT NULL;`;
    await this.executeQuery(query);
    console.log('weather_icons table created or already exists.');
  } catch (error) {
    console.error('Error creating weather_icons table:', error);
    throw error; // Re-throw to handle it appropriately in calling code
  }
}

  /**
   * Finds all rows by session_id in a specific table and column.
   * @param {string} table - The table name.
   * @param {string} col - The column name.
   * @param {string} session_id - The session ID to filter by.
   * @returns {Promise<any[]>} - The resulting rows.
   */
  async findAllById(table, col, session_id = '') {
    const query_ids = `SELECT * FROM ${table} WHERE ${col} = ?`;
    // const query_data = `SELECT * FROM locations WHERE location_id = ?`;
    // const favorites = [];

    const rows = await this.executeQuery(query_ids, [session_id]);
    if (rows.length === 0) return [];

    const ids = rows.map(r => r.l_id);
    const placeholders = ids.map(() => '?').join(',');
    const query = `SELECT * FROM locations WHERE location_id IN (${placeholders})`;
    const data = await this.executeQuery(query, ids);
    return data;
  }

  /**
   * Inserts a new record into the database.
   * @param {Object} params - Parameters for the insert operation.
   * @returns {Promise<number>} - Result of the insert operation (1 for success, 0 for failure).
   */
  async insertOne(params) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      await conn.beginTransaction();

      const sf_query = `SELECT * FROM session_favorites WHERE l_id = ? AND s_id = ?;`;
      const [sf] = await conn.execute(sf_query, [params.location_id, params.session_id]);

      const l_query = `SELECT * FROM locations WHERE location_id = ?;`;
      const [location] = await conn.execute(l_query, [params.location_id]);

      if (sf.length < 1 && location.length < 1) {
        const sf_insert_query = `INSERT INTO session_favorites (s_id, l_id, l_name) VALUES (?, ?, ?)`;
        const [sfResult] = await conn.execute(sf_insert_query, [
          params.session_id,
          params.location_id,
          params.name,
        ]);

        const l_insert_query = `
          INSERT INTO locations (location_id, name, state, country_code, lat, lng)
          VALUES (?, ?, ?, ?, ?, ?)`;
        const [locResult] = await conn.execute(l_insert_query, [
          params.location_id,
          params.name,
          params.state,
          params.country_code,
          params.lat,
          params.lng,
        ]);

        if (sfResult.affectedRows === 0 || locResult.affectedRows === 0) {
          throw new Error('Insert failed');
        }
        await conn.commit();
        return 1;
      }

      if (sf.length < 1 && location.length > 0) {
        const sf_insert_query = `INSERT INTO session_favorites (s_id, l_id, l_name) VALUES (?, ?, ?)`;
        const [sfResult] = await conn.execute(sf_insert_query, [
          params.session_id,
          params.location_id,
          params.name,
        ]);
        await conn.commit();
        return sfResult.affectedRows;
      }

      if (sf.length > 0) {
        return 0; // Already exists
      }
    } catch (err) {
      if (conn) await conn.rollback();
      console.error('Insert error:', err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }

  /**
   * Deletes a record from the database.
   * @param {string} s_id - Session ID.
   * @param {string} l_id - Location ID.
   * @returns {Promise<any>} - Result of the delete operation.
   */
  async deleteOne(s_id, l_id) {
    const query = `DELETE FROM session_favorites WHERE s_id = ? AND l_id = ? LIMIT 1;`;
    return this.executeQuery(query, [s_id, l_id]);
  }

  async addIconsToDB(icon) {
      const query = `
      INSERT INTO weather_icons(icon, description, weather_icon_day, weather_icon_night) 
      VALUES (?, ?, ?, ?)`;
      return this.executeQuery(query, [icon.icon, icon.description, icon.weatherIcon.day, icon.weatherIcon.night]);
  }
}

export default Database;


/**
 * This is the old code. I'm leaving it here for reference
 */
// const uri = process.env.JAWSDB_URL;
// const pool = mysql.createPool({
//   uri,
//   connectionLimit: 10,
//   waitForConnections: true,
//   queueLimit: 0,});

// async function executeQuery(query, values=[]) {
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     await conn.beginTransaction();
//     const [result] = await conn.execute(query, values);
//     await conn.commit();

//     return result;

//   } catch (err) {
//     if (conn) await conn.rollback();
//     console.error(err);
//     throw err; // Propagate the error for further handling
//   } finally {
//     if (conn) conn.release();
//   }
// }

// // Test DB Connection //
// executeQuery('SELECT 1')
//   .then(result => console.log('Test query result:', result))
//   .catch(err => console.error('Test query error:', err));

// // Table Verioning
// async function createTablesIfNonExist() {
//   const versionQuery = `
//     CREATE TABLE IF NOT EXISTS schema_version (
//       version INT PRIMARY KEY
//     )`;
//   await executeQuery(versionQuery);

//   const [rows] = await executeQuery('SELECT version FROM schema_version');
//   if (rows.length === 0) {
//     await createLocationsTable();
//     await createSessionFavoritesTable();
//     // Add other table creation functions here
//     await executeQuery('INSERT INTO schema_version (version) VALUES (1)');
//     console.log('Tables created.');
//   }
// }
// // createTablesIfNonExist();

// // if no Locations table exits create one.
// async function createLocationsTable() {
//     try {
//         const query = `
//         CREATE TABLE IF NOT EXISTS locations (
//         location_id int NOT NULL,
//         name varchar(45) NOT NULL,
//         state varchar(45) NOT NULL,
//         country_code varchar(45) NOT NULL,
//         lat decimal(8,5) NOT NULL,
//         lng decimal(8,5) NOT NULL,
//         PRIMARY KEY (location_id)
//         ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
//         await executeQuery(query);
//         console.log('Locations table created or already exists.');
//       } catch (error) {
//         console.error('Error creating locations table:', error);
//         throw error; // Re-throw to handle it appropriately in calling code
//       }
// }
// // createLocationsTable();

// async function createSessionFavoritesTable() {
//   try {
//     const query = `
//       CREATE TABLE IF NOT EXISTS session_favorites (
//       s_id varchar(128) NOT NULL,
//       l_id int NOT NULL COMMENT 'This table joins locations and sessions so that I can have a many to many relationship between these two.  
//       Since I will be storing many location data that will need to be shared with potentially hundreds or thousands of unique sessions. 
//       If I want to delete a location from a session then all I have to do is remove the relationship between the two.',
//       l_name varchar(45) DEFAULT NULL
//     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
//     await executeQuery(query);
//     console.log('session_favorites table created or already exists.');
//   } catch (error) {
//     console.error('Error creating session_favorites table:', error);
//     throw error; // Re-throw to handle it appropriately in calling code
//   }
// }
// createSessionFavoritesTable();


// // Get Locations

// // async function getSessions() {
// //   try {
// //     const result = await pool.query(`SELECT * FROM sessions`);
// //     // console.log('sessions: ', result[0]);
// //     return result;
// //   } catch (error) {
// //     console.error('Error fetching sessions:', error);
// //     throw error; // Re-throw to handle it appropriately in calling code
// //   }
// // }
// // getSessions();

// function findOneById(table, col, id) {
//   // return pool.execute('SELECT * FROM ' + table + ' WHERE ' + col + ' = ? LIMIT 1', [id])
//   //   .then(result => {
//   //     // console.log('result: ', result[0]);
//   //     if (result[0].length === 1) {
//   //       return result[0];
//   //     } else {
//   //       return null;
//   //     }
//   //   })
//   //   .catch(err => {
//   //     console.log('error msg: ', err)
//   //   });
// }
// // findOneById('sessions', 'session', '7tvrVX2rMmXDwaP-FRW6XxUuTN1JbbN6')
// // findOneById('locations', 'location_id', '5391811')

// // function getFavorites(sessionID) {
// //     return pool.execute(`SELECT * FROM locations WHERE session_id = ?`, [sessionID])
// //         .then(result => {
// //             console.log('locations: ', result[0]);
// //             pool.end();
// //             return result[0];
// //         })
// //         .catch(err => {
// //             console.log('error msg: ', err)
// //         });
// // }

// // returns all locations for a session_id
// async function findAllById(table, col, session_id = '') {
//   const query_ids = `SELECT * FROM ${table} WHERE ${col} = ?`;
//   const query_data = `SELECT * FROM locations WHERE location_id = ?`;
//   const favorites = [];
//   const [rows] = await executeQuery(query_ids, [session_id])
//   if (rows.length === 0) {
//     return [];
//   }
//   if (rows.length > 0) {
//     for (let i = 0; i < rows.length; i++) {
//       const [data] = await executeQuery(query_data, [rows[i].l_id])
//       favorites.push(data[0]);
//     }
//   }
//   return favorites;
// }
// async function insertOne(params = null) {
//   let result = null;
//   const sf_query = `SELECT * FROM session_favorites WHERE l_id = ? AND s_id = ?;`;
//   const [sf] = await executeQuery(sf_query, [params.location_id, params.session_id])
//   const l_query = `SELECT * FROM locations WHERE location_id = ?;`;
//   const [location] = await executeQuery(l_query, [params.location_id])

//   const sf_insert_query = `INSERT INTO session_favorites (s_id, l_id, l_name) VALUES (?, ?, ?)`;

//   if (sf.length < 1 && location.length < 1) {
//     const [sf] = await executeQuery(
//       sf_insert_query, 
//       [params.session_id, params.location_id, params.name]);
//     const l_insert_query = `
//                     INSERT INTO locations (location_id, name, state, country_code, lat, lng)
//                     VALUES (?, ?, ?, ?, ?, ?)`;
//     const [loc] = await executeQuery(
//       l_insert_query, 
//       [params.location_id, params.name, params.state, params.country_code, params.lat, params.lng]);
//     if (sf.affectedRows === 0 || loc.affectedRows === 0) result = 0; // Message: 'db session_favorites not saved'
//     if (sf.affectedRows === 1 && loc.affectedRows === 1) result = 1;
//   }
//   if (sf.length < 1 && location.length > 0) {
//     const [sf] = await executeQuery(sf_insert_query, [params.session_id, params.location_id, params.name]);
//     result = sf.affectedRows;
//   }
//   if (sf.length > 0) {
//     result = 0
//   }
//   return result;
// }

// // // Delete a Location
// async function deleteOne(s_id, l_id) {
//   const query = `DELETE FROM session_favorites
//                   WHERE s_id = ?
//                   AND l_id = ?
//                   LIMIT 1;`;
//   const [rows] = await executeQuery(query, [s_id, l_id])
//   return rows;
// }

// // function deleteExpiredSession() {
// //   // this will need to delete expired session and all locations associated with that session.
// //   const query = `DELETE FROM sessions WHERE expires < NOW()`
// //   return pool.execute(query)
// //     .then(result => {
// //       console.log('result: ', result[0]);
// //       return result[0];
// //     })
// //     .catch(err => {
// //       console.log('error msg: ', err)
// //       throw new Error('Unable to delete location: ', err);
// //     })
// // }
// // deleteExpiredSession();

// // function CreateUserTable() {
// //   const query = `CREATE TABLE IF NOT EXISTS users 
// //   (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), 
// //   password VARCHAR(255))`;
// //   return pool.execute(query)
// //     .then(result => {
// //       console.log('result: ', result[0]);
// //       return result[0];
// //     })
// //     .catch(err => {
// //       console.log('error msg: ', err)
// //       throw new Error('Unable to create users table: ', err);
// //     })
// // }

// // Insert One User

// // Get User

// // Update User

// // Delete User

// export {
//   findAllById,
//   findOneById,
//   insertOne,
//   deleteOne,
// }