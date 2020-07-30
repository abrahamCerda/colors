const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User').model;
const invalidCredentialsMessage = 'Invalid credentials';
const bcrypt = require('bcrypt');
const Role = require('../models/Role').model;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    },
    (username, password, done) => {
        User.findOne({
            where:{
                email: username,
            },
            include: Role
        }).then(user => {
            if(!user){
                console.warn(`user ${username} not found`);
                return done(null, false, {message: invalidCredentialsMessage});
            }
            /* CAN BE COMPARE SYNC IF THE SYSTEM REQUERIMENTS NEEDS IT*/
            bcrypt.compare(password, user.password)
                .then(result => {
                    if(!result){
                        console.warn(`user ${username} invalid password ${password}`);
                        return done(null, false, {message: invalidCredentialsMessage});
                    }
                    console.log(`[User ${user.id}] logged in`);
                    return done(null, user);
                })
                .catch(error => {
                    console.error("ERROR WHILE TRYING TO COMPARE PASSWORD", error);
                    return done(error);
                });
        }).catch(error => {
            console.error('ERROR WHILE TRYING TO VERIFY USER', error);
            return done(error);
        });
    }
));

module.exports = passport;
