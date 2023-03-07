const { Client, IntentsBitField, Partials } = require('discord.js')
const CH = require('command-handler')
const path = require('path')
require('dotenv/config')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageReactions,
    IntentsBitField.Flags.DirectMessageTyping,
  ],
  partials: [Partials.Channel],
})

client.on('ready', () => {
  console.log('The bot is ready!')

  new CH({
    client,
    mongoUri: process.env.MONGO_URI,
    commandsDir: path.join(__dirname, 'commands'),
    testServers: ['1066649397229781052', '1082621430803472494'],
    botOwners: ['691584005266472960'],
    cooldownConfig: {
      errorMessage: 'Please wait {TIME}',
      botOwnersBypass: false,
      dbRequired: 300 
    }
  })
})

client.login(process.env.TOKEN)
