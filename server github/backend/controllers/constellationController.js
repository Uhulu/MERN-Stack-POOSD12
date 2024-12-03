const Constellation = require('../modules/Constellation')
const mongoose = require('mongoose')
const User = require('../modules/User')

//login user
const loginUser = async (req, res) => {
    const { Login, Password } = req.body

    if (!Login || !Password) {
        return res.status(400).json({ error: 'Login and Password are required' })
    }

    try {
        //checking if the user exists by login
        const user = await User.findOne({ Login: Login })
        if (!user) {
            return res.status(400).json({ error: 'Invalid login credentials' })
        }

        //making sure the password is correct with login
        if (Password !== user.Password) {
            return res.status(400).json({ error: 'Invalid login credentials' })
        }

        //sending back the user info
        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                Login: user.Login,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
                Verified: user.Verified,
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

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

    if (!userID || !constellationID) {
        return res.status(400).json({ error: 'userID and constellationID are required' })
    }

    try{
        //ensure constellationID is an ObjectId
        //so even though we have _id, mongodb constellationID works to identify the constellation
        if (!mongoose.Types.ObjectId.isValid(constellationID)) {
            return res.status(400).json({ error: 'Invalid constellationID format' });
        }

        //checking if the contellation is within the database
        const constellation = await Constellation.findById(constellationID)
        if(!constellation){
            return res.status(404).json({error: 'No constellation found'})
        }

    //adding the constellation to the users favorites 
    const user = await User.findById(userID)
    if(!user){
        return res.status(404).json({error:'User not found'})
    }
    //checking if the constellation is already in favorites
    if(!user.Favorites.includes(constellationID)){
        user.Favorites.push(constellationID)
        //save the changes to the database
        await user.save()
        return res.status(200).json({mssg:'Constellation added to favorites', Favorites: user.Favorites})
    } else{
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
        if(user.Favorites.includes(constellationID)){
            user.Favorites = user.Favorites.filter(fav => fav.toString() !== constellationID)
            await user.save()
            return res.status(200).json({mssg: 'Constellation removed from favorites', Favorites: user.Favorites})
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
        const user = await User.findById(userID).populate('Favorites')
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(user.Favorites)
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
            return res.status(400).json({ error: 'User BirthMonth is not found.' })
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


module.exports = {
    loginUser,
    getConstellations,
    getConstellation,
    favoriteConstellation,
    unfavoriteConstellation,
    getUserFavorites,
    matchConstellationsByBirthMonth
}
