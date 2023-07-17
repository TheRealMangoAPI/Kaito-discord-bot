const { AuditLogEvent, EmbedBuilder } = require("discord.js");
const modlogs = require("../../schemas/mod-logs.schema");

module.exports = async (member, instance) => {
  member.guild
    .fetchAuditLogs({
      type: AuditLogEvent.GuildBanAdd,
    })
    .then(async (audit) => {
      const { executor } = audit.entries.first();

      const name = member.user.username;
      const id = member.user.id;

      let channelID;
      let isEnabled;
      await modlogs
        .findOne({ guildId: member.guild.id })
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

      const mChannel = await member.guild.channels.cache.get(channelID);

      const embed = new EmbedBuilder()
        .setColor("#1F51FF")
        .setTitle("Member Banned")
        .addFields({
          name: "Member Name",
          value: `${name} -> <#${id}>`,
          inline: false,
        })
        .addFields({ name: "Member ID", value: `${id}`, inline: false })
        .addFields({
          name: "Banned By",
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
