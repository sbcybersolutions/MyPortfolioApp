const jwt = require('jsonwebtoken');
const User = require('../models/User'); // We'll need the User model to find the user

// Middleware function to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  // Example: Authorization: 'Bearer YOUR_TOKEN_HERE'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user (without the password) to the request object
      // We find the user by ID from the decoded token payload
      req.user = await User.findById(decoded.id).select('-password'); // Exclude password from user object

      next(); // Move to the next middleware or route handler
    } catch (error) {
      console.error('Error in auth middleware:', error);
      res.status(401).json({ message: 'Not authorized, token failed' }); // Token is invalid or expired
    }
  }

  // If no token is provided
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };