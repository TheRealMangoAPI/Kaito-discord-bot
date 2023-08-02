const { ChatInputCommandInteraction, EmbedBuilder, User, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require('discord.js')

/**
 * 
 * @param {ChatInputCommandInteraction} interaction
 * @param {User} user
 */

module.exports = async (interaction) => {

    if(interaction.commandName === 'User informations') {

        const user = interaction.targetMember

        interaction.reply({embeds: [
            new EmbedBuilder()
            .setTitle(`User informations`)
            .setThumbnail(user.displayAvatarURL())
            .setColor('#40E0D0')
            .setDescription(`**General:**\n> **Username:** ${user.user.username}\n> **ID:** \`${user.user.id}\`\n> **Created:** <t:${Math.round(user.user.createdAt.getTime() / 1000)}:R>\n\n**Server:**\n> **Joined:** <t:${Math.round(user.joinedAt.getTime() / 1000)}:R>\n> **Warns:** []`)
        ]})
    }
    if(interaction.commandName === 'Warn') {
        
        const modal = new ModalBuilder()
        .setTitle('Warn')
        .setCustomId('contextwarn')

        const reason = new TextInputBuilder()
        .setCustomId('reason')
        .setPlaceholder('Reason for the warn')
        .setLabel('Reason')
        .setStyle(TextInputStyle.Short)
        .setRequired(false)
        
        const user = new TextInputBuilder()
        .setCustomId('user')
        .setLabel('User ID')
        .setStyle(TextInputStyle.Short)
        .setValue(interaction.targetMember.id)

        modal.addComponents(
            new ActionRowBuilder().addComponents(reason),
            new ActionRowBuilder().addComponents(user)
        )

        interaction.showModal(modal)
    }
    if(interaction.commandName === 'Mute') {
        
        const modal = new ModalBuilder()
        .setTitle('Mute')
        .setCustomId('contextmute')

        const reason = new TextInputBuilder()
        .setCustomId('reason')
        .setPlaceholder('Reason for the mute')
        .setLabel('Reason')
        .setStyle(TextInputStyle.Short)
        .setRequired(false)

        const time = new TextInputBuilder()
        .setCustomId('time')
        .setPlaceholder('Mute time')
        .setLabel('Time')
        .setStyle(TextInputStyle.Short)
        
        const user = new TextInputBuilder()
        .setCustomId('user')
        .setLabel('User ID')
        .setStyle(TextInputStyle.Short)
        .setValue(interaction.targetMember.id)

        modal.addComponents(
            new ActionRowBuilder().addComponents(reason),
            new ActionRowBuilder().addComponents(time),
            new ActionRowBuilder().addComponents(user)
        )

        interaction.showModal(modal)
    }
    if(interaction.commandName === 'Kick') {
        
        const modal = new ModalBuilder()
        .setTitle('Kick')
        .setCustomId('contextkick')

        const reason = new TextInputBuilder()
        .setCustomId('reason')
        .setPlaceholder('Reason for the kick')
        .setLabel('Reason')
        .setStyle(TextInputStyle.Short)
        .setRequired(false)

        const user = new TextInputBuilder()
        .setCustomId('user')
        .setLabel('User ID')
        .setStyle(TextInputStyle.Short)
        .setValue(interaction.targetMember.id)

        modal.addComponents(
            new ActionRowBuilder().addComponents(reason),
            new ActionRowBuilder().addComponents(user)
        )

        interaction.showModal(modal)
    }
    if(interaction.commandName === 'Ban') {
        
        const modal = new ModalBuilder()
        .setTitle('Ban')
        .setCustomId('contextban')

        const reason = new TextInputBuilder()
        .setCustomId('reason')
        .setPlaceholder('Reason for the ban')
        .setLabel('Reason')
        .setStyle(TextInputStyle.Short)
        .setRequired(false)

        const user = new TextInputBuilder()
        .setCustomId('user')
        .setLabel('User ID')
        .setStyle(TextInputStyle.Short)
        .setValue(interaction.targetMember.id)

        modal.addComponents(
            new ActionRowBuilder().addComponents(reason),
            new ActionRowBuilder().addComponents(user)
        )

        interaction.showModal(modal)
    }
}