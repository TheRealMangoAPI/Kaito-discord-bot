const mongoose = require('mongoose');

const modLogs = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  logChannel: {
    type: String,
    required: true,
  }
});

schema.index({}, { unique: false });

const Ticket = mongoose.model('modLogs', schema);

module.exports = modLogs
