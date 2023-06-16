const { EmbedBuilder, ApplicationCommandOptionType, Client, Interaction, Colors, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js')

module.exports = {
    description: 'list',

    type: 'SLASH',
    testOnly: true,
    guildOnly: false,
    ownerOnly: false,
    options: [
        {
            name: 'type',
            description: 'Lists commands or features',
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true,
        },
    ],
    autocomplete: () => {
        return ['commands', 'features']
    },
    callback: ({interaction, args}) => {
        
        if(args[0] === 'commands') {
            return {
                embeds: [
                    new EmbedBuilder()
                    .setTitle('<:slash_command:1118577403434893352> Moderation')
                    .setDescription('\`\`\`Selcet your command category bellow the message\`\`\`')
                    .addFields(
                        { name: '\u200B', value: ' ' },
                        { name: '`/ban`', value: 'Bans a user from the guild', inline: true},
                        { name: '`/unban`', value: 'Unbans a user from the guild', inline: true},
                        { name: '\u200B', value: ' ' },
                        { name: '`/mute`', value: 'Mute a user', inline: true},
                        { name: '`/unmute`', value: 'Unmute a user', inline: true},
                        { name: '\u200B', value: ' ' },
                        { name: '`/kick`', value: 'Kick a user from the guild', inline: true},
                        { name: '`/clear`', value: 'Clear messages in a channel', inline: true},
                    )
                    .setColor('#40E0D0')
                ],
                components: [
                    new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                        .setCustomId('help-commands')
                        .setPlaceholder('Select Command Category')
                        .setOptions(
                            new StringSelectMenuOptionBuilder()
                            .setValue('moderation')
                            .setLabel('Moderation')
                            .setEmoji('⚙'),
                            new StringSelectMenuOptionBuilder()
                            .setValue('general')
                            .setLabel('General')
                            .setEmoji('🧩'),
                            new StringSelectMenuOptionBuilder()
                            .setValue('giveaway')
                            .setLabel('Giveaway')
                            .setEmoji('🎉')
                        )
                    )
                ]
            }
        }
        if(args[0] === 'features') {
            return {
                content: 'soon...'
            }
        }
    }
}