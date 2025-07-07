const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const { protect } = require('../middleware/authMiddleware'); // Import protect middleware

// Route 1: GET all skills (Public route - no protection)
// GET /api/skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find({}).sort({ category: 1, name: 1 }); // Sort by category then name
    res.json(skills);
  } catch (err) {
    console.error('Error fetching skills:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route 2: GET a single skill by ID (Public route)
// GET /api/skills/:id
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (err) {
    console.error('Error fetching skill by ID:', err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Skill ID format' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route 3: POST a new skill (PROTECTED)
// POST /api/skills
router.post('/', protect, async (req, res) => { // <-- Protected
  const { name, category } = req.body;

  if (!name || !category) {
    return res.status(400).json({ message: 'Skill name and category are required.' });
  }

  try {
    const newSkill = new Skill({ name, category });
    const createdSkill = await newSkill.save();
    res.status(201).json(createdSkill);
  } catch (err) {
    console.error('Error creating skill:', err);
    if (err.code === 11000) { // MongoDB duplicate key error code
      return res.status(400).json({ message: 'Skill with this name already exists.' });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route 4: PUT (Update) an existing skill (PROTECTED)
// PUT /api/skills/:id
router.put('/:id', protect, async (req, res) => { // <-- Protected
  const { name, category } = req.body;

  if (!name || !category) {
    return res.status(400).json({ message: 'Skill name and category are required for update.' });
  }

  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, category },
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (err) {
    console.error('Error updating skill:', err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Skill ID format.' });
    }
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Skill with this name already exists.' });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route 5: DELETE a skill (PROTECTED)
// DELETE /api/skills/:id
router.delete('/:id', protect, async (req, res) => { // <-- Protected
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill removed' });
  } catch (err) {
    console.error('Error deleting skill:', err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Skill ID format.' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;