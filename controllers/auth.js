const express = require('express');
const router = express.Router();
const passport = require('passport');

/*
 CUSTOM PASSPORT LOCAL VERIFY CALLBACK IN ORDER TO DEMONSTRATE THE EXPERIENCE
 WITH PASSPORT AND EXPRESS SESSION

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if(info){
            return res.status(401).json({message: info.message});
        }
        if(error){
            return next(error);
        }
       req.login(user, (error) => {
           if(error){
               return next(error);
           }
           return res.send(user);
       });
    })(req,res,next);
});*/
router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.json(req.user);
    });
module.exports = router;

