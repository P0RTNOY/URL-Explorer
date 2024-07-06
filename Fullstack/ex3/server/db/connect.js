// db/connect.js
const mongoose = require("mongoose");
const logger = require('../logger/logger');

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.zchyxdu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
            {
                serverSelectionTimeoutMS: 5000,  // Timeout for server selection
            }
        );
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error.message}`);
        throw error;  // Re-throw the error to be handled by the caller
    }
};

module.exports = { connectDB };
