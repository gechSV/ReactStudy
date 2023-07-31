const ApiError = require('..//exceptoins/api-error');
const tokenService = require('../service/token-service');

module.exports = function(roles){
    return function(req, res, next){
        if(req.method === "OPTIONS"){
            next()
        }

        try {
           const accesToken = req.headers.autorization.split(' ')[1];
           if(!accesToken){
            return next(ApiError.UnauthorizedError());
           } 

           const userData = tokenService.validateAccessToken(accesToken);
           if(!userData){
            return next(ApiError.UnauthorizedError());
           }

           let hasRole = false;
           userData.forEach(role => {
            if (roles.include(role)){
                hasRole = true;
            }
           });

           if(!hasRole){
            return next(ApiError.ForbiddenError("У вас нет доступа"));
           }
           next();

        } catch (e) {
            console.log(e);
            return next(ApiError.UnauthorizedError());
        }
    }
}