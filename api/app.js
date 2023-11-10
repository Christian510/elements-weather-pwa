require('dotenv').config({ path: './.env' });
var express = require('express');
const MySQLStore = require('express-mysql-session')(session);
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Need to add cors
// session
// session sql store

const options = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PW,
	database: process.env.DB_NAME
};

const sessionStore = new MySQLStore(options);

app.use(session({
	key: process.env.SESSION_KEY,
	secret: process.env.SESSION_SECRET,
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
