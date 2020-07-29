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
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('./config/passport-config');

const indexRouter = require('./controllers/index');
const usersRouter = require('./controllers/users');
const authRouter = require('./controllers/auth');
const colorsRouter = require('./controllers/colors');

const app = express();

const sessionStore = new SequelizeStore({
    db: database,
});

app.use(logger('dev'));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET,
    store: sessionStore,
    resave: false,
    proxy: true,
}));
sessionStore.sync();

app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/colors', colorsRouter);

module.exports = app;