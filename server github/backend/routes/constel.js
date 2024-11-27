const express = require('express')
const {
   loginUser,
   getConstellations,
   getConstellation,
   favoriteConstellation,
   unfavoriteConstellation,
   getUserFavorites,
   matchConstellationsByBirthMonth
} = require('../controllers/constellationController')
// const { registerUser  } = require('../controllers/signup.js');


const router = express.Router()


//login route
router.post('/login', loginUser);


//gets all of the constellations
router.get('/', getConstellations)


//get a single constellation
router.get('/:id', getConstellation)


//post a favorite constellation
router.post('/favorite', favoriteConstellation)


//unfavorite a contellation
router.delete('/unfavorite', unfavoriteConstellation)


//get users favorite constellations
router.get('/favorites/:userID', getUserFavorites)


//match
router.get('/match-constellations/:userID', matchConstellationsByBirthMonth)




// // POST /api/email/signup
// router.post('/signup', registerUser );


module.exports = router
