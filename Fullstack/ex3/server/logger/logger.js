//logger/logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const path = require('path');
const fs = require('fs');


const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} - ${level}: ${message}`;
});

// Create a logger
const logger = createLogger({
    level: 'info', // Set the level to 'info'
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.File({ filename: path.join(logDir, 'app.log'), level: 'info' }), // Ensure level matches
        new transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                logFormat
            )
        })
    ]
});

module.exports = logger;
