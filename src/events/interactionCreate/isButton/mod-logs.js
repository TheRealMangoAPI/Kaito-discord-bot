const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const modlogs = require("../../../schemas/mod-logs.schema");

/**
 * @param {ChatInputCommandInteraction} interaction
 */
module.exports = async (interaction) => {
  if (interaction.customId === "disableLoggingSystem") {
    const UpdateModLogs = await modlogs.findOneAndUpdate({
      guildId: interaction.guild.id,
    });
    UpdateModLogs.enabled = false;
    UpdateModLogs.save();
    interaction.reply({
      embeds: [
        new EmbedBuilder().setDescription(
          "<:verified:1118650085010587688>  Logging system updated."
        ),
      ],
    });
  }

  if (interaction.customId === "enableLoggingSystem") {
    const UpdateModLogs = await modlogs.findOneAndUpdate({
      guildId: interaction.guild.id,
    });
    UpdateModLogs.enabled = true;
    UpdateModLogs.save();
    interaction.reply({
      embeds: [
        new EmbedBuilder().setDescription(
          "<:verified:1118650085010587688>  Logging system updated."
        ),
      ],
    });
  }
};
