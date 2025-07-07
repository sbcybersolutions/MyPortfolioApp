const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import our User model
const jwt = require('jsonwebtoken');     // Import jsonwebtoken

// --- Helper function to generate JWT token ---
const generateToken = (id) => {
  // Uses the secret key from environment variables
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

// Route 1: Register a new user
// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user (password will be hashed by pre-save hook)
    const user = await User.create({ username, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id), // Send back a JWT token
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (err) {
    console.error('Error during user registration:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route 2: Authenticate user & get token
// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ username });

    // Check password
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id), // Send back a JWT token
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' }); // Unauthorized
    }
  } catch (err) {
    console.error('Error during user login:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;