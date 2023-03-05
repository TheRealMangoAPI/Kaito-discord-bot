const DJS = require('discord.js')
const { IntentsBitField } = require('discord.js')
const CH = require('command-handler')
const path = require('path')
require('dotenv/config')

const client = new DJS.Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers
  ],
})

client.on('ready', () => {
  console.log('The bot is ready!')

  new CH({
    client,
    mongoUri: process.env.MONGO_URI,
    commandsDir: path.join(__dirname, 'commands'),
    testServers: ['1066649397229781052'],
  })
})

client.login(process.env.TOKEN)
