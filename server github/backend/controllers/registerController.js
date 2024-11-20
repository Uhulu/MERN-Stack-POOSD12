const User = require('../models/register');

// Register a new user
exports.registerUser  = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser  = await User.findOne({ email });
    if (existingUser ) {
        return res.status(400).json({ error: 'User  already exists' });
    }

    const newUser  = new User({ firstName, lastName, email, password });

    try {
        await newUser .save();
        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
};