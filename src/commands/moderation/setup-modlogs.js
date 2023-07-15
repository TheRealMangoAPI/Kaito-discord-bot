const { EmbedBuilder, ApplicationCommandOptionType, Colors, PermissionFlagsBits, ActionRowBuilder, UserSelectMenuBuilder, ChannelSelectMenuBuilder, ChannelType, ButtonBuilder, ButtonStyle, RoleSelectMenuBuilder } = require('discord.js')
const modLogs = require('../../schemas/mod-logs.schema')

module.exports = {
    description: 'Set Up the logging system',

    type: 'SLASH',
    testOnly: true,
    guildOnly: true,
    ownerOnly: false,
    permissions: [PermissionFlagsBits.Administrator],

    callback: async ({interaction, args}) => {

        

        return {
            embeds: [
                new EmbedBuilder()
                .setTitle('⚙ Logging system setup')
                .setDescription(`Choose in which channel you want to send the logs.`)
                .setColor('#40E0D0')
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ChannelSelectMenuBuilder()
                    .setChannelTypes(ChannelType.GuildText)
                    .setCustomId('loggingSetup')
                    .setPlaceholder('Choose your logging channel')
                ),
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setCustomId('enableModLogs')
                    .setLabel('Enable')
                    .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                    .setCustomId('disableLoggingSystem')
                    .setLabel('Disable')
                    .setStyle(ButtonStyle.Danger),
                )
            ]
        }
    }
}