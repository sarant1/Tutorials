const express = require('express');
const { chats } = require('./data/data.js');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const colors = require('colors');

const chatRoutes = require('./routes/chatRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

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

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.port || 5000;
app.listen(PORT), console.log(`Server is running on port ${PORT}`.yellow.bold);