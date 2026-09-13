const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in Authorization header (Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Extract token from string ("Bearer eyJhbGciOi..." -> "eyJhbGciOi...")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify token authenticity using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Fetch admin record from DB (excluding password field) and attach to req
      req.admin = await Admin.findById(decoded.id).select('-password');

      if (!req.admin) {
        return res.status(401).json({ message: 'Not authorized, admin account not found' });
      }

      // 5. Proceed to the next middleware or controller
      return next();
    } catch (error) {
      console.error('Auth verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, invalid or expired token' });
    }
  }

  // If no Bearer token was provided at all
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
