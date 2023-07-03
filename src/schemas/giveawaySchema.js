const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  messageId: {
    type: String,
    required: true,
  },
  winners: {
    type: Number,
    required: true
  },
  prize: {
    type: String,
    required: true,
  },
  teilnehmer: {
    type: [String],
    required: true,
  },
})

userSchema.index({}, { unique: false });

const User = mongoose.model('giveaway', userSchema);

module.exports = User