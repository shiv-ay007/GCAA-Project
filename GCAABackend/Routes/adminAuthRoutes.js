const express = require('express');
const router = express.Router();

const {
  loginAdmin,
  registerAdmin,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
} = require('../Controllers/adminAuthController');

const { protectAdmin } = require('../Middlewares/authMiddleware');

// Public routes
router.post('/login', loginAdmin);
router.post('/register', registerAdmin);

// Protected routes (Requires valid JWT Bearer Token)
router.get('/me', protectAdmin, getAdminProfile);
router.put('/profile', protectAdmin, updateAdminProfile);
router.put('/change-password', protectAdmin, changeAdminPassword);

module.exports = router;
