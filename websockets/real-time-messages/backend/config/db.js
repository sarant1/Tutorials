const mongoose = require("mongoose");
const color = require("colors");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold)
        process.exit(1)
    }
}

module.exports = connectDB;