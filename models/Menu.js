const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  // For simplicity, let's store just a list of items and an optional date
  date: {
    type: String,
    default: new Date().toDateString()  // e.g. "Tue Apr 11 2025"
  },
  items: [{
    type: String
  }]
});

module.exports = mongoose.model('Menu', menuSchema);
