const mongoose = require('mongoose');

// Define the schema for a Project
const projectSchema = new mongoose.Schema({
  // Title of the project (e.g., "E-commerce Web App")
  title: {
    type: String,
    required: true, // This field is mandatory
    trim: true,      // Remove whitespace from both ends of a string
  },
  // Short description of the project
  description: {
    type: String,
    required: true,
  },
  // An array of technologies used (e.g., ["React", "Node.js", "MongoDB"])
  technologies: {
    type: [String], // Array of strings
    default: [],     // Default to an empty array if not provided
  },
  // URL to the live demo of the project (optional)
  demoLink: {
    type: String,
    trim: true,
  },
  // URL to the GitHub repository (optional)
  githubLink: {
    type: String,
    trim: true,
  },
  // URL to a project image (optional)
  imageUrl: {
    type: String,
    trim: true,
  },
  // Date when the project was created/added (automatically set)
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Mongoose model from the schema
// 'Project' will be the name of the collection in MongoDB (it will be pluralized to 'projects')
const Project = mongoose.model('Project', projectSchema);

module.exports = Project; // Export the model for use in other files