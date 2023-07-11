const {ContextMenuCommandBuilder, ApplicationCommandType, REST, Routes} = require('discord.js')
require('dotenv').config()

module.exports = async () => {

    console.log('eka');
    
    const commandsData = [
        new ContextMenuCommandBuilder()
        .setName('User informations')
        .setType(ApplicationCommandType.User)
    ]

    const rest = new REST().setToken(process.env.TOKEN)

    try {
        await rest.put(
            Routes.applicationCommands('1118239179600568440'),
            { body: commandsData}
        )

        console.log('Applications loaded')
    } catch (error) {
        console.error(error)
    }
}