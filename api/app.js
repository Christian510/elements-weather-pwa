require('dotenv').config({ path: './.env' });
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql2');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const db = require('../db/database');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const router = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const dbConnection = mysql.createConnection(options);

const sessionStore = new MySQLStore({
  expiration: 3600000, // Session expiration time in milliseconds
  createDatabaseTable: true // Automatically create session table if none exists
}, dbConnection);

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    // EQUALS 1 DAY ( 1 DAY * 24 HR/1 DAY * 60 MIN/1 HR)
    maxAge: 1000 * 60 * 60 * 24 * 90
  }
}
));

app.use((req, res, next) => {
  console.log('sessionID: ', req.sessionID);
  db.execute('SELECT * FROM sessions')
    .then(result => {
      // console.log('saved sessions: ', result)
      result[0].forEach(elm => {
        if (elm.sission_id === req.sessionID) {
          console.log('saved session: ', elm);
          console.log('current session: ', req.sessionID)
        }
      })
    })
    .catch(err => {
      console.log('error msg: ', err)
    })
  next();
});

app.use('/', router);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// ERROR HANDLING
// app.get('/500', errorController.get500);
// app.use(errorController.get404);
app.use((error, req, res, next) => {
  res.status(error.httpStatusCode).send(error.message);
  //   res.redirect('/500');
});

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   // console.log("error handler: ", res.locals.message);
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
