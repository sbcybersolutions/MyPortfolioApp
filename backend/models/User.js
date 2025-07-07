const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // You can add more fields here, e.g., role: { type: String, default: 'user' }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

// --- Middleware to hash password before saving ---
userSchema.pre('save', async function(next) {
  // 'this' refers to the user document being saved
  if (!this.isModified('password')) { // Only hash if password field is modified (or new)
    return next();
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10); // 10 is a good default for salt rounds
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Method to compare entered password with hashed password ---
userSchema.methods.matchPassword = async function(enteredPassword) {
  // 'this' refers to the user document
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;