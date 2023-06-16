const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    description: "Adds two numbers together",

    type: 'SLASH',
    testOnly: true,
    guildOnly: false,
    ownerOnly: false,
    options: [
        {
          name: 'num1',
          description: 'The first number to add',
          type: ApplicationCommandOptionType.Number,
        },
        {
            name: 'num2',
            description: 'The second number to add',
            type: ApplicationCommandOptionType.Number,
        },
    ],

  callback: (client, interaction) => {
    const result = args[0] + args[1]
    return new EmbedBuilder()
    .setDescription(`${args[0]} + ${args[1]} = ${result}`)
  }
}
