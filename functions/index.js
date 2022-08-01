const functions = require( 'firebase-functions')

const env = require( "dotenv")
env.config();

const express = require("express")
const mongoose = require("mongoose")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require('cors')
const userRouter = require("./routes/users.js")
const authRouter = require("./routes/auth.js")
const postRouter = require("./routes/posts.js")
const ConversationRouter = require("./routes/Conversations.js")
const MessageRouter = require("./routes/Messages.js")
const { createServer } = require('http')

const app = express();
const server = createServer(app)
const io = require('socket.io')(server)

app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true ,limit: '50mb' }));
app.use(helmet());
app.use(morgan("common"));

// ROUTES

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use('/api/posts' , postRouter)
app.use('/api/conversations' , ConversationRouter)
app.use('/api/messages' , MessageRouter)

// ===

// SOCKET 

let users = []

const addUser = (userId , socketId) => {
    !users.some(user => user.userId === userId) && users.push({userId , socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
} 

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}


io.on('connection' , (socket) => {
    // connection
    console.log('user connected')

    // take connected user id from client and send online user to client
    socket.on('sendUser' , userId => {
        addUser(userId , socket.id)
        io.emit('getUsers' , users)
    })
    // send message and get message
    socket.on('sendMessage' , ({ senderId , receiverId , text , conversationId }) => {
        const user = getUser(receiverId)
        // if there is a online friend send an event to client else don't send an event
        user && socket.to(user.socketId).emit('getMessage' , {
            senderId,
            text,
            conversationId,
        })
    })

    // disconnection
    socket.on('disconnect' , () => {
        console.log('a user disconnected')
        removeUser(socket.id)
        io.emit('getUsers' , users)
    })
})

// ==

app.get("/", (req, res) => {
  res.send("Server is running");
});

mongoose.connect(process.env.MONGO_URL, { dbName: "ChatApp" }).then(() => {
  console.log('Mongdb connected');
}).catch((err) => console.log(err))


module.exports.app = functions.https.onRequest(server)