import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlformat from './logger.js';
import favoritesRouter from './routes/favorites.js';
import redisStore from './redisStore.js';
const env_path = process.env.NODE_ENV === 'production' ? './.env.production' : './.env.development';
// console.log("app.js path: ", env_path);
dotenv.config({ path: env_path });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS,
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS,
  exposedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'],
  credentials: true,
  optionSuccessStatus: 200
};

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
  saveUninitialized: true,
  cookie: {
    secure: false,
    // EQUALS 1 DAY ( 1 DAY * 24 HR/1 DAY * 60 MIN/1 HR)
    maxAge: 1000 * 60 * 60 * 24 * 90,
    // maxAge: 30,
    // sameSite: 'strict',
  }
}
));

app.use('/favorites', favoritesRouter);

app.get('/test', (req, res) => { 
  // res.send('API is working: ' + req.sessionID);
  res.send("path: ", path.join(__dirname, "build", "index.html"));
});

// app.use('/user', userRouter);

// Serve static files from React's build folder in production/staging
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
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

export default app;