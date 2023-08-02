const { GuildMember, AttachmentBuilder, EmbedBuilder } = require('discord.js')
const Messages = require('../../schemas/join-leave-messages')
const Converter = require('../../util/convert')
const converter = new Converter()

/**
 *
 * @param {GuildMember} member
 */
module.exports = async (member) => {
    const message = await Messages.findOne({ guildId: member.guild.id})

    if(!message.joinMessageChannel || !message.joinMessage) return

    const channel = await member.guild.channels.fetch(message.joinMessageChannel)

    if(message.joinMessageType === 'text') {

        channel.send(`\*\*${await converter.messageTags(message.joinTitle, member)}\*\*\n${await converter.messageTags(message.joinDesciption, member)}`)

        if(!message.joinCanvas) return

        sendCanvas(channel, member, message)
    }

    if(message.joinMessageType === 'embed') {

        channel.send({ embeds: [
            new EmbedBuilder()
            .setColor(message.joinEmbedColor)
            .setTitle(await converter.messageTags(message.joinTitle, member))
            .setDescription(await converter.messageTags(message.joinDesciption, member))
        ]})
        
        if(!message.joinCanvas) return

        sendCanvas(channel, member, message)
    }

    if(message.joinMessageType === 'canvas') {

        if(!message.joinCanvas) return

        sendCanvas(channel, member, message)
    }

    async function sendCanvas(channel, member, message) {
        const Convert = require('../../util/convert')
        const converter = new Convert()

        const text = await converter.canvasTags(message.joinCanvasText, member)

        const { createCanvas, loadImage } = require('canvas')

        const canvas = createCanvas(700, 250)
        const ctx = canvas.getContext('2d')

        const background = await loadImage('https://cdn.discordapp.com/attachments/1118938640802918500/1135199144143769620/Design_ohne_Titel_2.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffffff'
        ctx.font = '40px Sans'
        ctx.textAlign = 'center'
        ctx.fillText(`${text}`, 350, 135)
        
        const attachment = new AttachmentBuilder(canvas.toBuffer(), 'willkommen.png');
        channel.send({ files: [attachment]});
    }
}