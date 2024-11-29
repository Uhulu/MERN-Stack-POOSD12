const router = require("express").Router()
const { User, validate } = require("../models/userModel")
const Token = require("../models/token")
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail")
const bcrypt = require("bcrypt")
const { log } = require("console")

router.post("/register", async (req, res) => {
    try {
        console.log("Register Request Body:", req.body)

        // Validate input
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message })

        // Normalize email to lowercase
        const email = req.body.email.toLowerCase()

        // Check if user already exists
        console.log("Checking for existing user with email:", email)
        let user = await User.findOne({ email });
        if (user) return res.status(409).send({ message: "User with given email already Exist!" })

        // Hash password
        const saltRounds = Number(process.env.SALT) || 10
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds)

        // Create new user
        user = new User({ ...req.body, email, password: hashPassword })
        await user.save()

        // Create verification token
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save()

        // const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`
		const url = `${process.env.BASE_URL}api/users/${user._id}/verify/${token.token}`
        console.log("Verification URL:", url)
        await sendEmail(user.email, "Verify Email", url)

        res.status(201).send({ message: "An Email sent to your account please verify" })
    } catch (error) {
        console.error("Registration Error:", error)
        res.status(500).send({ message: "Internal Server Error" })
    }
})

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		console.log("Verification endpoint hit with params:", req.params)

		const user = await User.findOne({ _id: req.params.id })
		console.log("User found:", user)

		if (!user) {
			console.log("User not found for ID:", req.params.id)	
			return res.status(400).send({ message: "Invalid link" })
		}
		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		})
		if (!token) {
			console.log("Token not found or invalid for the user:", req.params.id)
			return res.status(400).send({ message: "Invalid or expired link" })
		}
		
		//updating the suers verified field
		const result = await User.updateOne({ _id: user._id }, {$set: {verified: true }})
		console.log("Update result:", result)

		//remove the token after sucessful verification
		await Token.deleteOne({_id: token.id})

		res.status(200).send({ message: "Email verified successfully" })
	} catch (error) {
		console.log("Verification Error:", error)
		res.status(500).send({ message: "Internal Server Error" })
	}
})

module.exports = router
