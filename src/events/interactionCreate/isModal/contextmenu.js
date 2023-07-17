const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js')
const User = require('../../../schemas/warnSchema')

/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 */
module.exports = async (interaction) => {

    if(interaction.customId === 'contextwarn') {

        const userId = interaction.fields.getTextInputValue('user')
        const reason = interaction.fields.getTextInputValue('reason') === "" ? "no reason provided" : interaction.fields.getTextInputValue('reason');
        let user
        try {
            user = await interaction.guild.members.fetch(userId);
        }
        catch(e){
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription(`<:failed:1118270103126016041> **\`${userId}\` is not valid.**`)
                ]
            })
        
        }
            
        

        if (userId === interaction.guild.ownerId) {
            interaction.reply({
                embeds: [
                new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **You can\'t warn the owner.**'),
                ],
            }) 
        }

        const targetUserRolePosition = user.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            interaction.reply({
                embeds: [
                new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **You can\'t warn that user, he has the same/higher role than you.**'),
                ],
            }) 
        }

        if (targetUserRolePosition >= botRolePosition) {
            interaction.reply({
                embeds: [
                new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **I can\'t warn that user because they have the same/higher role than me.**'),
                ],
            }) 
        }

        User.findOne({ guildId: interaction.guild.id, userId: userId })
        .then(async (user) => {
            if (!user) {

                const newUser = new User({
                guildId: interaction.guild.id,
                userId: userId,
                warns: 1,
                });
        
                await newUser.save();

            } else {
                
                user.warns += 1;
                await user.save();
            }
        })
        .catch((error) => {
          console.error('Fehler beim Überprüfen des Benutzers:', error);
        });


        const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setDescription(`<:verified:1118650085010587688> **The user <@${userId}> has been warned**\n\n> **Warns:** \`${await getWarns(interaction.guild.id, userId)}\`\n> **Reason:** \`${reason}\``);

        interaction.reply({
            embeds: [embed]
        })

        async function getWarns(guildId, userId) {
            try {
              const warnedUser = await User.findOne({ guildId: guildId, userId: userId });
              if (warnedUser) {
                return warnedUser.warns +1
              }
              return 1
            } catch (error) {
              console.error('Fehler beim Überprüfen des Benutzers:', error);
              return '404'
            }
        }
    }

    if(interaction.customId === 'contextmute') {
        const userId = interaction.fields.getTextInputValue('user')
        const time = interaction.fields.getTextInputValue('time') 
        const isNumeric = !isNaN(time);
        if(!isNumeric) return interaction.reply({ embeds: [
            new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription(`<:failed:1118270103126016041> **Time must be a number**`)
        ]})
        const reason = interaction.fields.getTextInputValue('reason') === "" ? "no reason provided" : interaction.fields.getTextInputValue('reason');
        let user
        try {
            user = await interaction.guild.members.fetch(userId);
        }
        catch(e){
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription(`<:failed:1118270103126016041> **\`${userId}\` is not valid.**`)
                ]
            })
        
        }

        if (userId === interaction.guild.ownerId) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **You can\'t mute the owner.**')
                ]
            }) 
        } 

    
        const targetUserRolePosition = user.roles.highest.position
        const requestUserRolePosition = interaction.member.roles.highest.position
        const botRolePosition = interaction.guild.members.me.roles.highest.position
    
        if (targetUserRolePosition >= requestUserRolePosition) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **You can\'t mute that user, he has the same/higher role than you.**')
                ]
            }) 
        }
    
        if (targetUserRolePosition >= botRolePosition) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **I can\'t mute that user because they have the same/higher role than me.**')
                ]
            }) 
        }

        try {
            await user.timeout(time * 60 * 1000, `${reason}`)

            const embed = new EmbedBuilder()
            .setColor(Colors.Green)
            .setDescription(`
            <:verified:1118650085010587688> **The user <@${user.id}> has been muted**\n\n > **Duration:** \`${time} minute/s\`\n> **Reason:** \`${reason}\``)

            interaction.reply({
                embeds: [embed]
            }) 

        } catch (error) {

            console.log(`There was an error while muting: ${error}`);

        }
    }

    if(interaction.customId === 'contextkick') {
        const userId = interaction.fields.getTextInputValue('user')
        const reason = interaction.fields.getTextInputValue('reason') === "" ? "no reason provided" : interaction.fields.getTextInputValue('reason');
        let user
        try {
            user = await interaction.guild.members.fetch(userId);
        }
        catch(e){
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription(`<:failed:1118270103126016041> **\`${userId}\` is not valid.**`)
                ]
            })
        
        }

        if (userId === interaction.guild.ownerId) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **You can\'t kick the owner.**')
                ]
            }) 
        } 

    
        const targetUserRolePosition = user.roles.highest.position
        const requestUserRolePosition = interaction.member.roles.highest.position
        const botRolePosition = interaction.guild.members.me.roles.highest.position
    
        if (targetUserRolePosition >= requestUserRolePosition) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **You can\'t kick that user, he has the same/higher role than you.**')
                ]
            }) 
        }
    
        if (targetUserRolePosition >= botRolePosition) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **I can\'t kick that user because they have the same/higher role than me.**')
                ]
            }) 
        }

        try {
            await user.kick(reason)

            const embed = new EmbedBuilder()
            .setColor(Colors.Green)
            .setDescription(`<:verified:1118650085010587688> **The user <@${user.id}> has been kicked**\n\n> **Reason:** \`${reason}\``)

            interaction.reply({
                embeds: [embed]
            }) 

        } catch (error) {

            console.log(`There was an error while kicking: ${error}`);

        }
    }
    if(interaction.customId === 'contextban') {
        const userId = interaction.fields.getTextInputValue('user')
        const reason = interaction.fields.getTextInputValue('reason') === "" ? "no reason provided" : interaction.fields.getTextInputValue('reason');
        let user
        try {
            user = await interaction.guild.members.fetch(userId);
        }
        catch(e){
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription(`<:failed:1118270103126016041> **\`${userId}\` is not valid.**`)
                ]
            })
        
        }

        if (userId === interaction.guild.ownerId) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **You can\'t ban the owner.**')
                ]
            }) 
        } 

    
        const targetUserRolePosition = user.roles.highest.position
        const requestUserRolePosition = interaction.member.roles.highest.position
        const botRolePosition = interaction.guild.members.me.roles.highest.position
    
        if (targetUserRolePosition >= requestUserRolePosition) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **You can\'t ban that user, he has the same/higher role than you.**')
                ]
            }) 
        }
    
        if (targetUserRolePosition >= botRolePosition) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **I can\'t ban that user because they have the same/higher role than me.**')
                ]
            }) 
        }

        try {
            await user.ban({days: 1, reason: reason})

            const embed = new EmbedBuilder()
            .setColor(Colors.Green)
            .setDescription(`<:verified:1118650085010587688> **The user <@${user.id}> has been banned**\n\n> **Reason:** \`${reason}\``)

            interaction.reply({
                embeds: [embed]
            }) 

        } catch (error) {

            console.log(`There was an error while kicking: ${error}`);

        }
    }
}
