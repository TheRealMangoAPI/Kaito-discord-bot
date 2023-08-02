const { EmbedBuilder, ApplicationCommandOptionType, Colors, PermissionFlagsBits, ActionRowBuilder, UserSelectMenuBuilder, ChannelSelectMenuBuilder, ChannelType, ButtonBuilder, ButtonStyle, RoleSelectMenuBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Component } = require('discord.js')
const Messages = require('../../schemas/join-leave-messages')

module.exports = {
    description: 'Setup the welcome or leave message',

    type: 'SLASH',
    testOnly: true,
    guildOnly: true,
    ownerOnly: false,
    permissions: [PermissionFlagsBits.Administrator],

    callback: async ({interaction, args}) => {

        const messages = await Messages.findOne({ guildId: interaction.guild.id})

        if(!messages || messages.joinMessage === false)
        return{
            embeds: [
                new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription('The join message is disabled you can enable it with a click on the \`enable\` button bellow this message.')
            ],
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('enable-join-message')
                    .setLabel('Enable')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('<:verified:1118650085010587688>')
                )
            ]
        }
        else {
            return{
                embeds: [
                    new EmbedBuilder()
                    .setColor('#40E0D0')
                    .setTitle('⚙ Join message setup')
                    .setDescription('Setup the channel to send the join message or edit your join message')
                ],
                components: [
                    new ActionRowBuilder()
                    .addComponents(
                        new ChannelSelectMenuBuilder()
                        .setChannelTypes(ChannelType.GuildText)
                        .setCustomId('setchannel-join-message')
                        .setPlaceholder('Choose your channel to send the join message')
                    ),
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('disable-join-message')
                        .setLabel('Disable')
                        .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                        .setCustomId('edit-join-message')
                        .setLabel('Edit')
                        .setStyle(ButtonStyle.Secondary)
                    )
                ]
            }
        }
    }
}