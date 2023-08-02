const Messages = require('../../../schemas/join-leave-messages')
const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ChannelSelectMenuBuilder, ButtonBuilder, ChannelType, ButtonStyle, Colors, InteractionResponse, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, AttachmentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 */

module.exports = async (interaction) => {

    if(interaction.customId === 'enable-join-message') {
        await Messages.findOne({ guildId: interaction.guild.id}).then(async (message) => {
            if(!message) await new Messages({ guildId: interaction.guild.id, joinMessage: true}).save()
            else await Messages.findOneAndUpdate({guildId: interaction.guild.id}).then((message) => { message.joinMessage = true; message.save()})
        })
        

        interaction.update({}).then(async () => {
            await interaction.message.edit({
                embeds: [
                    new EmbedBuilder()
                    .setColor('#40E0D0')
                    .setTitle('⚙ Join message setup')
                    .setDescription('Setup the channel to send the join message or edit your join message')
                ],
                components: [
                    new ActionRowBuilder()
                    .addComponents(
                        new ChannelSelectMenuBuilder()
                        .setChannelTypes(ChannelType.GuildText)
                        .setCustomId('setchannel-join-message')
                        .setPlaceholder('Choose your channel to send the join message')
                    ),
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('disable-join-message')
                        .setLabel('Disable')
                        .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                        .setCustomId('edit-join-message')
                        .setLabel('Edit')
                        .setStyle(ButtonStyle.Secondary)
                    )
                ]})
        })
        
    }
    if(interaction.customId === 'enable-join-canvas') {
        await Messages.findOne({ guildId: interaction.guild.id}).then(async (message) => {
            if(!message) await new Messages({ guildId: interaction.guild.id, joinCanvas: true}).save()
            else await Messages.findOneAndUpdate({guildId: interaction.guild.id}).then((message) => { message.joinCanvas = true; message.save()})
        })
        

        interaction.update({}).then(async () => {
            await interaction.message.edit({
                embeds: [
                    new EmbedBuilder()
                    .setColor('#40E0D0')
                    .setTitle('⚙ Join message setup')
                    .setDescription('Setup the channel to send the join message or edit your join message')
                ],
                components: [
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('disable-join-canvas')
                        .setLabel('Disable')
                        .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                        .setCustomId('edit-join-canvas')
                        .setLabel('Edit')
                        .setStyle(ButtonStyle.Secondary)
                    )
                ]})
        })
        
    }
    if(interaction.customId === 'disable-join-message') {
        await Messages.findOne({ guildId: interaction.guild.id}).then(async (message) => {
            if(message) await Messages.findOneAndUpdate({guildId: interaction.guild.id}).then((message) => { message.joinMessage = false; message.save()})
        })
        interaction.message.delete()
    }
    if(interaction.customId === 'disable-join-canvas') {
        await Messages.findOne({ guildId: interaction.guild.id}).then(async (message) => {
            if(message) await Messages.findOneAndUpdate({guildId: interaction.guild.id}).then((message) => { message.joinCanvas = false; message.save()})
        })
        interaction.message.delete()
    }
    if(interaction.customId === 'edit-join-message'){

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor('#40E0D0')
                .setTitle('📝 Choose what you want to edit')
                .setDescription('\n\n**Valid text tags:**\n\n> `{user.username}` | The username of the user\n> `{user.ping}` | Tag the user, can\'t be used in embed titles\n> `{membercount}` | The member count of the guild\n> `{guild.name}` | The name of the guild\n> `<#[channel id]>` | Tag your channel, replace **[channel id]** with the channel id\n\n**Only working on Community guilds**\n\n> `{channel.rules}` | The community rule channel\n> `{channel.community-update}` | The community update channel'),           
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId('join-message-settings')
                    .setPlaceholder('Choose what you want to edit')
                    .setOptions(
                        new StringSelectMenuOptionBuilder()
                        .setLabel('Text')
                        .setEmoji('📝')
                        .setValue('edit-join-message-text'),
                        new StringSelectMenuOptionBuilder()
                        .setLabel('Type')
                        .setEmoji('🗂')
                        .setValue('edit-join-message-type'),
                        new StringSelectMenuOptionBuilder()
                        .setLabel('Embed Color')
                        .setEmoji('🎨')
                        .setValue('edit-join-message-embed-color'),
                        new StringSelectMenuOptionBuilder()
                        .setLabel('Canvas')
                        .setEmoji('🖼')
                        .setValue('edit-join-canvas')
                    )
                )
            ]
        })
    } 
    if(interaction.customId === 'send-join-message-canvas') {
        const message = await Messages.findOne({ guildId: interaction.guild.id})

        const Convert = require('../../../util/convert')
        const converter = new Convert()

        const text = await converter.canvasTags(message.joinCanvasText, interaction.member)

        const { createCanvas, loadImage } = require('canvas')

        const canvas = createCanvas(700, 250)
        const ctx = canvas.getContext('2d')

        const background = await loadImage('https://cdn.discordapp.com/attachments/1118938640802918500/1135199144143769620/Design_ohne_Titel_2.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffffff'
        ctx.font = '40px Sans'
        ctx.textAlign = 'center'
        ctx.fillText(`${text}`, 350, 135)
        
        const attachment = new AttachmentBuilder(canvas.createPNGStream(), 'willkommen.png');
        interaction.reply({ files: [attachment], ephemeral: true });

    }
    if(interaction.customId === 'edit-join-message-canvas-text') {

        const message = await Messages.findOne({ guildId: interaction.guild.id})

        await interaction.showModal(
            new ModalBuilder()
            .setCustomId('edit-join-canvas-text-modal')
            .setTitle('Edit text')
            .setComponents(
                new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                .setCustomId('text')
                .setLabel('Text')
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)
                .setValue(message.joinCanvasText))
                
            )
        )
    }
}