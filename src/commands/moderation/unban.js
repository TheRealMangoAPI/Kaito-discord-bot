const { EmbedBuilder, ApplicationCommandOptionType, Client, Interaction, Colors, PermissionFlagsBits } = require('discord.js')

module.exports = {
    description: 'Unban a user',

    type: 'SLASH',
    testOnly: true,
    guildOnly: false,
    ownerOnly: false,
    permissions: [PermissionFlagsBits.BanMembers],
    options: [
        {
            name: 'userid',
            description: 'The user id from the user that you want to unban.',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],

    callback: async ({interaction, args}) => {

        try{
            const userId = args[0]
            const user = await interaction.guild.fetchBan(userId);

            await interaction.guild.members.unban(user)

            const embed = new EmbedBuilder()
            .setColor(Colors.Green)
            .setDescription(`<:verified:1118650085010587688> **The user <@${user.id}> has been unbanned.**`)

            return {
                embeds: [embed]
            }
        }
        catch(e) {
            return {
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **You can\'t unban a user thats not banned!**')
                ]
            }
        }

    }
}