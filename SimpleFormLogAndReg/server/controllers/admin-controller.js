const ApiError = require('../exceptoins/api-error');
const adminService = require('../service/admin-service');
const AdminService = require('../service/admin-service');

class AdminController {
    async login(req, res, next){
        try {
            const {email, password} = req.body;
            const adminData = await AdminService.login(email, password); 
            res.cookie('refreshToken', adminData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json(adminData);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const adminData = await adminService.refresh(refreshToken);
            res.cookie('refreshToken', adminData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(adminData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const token = await AdminService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

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