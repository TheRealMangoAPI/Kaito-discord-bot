const statusSchema = require('../schemas/statuses.schema')
const { ActivityType } = require('discord.js')

const getSeconds = (duration) => +duration.split(':').reduce((acc, time) => 60 * acc + parseInt(time))

const formatStatus = (status) => {
  status.duration = +getSeconds(status.duration)
  return status
}

module.exports = async (_, client) => {
  let statuses = (await statusSchema.find({})).map((status) => {
    return formatStatus(status._doc)
  })
  let index = 0
  console.log(statuses);

  statusSchema.watch().on('change', async (data) => {
    console.log(data);
    const { operationType } = data

    if (operationType === 'insert') {
      const { fullDocument } = data

      statuses.push(formatStatus(fullDocument))
    } else if (operationType === 'update') {
      const {
        documentKey: { _id },
        updateDescription: { updatedFields }
      } = data

      statuses = statuses.map((status) => {
        if (String(status._id) === String(_id)) {
          status = {
            ...status,
            ...updatedFields
          }
        }

        return status
      })
    } else if (operationType === 'delete') {
      const {
        documentKey: { _id }
      } = data

      statuses = statuses.filter((status) => String(status._id) !== String(_id))
    }

    console.log(statuses);
  })

  const updateStatuses = () => {
    if (statuses.length === 0) {
      client.user.setPresence({
        activities: null
      })

      setTimeout(updateStatuses, 1000 * 10)
      return
    }

    if (index >= statuses.length) {
      index = 0
    }
    const status = statuses[index]

    client.user.setPresence({
      activities: [
        {
          name: status.text,
          type: ActivityType.valueOf()[status.ActivityType]
        }
      ]
    })

    ++index
    setTimeout(updateStatuses, 1000 * status.duration)
  }
  updateStatuses()
}
