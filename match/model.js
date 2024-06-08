const mongoose = require("./../utils/mongooseConnection");

const Schema = mongoose.Schema;

const matchSchema = new Schema({
  ID: {
    type: Number,
    required: true,
  },
  innings: {
    type: String,
    required: true,
  },
  overs: {
    type: Number,
    required: true,
  },
  ballnumber: {
    type: Number,
    required: true,
  },
  batter: {
    type: String,
    required: true,
  },
  bowler: {
    type: String,
    required: true,
  },
  batter: {
    type: String,
    required: true,
  },
  "non-striker": {
    type: String,
    required: true,
  },
  extra_type: {
    type: String,
    required: true,
  },
  batsman_run: {
    type: String,
    required: true,
  },
  extras_run: {
    type: String,
    required: true,
  },
  total_run: {
    type: String,
    required: true,
  },
  non_boundary: {
    type: String,
    required: true,
  },
  isWicketDelivery: {
    type: String,
    required: true,
  },
  player_out: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    required: true,
  },
  fielders_involved: {
    type: String,
    required: true,
  },
  BattingTeam: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Match", matchSchema);
