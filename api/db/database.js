/*
 - DB connect
 - Pre defined db functions
*/
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const path = process.env.NODE_ENV === 'production' ? './api/.env.production' : './api/.env.development';
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

// Table Versioning
async createTablesIfNonExist() {
  let result = {};
  result.location = await this.createLocationsTable();
  result.session_favorites = await this.createSessionFavoritesTable();
  result.weather_icons = await this.createWeatherIconsTable();
  console.log('result: ', result);
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
}
