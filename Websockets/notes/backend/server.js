const express = require('express');
const { chats } = require('./data/data.js');
const dotenv = require('dotenv');

const app = express();
dotenv.config();


app.get('/', (req, res) => {
    res.send("API is running great");
});

app.get('/api/chat', (req, res) => {
    res.send(chats)
});

app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find( c => c._id === req.params.id);
    console.log(singleChat)
    res.send(singleChat)
});


const PORT = process.env.port || 5000;
app.listen(PORT), console.log(`Server is running on port ${PORT}`);