const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Store emails in lowercase
    match: [/.+@.+\..+/, 'Please fill a valid email address'] // Basic email regex validation
  },
  subject: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isRead: { // Optional: for admin to mark messages as read
    type: Boolean,
    default: false,
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;