const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();

// Routes for Authentication
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
