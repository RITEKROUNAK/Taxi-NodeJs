const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
