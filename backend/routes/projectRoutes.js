const express = require('express');
const router = express.Router(); // Create an Express router
const Project = require('../models/Project'); // Import our Project model
const { protect } = require('../middleware/authMiddleware'); // Import authentication middleware

// Route 1: GET all projects
// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({}); // Find all projects in the database
    res.json(projects); // Send the projects as a JSON response
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Server Error' }); // Send a 500 status for server errors
  }
});

// Route 2: GET a single project by ID
// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id); // Find a project by its ID

    if (!project) {
      return res.status(404).json({ message: 'Project not found' }); // If no project, send 404
    }
    res.json(project); // Send the found project
  } catch (err) {
    console.error('Error fetching project by ID:', err);
    // Check if the ID format is invalid (e.g., not a valid MongoDB ObjectId)
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Project ID format' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route 3: POST a new project (PROTECTED)
// POST /api/projects
router.post('/', protect, async (req, res) => { // <-- Added 'protect' here
  try {
    // You can access the authenticated user's ID via req.user._id if needed
    // For now, we're just ensuring *any* authenticated user can add projects.
    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      technologies: req.body.technologies,
      demoLink: req.body.demoLink,
      githubLink: req.body.githubLink,
      imageUrl: req.body.imageUrl,
    });

    const project = await newProject.save();
    res.status(201).json(project);
  } catch (err) {
    console.error('Error creating project:', err);
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route 4: PUT (Update) an existing project (PROTECTED)
// PUT /api/projects/:id
router.put('/:id', protect, async (req, res) => { // <-- Added 'protect' here
  try {
    const { title, description, technologies, demoLink, githubLink, imageUrl } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, technologies, demoLink, githubLink, imageUrl },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error('Error updating project:', err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Project ID format' });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route 5: DELETE a project (PROTECTED)
// DELETE /api/projects/:id
router.delete('/:id', protect, async (req, res) => { // <-- Added 'protect' here
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project removed' });
  } catch (err) {
    console.error('Error deleting project:', err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Project ID format' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router; // Export the router