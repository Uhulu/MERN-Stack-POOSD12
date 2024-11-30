const express = require('express');
const User = require('../models/User'); // Import your user model

const router = express.Router();

router.get('/verify', async (req, res) => {
    const { token } = req.query; // Extract the token from the query parameter

    try {
        // Find the user by the verification token
        const user = await User.findOne({ VerificationToken: token });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired verification token.' });
        }

        // Update the user's Verified status and clear the token
        user.Verified = true;
        user.VerificationToken = null; // Clear the token after verification
        await user.save();

        // Redirect to a confirmation page or send a success message
        res.status(200).send('<h1>Email verified successfully!</h1><p>You can now log in to your account.</p>');
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'Error verifying email.' });
    }
});

module.exports = router;
