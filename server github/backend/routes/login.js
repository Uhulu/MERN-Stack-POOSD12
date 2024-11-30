const express = require('express');
const { LoginUser } = require('../controllers/LogIn');

const router = express.Router();

// POST /api/register/signup
router.post('/login', LoginUser );

module.exports = router;
