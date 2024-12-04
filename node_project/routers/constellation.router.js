// constellation.router.js
const router = require('express').Router();
const { getAllConstellations } = require('../controller/constellation.controller');

// Route to get all constellations
router.get('/', getAllConstellations);

module.exports = router;