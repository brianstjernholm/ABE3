require('dotenv').config();

///////////////////// IMPORTS /////////////////////////

//Generel imports
var logger = require('morgan');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');

//express imports
var express = require('express');
var app = express();

//JWT imports
//var jwt = require('jsonwebtoken');
//const User = require('./models/user');

//Swagger imports
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

require('./models/db');

//Bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Router imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hotelRouter = require('./routes/hotel')


//////////////// SETUP ///////////////////

//Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: { 
    title: 'Express API ABE_LAB01', 
    version: '1.0.0',
    description: 'This a rest API application made with Node/Express/Mongoose for educational purpose'
  },
  contact: {
    name: 'Marc Warming', url: 'https://erdetfredag.dk',
    email: 'ImMarc@Warming.odder'
  },
  servers: [{
    url: 'http://localhost:3000',
    description: 'development server'
  }, {
    url: 'https://gentle-dusk-26869.herokuapp.com/',
    description: 'production server'
  }],
  basePath: '/',
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer', 
        bearerformat: 'JWT'
      }
    }
  }
};

const options = {
  swaggerDefinition, 
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hotel', hotelRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
