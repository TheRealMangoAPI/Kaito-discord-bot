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
            name: 'reason',
            description: 'The reason you want to mute.',
            type: ApplicationCommandOptionType.String,
        },
    ],

    callback: async ({interaction, args}) => {

        const userId = args[0]
        const reason = args[1] !== undefined ? args[1] : 'No reason provided';
        const user = await interaction.guild.members.fetch(userId);

        if (userId === interaction.guild.ownerId) {
            return {
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> You can\'t kick the owner.')
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
                    .setDescription('<:failed:1118270103126016041> You can\'t kick that user, he has the same/higher role than you.')
                ]
            }
        }
    
        if (targetUserRolePosition >= botRolePosition) {
            return {
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> I can\'t kick that user because they have the same/higher role than me.')
                ]
            }
        }

        try {
            await user.kick(reason)

            const embed = new EmbedBuilder()
            .setColor(Colors.Green)
            .setDescription(`<:verified:1118650085010587688> **The user <@${user.id}> has been kicked\n\n> **Reason:** \`${reason}\`**`)

            return {
                embeds: [embed]
            }

        } catch (error) {

            console.log(`There was an error while kicking: ${error}`);

        }

    }
}