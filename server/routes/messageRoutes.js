const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage,
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

// Routes for /api/messages
router.route('/')
  .post(sendMessage)                // Public: visitors submit contact messages
  .get(protect, getMessages);       // Protected: Admin reads messages

// Routes for /api/messages/:id
router.route('/:id')
  .delete(protect, deleteMessage);  // Protected: Admin only

// Route for /api/messages/:id/read
router.route('/:id/read')
  .put(protect, markMessageAsRead); // Protected: Admin only

module.exports = router;
