const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  description: "Sends you a link to the dashboard",

  type: 'SLASH',
  testOnly: true,
  guildOnly: false,
  ownerOnly: false,
  deferReply: false,
  ephemeral: true,

  callback: ({client, interaction}) => {
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId('dashboardbutton')
      .setStyle(ButtonStyle.Link)
      .setLabel('Dashboard')
      .setURL('https://mangoapi.dev')
    )

    return {
        components: [row],
    }
  }
}