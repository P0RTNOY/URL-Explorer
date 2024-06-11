require('dotenv').config();
const express = require("express");
const { connectDB } = require("../db/connect"); 
const router = require('./router/router');
const port = process.env.PORT || 8080;
var cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use("/", router);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});
