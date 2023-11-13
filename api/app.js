require('dotenv').config({ path: '../.env' });
console.log(process.env.DB_HOST);
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// var path = require('path');

const indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Need to add cors

// const options = {
// 	host: process.env.DB_HOST,
// 	port: process.env.DB_PORT,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASS,
// 	database: process.env.DB_NAME
// };

// const sessionStore = new MySQLStore(options);

// app.use(session({
// 	key: process.env.SESSION_KEY,
// 	secret: process.env.SESSION_SECRET,
// 	store: sessionStore,
// 	resave: false,
// 	saveUninitialized: false
// }));

app.use('/', indexRouter);

// ERROR HANDLING
// app.get('/500', errorController.get500);
// app.use(errorController.get404);
// app.use((error, req, res, next) => {
//   res.redirect('/500');
// });

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
