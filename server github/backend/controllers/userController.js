const User = require('../models/userModel')
//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and Password are required' })
    }

    try {
        //checking if the user exists by login
        const user = await User.findOne({ Email: email })
        if (!user) {
            return res.status(400).json({ error: 'Invalid login credentials' })
        }

        //making sure the password is correct with login
        if (password !== user.Password) {
            return res.status(400).json({ error: 'Incorrect password' })
        }

        //sending back the user info
        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                Email: user.Email,
                FirstName: user.FirstName,
                LastName: user.LastName,
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

    
// Signup user
const signupUser = async (req, res) => {
    const { email, password, firstName, lastName, birthMonth } = req.body

    try {
        // Call the static signup method with all required fields
        const user = await User.signup(email, password, firstName, lastName, birthMonth)
        // Respond with the created user (omit sensitive data like password)
        res.status(200).json({
            message: "User created successfully",
            user: {
                id: user._id,
                email: user.Email,
                firstName: user.FirstName,
                lastName: user.LastName,
                birthMonth: user.BirthMonth,
            },
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {loginUser, signupUser }
