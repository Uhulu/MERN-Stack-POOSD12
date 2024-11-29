const Constellation = require('../models/Constellation')
const mongoose = require('mongoose')
const User = require('../models/userModel').User

//get all constellations
const getConstellations = async (req, res) => {
    const constellations = await Constellation.find({}).sort({createdAt: -1})
    res.status(200).json(constellations) //sends all the constellations back to the client 
}

//get a single constellation
const getConstellation = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such constellation'})
    }

    const constellation = await Constellation.findById(id)

    if( !constellation) {
        return res.status(404).json({error: 'No such constellation'})
    }
    res.status(200).json(constellation) //sends the one constellations back to the client 
}

//post a favorite constellation
const favoriteConstellation = async (req, res) => {
    const{ userID, constellationID } = req.body

    try{
        console.log("Request body:", req.body)
    if (!userID || !constellationID) {
        console.log("Missing userID or constellationID")
        return res.status(400).json({ error: 'userID and constellationID are required' })
    }

    // try{
        //ensure constellationID is an ObjectId
        //so even though we have _id, mongodb constellationID works to identify the constellation
        if (!mongoose.Types.ObjectId.isValid(constellationID)) {
            console.log("Invaild constellationID:", constellationID)
            return res.status(400).json({ error: 'Invalid constellationID format' })
        }
        console.log("Looking for constellation with ID:", constellationID)
        //checking if the contellation is within the database
        const constellation = await Constellation.findById(constellationID)
        if(!constellation){
            console.log("Constellation not found for ID:", constellationID)
            return res.status(404).json({error: 'No constellation found'})
        }

    //adding the constellation to the users favorites 
    console.log("Looking for user with ID:", userID)
    const user = await User.findById(userID)
    if(!user){
        console.log("User not found for ID:", userID)
        return res.status(404).json({error:'User not found'})
    }
    //checking if the constellation is already in favorites
    if(!user.favorites.includes(constellationID)){
        user.favorites.push(constellationID)
        //save the changes to the database
        await user.save()
        console.log("Constellation added to favorites:", user.favorites)
        return res.status(200).json({mssg:'Constellation added to favorites', favorites: user.favorites})
    } else{
        console.log("Constellation already in favorites:", constellationID)
        return res.status(400).json({error: 'Constellation already in favorites'})
    }
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//unfavorite a constellation
const unfavoriteConstellation = async (req, res) => {
    const { userID, constellationID } = req.body

    try{
        const user = await User.findById(userID)
        if(!user){
            return res.status(404).json({error: 'User not found'})
                 
        }   
        if(user.favorites.includes(constellationID)){
            user.favorites = user.favorites.filter(fav => fav.toString() !== constellationID)
            await user.save()
            return res.status(200).json({mssg: 'Constellation removed from favorites', favorites: user.favorites})
    } else {
        return res.status(400).json({error: 'Constellation not in favorites'})
    }

    } catch(error){
        res.status(500).json({error: error.message})
    }
}
const getUserFavorites = async (req, res) => {
    const { userID } = req.params

    try {
        const user = await User.findById(userID).populate('favorites')
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(user.favorites)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//match constellations based on the user's birthday month
const matchConstellationsByBirthMonth = async (req, res) => {
    const { userID } = req.params;

    if (!userID) {
        return res.status(400).json({ error: 'User ID is required.' })
    }

    try {
        //finding the user by their ID
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' })
        }

        //grab the users birthmonth for the matching
        const { birthMonth } = user;
        if (!birthMonth) {
            return res.status(400).json({ error: 'User birthMonth is not found.' })
        }

        //query the constellation to find matching constellations
        const matchingConstellations = await Constellation.find({ birthMonth: birthMonth })

        if (matchingConstellations.length === 0) {
            return res.status(404).json({ message: 'No constellations match the user\'s BirthMonth.' })
        }

        //respond with the matching constellations
        res.status(200).json({
            message: `Constellations matching the user\'s BirthMonth (${birthMonth}):`,
            constellations: matchingConstellations,
        })
    } catch (error) {
        
        res.status(500).json({ error: 'Error fetching matched constellations.', details: error.message });
    }
}

const Token = require("../models/token")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")


module.exports = {
    getConstellations,
    getConstellation,
    favoriteConstellation,
    unfavoriteConstellation,
    getUserFavorites,
    matchConstellationsByBirthMonth
}
