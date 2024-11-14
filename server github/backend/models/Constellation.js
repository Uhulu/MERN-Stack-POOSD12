//schema for the data structure of a Constellations entry in MongoDB
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ConstellationSchema = new Schema({
    ItemID: {
        type: Number,
        required: true,
        unique: true
      },
      Name: {
        type: String,
        required: true,
        trim: true
      },
      Image: {
        type: String,
        required: true,
        trim: true
      },
      Meaning: {
        type: String,
        required: true,
        trim: true
      }
})

module.exports = mongoose.model('Constellation',ConstellationSchema, 'Constellations')

