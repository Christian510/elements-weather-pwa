require('dotenv').config({path: 'api/.env.production' })
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
// const { fileURLToPath } = require('url');
const sqlformat = require('./logger.js');
const favoritesRouter = require('./routes/favorites.js');
const redisStore = require('./redisStore.js');

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS,
  // allowedHeaders: process.env.CORS_ALLOWED_HEADERS,
  // exposedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'],
  credentials: true,
  optionSuccessStatus: 200
};

// console.log('corsOptions: ', corsOptions); // RAT
app.use(cors(corsOptions));

// if (process.env.NODE_ENV === "production") {
//   console.log('production mode');
// // LOG REQUESTS
// app.use((req, res, next) => {
//   console.log(`Received request: ${req.method} ${req.url}`);
//   next();
// });
// }
app.use(logger('combined'));
const morganMiddleware = logger(sqlformat);
app.use(morganMiddleware);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('trust proxy', 1) // trust first proxy
const sessionSecret = process.env.SESSION_SECRET;
app.use(session({
  secret: sessionSecret,
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true if using https
    domain: '.localhost',
    // maxAge: 1000 * 60 * 60 * 24 * 90, // 90 days
    maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
    sameSite: 'lax', // none, lax, strict
  }
}
));

app.use('/favorites', favoritesRouter);

// app.use('/user', userRouter);

// Serve static files from React's build folder in production/staging
app.use(express.static(path.join(__dirname, "..", "build")));
// console.log("path: ", path.join("..", "build", "index.html"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // console.log("error handler: ", res.locals.message);
  res.locals.error = req.app.get('env') === process.env.NODE_ENV ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: err.message,
    error: res.locals.error
  });
});

module.exports = app;