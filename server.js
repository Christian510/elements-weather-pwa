/* 
    STRIP THIS DOWN FOR JUST GETTING API DATA AND PROTECTING API KEYS
    AND DATABASE INFO AND PASS TO APP.
*/
require('dotenv').config();
// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
// const helmet = require("helmet");
const MongoStore = require('connect-mongo')(session);
const app = express();

const errorController = require('./controllers/errors');
const WeatherData = require('./src/models/WeatherData');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// const sessionStore = new MongoStore({
//   url: process.env.DB,
//   mongoOptions: {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   },
//   clear_interval: 1000 * 60 * 60 * 24,
//   touchAfter: 24 * 3600, // time period in seconds
// });
    
// app.use(session({
//   secret: process.env.SECRET,
//   cookie: {
//     // EQUALS 1 DAY ( 1 DAY * 24 HR/1 DAY * 60 MIN/1 HR)
//     maxAge: 1000 * 60 * 60 * 24 * 90
//   },
//   store: sessionStore,
//   resave: false,
//   saveUninitialized: true,
// }));

// app.use((req, res, next) => {
//   // console.log(req.sessionID);
//   // console.log(req);
//   if (req.session.viewCount) {
//     req.session.viewCount++
//   } else {
//     req.session.viewCount = 1;
//   }
//   next();
// })
let data = {
  message: "Testing one, two, three",
}
app.get("/weather", function (req, res) {
  res.send(data.message);
});

// ERROR HANDLING
app.get('/500', errorController.get500);
app.use(errorController.get404);
app.use((error, req, res, next) => {
  res.redirect('/500');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // console.log("error handler: ", res.locals.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;