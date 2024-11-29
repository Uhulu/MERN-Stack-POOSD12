const router = require("express").Router()
const { User } = require("../models/userModel")
const Token = require("../models/token")
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail")
const bcrypt = require("bcrypt")
const Joi = require("joi")

router.post("/login", async (req, res) => {
	try {
        console.log("Login Request Body:", req.body)
        //validate the body request
		const { error } = validate(req.body)
		if (error) {
            console.log("Validation Error:", error.details[0].message)
			return res.status(400).send({ message: error.details[0].message })
        }
        //checking if the user exists
		const user = await User.findOne({ email: req.body.email })
		if (!user) {
            console.log("User not found for email:", req.body.email)
			return res.status(401).send({ message: "Invalid Email or Password" })
        }
        //checking password
		const validPassword = await bcrypt.compare( req.body.password, user.password)
		if (!validPassword) {
            console.log("Invaild password for user:", user.email)
			return res.status(401).send({ message: "Invalid Email or Password" })
        }
        //checking if the user is verified
		if (!user.verified) {
            console.log("User not verified", user.email)
			let token = await Token.findOne({ userId: user._id })
			if (!token) {
                console.log("Generating new verification token for user", user.email)
				token = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save()
				const url = `${process.env.BASE_URL}api/users/${user.id}/verify/${token.token}`
				await sendEmail(user.email, "Verify Email", url)
			}

			return res.status(400).send({ message: "User not verified, an email was sent to your account please verify!" })
		}

        //generate jwt token
		const token = user.generateAuthToken()
        console.log("Login successful for user", user.email)
		// res.status(200).send({ data: token, message: "logged in successfully" })
        res.status(200).send({ message: "User logged in successfully" })
	} catch (error) {
        console.log("Login Error:", error)
		res.status(500).send({ message: "Internal Server Error" })
	}
})

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data)
}

module.exports = router
