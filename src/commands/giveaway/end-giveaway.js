const { EmbedBuilder, ApplicationCommandOptionType, Colors } = require('discord.js')
const Giveaway = require('../../util/giveaway')
const giveawayManager = new Giveaway()


module.exports = {
    description: 'End a giveaway',

    type: 'SLASH',
    testOnly: true,
    guildOnly: false,
    ownerOnly: false,
    options: [
        {
            name: 'channel',
            description: 'The channel where the giveaway was launched',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: 'messageid',
            description: 'The message id of the giveaway',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    callback: async ({interaction, args, client}) => {

        const channel = interaction.guild.channels.cache.get(args[0])

        giveawayManager.End(channel, args[1], interaction)
    }
}