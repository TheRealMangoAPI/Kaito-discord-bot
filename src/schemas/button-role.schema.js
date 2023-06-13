const { Schema, model, models } = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const buttonRoleSchema = new Schema({
  // Guild ID
  _id: reqString,

  // Buttons
  buttons: [
    {
      roleId: reqString,
      buttonText: reqString,
      buttonStyle: reqString,
      buttonEmoji: reqString,
    },
  ],

  // Role message
  channelId: reqString,
  text: reqString,
  hexColor: {
    type: String,
    default: 'Random',
  },
  messageId: String,
})

const name = 'button-roles'
module.exports = models[name] || model(name, buttonRoleSchema)
