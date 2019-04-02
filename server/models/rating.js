var mongoose = require('mongoose');

var RatingSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

var Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating;