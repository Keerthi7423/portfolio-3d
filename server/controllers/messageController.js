const Message = require('../models/Message');

// @desc    Submit a new contact message (Public form submission)
// @route   POST /api/messages
// @access  Public
const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: newMessage,
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to send message', error: error.message });
  }
};

// @desc    Get all contact messages (for Admin dashboard)
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Mark message as read/unread
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
const markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.isRead = req.body.isRead !== undefined ? req.body.isRead : true;
    await message.save();

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update message status', error: error.message });
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage,
};
