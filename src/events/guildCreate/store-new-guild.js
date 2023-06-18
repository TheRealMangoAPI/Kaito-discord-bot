const guildSchema = require('../../schemas/guilds.schema')

module.exports = async (guild) => {
  try {
    await guildSchema({ _id: guild.id }).save()
  } catch (ignored) {}
}
