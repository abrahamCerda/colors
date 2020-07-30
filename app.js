require('dotenv').config();
const database = require('./database/database.js');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('./config/passport-local-strategy-config');
const cors = require('cors');

const indexRouter = require('./controllers/index');
const usersRouter = require('./controllers/users');
const authRouter = require('./controllers/auth');
const colorsRouter = require('./controllers/colors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/colors', colorsRouter);

module.exports = app;
