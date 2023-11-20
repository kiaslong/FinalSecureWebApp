const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.loginUser);
router.get('/protected', authController.verifyToken, authController.protectedRoute);

module.exports = router;
