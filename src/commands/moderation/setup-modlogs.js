const {
  EmbedBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ChannelSelectMenuBuilder,
  ChannelType,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const modlogs = require("../../schemas/mod-logs.schema");

module.exports = {
  description: "Set Up the logging system",

  type: "SLASH",
  testOnly: true,
  guildOnly: true,
  ownerOnly: false,
  permissions: [PermissionFlagsBits.Administrator],

  callback: async ({ interaction, args }) => {
    const DisableButton = new ButtonBuilder()
      .setCustomId("disableLoggingSystem")
      .setLabel("Disable")
      .setStyle(ButtonStyle.Danger);

    const EnableButton = new ButtonBuilder()
      .setCustomId("enableLoggingSystem")
      .setLabel("Enable")
      .setStyle(ButtonStyle.Success);

    let isEnabled;

    await modlogs
      .findOne({ guildId: interaction.guild.id })
      .then((result) => {
        if (result) {
          isEnabled = result.enabled;
        } else {
          console.log("No matching document found");
        }
      })
      .catch((error) => {
        console.error("Error retrieving enabledstatus:", error);
      });

    let button;
    if (isEnabled) {
      button = DisableButton;
    } else {
      button = EnableButton;
    }

    return {
      embeds: [
        new EmbedBuilder()
          .setTitle("⚙ Logging system setup")
          .setDescription(`Choose in which channel you want to send the logs.`)
          .setColor("#40E0D0"),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new ChannelSelectMenuBuilder()
            .setChannelTypes(ChannelType.GuildText)
            .setCustomId("loggingSetup")
            .setPlaceholder("Choose your logging channel")
        ),
        new ActionRowBuilder().addComponents(button),
      ],
    };
  },
};
