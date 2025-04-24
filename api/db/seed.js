// seed.js
import Database from './database.js';

const db = new Database();

(async () => {
  try {
    await db.createTablesIfNonExist();
    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
})();