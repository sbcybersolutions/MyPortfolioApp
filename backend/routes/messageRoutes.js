const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect, authorizeRoles } = require('../middleware/authMiddleware'); // Import protect for admin features

// Route 1: POST a new contact message (Public route - no protection)
// POST /api/messages
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide your name, email, and message.' });
  }

  try {
    const newMessage = new Message({
      name,
      email,
      subject,
      message,
    });

    const createdMessage = await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!', data: createdMessage });
  } catch (err) {
    console.error('Error sending message:', err);
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server Error. Could not send message.' });
  }
});

// Route 2: GET all contact messages (PROTECTED & ADMIN-ONLY)
// GET /api/messages
router.get('/', protect, authorizeRoles('admin'), async (req, res) => { // <-- Added authorizeRoles('admin')
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route 3: Mark a message as read (PROTECTED & ADMIN-ONLY)
// PUT /api/messages/:id/read
router.put('/:id/read', protect, authorizeRoles('admin'), async (req, res) => { // <-- Added authorizeRoles('admin')
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!message) { return res.status(404).json({ message: 'Message not found' }); }
    res.json({ message: 'Message marked as read', data: message });
  } catch (err) {
    console.error('Error marking message as read:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route 4: Delete a message (PROTECTED & ADMIN-ONLY)
// DELETE /api/messages/:id
router.delete('/:id', protect, authorizeRoles('admin'), async (req, res) => { // <-- Added authorizeRoles('admin')
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) { return res.status(404).json({ message: 'Message not found' }); }
    res.json({ message: 'Message deleted' });
  } catch (err) {
    console.error('Error deleting message:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;