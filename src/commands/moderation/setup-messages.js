const { EmbedBuilder, ApplicationCommandOptionType, Colors, PermissionFlagsBits, ActionRowBuilder, UserSelectMenuBuilder, ChannelSelectMenuBuilder, ChannelType, ButtonBuilder, ButtonStyle, RoleSelectMenuBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js')
const Messages = require('../../schemas/join-leave-messages')

module.exports = {
    description: 'Setup the welcome or leave message',

    type: 'SLASH',
    testOnly: true,
    guildOnly: true,
    ownerOnly: false,
    permissions: [PermissionFlagsBits.Administrator],

    callback: async ({interaction, args}) => {

        let joinStatus
        let leaveStatus

        const messages = await Messages.findOne({ guildId: interaction.guild.id})
        if(!messages) {
            joinStatus, leaveStatus = '<:failed:1118270103126016041> disabled'
        }else {
            if(messages.joinMessage) {
                joinStatus = '<:verified:1118650085010587688> enabled'
            }else {
                joinStatus = '<:failed:1118270103126016041> disabled'
            }
            if(messages.leaveMessage) {
                leaveStatus = '<:verified:1118650085010587688> enabled'
            }else {
                leaveStatus = '<:failed:1118270103126016041> disabled'
            }
        }


        return {
            embeds: [
                new EmbedBuilder()
                .setTitle('⚙ Setup')
                .setDescription(`Choose the message who you want so setup.\n\n> **Join message: ${joinStatus}\n> Leave message: ${leaveStatus}**`)
                .setColor('#40E0D0')
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId('setupMessages')
                    .setPlaceholder('Choose')
                    .setOptions(
                        new StringSelectMenuOptionBuilder()
                        .setLabel('Welcome Message')
                        .setDescription('Message if someone join the guild')
                        .setEmoji('👋')
                        .setValue('welcome'),
                        new StringSelectMenuOptionBuilder()
                        .setLabel('Leave Message')
                        .setDescription('Message if someone leave the guild')
                        .setEmoji('💼')
                        .setValue('leave')
                    )
                )
            ]
        }
    }
}