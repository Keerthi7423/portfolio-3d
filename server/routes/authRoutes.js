const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public Auth Endpoints
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected Auth Endpoint (Requires Bearer token)
router.get('/me', protect, getAdminProfile);

module.exports = router;
