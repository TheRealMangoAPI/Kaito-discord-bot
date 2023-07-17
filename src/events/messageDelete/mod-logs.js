const { AuditLogEvent, EmbedBuilder } = require("discord.js");
const modlogs = require("../../schemas/mod-logs.schema");

module.exports = async (message, instance) => {
  message.guild
    .fetchAuditLogs({
      type: AuditLogEvent.MessageDelete,
    })
    .then(async (audit) => {
      const { executor } = audit.entries.first();

      const mes = message.content;

      if (!mes) return;

      let channelID;
      let isEnabled;
      await modlogs
        .findOne({ guildId: message.guild.id })
        .then((result) => {
          if (result) {
            channelID = result.logChannel;
            isEnabled = result.enabled;
          } else {
            console.log("No matching document found");
          }
        })
        .catch((error) => {
          console.error("Error retrieving db data:", error);
        });

      if (!isEnabled) return;

      const mChannel = await message.guild.channels.cache.get(channelID);

      const embed = new EmbedBuilder()
        .setColor("#1F51FF")
        .setTitle("Message Deleted")
        .addFields({
          name: "Message Content",
          value: `${mes}`,
          inline: false,
        })
        .addFields({
          name: "Message Channel",
          value: `${message.channel}`,
          inline: false,
        })
        .addFields({
          name: "Deleted By",
          value: `${executor.tag}`,
          inline: false,
        })
        .setTimestamp()
        .setFooter({
          text: "Kaito",
          iconURL:
            "https://cdn.discordapp.com/attachments/1118938640802918500/1118939105343053957/Screenshot_2023-05-27_101632.png",
        });

      mChannel.send({ embeds: [embed] });
    });
};
