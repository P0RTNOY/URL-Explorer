const Url = require('../model/url');
const { DOMParser } = require('xmldom');
const axios = require('axios');

//  save url to db
const saveUrlData = async (url, htmlContent) => {
    try {
        const newUrl = new Url({
            url: url,
            htmlContent: htmlContent
        });
        await newUrl.save();
    } catch (error) {
        throw new Error('Error saving URL data: ' + error.message);
    }
};


// delete all existing url on db
const deleteAll = async () => {
    try {
      
        const result = await Url.deleteMany({});
        if (result.deletedCount > 0) {
            console.log(`${result.deletedCount} URLs deleted successfully`);
        } else {
            console.log("No URLs found to delete");
        }
    } catch (error) {
        throw new Error('Error deleting all URLs: ' + error.message);
    }
};

module.exports = {
    saveUrlData,
    deleteAll
};
