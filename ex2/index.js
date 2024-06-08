require('dotenv').config();
const express = require("express");
const router = require("./router/router")
const { connectDB } = require("./db/connect");
const port = process.env.PORT || 8080;

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import and use your router
app.use('/',router);

// Connect to the database
connectDB();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
