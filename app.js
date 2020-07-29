require('dotenv').config();
const database = require('./database/database.js');
// TEST DATABASE CONNECTION
database.authenticate()
    .then(() => {
    console.log("DATABASE CONNECTED");
    })
    .catch(error => {
        console.error('DATABASE CONNECTION ERROR', error);
        process.exit();
    });
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;