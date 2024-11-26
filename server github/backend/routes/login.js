const express = require('express');
const { login  } = require('../controllers/LogIn');

const router = express.Router();

// POST /api/register/signup
router.post('/login', login );

module.exports = router;