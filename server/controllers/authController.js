const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Helper function to generate signed JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Register initial Admin account
// @route   POST /api/auth/register
// @access  Public (Used for initial admin setup)
const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin account with this email already exists' });
    }

    // Create admin (password hashed automatically by pre-save hook)
    const admin = await Admin.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// @desc    Authenticate admin & get token (Login)
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });

    // Verify password using model method
    if (admin && (await admin.matchPassword(password))) {
      res.status(200).json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// @desc    Get currently logged in admin profile
// @route   GET /api/auth/me
// @access  Private/Admin
const getAdminProfile = async (req, res) => {
  try {
    // req.admin is attached by the protect middleware
    res.status(200).json(req.admin);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
};
