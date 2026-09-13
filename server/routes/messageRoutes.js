const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage,
} = require('../controllers/messageController');

// Routes for /api/messages
router.route('/')
  .post(sendMessage)
  .get(getMessages);

// Routes for /api/messages/:id
router.route('/:id')
  .delete(deleteMessage);

// Route for /api/messages/:id/read
router.route('/:id/read')
  .put(markMessageAsRead);

module.exports = router;
