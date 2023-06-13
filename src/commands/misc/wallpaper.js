const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const akaneko = require('akaneko')

module.exports = {
    description: "Sends cool wallpapers",

    type: 'SLASH',
    testOnly: true,
    guildOnly: false,
    ownerOnly: false,
    deferReply: true,

    callback: async ({ client, interaction, args, channel, member }) => {
        wallpaperResponse = await new akaneko.wallpapers()

        const embed = new EmbedBuilder().setImage(wallpaperResponse).setFooter({ text: `Wallpapers by Akaneko API` })

        return {
            embeds: [embed]
        }
    }
}