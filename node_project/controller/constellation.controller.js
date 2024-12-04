// constellation.controller.js
const Constellation = require('../model/constellation.model');

// Fetch all constellations
const getAllConstellations = async (req, res) => {
    try {
        const constellations = await Constellation.find();
        res.json(constellations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllConstellations,
};