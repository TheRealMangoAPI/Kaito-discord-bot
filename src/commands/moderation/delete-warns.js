const { EmbedBuilder, ApplicationCommandOptionType, Colors, PermissionFlagsBits } = require('discord.js');
const User = require('../../schemas/warnSchema')

module.exports = {
    description: 'Delete the warns from a user',

    type: 'SLASH',
    testOnly: true,
    guildOnly: true,
    ownerOnly: false,
    permissions: [PermissionFlagsBits.ManageMessages],
    options: [
        {
            name: 'user',
            description: 'The user you want to warn.',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'number',
            description: 'The number of warns you want to delete from the user',
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ],
    callback: async ({ interaction, args }) => {

        const userId = args[0]
        const num = args[1]
        const user = await interaction.guild.members.fetch(userId)

        if (userId === interaction.guild.ownerId) {
        return {
            embeds: [
            new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription('<:failed:1118270103126016041> **You can\'t delete the warn from the owner.**'),
            ],
        };
        }

        const targetUserRolePosition = user.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
        return {
            embeds: [
            new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription('<:failed:1118270103126016041> **You can\'t delete the warn from that user, he has the same/higher role than you.**'),
            ],
        };
        }

        if (targetUserRolePosition >= botRolePosition) {
        return {
            embeds: [
            new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription('<:failed:1118270103126016041> **I can\'t delete the warn from that user because they have the same/higher role than me.**'),
            ],
        };
        }

        let embed = new EmbedBuilder();

        await User.findOne({ guildId: interaction.guild.id, userId: userId })
        .then(async (user) => {
            if (!user) {
                embed.setDescription('<:failed:1118270103126016041> **This user doesnt have any warns.**')
                embed.setColor(Colors.Red)
            } else {
                if((user.warns - num) <= 0){

                    user.warns = 0
                    await user.save()
                    
                    const WarnedUser = await User.findOne({ guildId: interaction.guild.id, userId: userId })
                    embed.setColor(Colors.Green)
                    embed.setDescription(`<:verified:1118650085010587688> **Warns were withdrawn from the user <@${userId}>**\n\n> **Deleted warns:** \`${num}\`\n> **Current warns:** \`${WarnedUser.warns}\``)

                    await User.deleteOne({ guildId: interaction.guild.id, userId: userId })

                }else {

                    user.warns -= num
                    await user.save()

                    const WarnedUser = await User.findOne({ guildId: interaction.guild.id, userId: userId })
                    embed.setColor(Colors.Green)
                    embed.setDescription(`<:verified:1118650085010587688> **Warns were withdrawn from the user <@${userId}>**\n\n> **Deleted warns:** \`${num}\`\n> **Current warns:** \`${WarnedUser.warns}\``)
                }
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
