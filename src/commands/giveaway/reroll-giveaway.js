const { EmbedBuilder, ApplicationCommandOptionType, Colors, PermissionFlagsBits } = require('discord.js')
const Giveaway = require('../../util/giveaway')
const giveawayManager = new Giveaway()


module.exports = {
    description: 'Reroll a giveaway',

    type: 'SLASH',
    testOnly: true,
    guildOnly: true,
    ownerOnly: false,
    permissions: [PermissionFlagsBits.ManageChannels],
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

        giveawayManager.Reroll(channel, args[1], interaction)
    }
}