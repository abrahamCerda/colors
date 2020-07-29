const express = require('express');
const router = express.Router();
const hasRole = require('../middlewares/role-middleware');
const Color = require('../models/Color').model;

router.get('/', (req, res, next) => {
    hasRole(req,res,next,['administrator', 'user']);
}, (req, res) => {
    /* Apply pagination*/
    Color.findAll()
        .then(colors => {
            return res.json(colors);
        })
        .catch(error => {
            console.error(error);
           return res.status(500).json({
               statusCode: 500,
               message: "Internal Server Error",
           });
        });
});

module.exports = router;