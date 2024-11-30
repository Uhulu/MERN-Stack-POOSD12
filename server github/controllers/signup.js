const nodemailer = require('nodemailer');
const crypto = require('crypto'); // For generating the token
const User = require('../models/User'); // Your user model
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env.js');

/** send verification email */
const registerUser = async (req, res) => {
    const { Login, Password, FirstName, LastName, Email, BirthMonth } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ Login }, { Email }] });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this login or email already exists.' });
        }

        // Generate verification token
        const verificationToken = crypto.randomBytes(20).toString('hex');

        // Create a new user instance
        const newUser = new User({
            Login,
            Password, // Store as plain text only if necessary (not recommended)
            FirstName,
            LastName,
            Email,
            BirthMonth,
            Verified: false,
            VerificationToken: verificationToken,
        });

        // Save user to the database
        await newUser.save();

        // Create transporter
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD,
            },
        });

        // Create email content using Mailgen
        let MailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Constellations app',
                link: 'http://poosd12.xyz/',
            },
        });

        let response = {
            body: {
                name: FirstName,
                intro: 'Welcome to our platform! Please verify your email to activate your account.',
                action: {
                    instructions: 'Click the button below to verify your email:',
                    button: {
                        color: '#22BC66', // Optional, set the button color
                        text: 'Verify Your Email',
                        link: `http://poosd12.xyz:4000/api/email/verify?token=${verificationToken}`,
                    },
                },
                outro: 'If you did not register, please ignore this email.',
            },
        };

        let mail = MailGenerator.generate(response);

        // Configure the message
        let message = {
            from: EMAIL,
            to: Email,
            subject: 'Verify Your Email',
            html: mail,
        };

        // Send email
        transporter.sendMail(message)
            .then(() => {
                return res.status(201).json({
                    message: 'Registration successful! Please check your email to verify your account.',
                });
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Failed to send verification email.' });
            });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ error: 'Error registering user', details: error.message });
    }
};

module.exports = { registerUser };
