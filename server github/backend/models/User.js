const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Login: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Verified: {
        type: Boolean,
        default: false
    },
    VerificationToken: {
        type: String
    },
    Favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Constellation'
        }
    ],
    birthMonth: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model('User', UserSchema, 'Users')
