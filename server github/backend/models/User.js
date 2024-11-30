const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Login: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    BirthMonth: { type: String, required: true },
    Verified: { type: Boolean, default: false }, // Automatically set to false
    VerificationToken: { type: String, default: null }, // Automatically generate a token
}, { timestamps: true });

// Avoid overwriting the model
const User = mongoose.models.User || mongoose.model('User', userSchema, 'Users');

module.exports = User;

