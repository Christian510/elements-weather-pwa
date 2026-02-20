/*
 - DB connect
 - Pre defined db functions
*/
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const path = process.env.NODE_ENV === 'production' ? './api/.env.production' : './api/.env.development';
// console.log('path: ', path); // RAT
// console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

dotenv.config({ path: path });
const icon_map = require('./icon_map.js');

class Database {

  // Add conditional statement to check if in production or development mode
  // and set the pool variable accordingly
  constructor() {
    this.pool = mysql.createPool({
      uri: process.env.JAWSDB_URL,
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0,
      });

    // Create a connection pool
    // this.pool = mysql.createPool({
    //   host: process.env.DB_HOST,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   database: process.env.DB_NAME,
    //   port: process.env.DB_PORT,
    //   connectionLimit: 10, // Adjust based on your needs
    //   waitForConnections: true,
    //   queueLimit: 0,
    // });

    this.executeQuery = this.executeQuery.bind(this);
    this.createLocationsTable = this.createLocationsTable.bind(this);
    this.createSessionFavoritesTable = this.createSessionFavoritesTable.bind(this);
    this.createWeatherIconsTable = this.createWeatherIconsTable.bind(this);
    this.createTablesIfNonExist = this.createTablesIfNonExist.bind(this);
    this.findAllById = this.findAllById.bind(this);
    this.insertOne = this.insertOne.bind(this);
    this.fetchOneIcon = this.fetchOneIcon.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.addIconsToDB = this.addIconsToDB.bind(this);
    this.fetchAllIcons = this.fetchAllIcons.bind(this);
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

// Table Versioning
async createTablesIfNonExist() {
  let result = {};
  result.location = await this.createLocationsTable();
  result.session_favorites = await this.createSessionFavoritesTable();
  result.weather_icons = await this.createWeatherIconsTable();
  // console.log('result: ', result);
  return result;
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
  console.log('Creating weather_icons table...');
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS weather_icons (
        id INT PRIMARY KEY AUTO_INCREMENT,
        icon VARCHAR(16) NOT NULL,
        description VARCHAR(64) NOT NULL,
        weather_icon_day VARCHAR(64) NOT NULL,
        weather_icon_night VARCHAR(64) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    await this.executeQuery(query);
    console.log('weather_icons table created or already exists.');
    const isEmpty = `SELECT COUNT(*) FROM weather_icons;`;
    const result = await this.executeQuery(isEmpty);

    if (result[0]['COUNT(*)'] === 0) {
      console.log('Inserting weather icons...');
      try {
        for (const icon of icon_map) {
          await this.addIconsToDB(icon);
      }
        console.log('Icon map seeded.');
        process.exit(0);
      } catch (err) {
        console.error('Icon map seeding failed:', err);
        process.exit(1);
      }
    }

  } catch (error) {
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
    console.log('table: ', table, 'col: ', col, 'session_id: ', session_id)
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

  // Fetches an icon from the database
  async fetchOneIcon(icon) {
    const query = `SELECT * FROM weather_icons WHERE icon = ?`;
    return this.executeQuery(query, [icon]);
  }

  async fetchAllIcons() {
    const query = `SELECT * FROM weather_icons`;
    return this.executeQuery(query);
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
      console.log('one icon added: ', icon);
      const query = `
      INSERT INTO weather_icons(icon, description, weather_icon_day, weather_icon_night) 
      VALUES (?, ?, ?, ?)`;
      return this.executeQuery(query, [icon.icon, icon.description, icon.weatherIcon.day, icon.weatherIcon.night]);
  }
}

module.exports = Database;