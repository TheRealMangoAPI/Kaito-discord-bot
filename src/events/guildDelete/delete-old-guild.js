const guildSchema = require('../../schemas/guilds.schema')

module.exports = async (guild) => {
  await guildSchema.deleteOne({ _id: guild.id })
}
