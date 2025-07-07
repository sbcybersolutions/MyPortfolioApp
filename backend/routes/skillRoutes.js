// backend/routes/skillRoutes.js

const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const { protect, authorizeRoles } = require('../middleware/authMiddleware'); // Import both middlewares

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
      return res.status(400).json({ message: 'Invalid Skill ID format.' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route 3: POST a new skill (PROTECTED & ADMIN-ONLY)
// POST /api/skills
router.post('/', protect, authorizeRoles('admin'), async (req, res) => {
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

// Route 4: PUT (Update) an existing skill (PROTECTED & ADMIN-ONLY)
// PUT /api/skills/:id
router.put('/:id', protect, authorizeRoles('admin'), async (req, res) => {
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

// Route 5: DELETE a skill (PROTECTED & ADMIN-ONLY)
// DELETE /api/skills/:id
router.delete('/:id', protect, authorizeRoles('admin'), async (req, res) => {
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

// Route 6: POST multiple new skills (PROTECTED & ADMIN-ONLY)
// POST /api/skills/bulk
router.post('/bulk', protect, authorizeRoles('admin'), async (req, res) => {
  const skillsToCreate = req.body; // Expecting an array of skill objects

  if (!Array.isArray(skillsToCreate) || skillsToCreate.length === 0) {
    return res.status(400).json({ message: 'Request body must be a non-empty array of skills.' });
  }

  try {
    const createdSkills = [];
    const errors = [];

    for (const skillData of skillsToCreate) {
      const { name, category } = skillData;

      if (!name || !category) {
        errors.push({ skill: skillData, message: 'Skill name and category are required.', status: 400 });
        continue;
      }

      try {
        const newSkill = new Skill({ name, category });
        const createdSkill = await newSkill.save();
        createdSkills.push(createdSkill);
      } catch (err) {
        if (err.code === 11000) {
          errors.push({ skill: skillData, message: 'Skill with this name already exists.', status: 400 });
        } else if (err.name === 'ValidationError') {
          errors.push({ skill: skillData, message: err.message, status: 400 });
        } else {
          errors.push({ skill: skillData, message: 'An unexpected error occurred.', status: 500 });
        }
      }
    }

    if (errors.length > 0) {
        return res.status(200).json({
            message: 'Bulk operation completed with some issues.',
            successfullyCreated: createdSkills,
            failedToCreate: errors
        });
    }

    res.status(201).json({ message: 'All skills created successfully!', data: createdSkills });

  } catch (err) {
    console.error('Error during bulk skill creation:', err);
    res.status(500).json({ message: 'Server Error during bulk operation.' });
  }
});


module.exports = router;