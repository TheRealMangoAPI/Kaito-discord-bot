const { EmbedBuilder } = require('discord.js')

module.exports = {
    description: "Return ping and API latency",

    type: 'SLASH',
    testOnly: true,
    guildOnly: false,
    ownerOnly: false,

    callback: (client, interaction) => {
        const embed = new EmbedBuilder()
            .setDescription(`API Latency: **${client.ws.ping}**ms\nClient Ping: **${message.createdTimestamp - interaction.createdTimestamp}**ms`)
        
            return {
                embeds: [embed]
            }
    }
}
