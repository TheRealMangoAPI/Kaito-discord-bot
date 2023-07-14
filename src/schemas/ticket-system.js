const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    guildId: {
        type: String,
        require: true
    },
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: ""
    },
    openertitle: {
        type: String,
        default: ""
    },
    openerdescription: {
        type: String,
        default: ""
    },
    openercolor: {
        type: String,
        default: ""
    },
    team: {
        type: [String],
        default: []
    }
})

schema.index({}, { unique: false });

const Ticket = mongoose.model('ticket-system', schema);

module.exports = Ticket