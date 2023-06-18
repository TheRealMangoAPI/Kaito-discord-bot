const { Schema, models, model } = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const guildSchema = new Schema({
  // Discord guild ID
  _id: reqString,
})

const name = 'guilds'
module.exports = models[name] || model(name, guildSchema)
