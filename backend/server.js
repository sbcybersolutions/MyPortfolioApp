// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); // Import Mongoose
const cors = require('cors'); // Import CORS for cross-origin requests
const projectRoutes = require('./routes/projectRoutes'); // Import project routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Use project routes
app.use('/api/projects', projectRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully!');
    // Start the server ONLY if MongoDB connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Access backend at: http://localhost:${PORT}`);
      console.log('Project API routes available at: http://localhost:5000/api/projects');
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure code
  });

// Define a simple route for the root URL (/)
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});