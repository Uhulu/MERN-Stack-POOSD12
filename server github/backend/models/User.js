const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Login: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    BirthMonth: { type: String }
}, { timestamps: true });

// Avoid overwriting the model
const User = mongoose.models.User || mongoose.model('Users ', userSchema);

module.exports = User;