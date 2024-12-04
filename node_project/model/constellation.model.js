const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const constellationSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    meaning: { type: String, required: true },
    description: { type: String, required: true },
    birthMonth: { type: String, required: true },
});

//module.exports = db.model('Constellations', constellationSchema);

const Constellation = db.model('Constellation', constellationSchema, 'Constellations');

module.exports = Constellation;