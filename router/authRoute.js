const express = require('express');
const authController = require('../controller/auth');
const router = express.Router();


// Routes for Authentication
router.post('/login', authController.login); // User/Admin Login
router.post('/register', authController.register); // User/Admin Registration

module.exports = router;
