const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  trackName: {
    type: String
  },
  totalTracks: {
    type: String
  },
  artistName: {
    type: String
  },
  albumName: {
    type: String
  },
  popularity: {
    type: String
  }},
    { timestamps: true }
  );

  module.exports = mongoose.model('Song', songSchema);
