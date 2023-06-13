const { Schema, model, models } = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const statusesSchema = new Schema({
  text: reqString,
  duration: reqString,
  activityType: {
    type: String,
    default: 'Playing'
  }
})

const name = 'statuses'
module.exports = models[name] || model(name, statusesSchema)
