const express = require('express');
const { registerUser  } = require('../controllers/registerController.js');
const router = express.Router();

// POST /api/register
router.post('/register', registerUser );

module.exports = router;