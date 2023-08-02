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
        text = await text.replace('{membercount}', `${member.guild.memberCount}`);
        text = await text.replace('{guild.name}', `${member.guild.name}`);

        if(isCommunity(member.guild)) {
            text = await text.replace('{channel.rules}', `<#${member.guild.rulesChannelId}>`);
            text = await text.replace('{channel.community-update}', `<#${member.guild.publicUpdatesChannelId}>`);
        }
        
        return text;
    }
}

function isCommunity(guild) {

    return guild.features?.includes('COMMUNITY');

}
module.exports = Convert;