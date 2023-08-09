const Router = require('express')
const userController = require('../controllers/user-controller');
const adminController = require('../controllers/admin-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const roleMiddleware = require('../middlewares/role-middleware');
const productController = require('../controllers/product-controller');

router.post('/registration', 
    body('email').isEmail(), 
    body('password').isLength( {min: 3, max: 32} ),
    userController.registration);
    
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', roleMiddleware(["USER"]), userController.getUsers);

router.post('/admin/login', adminController.login);
router.get('/admin/refresh', adminController.refresh);
router.post('/admin/logout', adminController.logout)


router.post('/admin/newRole', roleMiddleware(["ADMIN"]), adminController.newRole);
router.post('/admin/addUserRole', roleMiddleware(["ADMIN"]), adminController.addUserRole);
router.post('/admin/delUserRole', roleMiddleware(["ADMIN"]), adminController.delUserRole);
router.get('/admin/getAllProducts', roleMiddleware(["ADMIN", "MODER"]), productController.getAllProduct);
router.post('/admin/addProduct', roleMiddleware(["ADMIN", "MODER"]), productController.addProduct);

module.exports = router;



