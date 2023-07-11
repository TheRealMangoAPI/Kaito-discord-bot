const { EmbedBuilder, Colors, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    description: 'Unmute a user',

    type: 'SLASH',
    testOnly: true,
    guildOnly: true,
    ownerOnly: false,
    permissions: [PermissionFlagsBits.MuteMembers],
    options: [
        {
            name: 'user',
            description: 'The user you want to mute.',
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],

    callback: async ({interaction, args}) => {

        const userId = args[0]
        const user = await interaction.guild.members.fetch(userId)

        if(user.communicationDisabledUntilTimestamp === null){
            return {
                embeds: [
                new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription(`<:failed:1118270103126016041> You can't unmute someone who isn't muted!`)
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
                    .setDescription('<:failed:1118270103126016041> You can\'t unmute that user, he has the same/higher role than you.')
                ]
            }
        }
    
        if (targetUserRolePosition >= botRolePosition) {
            return {
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> I can\'t unmute that user because they have the same/higher role than me.')
                ]
            }
        }

        user.timeout(null)
        const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setDescription(`<:success:1118270320000893029> The user <@${user.id}> was unmuted.`)

        return {
            embeds: [embed]
        }

    }
}