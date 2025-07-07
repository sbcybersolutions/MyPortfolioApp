const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // Token payload needs to include the user's role now
  // so it can be used by frontend and authorization middleware
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Route 1: Register a new user
// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body; // Remove 'role' from destructuring

  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user, explicitly setting role to 'user'
    const user = await User.create({
      username,
      password,
      role: 'user', // Explicitly set default role to 'user' for new registrations
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        role: user.role, // Send back the role in the response
        token: generateToken(user._id),
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

  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      // UPDATE: Include user's role in the JWT payload
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { // <-- ADDED role to JWT payload
        expiresIn: '1h',
      });

      res.json({
        _id: user._id,
        username: user.username,
        role: user.role, // Send back the role in the response
        token: token,
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during user login:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;