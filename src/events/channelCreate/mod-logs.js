const { AuditLogEvent, EmbedBuilder } = require("discord.js")

module.exports = async (channel, instance) => {
  channel.guild.fetchAuditLogs({
    type: AuditLogEvent.ChannelCreate,
  })
  .then(async audit => {
    const { executor } = audit.entries.first()

    const name = channel.name;
    const id = channel.id;
    let type = channel.type;

    if (type == 0 ) type = 'Text'
    if (type == 2) type = 'Voice'
    if (type == 13) type = 'Stage'
    if (type == 15) type = 'Form'
    if (type == 5) type = 'Announcement'
    if (type == 4) type = 'Category'

    const channelID = '1118936418320916570' //Need to connect it do the DB for MultiGuild
    const mChannel = await channel.guild.channels.cache.get(channelID);

    const embed = new EmbedBuilder()
    .setColor('#1C1F3F')
    .setTitle('Channel Created')
    .addFields({ name: 'Channel Name', value: `${name} -> <#${id}>`, inline: false })
    .addFields({ name: 'Channel Type', value: `${type}`, inline: false })
    .addFields({ name: 'Channel ID', value: `${id}`, inline: false })
    .addFields({ name: 'Created By', value: `${executor.tag}`, inline: false })
    .setTimestamp()
    .setFooter({ text: 'Kaito', iconURL: 'https://cdn.discordapp.com/attachments/1118938640802918500/1118939105343053957/Screenshot_2023-05-27_101632.png' })

    mChannel.send({ embeds: [embed] })
  })
}
