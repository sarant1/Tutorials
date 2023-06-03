const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel.js');
const User = require('../models/userModel.js');
const Chat = require('../models/chatModel');

const sendMessage = asyncHandler(async (req, res) => {

    const { content, chatId } = req.body

    if (!content || !chatId) {
        console.log("invalid data passed into request")
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, { 
            path: "chat.users",
            select: "name pic email"
        })

        message = await Message.populate(message, {
            path: "chat.latestMessage",
            select: "content"
        })


        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }    
});

const allMessages = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.chatId)
        const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "name pic email")
        .populate("chat")
        
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = { sendMessage, allMessages }