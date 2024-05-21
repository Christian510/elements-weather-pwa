
const express = require('express');
const router = express.Router();
const createTablesRouter = require('../controllers/create_tables');




router.get('/create-tables', createTablesRouter.createTables);

module.exports = router;