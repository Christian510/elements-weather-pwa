/** 
 * @file seed.js
 * @description This file is used to seed the database with initial data.
 * To run this file use the command: npm run seed
 */
import Database from './database.js';
// import icon_map from './icon_map.js';
const db = new Database();

(async () => {
  try {
    const result = await db.createTablesIfNonExist();
    console.log('Seeding complete: ', result);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
})();

// (async () => {
//   try {
//     for (const icon of icon_map) {
//     const result = await db.addIconsToDB(icon);
//     console.log('Icon map seeded: ', result);
//   }
//     process.exit(0);
//   } catch (err) {
//     console.error('Icon map seeding failed:', err);
//     process.exit(1);
//   }
// })();