const express = require('express');
const router = express.Router();
const authApiKeyMiddleware = require('../../../middlewares/auth-apikey-middleware');

router.get('/', authApiKeyMiddleware, (req, res) => {
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

module.exports = router;
