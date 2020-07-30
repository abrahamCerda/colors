const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User').model;
const Role = require('../models/Role').model;
const passport = require('passport');

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.findOne({
        where: {
            id: jwtPayload.sub,
        },
        include: {
            model: Role,
            attributes: ['id', 'name', 'alias']
        },
        attributes: ['id', 'email'],
    }).then(user => {
        if(!user){
            console.warn(`[User ${jwtPayload.sub} from jwt not exists]`);
            return done(null, false);
        }
        console.log(`[User ${jwtPayload.sub} obtained from jwt]`);
        return done(null, user);
    }).catch(error => {
        console.error('ERROR WHILE TRYING TO FIND THE USER IN JWT PAYLOAD VALIDATION', error);
        return done(error);
    })
}));

module.exports = passport;
