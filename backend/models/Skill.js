const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Skill names should be unique
    trim: true,
  },
  category: { // e.g., "Frontend", "Backend", "Database", "Tools"
    type: String,
    required: true,
    trim: true,
  },
  // You could add proficiency (e.g., Number, 1-5), or an icon URL here later
  // proficiency: {
  //   type: Number,
  //   min: 1,
  //   max: 5,
  //   default: 3
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;