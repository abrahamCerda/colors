const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/login',
    passport.authenticate('local', {session: false}),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        /* Token generation*/
        const payload = {
            sub: req.user.id,
            username: req.user.email,
            iat: Date.now() + (parseInt(process.env.JWT_EXPIRATION) * 1000),
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });
        const result = {
            access_token,
            id: req.user.id,
            email: req.user.email,
            role: {
                id: req.user.role.id,
                name: req.user.role.name,
            },
        };
        return res.json(result);
    });
module.exports = router;

