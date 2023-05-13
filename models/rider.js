const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  rating: { type: Number, default: 0 },
});

module.exports = mongoose.model('Rider', riderSchema);
