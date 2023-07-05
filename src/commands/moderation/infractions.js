const { EmbedBuilder, ApplicationCommandOptionType, Colors } = require('discord.js');
const User = require('../../schemas/warnSchema')

module.exports = {
    description: 'Shows the warns from a user',

    type: 'SLASH',
    testOnly: true,
    guildOnly: false,
    ownerOnly: false,
    permissions: [PermissionFlagsBits.ManageMessages],
    options: [
        {
            name: 'user',
            description: 'The user you want to warn.',
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    callback: async ({ interaction, args }) => {

        const userId = args[0]

        let embed = new EmbedBuilder();

        await User.findOne({ guildId: interaction.guild.id, userId: userId })
        .then(async (user) => {
            if (!user) {
                embed.setDescription('<:failed:1118270103126016041> **This user doesnt have any warns.**')
                embed.setColor(Colors.Red)
            } else {

                const WarnedUser = await User.findOne({ guildId: interaction.guild.id, userId: userId })
                embed.setColor(Colors.Green)
                embed.setDescription(`<:verified:1118650085010587688> **The warns of <@${userId}>\n\n> Warns: \`${WarnedUser.warns}\`**`)

            }

        })
        .catch((error) => {
            console.error('Fehler beim Überprüfen des Benutzers:', error);
        });

        return {
            embeds: [embed]
        }
        
    }
};
