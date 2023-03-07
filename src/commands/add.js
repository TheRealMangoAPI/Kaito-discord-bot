const { ApplicationCommandOptionType } = require('discord.js')
const { resolve } = require('path')

module.exports = {
  description: 'Adds two numbers together',

  minArgs: 2,
  maxArgs: 2,
  correctSyntax: 'Correct syntax: {PREFIX}add {ARGS}',
  expectedArgs: '<num 1> <num 2>',

  /**
   * LEGACY
   * SLASH
   * BOTH
   */
  type: 'BOTH',

  // "ONLY" OPTIONS
  testOnly: false, // cannot be true when guildOnly is set to true
  guildOnly: true, // cannot be true when testOnly is set to true
  ownerOnly: true,  

  // "REPLY" OPTIONS
  reply: true, // if set to false it will not reply it will just send message in channel
  deferReply: true, // if true it will make bot thinkking (good for commands that take long)

  // "OTHER" OPTIONS
  delete: false, // if set to true it will delete the command
  cooldowns: {
    perUser: '10 m',
    perUserPerGuild: 0,
    perGuild: 0,
    global: 0,

    errorMessage: 'Please wait {TIME}'
  },

  aliases: ['a'],

  init: async (client, instance) => { // everything inside init is being executed on command registering

  },

  // options: [
  //   {
  //     name: 'num1',
  //     description: 'The first number to add',
  //     required: true,
  //     type: ApplicationCommandOptionType.Number,
  //   },
  //   {
  //     name: 'num2',
  //     description: 'The second number to add',
  //     required: true,
  //     type: ApplicationCommandOptionType.Number,
  //   },
  // ],

  callback: async ({ args, cancelCooldown, updateCooldown }) => {
    // cancelCooldown()

    const expires = new Date()
    expires.setSeconds(expires.getSeconds() + 30)
    updateCooldown(expires)

    let sum = 0

    for (const arg of args) {
      sum += parseInt(arg)
    }



    return `The sum is ${sum}`
  },
}
