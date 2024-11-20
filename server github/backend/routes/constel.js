const express = require('express')  

const {
    getConstellations
} = require('../controllers/constellationController')

const {signup, getbill} = require('../controllers/emailController.js');


const router = express.Router()
//GET all constellations
router.get('/', getConstellations)

//Get a single constellation
router.get('/:id', (req, res)=> {
    res.json({mssg: 'GET a single constellation'})
})

//POST a favorite to a constellation
router.post('/:id', (req,res)=>{
    res.json({mssg: 'Favorite a constellation'})
})




router.post('/user/signup', signup)
router.post('/product/getbill', getbill )

module.exports = router;


module.exports = router