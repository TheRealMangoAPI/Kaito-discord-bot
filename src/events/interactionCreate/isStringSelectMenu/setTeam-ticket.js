const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js')
const Ticket = require('../../../schemas/ticket-system')

/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 */
module.exports = async (interaction) => {

    if(interaction.customId === 'ticketRoles') {

        const ticket = await Ticket.findOne({ guildId: interaction.guild.id})
        const editticket = await Ticket.findOneAndUpdate({ guildId: interaction.guild.id})

        if(ticket) {
            editticket.team = interaction.values
            editticket.save()
        }else {
            new Ticket({
                guildId: interaction.guild.id,
                team: interaction.values
            }).save()
        }
        
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`**<:verified:1118650085010587688> Team updated**`)
                .setColor(Colors.Green)
            ]
        })
    }
}