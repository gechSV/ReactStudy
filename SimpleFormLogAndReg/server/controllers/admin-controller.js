const ApiError = require('../exceptoins/api-error');
const AdminService = require('../service/admin-service');

class AdminController {
    async newRole(req, res, next){
        try {
            const {role} = req.body;
            const newRole = await AdminService.newRole(role);

            return res.json(newRole)
        } catch (e) {
            next(e);
        }
    }

    async addUserRole(req, res, next){
        try{
            const {email, role} = req.body;
            const userUpd = await AdminService.addUserRole(email, role);

            res.json(userUpd)
        }
        catch(e){
            next(e);
        }
    }

    async delUserRole(req, res, next){
        try{
            const {email, role} = req.body;
            const userUpd = await AdminService.delUserRole(email, role);
            res.json(userUpd)
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = new AdminController();