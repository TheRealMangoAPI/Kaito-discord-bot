const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Colors } = require('discord.js');
const User = require('../schemas/giveawaySchema')

class Giveaway {
    constructor(client) {
        this.client = client
    }
    async Start(channel, options) {
        const { time, winners, prize} = options

        const currentDate = new Date();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const formattedTime = `${hours}:${minutes}:${seconds}`;

        const embed = new EmbedBuilder()
        .setTitle('🎉 Giveaway 🎉')
        .setDescription(`To win: \`${prize}\`\nTime remaining: <t:${Math.round((Date.now() + ( time * 1000 * 60)) / 1000)}:R>`)
        .setFooter({ text: `${winners} winner(s) | Start: ${formattedTime}`})
        .setColor('#ff0000')

        const button = new ButtonBuilder()
        .setCustomId('join')
        .setLabel('participate')
        .setStyle(ButtonStyle.Success)
        .setEmoji('🎉')

        const row = new ActionRowBuilder()
        .addComponents(button)

        const message = await channel.send({ embeds: [embed], components: [row]})

        const newConfig = new User({
            messageId: message.id,
            winners: winners,
            prize: prize,
            teilnehmer: []
        })

        newConfig.save()
        .then(() => {})
        .catch((e) => {
            message.edit('An error has occurred', e)
        })

        setTimeout(async () => {
            channel.messages.fetch(message.id)
            .then(async () => {
                const config = await User.findOne({ messageId: message.id})
                if(config.teilnehmer.length === 0){
                    return message.edit({ embeds: [
                    new EmbedBuilder()
                    .setTitle('Giveaway ends')
                    .setDescription('No one participated')
                    ], components: []});
                } 

                if(winners > 1){

                    let winnersCount = Math.min(winners, config.teilnehmer.length);
                    let winnersArray = [];

                    for (let i = 0; i < winnersCount; i++) {
                        let a = config.teilnehmer.length;
                        let random = Math.floor(Math.random() * a);
                        let teilnehmer = config.teilnehmer
                        let winner = teilnehmer[random];

                        winnersArray.push(winner);
                        config.teilnehmer.splice(random, 1)
                        config.save()
                    }

                    message.edit({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle('🎉 Giveaway ends 🎉')
                        .setDescription(`**${getWinners(winnersArray)} have won!**\n**Prize: \`${prize}\`**`)
                    ],
                    components: []
                    });

                    function getWinners(array) {
                        if (array.length === 1) return `<@${array[0]}>`;

                        let winnersString = '';
                        array.forEach((winner) => {
                            winnersString += ` <@${winner}> `;
                        });
                        return winnersString;
                    }


                }else {

                    let a = config.teilnehmer.length;
                    let random = Math.floor(Math.random() * a)
                    let teilnehmer = config.teilnehmer
                    let winner = teilnehmer[random]

                    message.edit({ embeds: [
                    new EmbedBuilder()
                    .setTitle('🎉 Giveaway ends 🎉')
                    .setDescription(`**<@${winner}> has won!**\n**Prize: \`${prize}\`**`)
                    ], components: []})


                } 

                setTimeout(async() => {
                    await User.deleteOne({ messageId: message.id })
                }, 86400000);
            })
            .catch(async () => {
                await User.deleteOne({ messageId: message.id })
                return
            })
                   
        }, time * 60 * 1000)
    }
    async End(channel, messageId, interaction) {

        channel.messages.fetch(messageId)
        .then(async (message) => {
            const config = await User.findOne({ messageId: message.id})
            const winners = config.winners
            const prize = config.prize

            if(config.teilnehmer.length === 0){
                message.edit({ embeds: [
                new EmbedBuilder()
                .setTitle('Giveaway ends')
                .setDescription('No one participated')
                ], components: []});
            }else {

                if(winners > 1){

                    let winnersCount = Math.min(winners, config.teilnehmer.length);
                    let winnersArray = [];
    
                    for (let i = 0; i < winnersCount; i++) {
                        let config = await User.findOne({ messageId: message.id})
                        let a = config.teilnehmer.length;
                        let random = Math.floor(Math.random() * a);
                        let teilnehmer = config.teilnehmer
                        let winner = teilnehmer[random];
    
                        winnersArray.push(winner);
                        config.teilnehmer.splice(random, 1)
                        config.save()
                    }
    
                    message.edit({
                        embeds: [
                            new EmbedBuilder()
                            .setTitle('🎉 Giveaway ends 🎉')
                            .setDescription(`**${getWinners(winnersArray)} have won!**\n**Prize: \`${prize}\`**`)
                        ],
                        components: []
                    });
    
                    function getWinners(array) {
                        if (array.length === 1) return `<@${array[0]}>`;
    
                        let winnersString = '';
                        array.forEach((winner) => {
                            winnersString += ` <@${winner}> `;
                        });
                        return winnersString;
                    }
    
    
                }else {
    
                    let a = config.teilnehmer.length;
                    let random = Math.floor(Math.random() * a)
                    let teilnehmer = config.teilnehmer
                    let winner = teilnehmer[random]
    
                    message.edit({ embeds: [
                    new EmbedBuilder()
                    .setTitle('🎉 Giveaway ends 🎉')
                    .setDescription(`**<@${winner}> has won!**\n**Prize: \`${prize}\`**`)
                    ], components: []})  
                  
                } 
            }
            
            await interaction.reply({ embeds: [
                new EmbedBuilder()
                .setColor(Colors.Green)
                .setDescription('<:verified:1118650085010587688> **Giveaway successfull ended**')
            ]})

            setTimeout(async() => {
                await User.deleteOne({ messageId: message.id })
            }, 86400000);
        })
        .catch((e) => {
            interaction.reply({ embeds: [
                new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription('<:failed:1118270103126016041> **I can\'t find a giveaway please check the channel or the message id!**')
            ]})
        })
    }
    async Delete(channel, messageId, interaction) {
        channel.messages.fetch(messageId)
        .then(async (message) => {

            User.findOne({ messageId: message.id})
            .then(async (user) => {

                if(!user) return interaction.reply({ embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription('<:failed:1118270103126016041> **I can\'t find a giveaway please check the channel or the message id!**')
                ]})

                await User.deleteOne({ messageId: message.id })

                message.delete()
    
                await interaction.reply({ embeds: [
                    new EmbedBuilder()
                    .setColor(Colors.Green)
                    .setDescription('<:verified:1118650085010587688> **Giveaway successfull deleted**')
                ]})
            })

            
        })
        .catch((e) => {
            interaction.reply({ embeds: [
                new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription('<:failed:1118270103126016041> **I can\'t find a giveaway please check the channel or the message id!**')
            ]})
        })
    }
    async Reroll(channel, messageId, interaction) {

        channel.messages.fetch(messageId)
        .then(async (message) => {
            const config = await User.findOne({ messageId: message.id})
            const winners = config.winners
            const prize = config.prize

            if(!config) return interaction.reply('<:failed:1118270103126016041> **I can\'t find a giveaway please check the channel or the message id!**')

            if(config.teilnehmer.length === 0){
                message.edit({ embeds: [
                new EmbedBuilder()
                .setTitle('Giveaway ends')
                .setDescription('No one participated')
                ], components: []});
            }else {

                if(winners > 1){

                    let winnersCount = Math.min(winners, config.teilnehmer.length);
                    let winnersArray = [];
    
                    for (let i = 0; i < winnersCount; i++) {
                        let config = await User.findOne({ messageId: message.id})
                        let a = config.teilnehmer.length;
                        let random = Math.floor(Math.random() * a);
                        let teilnehmer = config.teilnehmer
                        let winner = teilnehmer[random];
    
                        winnersArray.push(winner);
                        config.teilnehmer.splice(random, 1)
                        config.save()
                    }
    
                    message.edit({
                        embeds: [
                            new EmbedBuilder()
                            .setTitle('🎉 Giveaway ends 🎉')
                            .setDescription(`**${getWinners(winnersArray)} have won!**\n**Prize: \`${prize}\`**`)
                        ],
                        components: []
                    });
    
                    function getWinners(array) {
                        if (array.length === 1) return `<@${array[0]}>`;
    
                        let winnersString = '';
                        array.forEach((winner) => {
                            winnersString += ` <@${winner}> `;
                        });
                        return winnersString;
                    }
    
    
                }else {
    
                    let a = config.teilnehmer.length;
                    let random = Math.floor(Math.random() * a)
                    let teilnehmer = config.teilnehmer
                    let winner = teilnehmer[random]
    
                    message.edit({ embeds: [
                    new EmbedBuilder()
                    .setTitle('🎉 Giveaway ends 🎉')
                    .setDescription(`**<@${winner}> has won!**\n**Prize: \`${prize}\`**`)
                    ], components: []})  
                  
                } 
            }
            
            await interaction.reply({ embeds: [
                new EmbedBuilder()
                .setColor(Colors.Green)
                .setDescription('<:verified:1118650085010587688> **Giveaway successfull rerolled**')
            ]})
        })
    }
}

module.exports = Giveaway;