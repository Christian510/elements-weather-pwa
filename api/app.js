import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import sqlformat from './logger.js';
// import userRouter from './routes/user';
import favoritesRouter from './routes/favorites.js';
import redisStore from './redisStore.js';
dotenv.config({ path: './.env' });

const app = express();

// Serve static files from React's build folder in production/staging
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.use(logger('combined'));
const morganMiddleware = logger(sqlformat);
app.use(morganMiddleware);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

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

app.get('/', (req, res) => { 
  res.send('API is working'); 
  // console.log('session id: ', req.sessionID);

});
// app.use('/user', userRouter);

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

export default app;
