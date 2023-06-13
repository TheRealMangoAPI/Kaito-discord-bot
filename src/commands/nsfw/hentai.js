const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const akaneko = require('akaneko')

module.exports = {
    description: "Sends cool hanime pictures",

    type: 'SLASH',
    testOnly: true,
    guildOnly: false,
    ownerOnly: false,
    deferReply: true,

    options: 
    [
        {
            name: 'type',
            description: 'The type of image you want',
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true,
        }
    ],


    autocomplete: (command, argument, instance) => {
        return ['hentai', 'ass', 'blowjob', 'maid', 'lewdneko', 'pussy', 'school', 'thighs', 'uniform']
    },
    
    callback: async ({ client, interaction, args, channel, member }) => {
        errorResponse = 'An error occured'
        if (channel.nsfw === false) {
            errorResponse = 'No NSFW channel'
        } 
        else if (args[0] === 'lewdneko') {
            apiResponse = await new akaneko.lewdNeko()
        } 
        else if (args[0] === 'hentai') {
            apiResponse = await new akaneko.nsfw.hentai()
        }
        else if (args[0] === 'ass') {
            apiResponse = await new akaneko.nsfw.ass()
        }
        else if (args[0] === 'blowjob') {
            apiResponse = await new akaneko.nsfw.blowjob()
        }
        else if (args[0] === 'maid') {
            apiResponse = await new akaneko.nsfw.maid()
        }
        else if (args[0] === 'pussy') {
            apiResponse = await new akaneko.nsfw.pussy()
        }
        else if (args[0] === 'school') {
            apiResponse = await new akaneko.nsfw.school()
        }
        else if (args[0] === 'thighs') {
            apiResponse = await new akaneko.nsfw.thighs()
        }
        else if (args[0] === 'uniform') {
            apiResponse = await new akaneko.nsfw.uniform()
        }
        
        
        if (typeof apiResponse === 'undefined') {
            embed = new EmbedBuilder().setDescription(errorResponse).setColor('#ff0033')
            delete errorResponse
        }
        else 
            embed = new EmbedBuilder().setImage(apiResponse).setFooter({ text: `Images by Akaneko API` })
            delete apiResponse
        return {
            embeds: [embed]
        }
    }
}