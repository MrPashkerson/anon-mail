const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/login', userController.login);
router.post('/logout', authMiddleware, userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.post('/getAllMessages', authMiddleware, userController.getAllMessages);
router.post('/getNewMessage', authMiddleware, userController.getNewMessage);
router.post('/sendMessage', authMiddleware, userController.sendMessage);

module.exports = router;