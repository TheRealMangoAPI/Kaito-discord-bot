const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
  description: "Displays the help menu",
  
  type: 'SLASH',
  testOnly: true,
  guildOnly: false,
  ownerOnly: false,
  deferReply: false,
  ephemeral: true,

  // Invoked when a user runs
  callback: () => {
    // Return the same object you would use in
    // message.reply
    // or
    // interaction.reply

    const EmbedMain = new EmbedBuilder()
      .setColor('#40E0D0')
      .setTitle('Overview')
      .setDescription('> \`/help <command>\` ➔ Shows information about a command\n> \`/help <feature>\` ➔ Shows information about a feature\n\n> \`/list commands\` ➔ Lists all commands\n> \`/list features\` ➔ Lists all features\n\n> **Invite Bot:** [Click here](https://example.com)\n> **Discord Server:** [Click here](https://discord.gg/mangoapi)')

    return {
      embeds: [EmbedMain]
    }
  },
}