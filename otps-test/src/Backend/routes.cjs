const express = require('express');
const router = express.Router();
const registerController = require('./registerController.cjs');
const loginController = require('./loginController.cjs');

router.post('/register', registerController.registerAccount);
router.post('/verify-username', registerController.verifyUsername);
router.post('/verify-login', loginController.verifyLogin);

module.exports = router;