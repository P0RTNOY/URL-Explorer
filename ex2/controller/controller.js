const repository = require("../repository/repository");

const getAllCrises = async (req, res) => {
    try {
        const allCrises = await repository.getAllCrises();
        if (!allCrises || allCrises.length === 0)
            throw { status: 404, message: "No crises found" };
        res.json(allCrises);
    } catch (error) {
        console.error(error.message);
        res.status(error?.status || 500).json(error);
    }
};

const getCrisisById = async (req, res) => {
    const id = req.params.id;
    try {
        const crisis = await repository.getCrisisById(id);
        if (!crisis)
            throw { status: 404, message: "Crisis not found" };
        res.json(crisis);
    } catch (error) {
        console.error(error.message);
        res.status(error?.status || 500).json(error);
    }
};

const addNewCrisis = async (req, res) => {
    const newCrisis = req.body;
    try {
        const addedCrisis = await repository.addNewCrisis(newCrisis);
        res.json(addedCrisis);
    } catch (error) {
        console.error(error.message);
        res.status(error?.status || 500).json(error);
    }
};

const updateCrisis = async (req, res) => {
    const id = req.params.id;
    const updatedCrisis = req.body;
    try {
        const updated = await repository.updateCrisis(id, updatedCrisis);
        if (!updated)
            throw { status: 404, message: "Failed to update crisis" };
        res.json(updated);
    } catch (error) {
        console.error(error.message);
        res.status(error?.status || 500).json(error);
    }
};

const deleteCrisis = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await repository.deleteCrisis(id);
        if (!deleted)
            throw { status: 404, message: "Failed to delete crisis" };
        res.json({ message: 'Crisis deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(error?.status || 500).json(error);
    }
};

module.exports = {
    getAllCrises,
    getCrisisById,
    addNewCrisis,
    updateCrisis,
    deleteCrisis
};
