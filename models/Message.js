const { model , Schema } = require('mongoose')

const MessageSchema = new Schema({
    conversationId: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    }
} , {timestamps: true})

module.exports = model('message' , MessageSchema)