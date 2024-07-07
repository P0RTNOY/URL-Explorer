const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () =>
{
    try
    {
        const credentials = `${process.env.USERNAME}:${process.env.PASSWORD}`;
        const dbSuffixUrl = '?retryWrites=true&w=majority&appName=URLCluster';
        const dbUrl = `mongodb+srv://${credentials}@urlcluster.8t4bon7.mongodb.net/${dbSuffixUrl}`
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log("Connected to MongoDB");
    }
        catch(error)
        {
            console.log('error connecting to db');
            console.log(error);
        }
};

module.exports={connectDB};