const { ChatInputCommandInteraction, InteractionResponse, EmbedBuilder, Colors, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const Messages = require('../../../schemas/join-leave-messages')

/**
 *
 * @param {ChatInputCommandInteraction} interaction
 */
module.exports = async (interaction) => {
    function firstItemToString(arr) {
      return arr[0].toString();
    }

    if(interaction.customId === 'setchannel-join-message') {
        await Messages.findOneAndUpdate({ guildId: interaction.guild.id}).then(async (db) => {
            db.joinMessageChannel = interaction.values.toString()
            db.save()
        })

        interaction.reply({ embeds: [
            new EmbedBuilder()
            .setDescription(`**<:verified:1118650085010587688> Join message channel updated.**`)
            .setColor(Colors.Green)
        ]})
    }
    if(interaction.customId === 'join-message-settings') {
        const values = interaction.values

        if(values.includes('edit-join-message-text')) {
            const messages = await Messages.findOneAndUpdate({ guildId: interaction.guild.id})

            const title = messages.joinTitle
            const description = messages.joinDesciption

            const modal = new ModalBuilder()
            .setCustomId('edit-join-message-text-modal')
            .setTitle('Edit join message text')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                    .setCustomId('title')
                    .setLabel('title')
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short)
                    .setValue(title)
                    .setMinLength(1)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                    .setCustomId('description')
                    .setLabel('description')
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph)
                    .setValue(description)
                    .setMinLength(1)
                )
            )
            
            interaction.showModal(modal)
        }
        if(values.includes('edit-join-message-type')) {

            const messages = await Messages.findOne({ guildId: interaction.guild.id})

            const option1 = new StringSelectMenuOptionBuilder()
            .setLabel('Embed')
            .setEmoji('📄')
            .setValue('embed')

            const option2 = new StringSelectMenuOptionBuilder()
            .setLabel('Text')
            .setEmoji('✏')
            .setValue('text')

            const option3 = new StringSelectMenuOptionBuilder()
            .setLabel('Canvas Only')
            .setEmoji('🖼')
            .setValue('canvas')

            switch(messages.joinMessageType) {
                case 'embed': {
                    option1.setDefault(true)
                    break
                }
                case 'text': { 
                    option2.setDefault(true)
                    break
                }
                case 'canvas': {
                    option3.setDefault(true)
                    break
                }
            }

            interaction.reply({ components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId('edit-join-message-type-select')
                    .setOptions(option1, option2, option3)
                )
            ], ephemeral: true})
        }
        if(values.includes('edit-join-message-embed-color')) {
            
            const messages = await Messages.findOne({ guildId: interaction.guild.id})
            const color = messages.joinEmbedColor

            const modal = new ModalBuilder()
            .setCustomId('edit-join-message-embed-color-modal')
            .setTitle('Edit embed color')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                    .setCustomId('color')
                    .setLabel('Hex code')
                    .setRequired(true)
                    .setValue(`${color}`)
                    .setStyle(TextInputStyle.Short)
                )
            )

            interaction.showModal(modal)
        }
        if(values.includes('edit-join-canvas')) {

            const messages = await Messages.findOneAndUpdate({ guildId: interaction.guild.id})

            if(!messages || messages.joinCanvas === false)
            interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription('The join canvas is disabled you can enable it with a click on the \`enable\` button bellow this message.')
            ],
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('enable-join-canvas')
                    .setLabel('Enable')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('<:verified:1118650085010587688>')
                )
            ]})
            else {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor('#40E0D0')
                        .setTitle('⚙ Join cavas setup')
                        .setDescription('The canvas will send every time if someone join the guild, more canvas settings come soon\n\n**Valid tags:**\n\n> `{user.username}` | The username of the user\n> `{membercount}` | The member count of the guild')
                    ],
                    components: [
                        new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setCustomId('disable-join-message')
                            .setLabel('Disable')
                            .setStyle(ButtonStyle.Danger),
                            new ButtonBuilder()
                            .setCustomId('send-join-message-canvas')
                            .setLabel('Show Canvas')
                            .setStyle(ButtonStyle.Success),
                            new ButtonBuilder()
                            .setCustomId('edit-join-message-canvas-text')
                            .setLabel('Edit')
                            .setStyle(ButtonStyle.Secondary)
                        )
                    ]
                })
            }
            
        }
    }
    if(interaction.customId === 'edit-join-message-type-select') {
        const values = interaction.values

        const messages = await Messages.findOneAndUpdate({ guildId: interaction.guild.id})

        if(values.includes('embed')) {
            messages.joinMessageType = 'embed'
        }
        if(values.includes('text')) {
            messages.joinMessageType = 'text'
        }
        if(values.includes('canvas')) {
            messages.joinMessageType = 'canvas'
        }
        messages.save()

        interaction.reply({ embeds: [
            new EmbedBuilder()
            .setDescription(`**<:verified:1118650085010587688> Join message type updated.**`)
            .setColor(Colors.Green)
        ]})
    }
}