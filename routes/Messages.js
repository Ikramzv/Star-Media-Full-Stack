const { Router } = require( 'express')
const Message = require( '../models/Message')
const verify = require( "./verify")

const router = Router()

// get all messages

router.get('/' , verify , async(req,res) => {
    try {
        const messages = await Message.find()
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json(error)
    }
})

// send message

router.post('/' , verify , async(req,res) => {
    const newMessage = new Message({
        ...req.body,
        sender: req.user.id
    })
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// get message

router.get('/:conversationId' , verify , async(req,res) => {
    const { conversationId } = req.params
    try {
        const messages = await Message.find({
            conversationId: conversationId
        }).sort({createdAt: 1})
        res.status(200).send(messages)
    } catch (error) {
        res.status(400).json(error)
    }
})

// set message read 

router.patch('/messageRead/:messageId' , verify , async(req,res) => {
    const { messageId } = req.params
    try {
        const message = await Message.findByIdAndUpdate(messageId , {
            $set : {
                read: true
            }
        } , {new: true})
        res.status(200).json(message)
    } catch (error) {
        res.status(400).json(error)
    }
})

// set message red with conversation

router.patch('/conversationMessageRead/:conversationId' , verify , async(req,res) => {
    const { conversationId } = req.params
    try {
        const messages = await Message.find({
            conversationId: conversationId
        })

        const updatedMessages = await Promise.all(messages.map(m => {
            return m.updateOne({
                $set: {
                    read: true
                }
            } , {new: true})
        }))

        res.status(200).json(updatedMessages)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router