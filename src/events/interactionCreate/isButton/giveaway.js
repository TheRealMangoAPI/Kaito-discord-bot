const User = require('../../../schemas/giveawaySchema')

module.exports = async (interaction) => {

        if(interaction.customId === 'join') {
            const message = interaction.message

            User.findOne({ messageId: message.id})
            .then(async (user) => {

                if(user.teilnehmer.includes(interaction.user.id)){

                    interaction.reply({ content: 'You\'re already participating', ephemeral: true})

                }else{
                    
                    user.teilnehmer.push(interaction.user.id)
                    user.save()
                    
                    interaction.reply({ content: 'You have successfully participated', ephemeral: true})
                }
            })
        }
    
}