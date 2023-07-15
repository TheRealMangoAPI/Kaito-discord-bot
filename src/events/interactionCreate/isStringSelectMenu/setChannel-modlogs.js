const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js')
const modLogs = require('../../../schemas/mod-logs.schema')

/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 */
module.exports = async (interaction) => {

    function firstItemToString(arr) {
        return arr[0].toString();
      }

    if(interaction.customId === 'loggingSetup') {

        const modlogs = await modLogs.findOne({ guildId: interaction.guild.id})
        const editmodlogs = await modLogs.findOneAndUpdate({ guildId: interaction.guild.id})

        if(modlogs) {
            editmodlogs.logChannel = firstItemToString(interaction.values)
            editmodlogs.save()
        }else {
            new modLogs({
                guildId: interaction.guild.id,
                logChannel: firstItemToString(interaction.values)
            }).save()
        }
        
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`**<:verified:1118650085010587688> Logging system updated.**`)
                .setColor(Colors.Green)
            ]
        })
    }
}