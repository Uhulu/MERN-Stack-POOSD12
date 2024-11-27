const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


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
   BirthMonth: {
       type: String,
       required: true
   }
})


UserSchema.methods.generateAuthToken = function () {
   const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
       expiresIn: "7d",
   });
   return token;
}


const User = mongoose.model("User", UserSchema)


const validate = (data) => {
   const schema = Joi.object({
       firstName: Joi.string().required().label("First Name"),
       lastName: Joi.string().required().label("Last Name"),
       email: Joi.string().email().required().label("Email"),
       password: passwordComplexity().required().label("Password"),
   });
   return schema.validate(data);
}


module.exports = { User, validate };
