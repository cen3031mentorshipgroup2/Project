var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;