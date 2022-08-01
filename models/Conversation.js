const { model , Schema } = require('mongoose')

const ConversationSchema = new Schema({
    members: {
        type: Array,
    }
} , {timestamps: true})

module.exports = model('conversation' , ConversationSchema)