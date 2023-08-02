const { GuildMember } = require('discord.js')

/**
 * 
 * @param {GuildMember} member
 * @param {String} text
 */

class Convert {
    async canvasTags(text, member) {

        text = await text.replace('{user.username}', member.user.username);
        text = await text.replace('{membercount}', member.guild.memberCount);
        
        return text;
    }
    async messageTags(text, member) {

        text = await text.replace('{user.username}', member.user.username);
        text = await text.replace('{user.ping}', `<@${member.user.id}>`);
        text = await text.replace('{membercount}', member.guild.memberCount);
        text = await text.replace('{channel.rules}', `<#${member.guild.rulesChannelId}>`);
        
        return text;
    }
}

module.exports = Convert;