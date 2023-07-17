const {ContextMenuCommandBuilder, ApplicationCommandType, REST, Routes} = require('discord.js')
require('dotenv').config()

const commandsData = [
    new ContextMenuCommandBuilder()
    .setName('User informations')
    .setType(ApplicationCommandType.User),
    new ContextMenuCommandBuilder()
    .setName('Warn')
    .setType(ApplicationCommandType.User),
    new ContextMenuCommandBuilder()
    .setName('Mute')
    .setType(ApplicationCommandType.User),
    new ContextMenuCommandBuilder()
    .setName('Kick')
    .setType(ApplicationCommandType.User),
    new ContextMenuCommandBuilder()
    .setName('Ban')
    .setType(ApplicationCommandType.User),
]

const rest = new REST().setToken(process.env.TOKEN)

try {
    rest.put(
        Routes.applicationCommands('1118239179600568440'),
        { body: commandsData}
    )

    console.log('Applications loaded')
} catch (error) {
    console.error(error)
}
