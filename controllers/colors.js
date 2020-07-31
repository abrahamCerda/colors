const express = require('express');
const router = express.Router();
const hasRole = require('../middlewares/role-middleware');
const Color = require('../models/Color').model;
const passport = require('passport');
const js2xmlparser = require('js2xmlparser');

router.use(passport.authenticate('jwt', { session: false }));

const DEFAULT_PAGE_SIZE = 6;
const DEFAULT_PAGE_INDEX = 0;

const getPagination = (page, pageSize) => {
    const limit = pageSize ? +pageSize : DEFAULT_PAGE_SIZE;
    const offset = page ? page * limit : DEFAULT_PAGE_INDEX;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalColors, rows: colors } = data;
    const currentPage = page ? +page : DEFAULT_PAGE_INDEX;
    const totalPages = Math.ceil(totalColors / limit);
    return { totalColors, colors, totalPages, currentPage };
};

router.get('/', (req, res, next) => {
    hasRole(req,res,next,['administrator', 'user']);
}, (req, res) => {
    /* Apply pagination*/
    const { page, pageSize} = req.query;
    const order = req.query.order && (req.query.order.toUpperCase() === 'ASC' || req.query.order.toUpperCase() === 'DESC') ?
        req.query.order.toUpperCase() : 'ASC';
    const { limit, offset } = getPagination(page, pageSize);
    Color.findAndCountAll({
        limit,
        offset,
        order: [
            [
                'created_at', order,
            ]
        ]
    })
        .then(colors => {
            const paginatedColors = getPagingData(colors, page, limit)
            res.format({
                json: () => {
                    return res.json(paginatedColors);
                },
                xml: () => {
                    return res.send(js2xmlparser.parse('data', paginatedColors));
                }
            });
        })
        .catch(error => {
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
    const id = req.param.id;
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
