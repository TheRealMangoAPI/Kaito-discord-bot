const { EmbedBuilder, ApplicationCommandOptionType, Colors } = require('discord.js')
const Giveaway = require('../../util/giveaway')
const giveawayManager = new Giveaway()


module.exports = {
    description: 'Start a giveaway',

    type: 'SLASH',
    testOnly: true,
    guildOnly: false,
    ownerOnly: false,
    permissions: [PermissionFlagsBits.ManageChannels],
    options: [
        {
            name: 'duration',
            description: 'Duration of the giveaway in minutes',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'winners',
            description: 'Number of winners',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'prize',
            description: 'Prize to win',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    callback: async ({interaction, args, client}) => {

        giveawayManager.Start(interaction.channel, {
            time: args[0],
            winners: args[1],
            prize: args[2]
        })

        return {
            embeds: [
                new EmbedBuilder()
                .setColor(Colors.Green)
                .setDescription('<:verified:1118650085010587688> **Giveaway successfull created!**')
            ],
            ephemeral: true
        }
    }
}