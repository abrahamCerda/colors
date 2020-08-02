const express = require('express');
const router = express.Router();
const hasRole = require('../middlewares/role-middleware');
const Color = require('../models/Color').model;
const passport = require('passport');
const js2xmlparser = require('js2xmlparser');
const ColorsService = require('../services/colors-service');
const colorsService = new ColorsService();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', (req, res, next) => {
    hasRole(req,res,next,['administrator', 'user']);
}, (req, res) => {
    /* Apply pagination*/
    const { page, pageSize} = req.query;
    const order = req.query.order && (req.query.order.toUpperCase() === 'ASC' || req.query.order.toUpperCase() === 'DESC') ?
        req.query.order.toUpperCase() : 'ASC';
    colorsService.findColors(page, pageSize, order)
        .then(paginatedColors => {
            res.format({
                json: () => {
                    return res.json(paginatedColors);
                },
                xml: () => {
                    return res.send(js2xmlparser.parse('data', paginatedColors));
                }
            });
        }).catch(error => {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error",
        });
    });
});

router.get('/:id', (req, res, next) => {
    hasRole(req,res,next,['administrator', 'user']);
}, (req, res) => {
    const id = req.params.id;
   Color.findOne({
       where: {
           id,
       },
   }).then(color => {
       return res.json(color);
   }).catch(error => {
       console.error(error);
       return res.status(500).json({
           statusCode: 500,
           message: "Internal Server Error",
       });
   })
});

router.post('/', (req, res, next) => {
    hasRole(req, res, next, ['administrator']);
}, (req, res) => {
    const body = req.body;
    Color.create({
        name: body.name,
        color: body.color,
        pantone: body.pantone,
        year: body.year,
    }).then(color => {
        return res.json(color);
    }).catch(error => {
        /* Analizar error*/
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error",
        });
    })
});

router.put('/:id', (req, res, next) => {
    hasRole(req, res, next, ['administrator']);
}, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Color.update({
        name: body.name,
        color: body.color,
        pantone: body.pantone,
        year: body.year,
    }, {
        where: {
            id,
        },
    }).then((updatedColor) => {
        return res.json(updatedColor);
    }).catch(error => {
        /* Analizar error**/
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error",
        });
    });
    /* Implementation searching the model first and then updating and saving it.
    This is inefficient, but demonstrates the use of chained promises
    Color.findOne({
        where: {
            id,
        },
    }).then(color => {
        color.name = body.name;
        color.color = body.color;
        color.pantone = body.pantone;
        color.year = body.year;
        return color.save();
    }).then((updatedColor) => {
        return res.json(updatedColor);
    }).catch(error => {
        /!* Analizar error*!/
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error",
        });
    });*/
});

router.delete('/:id', (req, res, next) => {
    hasRole(req, res, next, ['administrator']);
}, (req, res) => {
    const id = req.params.id;
    Color.destroy({
        where: {
            id,
        },
    }).then(() => {
        return res.json({
            message: 'Color deleted'
        });
    }).catch(error => {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error",
        });
    })
});

module.exports = router;
