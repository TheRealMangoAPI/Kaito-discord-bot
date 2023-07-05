const { EmbedBuilder, ApplicationCommandOptionType, Colors, PermissionFlagsBits } = require('discord.js')

module.exports = {
    description: 'Clear the messages',

    type: 'SLASH',
    testOnly: true,
    guildOnly: false,
    ownerOnly: false,
    permissions: [PermissionFlagsBits.ManageMessages],
    options: [
        {
            name: 'number',
            description: 'Number of messages to delete',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],

    callback: async ({interaction, args}) => {

        const number = args[0]
        
        if(number > 100) {
            return {
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **You can only delete maximum 100 messages in one time.**')
                ]
            }
        }

        interaction.channel.bulkDelete(number, [true])
        
        const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setDescription(`<:verified:1118650085010587688> **You have deleted \`${number}\` message/s.**`)

        setTimeout(() => {

            interaction.deleteReply()

        }, 1000)

        return {
            embeds: [embed]
        }
    }
}