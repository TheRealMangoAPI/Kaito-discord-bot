const axios = require('axios')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ActionRow } = require('discord.js')
const api = require('../util/api')
const buttonRoleSchema = require('../schemas/button-role.schema')

const prefix = 'button-roles-'

module.exports = async (_, client) => {
  buttonRoleSchema.watch().on('change', async (data) => {
    const { _id } = data.documentKey
    const document = await buttonRoleSchema.findById(_id)
    console.log(document);

    const { channelId, text, hexColor, buttons, messageId } = document
    const channel = await client.channels.fetch(channelId)

    const embed = new EmbedBuilder().setColor(hexColor).setDescription(text)

    const components = [] 
    let row = new ActionRowBuilder()

    for (let a = 0; a < buttons.length && a < 25; ++a) {
      if (a > 0 && a % 5 === 0) {
        components.push(row)
        row = new ActionRowBuilder()
      }

      const { roleId, buttonText, buttonStyle, buttonEmoji } = buttons[a]

      row.addComponents(new ButtonBuilder()
        .setCustomId(`${prefix}${roleId}`)
        .setLabel(buttonText)
        .setStyle(buttonStyle)
        .setEmoji(buttonEmoji)
      )
    }

    if (row.components.length > 0) {
      components.push(row)
    }

    if (messageId) {
      try {
        const message = await channel.messages.fetch(messageId)
        message.edit({
          embeds: [embed],
          components,
        })

      return
      } catch (ignored) {}
    }

    const message = await channel.send({
      embeds: [embed],
      components,
    })

    await buttonRoleSchema.updateOne({ _id }, { messageId: message.id })
  })
}

module.exports.prefix = prefix