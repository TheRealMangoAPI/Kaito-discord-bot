const { EmbedBuilder } = require('discord.js')


module.exports = async (interaction) => {

    if(!interaction.isStringSelectMenu()) return

    if(interaction.customId === 'help-commands') {
        const choise = interaction.values

        if(choise.includes('general')) {
            interaction.update({ embeds: [
            new EmbedBuilder()
                .setTitle('<:slash_command:1118577403434893352> General')
                .setDescription('\`\`\`Selcet your command category bellow the message\`\`\`')
                .addFields(
                    { name: '\u200B', value: ' ' },
                    { name: '`soon`', value: 'soon', inline: true},
                )
                .setColor('#40E0D0')
            ]})
        }
        if(choise.includes('moderation')) {
            interaction.update({ embeds: [
                new EmbedBuilder()
                    .setTitle('<:slash_command:1118577403434893352> Moderation')
                    .setDescription('\`\`\`Selcet your command category bellow the message\`\`\`')
                    .addFields(
                        { name: '\u200B', value: ' ' },
                        { name: '`/ban`', value: 'Bans a user from the guild', inline: true},
                        { name: '`/unban`', value: 'Unbans a user from the guild', inline: true},
                        { name: '\u200B', value: ' ' },
                        { name: '`/mute`', value: 'Mute a user', inline: true},
                        { name: '`/unmute`', value: 'Unmute a user', inline: true},
                        { name: '\u200B', value: ' ' },
                        { name: '`/kick`', value: 'Kick a user from the guild', inline: true},
                        { name: '`/clear`', value: 'Clear messages in a channel', inline: true},
                    )
                    .setColor('#40E0D0')
            ]})
        }
        if(choise.includes('giveaway')) {
            interaction.update({ embeds: [
                new EmbedBuilder()
                    .setTitle('<:slash_command:1118577403434893352> General')
                    .setDescription('\`\`\`Selcet your command category bellow the message\`\`\`')
                    .addFields(
                        { name: '\u200B', value: ' ' },
                        { name: '`soon`', value: 'soon', inline: true},
                    )
                    .setColor('#40E0D0')
            ]})
        }
    }
}