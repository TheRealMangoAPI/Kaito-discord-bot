const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

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
      .setTitle('overview')
      .setFields(
        {
          name: 'Commands',
          value: `
            /list - List's all commands
            /dashboard - sends you a link to the dashboard
          `
        },
        {
          name: 'Support & Updates',
          value: `
            [<:m_discord:1085222657332621402> Discord](https://mangoapi.dev)
            [<:LinaHype:933155881552588830> Dashboard](https://mangoapi.dev)
            [<:LinaLurk:991749890352894032> Website](https://mangoapi.dev)
          `
        }
      )

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId('DashboardButton')
          .setStyle(ButtonStyle.Link)
          .setLabel('Dashboard')
          .setURL('https://mangoapi.dev')
        )
      
    return {
      embeds: [EmbedMain]
    }
  },
}