const Url = require('../model/url');
const { DOMParser } = require('xmldom');
const axios = require('axios');

// Repository function to save URL data to the database
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



// const deleteUrl = async (url) =>{
//     try{
//         const result = await Url.deleteOne({url: url});

//         if(result.deletedCount === 0)
//         {
//             throw new Error('URL not found');
//         }
//     }catch(error){
//         throw new Error('Error deleteing URL '+ error.message);
//     }
// }

const deleteAll = async () => {
    try {
      
        const result = await Url.deleteMany({});

        // Check if any documents were deleted
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
