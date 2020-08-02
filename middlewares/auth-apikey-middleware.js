const authApiKeyMiddleware = (req, res, next) => {
    const apikey = req.get('x-api-key');
    if(!apikey || apikey === ''){
        console.warn('Api-key must be sent');
        return res.json({
            statusCode: 401,
            message: 'Unauthorized',
        });
    }
    if(apikey !== process.env.X_API_KEY){
        console.error('Invalid api-key');
        return res.json({
            statusCode: 401,
            message: 'Unauthorized',
        });
    }
    next();
};
