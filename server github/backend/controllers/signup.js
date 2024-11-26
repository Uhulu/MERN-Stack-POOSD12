const User = require('../models/User');

const registerUser  = async (req, res) => {
    const { Login, Password, FirstName, LastName, Email, BirthMonth } = req.body;

    try {
        // Check if the user already exists by Login or Email
        const existingUser  = await User.findOne({ $or: [{ Login }, { Email }] });

        if (existingUser ) {
            return res.status(400).json({ error: 'User  with this login or email already exists.' });
        }

        // Create a new user instance
        const newUser  = new User({
            Login,
            Password, // Again, storing in plain text (not recommended)
            FirstName,
            LastName,
            Email,
            BirthMonth
        });

        // Save the new user to the database
        await newUser .save();
        res.status(201).json({ message: 'User  registered successfully!', userId: newUser ._id });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user', details: error.message  });
    }
};

module.exports = { registerUser  };