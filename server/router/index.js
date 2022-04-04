const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const reminderController = require('../controllers/reminder-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddlaware = require('../middlewares/auth-middleware');

router.post('/registration', 
	body('password').isLength({min: 8, max:32}),
	userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddlaware, userController.getUsers);
router.post('/addreminder', reminderController.addReminder);
router.get('/deletereminder', reminderController.deleteReminder);
router.get('/reminders', reminderController.allReminders);

module.exports = router;

