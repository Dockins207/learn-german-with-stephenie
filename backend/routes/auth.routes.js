const express = require('express');
const router = express.Router();
const AuthController = require('@controllers/auth.controller');
const { authMiddleware } = require('@middleware/auth.middleware');

// Register new user
router.post('/register', AuthController.register);

// Login
router.post('/login', AuthController.login);

// Get current user profile (protected route)
router.get('/me', authMiddleware, AuthController.getProfile);

// Update user profile (protected route)
router.put('/profile', authMiddleware, AuthController.updateProfile);

module.exports = router;
