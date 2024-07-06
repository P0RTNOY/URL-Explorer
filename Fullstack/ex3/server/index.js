//index.js
require('dotenv').config();
const express = require("express");
const router = require("./router/router");
const { connectDB } = require("./db/connect");
const port = process.env.PORT || 8080;
const logger = require('./logger/logger');  // Import the logger

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import and use router
app.use('/', router);

// Connect to the database
connectDB()
    .then(() => logger.info('Connected to the database'))  // Log successful DB connection
    .catch((error) => {
        logger.error(`Error connecting to the database: ${error.message}`);
        process.exit(1);  // Exit the process with a non-zero exit code
    });

// Start the server
app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);  // Log server start
});

module.exports = app;
