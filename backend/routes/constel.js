const express = require('express')  

const {
    loginUser,
    getConstellations,
    getConstellation,
    favoriteConstellation,
    unfavoriteConstellation,
    getUserFavorites,
    searchConstellationByName
} = require('../controllers/constellationController')

const router = express.Router()

//login route
router.post('/login', loginUser);

//gets all of the constellations
router.get('/', getConstellations)

//get a single constellation
router.get('/:id', getConstellation)

// Search constellations by name
router.get('/search/:name', searchConstellationByName);
//adding this to search by name

//post a favorite constellation
router.post('/favorite', favoriteConstellation)

//unfavorite a contellation
router.delete('/unfavorite', unfavoriteConstellation)

//get users favorite constellations
router.get('/user/:userID/favorites', getUserFavorites)


module.exports = router