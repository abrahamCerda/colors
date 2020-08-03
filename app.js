require('dotenv').config();
const database = require('./database/database.js');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const localStrategy = require('./config/passport-local-strategy-config');
const jwtStrategy = require('./config/passport-jwt-strategy-config');
const passport = require('passport');
const cors = require('cors');
const sanitizeParams = require('./middlewares/sanitizer-middleware');

const authRouter = require('./controllers/auth');
const colorsRouter = require('./controllers/colors');
const colorsApiRouter = require('./controllers/api/v1/colors');

const app = express();

app.use(logger('dev'));
app.use(sanitizeParams);
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/colors', colorsRouter);
app.use('/api/v1/colors', colorsApiRouter);

module.exports = app;
