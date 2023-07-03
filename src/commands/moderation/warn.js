const { EmbedBuilder, ApplicationCommandOptionType, Colors } = require('discord.js');
const User = require('../../schemas/warnSchema')

module.exports = {
    description: 'Warn a user',

    type: 'SLASH',
    testOnly: true,
    guildOnly: false,
    ownerOnly: false,
    options: [
        {
        name: 'user',
        description: 'The user you want to warn.',
        type: ApplicationCommandOptionType.User,
        required: true,
        },
        {
        name: 'reason',
        description: 'The reason for the warn.',
        type: ApplicationCommandOptionType.String,
        },
    ],
    callback: async ({ interaction, args }) => {

        const userId = args[0];
        const reason = args[1] !== undefined ? args[1] : 'No reason provided';
        const user = await interaction.guild.members.fetch(userId);

        if (userId === interaction.guild.ownerId) {
        return {
            embeds: [
            new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription('<:failed:1118270103126016041> **You can\'t warn the owner.**'),
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
                .setDescription('<:failed:1118270103126016041> **You can\'t warn that user, he has the same/higher role than you.**'),
            ],
        };
        }

        if (targetUserRolePosition >= botRolePosition) {
        return {
            embeds: [
            new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription('<:failed:1118270103126016041> **I can\'t warn that user because they have the same/higher role than me.**'),
            ],
        };
        }

        User.findOne({ guildId: interaction.guild.id, userId: userId })
        .then(async (user) => {
            if (!user) {

                const newUser = new User({
                guildId: interaction.guild.id,
                userId: userId,
                warns: 1,
                });
        
                await newUser.save();

            } else {
                
                user.warns += 1;
                await user.save();
            }
        })
        .catch((error) => {
          console.error('Fehler beim Überprüfen des Benutzers:', error);
        });


        const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setDescription(`<:verified:1118650085010587688> **The user <@${userId}> has been warned**\n\n> **Warns:** \`${await getWarns(interaction.guild.id, userId)}\`\n> **Reason:** \`${reason}\``);

        return {
            embeds: [embed]
        }

        async function getWarns(guildId, userId) {
            try {
              const warnedUser = await User.findOne({ guildId: guildId, userId: userId });
              if (warnedUser) {
                return warnedUser.warns +1
              }
              return 1
            } catch (error) {
              console.error('Fehler beim Überprüfen des Benutzers:', error);
              return '404'
            }
          }
    }
};
