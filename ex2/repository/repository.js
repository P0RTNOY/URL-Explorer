const Crisis = require("../model/model");

const getAllCrises = async () => {
    try {
        const allCrises = await Crisis.find({});
        return allCrises;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch all crises");
    }
};

const getCrisisById = async (id) => {
    try {
        const crisis = await Crisis.findById(id);
        if (!crisis)
            throw new Error("Crisis not found");
        return crisis;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch crisis by ID");
    }
};

const addNewCrisis = async (newCrisis) => {
    try {
        const createdCrisis = await Crisis.create(newCrisis);
        return createdCrisis;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to add new crisis");
    }
};

const deleteCrisis = async (id) => {
    try {
        const deletedCrisis = await Crisis.findByIdAndDelete(id);
        if (!deletedCrisis)
            throw new Error("Crisis not found");
        return deletedCrisis;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete crisis");
    }
};

const updateCrisis = async (id, updatedCrisis) => {
    try {
        const updated = await Crisis.findByIdAndUpdate(id, updatedCrisis, { new: true });
        if (!updated)
            throw new Error("Crisis not found");
        return updated;
    } catch (error) {
        console.error(error);
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
