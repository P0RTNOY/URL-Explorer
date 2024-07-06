//repository/repository.js
const Crisis = require("../model/model");
const logger = require('../logger/logger');

const getAllCrises = async () => {
    try {
        const allCrises = await Crisis.find({});
        logger.info('Fetched all crises');
        return allCrises;
    } catch (error) {
        logger.error(`Error fetching all crises: ${error.message}`);
        throw new Error("Failed to fetch all crises");
    }
};

const getCrisisById = async (id) => {
    try {
        const crisis = await Crisis.findById(id);
        if (!crisis) {
            logger.warn(`Crisis not found with ID: ${id}`);
            throw new Error("Crisis not found");
        }
        logger.info(`Fetched crisis with ID: ${id}`);
        return crisis;
    } catch (error) {
        logger.error(`Error fetching crisis with ID ${id}: ${error.message}`);
        throw new Error("Failed to fetch crisis by ID");
    }
};

const addNewCrisis = async (newCrisis) => {
    try {
        const createdCrisis = await Crisis.create(newCrisis);
        logger.info('Added new crisis');
        return createdCrisis;
    } catch (error) {
        logger.error(`Error adding new crisis: ${error.message}`);
        throw new Error("Failed to add new crisis");
    }
};

const deleteCrisis = async (id) => {
    try {
        const deletedCrisis = await Crisis.findByIdAndDelete(id);
        if (!deletedCrisis) {
            logger.warn(`Crisis not found with ID: ${id}`);
            throw new Error("Crisis not found");
        }
        logger.info(`Deleted crisis with ID: ${id}`);
        return deletedCrisis;
    } catch (error) {
        logger.error(`Error deleting crisis with ID ${id}: ${error.message}`);
        throw new Error("Failed to delete crisis");
    }
};

const updateCrisis = async (id, updatedCrisis) => {
    try {
        const updated = await Crisis.findByIdAndUpdate(id, updatedCrisis, { new: true });
        if (!updated) {
            logger.warn(`Crisis not found with ID: ${id}`);
            throw new Error("Crisis not found");
        }
        logger.info(`Updated crisis with ID: ${id}`);
        return updated;
    } catch (error) {
        logger.error(`Error updating crisis with ID ${id}: ${error.message}`);
        throw new Error("Failed to update crisis");
    }
};

module.exports = {
    getAllCrises,
    getCrisisById,
    addNewCrisis,
    deleteCrisis,
    updateCrisis
};
