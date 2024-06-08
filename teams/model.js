const mongoose = require("./../utils/mongooseConnection");

const Schema = mongoose.Schema;

const player = {
  name: {
    type: String,
    required: true,
  },
  isCaptain: {
    type: Boolean,
    required: true,
  },
  isViceCaptain: {
    type: Boolean,
    required: true,
  },
};

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  players: {
    type: [player],
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Team", teamSchema);
