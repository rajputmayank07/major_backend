const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  rfid_tag: {
    type: String,
    unique: true,
    sparse: true // so it doesn't conflict if empty
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  meal_count: {
    type: Number,
    default: 0
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
