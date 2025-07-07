// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); // Import Mongoose
const cors = require('cors'); // Import CORS for cross-origin requests
const projectRoutes = require('./routes/projectRoutes'); // Import project routes
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const messageRoutes = require('./routes/messageRoutes'); // Import message routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Use project routes
app.use('/api/projects', projectRoutes);

// Use Auth Routes
app.use('/api/auth', authRoutes); // All requests to /api/auth will be handled by authRoutes

// Use message routes
app.use('/api/messages', messageRoutes); // All requests to /api/messages will be handled by messageRoutes

// Use skill routes
app.use('/api/skills', require('./routes/skillRoutes')); // Import and use skill routes


// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Access backend at: http://localhost:${PORT}`);
      console.log('Project API routes available at: http://localhost:5000/api/projects');
      console.log('Auth API routes available at: http://localhost:5000/api/auth'); // New line
      console.log('Message API routes available at: http://localhost:5000/api/messages'); // New line
      console.log('Skill API routes available at: http://localhost:5000/api/skills'); // New line
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Define a simple route for the root URL (/)
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});