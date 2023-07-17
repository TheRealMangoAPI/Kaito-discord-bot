const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  logChannel: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: false,
  }
});

schema.index({}, { unique: false });

const ModLogs = mongoose.model('modLogs', schema);

module.exports = ModLogs
