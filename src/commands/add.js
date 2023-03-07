const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  description: 'Adds two numbers together.',

  minArgs: 2,
  maxArgs: 2,
  correctSyntax: 'Correct syntax: {PREFIX}add {ARGS}',
  expectedArgs: '<num 1> <num 2>',

  type: 'BOTH',
  testOnly: true,
  reply: false,
  guildOnly: true,

  callback: ({ args }) => {
    let sum = 0

    for (const arg of args) {
      sum += parseInt(arg)
    }

    const row = new ActionRowBuilder()

    row.addComponents(
      new ButtonBuilder()
        .setCustomId('testing')
        .setLabel('Testing')
        .setEmoji('🧪')
        .setStyle(ButtonStyle.Success)
    )

    return {
      content: `The sum is ${sum}`,
      components: [row],
    }
  },
}
