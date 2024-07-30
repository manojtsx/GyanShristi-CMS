const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller')
const validate = require('../middlewares/validation/validate-middleware')
const registerSchema = require('../utils/validators/register-validation')
const loginSchema = require('../utils/validators/login-validation')

router.route('/register').post(validate(registerSchema), authController.register);
router.route('/login').post(validate(loginSchema), authController.login);
router.route('/sendOTP').post(authController.sendOTPController);

module.exports = router;