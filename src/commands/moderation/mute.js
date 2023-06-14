const { EmbedBuilder, ApplicationCommandOptionType, Client, Interaction, Colors } = require('discord.js')

module.exports = {
    description: 'Mute a user',

    type: 'SLASH',
    testOnly: true,
    guildOnly: false,
    ownerOnly: false,
    options: [
        {
            name: 'user',
            description: 'The user you want to mute.',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'time',
            description: 'The mute time in minutes',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason you want to mute.',
            type: ApplicationCommandOptionType.String,
        },
    ],

    callback: async ({interaction, args}) => {

        const userId = args[0]
        const time = args[1]
        const reason = args[2] !== undefined ? args[2] : 'No reason provided';
        const user = await interaction.guild.members.fetch(userId);

        if (userId === interaction.guild.ownerId) {
            return {
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> You can\'t mute the owner.')
                ]
            }
        } 

    
        const targetUserRolePosition = user.roles.highest.position
        const requestUserRolePosition = interaction.member.roles.highest.position
        const botRolePosition = interaction.guild.members.me.roles.highest.position
    
        if (targetUserRolePosition >= requestUserRolePosition) {
            return {
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> You can\'t mute that user, he has the same/higher role than you.')
                ]
            }
        }
    
        if (targetUserRolePosition >= botRolePosition) {
            return {
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> I can\'t mute that user because they have the same/higher role than me.')
                ]
            }
        }

        try {
            await user.timeout(time * 60 * 1000, `${reason}`)

            const embed = new EmbedBuilder()
            .setColor(Colors.Green)
            .setDescription(`<:success:1118270320000893029> The user <@${user.id}> are muted for \`${time} minute/s\`\n **Reason:** \`${reason}\`.`)

            return {
                embeds: [embed]
            }

        } catch (error) {

            console.log(`There was an error when muting: ${error}`);

        }

    }
}