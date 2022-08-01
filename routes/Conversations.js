const { Router } = require('express')
const Conversation = require('../models/Conversation')
const verify = require("./verify")


const router = Router()

// Create Conversation

router.post('/:id' , verify ,async(req,res) => {
    const { id } = req.params
    const newConversation = new Conversation({
        members: [req.user.id , id]
    })

    try {
        const savedConv = await newConversation.save()
        res.status(200).send(savedConv)
    } catch (error) {
        res.status(400).send(error.message)
    }
    
})

// Get conversation

router.get('/' , verify ,async(req,res) => {
    try {
        const conversation = await Conversation.find({
            members: req.user.id
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// get single conversation
router.get('/:conversationId' , verify , async(req,res) => {
    const { conversationId } = req.params
    try {
        const conversation = await Conversation.findById(conversationId)
        res.status(200).json(conversation)
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router