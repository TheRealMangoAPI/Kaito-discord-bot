const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js')
const Ticket = require('../../../schemas/ticket-system')

/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 */
module.exports = async (interaction) => {

    if(interaction.customId === 'editTicketEmbedModal'){
        const a = interaction.fields.getTextInputValue('title')
        const b = interaction.fields.getTextInputValue('description')
        const c = interaction.fields.getTextInputValue('color')

        const ticket = await Ticket.findOne({ guildId: interaction.guild.id})
        const editticket = await Ticket.findOneAndUpdate({ guildId: interaction.guild.id})

        if(ticket) {
            editticket.title = a
            editticket.description = b
            editticket.color = c
            editticket.save()
        }else {
            new Ticket({
                guildId: interaction.guild.id,
                title: a,
                description: b,
                color: c,
            }).save()
        }

        const currentDate = new Date();

        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = String(currentDate.getFullYear());

        const formattedDate = `${day}.${month}.${year}`;

        const title = a.replace('{username}', interaction.user.username).replace('{userId}', interaction.user.id).replace('{createdAtDate}', formattedDate)

        const description = b.replace('{username}', interaction.user.username).replace('{userId}', interaction.user.id).replace('{createdAtDate}', formattedDate)

        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const isValidHex = hexRegex.test(c);

        const englishColorRegex = /^(AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGrey|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkSlateGrey|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DimGrey|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Grey|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGrey|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSlateGrey|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|SlateGrey|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)$/;
        var color 
        if (isValidHex) {
            color = c
        } else if (englishColorRegex.test(c)) {
            color = c
        } else {
            color = 'Red'
        }

        interaction.message.edit({
            embeds: [
                new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setColor(color)
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setCustomId('editTicketEmbed')
                    .setEmoji('📝')
                    .setLabel('Edit embed')
                    .setStyle(ButtonStyle.Secondary)
                )
            ]
        })

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`**<:verified:1118650085010587688> Ticket embed updated**`)
                .setColor(Colors.Green)
            ]
        })

    }
}