const mongoose = require("mongoose");
const connectDB = async () =>
{
    try
    {
        const credentials = `${process.env.USERNAME}:${process.env.PASSWORD}`;
        const dbSuffixUrl = '?retryWrites=true&w=majority&appName=URLCluster';
        await mongoose.connect(`mongodb+srv://${credentials}@urlcluster.8t4bon7.mongodb.net/${dbSuffixUrl}`);
        console.log("Connected to MongoDB");
    }
        catch(error)
        {
            console.log('error connecting to db');
            console.log(error);
        }
};

module.exports={connectDB};