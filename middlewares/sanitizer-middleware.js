const sanitizer = require('sanitizer');

const sanitizeParams = function(req,res,next){
    for(const queryParamKey in req.query){
        sanitizer.sanitize(req.query[queryParamKey]);
    }
    next();
};

module.exports = sanitizeParams;
