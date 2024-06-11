const mongoose = require("mongoose");
const Url = require("./model/url"); // Assuming you have a Url model defined

// const {connectDB} = require("../db/connect");
// connectDB();

const storeUrlData = async (url, htmlContent) => {
    try {
        const newUrl = new Url({
            url,
            htmlContent
        });
        const savedUrl = await newUrl.save();
        console.log("URL saved successfully:", savedUrl);
    } catch (error) {
        console.error("Error saving URL:", error);
    } finally {
        mongoose.connection.close();
    }
};

module.exports = {
    storeUrlData
};
