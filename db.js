// db.js
const mongoose = require("mongoose");

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        const dbName = mongoose.connection.db.databaseName;
        console.log(`MongoDB connected successfully to database: ${dbName}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = connectDB;
