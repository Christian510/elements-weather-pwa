/** 
 * @file seed.js
 * @description This file is used to seed the database with initial data.
 * To run this file use the command: npm run seed
 */

const Database = require('./database.js');
const db = new Database();

(async () => {
  console.log('Seeding database...');
  try {
    await db.createTablesIfNonExist();
    console.log('Seeding complete!! ');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
})();