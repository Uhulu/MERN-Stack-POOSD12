const User = require('../models/User');

const LoginUser = async (req, res) => {
    const { Login, Password } = req.body;

    // Validate input
    if (!Login || !Password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Find the user by login
        const user = await User.findOne({ Login });

        if (!user) {
            return res.status(400).json({ error: 'Invalid login or password' });
        }

        // Compare the password (plain text comparison, not recommended for production)
        if (Password !== user.Password) {
            return res.status(400).json({ error: 'Invalid login or password' });
        }

        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Error logging in user', details: error.message });
    }
};

module.exports = { LoginUser };