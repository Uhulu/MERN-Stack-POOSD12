const Constellation = require('../models/Constellation')

//get all Constellations
const getConstellations = async (req,res) => {
    const constellations = await Constellation.find({}).sort({Name: 1})

    res.status(200).json(constellations)//sends all constellations back to the client
}

//get a single constellation

//favorite constellation

//unfavorite constellation

module.exports = {
    getConstellations
}