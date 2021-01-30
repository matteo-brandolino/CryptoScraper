const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

//register post

router.post('/register', 
    authController.verifyRegister,
    authController.checkUserExists,
    authController.register,
    authController.login
)

// Login
router.post('/login', authController.login)

// Logout
router.post('/logout', authController.logout)

//isLogged
router.post('/me',  authController.isLoggedIn)

module.exports = router