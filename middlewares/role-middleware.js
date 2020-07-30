const hasRole = (req, res, next, roles) => {
  if(roles.indexOf(req.user.role.name) === -1){
      return res.status(401)
          .json({
              statusCode: 401,
              message: 'Unauthorized',
          });
  }
  next();
};
module.exports = hasRole;
