const { EmbedBuilder } = require('discord.js')

module.exports = {
    description: "Return ping and API latency",

    type: 'SLASH',
    testOnly: true,
    guildOnly: false,
    ownerOnly: false,

    callback: (client, interaction) => {
        const embed = new EmbedBuilder()
            .setDescription(`Pong!`)
        
            return {
                embeds: [embed]
            }
    }
}
