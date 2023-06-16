const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  description: "Displays the help menu",
  
  type: 'SLASH',
  testOnly: true,
  guildOnly: false,
  ownerOnly: false,
  options: [
    {
      name: 'command',
      description: 'Get informations about the command',
      type: ApplicationCommandOptionType.String,
      autocomplete: true,
    },
],
autocomplete: () => {
  return ['ban', 'unban', 'mute', 'unmute', 'kick', 'clear', 'warn', 'delete-warns']
},
  callback: ({interaction, args}) => {

    if(!args[0]) {
      const EmbedMain = new EmbedBuilder()
      .setColor('#40E0D0')
      .setTitle('Overview')
      .setDescription('> \`/help <command>\` ➔ Shows information about a command\n> \`/help <feature>\` ➔ Shows information about a feature\n\n> \`/list commands\` ➔ Lists all commands\n> \`/list features\` ➔ Lists all features\n\n> **Invite Bot:** [Click here](https://example.com)\n> **Discord Server:** [Click here](https://discord.gg/mangoapi)')

      return {
        embeds: [EmbedMain]
      }
    }else {

      if(args[0] === 'ban') {
        return {
          embeds: [
            new EmbedBuilder()
            .setTitle('Command Information')
            .setDescription('**Usage**\n> \`/ban [user] [reason]\`\n\n**Description**\n> Bans a user from the guild')
            .setColor('#40E0D0')
          ]
        }
      }
      if(args[0] === 'unban') {
        return {
          embeds: [
            new EmbedBuilder()
            .setTitle('Command Information')
            .setDescription('**Usage**\n> \`/unban [userId]\`\n\n**Description**\n> Unbans a user from the guild')
            .setColor('#40E0D0')
          ]
        }
      }
      if(args[0] === 'mute') {
        return {
          embeds: [
            new EmbedBuilder()
            .setTitle('Command Information')
            .setDescription('**Usage**\n> \`/mute [user] [time] [reason]\`\n\n**Description**\n> Mute a user')
            .setColor('#40E0D0')
          ]
        }
      }
      if(args[0] === 'unmute') {
        return {
          embeds: [
            new EmbedBuilder()
            .setTitle('Command Information')
            .setDescription('**Usage**\n> \`/unmute [user]\`\n\n**Description**\n> Unmute a user')
            .setColor('#40E0D0')
          ]
        }
      }
      if(args[0] === 'kick') {
        return {
          embeds: [
            new EmbedBuilder()
            .setTitle('Command Information')
            .setDescription('**Usage**\n> \`/kick [user] [reason]\`\n\n**Description**\n> Kicks a user from the guild')
            .setColor('#40E0D0')
          ]
        }
      }
      if(args[0] === 'clear') {
        return {
          embeds: [
            new EmbedBuilder()
            .setTitle('Command Information')
            .setDescription('**Usage**\n> \`/clear [number]\`\n\n**Description**\n> Clear the messages in a channel')
            .setColor('#40E0D0')
          ]
        }
      }
      if(args[0] === 'warn') {
        return {
          embeds: [
            new EmbedBuilder()
            .setTitle('Command Information')
            .setDescription('**Usage**\n> \`/warn [user] [reason]\`\n\n**Description**\n> Warns a user from the guild')
            .setColor('#40E0D0')
          ]
        }
      }
      if(args[0] === 'delete-warns') {
        return {
          embeds: [
            new EmbedBuilder()
            .setTitle('Command Information')
            .setDescription('**Usage**\n> \`/delete-warns [user] [number]\`\n\n**Description**\n> Delete warns from a user of the guild')
            .setColor('#40E0D0')
          ]
        }
      }
    }
  },
}