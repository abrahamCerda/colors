const hasRole = (req, res, next, roles) => {
  if(roles.indexOf(req.user.role.name) === -1){
      console.log(`[User ${req.user.id}] trying to access to ${req.baseUrl}${req.path} METHOD: ${req.method} 
      endpoint with a incorrect role ${req.user.role.name}`)
      return res.status(401)
          .json({
              statusCode: 401,
              message: 'Unauthorized',
          });
  }
  next();
};
module.exports = hasRole;
