const mongoose = require("mongoose");
const Url = require("./model/url");
const { connectDB } = require("../db/connect"); 

const storeUrlData = async (url, htmlContent) => {
    try {
        await connectToDB();
        const existingUrl = await Url.findOne({ url });
        if (existingUrl) {
            return { error: "URL already exists" }
        }
        const newUrl = new Url({
            url,
            htmlContent
        });
        const savedUrl = await newUrl.save();
        console.log("URL saved successfully:", savedUrl);
    } catch (error) {
        console.error("Error saving URL:", error);
    } finally {
        await disconnectFromDB();
    }
};

const getUrlFromDB = async (url) => {
    try {
        await connectToDB();
        return await Url.findOne({ url });
    } catch (error) {
        console.error("Error fetching URL:", error);
    }
};

const getStoredUrls = async () => {
    try {
        await connectToDB();
        return await Url.find({});
    } catch (error) {
        console.error("Error fetching URLs:", error);
    }
};

const deleteStoredUrls = async () => {
    try {
        await connectToDB();
        return await Url.deleteMany({});
    } catch (error) {
        console.error("Error deleting URLs:", error);
    } finally {
        await disconnectFromDB();
    }
};

async function connectToDB() {
    if (mongoose.connection.readyState !== 1) {
        await connectDB();
    }
}

async function disconnectFromDB() {
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
    }
}

module.exports = {
    getUrlFromDB,
    storeUrlData,
    getStoredUrls,
    deleteStoredUrls  // Updated function name
};
