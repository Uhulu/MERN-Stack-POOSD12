const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema
const UserSchema = new Schema({
    Email: {
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
    Favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Constellation'
        }
    ],
    BirthMonth: {
        type: String,
        required: true 
    }
})

//static signup method
    UserSchema.statics.signup = async function (email, password, firstName, lastName, birthMonth) {

    //validation 
    if (!email || !password || !firstName || !lastName || !birthMonth) {
         throw Error('All fields are required')
    }
    //returns true or false to check if its a valid email
    if(!validator.isEmail(email)){//
        throw Error('Email is not valid')
    }
    //checking if the password is strong enough and if not another error is thrown
    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })
     if(exists){
        throw Error("Email already in use")
     }

     const user = await this.create({
        Email: email,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
        BirthMonth: birthMonth,
    })

     return user
}


module.exports = mongoose.model('User', UserSchema)
