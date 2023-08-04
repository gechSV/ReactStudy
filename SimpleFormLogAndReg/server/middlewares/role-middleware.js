const ApiError = require('..//exceptoins/api-error');
const tokenService = require('../service/token-service');

module.exports = function(roles){
    return function(req, res, next){
        if(req.method === "OPTIONS"){
            next()
        }

        try {
           const authorizationHeader = req.headers.authorization;
            if(!authorizationHeader){
                return next(ApiError.UnauthorizedError());
            }

           const accesToken = authorizationHeader.split(' ')[1];
           if(!accesToken){
            return next(ApiError.UnauthorizedError());
           } 
           console.log('accesToken: ', accesToken)

           const userData = tokenService.validateAccessToken(accesToken);
           if(!userData){
            return next(ApiError.UnauthorizedError());
           }

           let hasRole = false;
           userData.roles.forEach(role => {
            if(roles.includes(role)){
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