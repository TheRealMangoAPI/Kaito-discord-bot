const { EmbedBuilder, ApplicationCommandOptionType, Colors, PermissionFlagsBits, ActionRowBuilder, UserSelectMenuBuilder, ChannelSelectMenuBuilder, ChannelType, ButtonBuilder, ButtonStyle, RoleSelectMenuBuilder } = require('discord.js')

module.exports = {
    description: 'Setup the ticket system',

    type: 'SLASH',
    testOnly: true,
    guildOnly: true,
    ownerOnly: false,
    permissions: [PermissionFlagsBits.Administrator],

    callback: async ({interaction, args}) => {

        return {
            embeds: [
                new EmbedBuilder()
                .setTitle('⚙ Ticket system setup')
                .setDescription(`Choose the channel to send the ticket or show and then edit the embeds.`)
                .setColor('#40E0D0')
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ChannelSelectMenuBuilder()
                    .setChannelTypes(ChannelType.GuildText)
                    .setCustomId('ticketSetup')
                    .setPlaceholder('Choose a channel to send the ticket')
                ),
                new ActionRowBuilder().addComponents(
                    new RoleSelectMenuBuilder()
                    .setCustomId('ticketRoles')
                    .setPlaceholder('Select your team roles')
                    .setMinValues(1)
                    .setMaxValues(20)
                ),
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setCustomId('ShowOpenTicketEmbed')
                    .setLabel('Show Open-ticket embed')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('📨'),
                    new ButtonBuilder()
                    .setCustomId('ShowTicketEmbed')
                    .setLabel('Show ticket embed')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('🎫')
                )
            ]
        }
    }
}