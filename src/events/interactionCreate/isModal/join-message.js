const { ChatInputCommandInteraction, InteractionResponse, EmbedBuilder, Colors, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const Messages = require('../../../schemas/join-leave-messages')

/**
 *
 * @param {ChatInputCommandInteraction} interaction
 */
module.exports = async (interaction) => {
    if(interaction.customId === 'edit-join-message-text-modal') {
        const messages = await Messages.findOneAndUpdate({ guildId: interaction.guild.id})

        messages.joinTitle = interaction.fields.getTextInputValue('title')
        messages.joinDesciption = interaction.fields.getTextInputValue('description')

        messages.save()

        interaction.reply({ embeds: [
            new EmbedBuilder()
            .setDescription(`**<:verified:1118650085010587688> Join message text updated.**`)
            .setColor(Colors.Green)
        ]})
    }
    if(interaction.customId === 'edit-join-message-embed-color-modal') {
        const messages = await Messages.findOneAndUpdate({ guildId: interaction.guild.id})

        const color = interaction.fields.getTextInputValue('color')

        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const isValidHex = hexRegex.test(color);

        if(isValidHex) {
           messages.joinEmbedColor = color 
           messages.save() 

           interaction.reply({ embeds: [
            new EmbedBuilder()
            .setDescription(`**<:verified:1118650085010587688> Join message embed color updated.**`)
            .setColor(Colors.Green)
        ]})
        } 
        else interaction.reply({ embeds: [
            new EmbedBuilder()
            .setDescription(`**<:failed:1118270103126016041> Not a valid hex code.**`)
            .setColor(Colors.Red)
        ]})


    }
    if(interaction.customId === 'edit-join-canvas-text-modal') {
        const messages = await Messages.findOneAndUpdate({ guildId: interaction.guild.id})

        messages.joinCanvasText = interaction.fields.getTextInputValue('text')

        messages.save()

        interaction.reply({ embeds: [
            new EmbedBuilder()
            .setDescription(`**<:verified:1118650085010587688> Join message canvas text updated.**`)
            .setColor(Colors.Green)
        ]})
    }
}