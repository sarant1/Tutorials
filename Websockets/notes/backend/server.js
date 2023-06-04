const express = require('express');
const { chats } = require('./data/data.js');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const colors = require('colors');

const chatRoutes = require('./routes/chatRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');

const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

const app = express();
dotenv.config();
connectDB();

app.use(express.json()); // this will allow server to accept json data

app.get('/', (req, res) => {
    res.send("API is running great");
});

app.use('/api/user', userRoutes, () => {console.log("User routes are working")});
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.port || 5000;
const server = app.listen(PORT) 
console.log(`Server is running on port ${PORT}`.yellow.bold);

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000" 
    }
})

io.on('connection', (socket) => {
    console.log('connected to socket.io')

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        ('userData._id: ', userData._id)
        socket.emit('connected')
    })

    
    socket.on('typing', (room) => socket.in(room).emit("typing"));
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing"));
    
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User Joined Room: ' + room)
    })

    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if(!chat.users) return console.log("Chat.users not defined");

        chat.users.forEach(user => {
            if(user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit('message recieved', newMessageRecieved)
        })
    
    })

    socket.off("setup", () => {
        console.log("USER DISCONNECTED")
        socket.leave(userData._id)
    })
})