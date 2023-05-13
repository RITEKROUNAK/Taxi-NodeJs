const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
  numberPlate: {
    type: String,
    required: true,
    unique: true
  },
  model: {
    type: String,
    required: true
  }
});

const Cab = mongoose.model('Cab', cabSchema);

module.exports = Cab;
