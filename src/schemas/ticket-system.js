const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    guildId: {
        type: String,
        require: true
    },
    //channel
    channel: {
        type: String,
        default: ''
    },
    //opener
    openerTitle: {
        type: String,
        default: "Ticket System"
    },
    openerDescription: {
        type: String,
        default: "Open a ticket with a click on the button bellow this message"
    },
    openerColor: {
        type: String,
        default: "#40E0D0"
    },
    openerButtonColor: {
        type: String,
        default: "Green"
    },
    openerButtonText: {
        type: String,
        default: "Open"
    },
    openerButtonEmoji: {
        type: String,
        default: "🎫 Ticket"
    },
    //in Ticket
    team: {
        type: [String],
        default: []
    },
    inTitle: {
        type: String,
        default: 'Hello {user.username}'
    },
    inDescription: {
        type: String,
        default: 'Our team will take care of you right away.\nPlease describe your problem in the meantime!'
    },
    inColor: {
        type: String,
        default: '#40E0D0'
    },
    openMessage: {
        type: String,
        default: 'You have succesfull opend a ticket ${ticket}'
    }
})

schema.index({}, { unique: false });

const Ticket = mongoose.model('ticket-system', schema);

module.exports = Ticket