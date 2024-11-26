const express = require('express');
const { registerUser  } = require('../controllers/signup');

const router = express.Router();

// POST /api/email/signup
router.post('/signup', registerUser );

module.exports = router;