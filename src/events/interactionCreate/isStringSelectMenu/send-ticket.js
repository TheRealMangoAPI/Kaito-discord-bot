const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js')
const Ticket = require('../../../schemas/ticket-system')

/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 */
module.exports = async (interaction) => {

    if(interaction.customId === 'ticketSetup') {
        const ticket = await Ticket.findOne({ guildId: interaction.guild.id})

        let title = `Ticket System`
        let description = 'Open a ticket with the click on the button bellow this message'
        let c = '#40E0D0'

        if(ticket && ticket.openertitle != ""){
            title = ticket.openertitle
            description = ticket.openerdescription
            c = ticket.openercolor
        }

        const currentDate = new Date();

        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = String(currentDate.getFullYear());

        const formattedDate = `${day}.${month}.${year}`;

        title = title.replace('{username}', interaction.user.username).replace('{userId}', interaction.user.id).replace('{createdAtDate}', formattedDate)

        description = description.replace('{username}', interaction.user.username).replace('{userId}', interaction.user.id).replace('{createdAtDate}', formattedDate)

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

        const channel = await interaction.guild.channels.fetch(interaction.values)

        channel.send({ embeds: [
            new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
        ], components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId('openTicket')
                .setLabel('Open Ticket')
                .setStyle(ButtonStyle.Success)
                .setEmoji('🎫')
            )
        ]})

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`**<:verified:1118650085010587688> Ticket opening embed sended**`)
                .setColor(Colors.Green)
            ]
        })
    }
}