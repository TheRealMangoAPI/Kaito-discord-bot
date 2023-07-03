const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  warns: {
    type: Number,
    required: true,
  },
});

userSchema.index({}, { unique: false });

const User = mongoose.model('warns', userSchema);

module.exports = User