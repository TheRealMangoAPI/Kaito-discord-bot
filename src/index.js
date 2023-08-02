const { Client, IntentsBitField, Partials, ActivityType, GatewayIntentBits, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js')
const CH = require('command-handler')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv/config')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
    Object.keys(GatewayIntentBits),
  ],
  partials: [Partials.Channel],
})

client.on('ready', () => {
  console.log('The bot is ready!')

  client.user.setActivity({
    name: 'kaitobot.xyz',
    type: ActivityType.Watching
  })

  mongoose.set('strictQuery', false)
  mongoose.connect(process.env.MONGO_URI, {
    keepAlive: true,
  })

  client.user.setActivity({
    name: 'starting...',
    type: ActivityType.Listening
  })

  new CH({
    client,
    mongoUri: process.env.MONGO_URI,
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    testServers: ['1118243173936922766', '1066649397229781052', '1108810398645354579'],
    botOwners: ['257195970339667979, 746510596144365689'],
    cooldownConfig: {
      errorMessage: 'Please wait {TIME} before doing that again',
      botOwnersBypass: false,
      dbRequired: 300, // 5 minutes
    },
    events: {
      dir: path.join(__dirname, 'events'),
    },
    validations: {
      runtime: path.join(__dirname, 'validations', 'runtime'),
      syntax: path.join(__dirname, 'validations', 'syntax'),
    },
  })
})

client.login(process.env.TOKEN)