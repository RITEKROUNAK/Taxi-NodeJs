const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    default: 0
  },
  cab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cab'
  },
  matched: {
    type: Boolean,
    default: false
  }
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
