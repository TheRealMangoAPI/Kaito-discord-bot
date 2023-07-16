const {
  ChatInputCommandInteraction,
  ChannelType,
  PermissionFlagsBits,
  TextChannel,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
} = require("discord.js");
const Ticket = require("../../../schemas/ticket-system");

/**
 *
 * @param {TextChannel} createdChannel
 * @param {ChatInputCommandInteraction} interaction
 */
module.exports = async (interaction) => {
  if (interaction.customId === "openTicket") {
    const ticket = await Ticket.findOne({ guildId: interaction.guild.id });

    interaction.guild.channels
      .create({
        name: `ticket-${interaction.user.username}`,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          {
            id: interaction.guild.roles.everyone,
            deny: [PermissionFlagsBits.ViewChannel],
          },
          {
            id: interaction.user.id,
            allow: [PermissionFlagsBits.ViewChannel],
          },
          ...ticket.team.map((roleId) => ({
            id: roleId,
            allow: [PermissionFlagsBits.ViewChannel],
          })),
        ],
      })
      .then(async (createdChannel) => {
        const ticket = await Ticket.findOne({ guildId: interaction.guild.id });

        let title = `Hello ${interaction.user.username},`;
        let description =
          "Our team will take care of you right away.\nPlease describe your problem in the meantime!";
        let c = "#40E0D0";

        if (ticket && ticket.title != "") {
          title = ticket.title;
          description = ticket.description;
          c = ticket.color;
        }

        const currentDate = new Date();

        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const year = String(currentDate.getFullYear());

        const formattedDate = `${day}.${month}.${year}`;

        title = title
          .replace("{username}", interaction.user.username)
          .replace("{userId}", interaction.user.id)
          .replace("{createdAtDate}", formattedDate);

        description = description
          .replace("{username}", interaction.user.username)
          .replace("{userId}", interaction.user.id)
          .replace("{createdAtDate}", formattedDate);

        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const isValidHex = hexRegex.test(c);

        const englishColorRegex =
          /^(AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGrey|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkSlateGrey|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DimGrey|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Grey|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGrey|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSlateGrey|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|SlateGrey|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)$/;
        var color;
        if (isValidHex) {
          color = c;
        } else if (englishColorRegex.test(c)) {
          color = c;
        } else {
          color = "Red";
        }

        let teamping = "";
        ticket.team.forEach((id) => {
          teamping += `<@&${id}>`;
        });
        createdChannel.send(teamping);
        createdChannel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle(title)
              .setDescription(description)
              .setColor(color),
          ],
          components: [
            new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("close")
                .setLabel("Close")
                .setStyle(ButtonStyle.Danger)
                .setEmoji("🗑"),
              new ButtonBuilder()
                .setCustomId("claim")
                .setLabel("Claim")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("🎫")
            ),
          ],
        });
      })
      .catch(console.error);
  }

  if (interaction.customId === "close") {
    interaction.channel.delete();
  }

  if (interaction.customId === "claim") {
    interaction.channel.permissionOverwrites.edit(interaction.user.id, {
      ViewChannel: true,
    });

    const ticket = await Ticket.findOne({ guildId: interaction.guild.id });

    ticket.team.forEach((roleId) => {
      interaction.channel.permissionOverwrites.edit(roleId, {
        ViewChannel: false,
      });
    });

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            "<:verified:1118650085010587688> **You have sucessfull claimed the ticket.**"
          )
          .setColor(Colors.Green),
      ],
      ephemeral: true,
    });

    interaction.message.edit({
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("close")
            .setLabel("Close")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("🗑"),
          new ButtonBuilder()
            .setCustomId("unclaim")
            .setLabel("Unclaim")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("🎫")
        ),
      ],
    });
  }
  if (interaction.customId === "unclaim") {
    interaction.channel.permissionOverwrites.delete(interaction.user.id);

    const ticket = await Ticket.findOne({ guildId: interaction.guild.id });

    ticket.team.forEach((roleId) => {
      interaction.channel.permissionOverwrites.edit(roleId, {
        ViewChannel: true,
      });
    });

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            "<:verified:1118650085010587688> **You have sucessfull unclaimed the ticket.**"
          )
          .setColor(Colors.Green),
      ],
      ephemeral: true,
    });

    interaction.message.edit({
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("close")
            .setLabel("Close")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("🗑"),
          new ButtonBuilder()
            .setCustomId("claim")
            .setLabel("Claim")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("🎫")
        ),
      ],
    });
  }
};
