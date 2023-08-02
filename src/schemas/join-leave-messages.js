const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  joinTitle: {
    type: String,
    default: 'Welcome {user.ping} to {guild.name}'
  },
  joinDesciption: {
    type: String,
    default: 'Please accept the rules in {channel.rules} and have fun.\n You are the {membercount} member'
  },
  joinMessageType: {
    type: String,
    default: 'embed'
  },
  joinEmbedColor: {
    type: String,
    default: '#40E0D0'
  },
  joinMessage: {
    type: Boolean,
    default: false
  },
  joinCanvas: {
    type: Boolean,
    default: false
  },
  joinCanvasText: {
    type: String,
    default: "Welcome {user.username}"
  },
  joinMessageChannel: {
    type: String,
    default: ''
  },
  //leave
  leaveTitle: {
    type: String,
    default: 'Goodby {user.ping}'
  },
  leaveDesciption: {
    type: String,
    default: 'Now we are {membercount}'
  },
  leaveMessageType: {
    type: String,
    default: 'Embed'
  },
  leaveEmbedColor: {
    type: String,
    default: '#40E0D0'
  },
  leaveMessage: {
    type: Boolean,
    default: false
  },
  leaveMessageChannel: {
    type: Number,
    default: ''
  },
  leaveCanvas: {
    type: Boolean,
    default: false
  },
  leaveCanvasText: {
    type: String,
    default: "Goodby {user.username}"
  },
});

schema.index({}, { unique: false });

const Messages = mongoose.model('messages', schema);

module.exports = Messages