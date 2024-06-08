const mongoose = require("./../utils/mongooseConnection");

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  Player: {
    type: String,
    required: true,
  },
  Team: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Player", playerSchema);
