require('dotenv').config()

const express = require('express') //express package
const mongoose = require('mongoose') //mogoose package
const constelRoutes = require('./routes/constel') //grabs routes from constel.js for use
//chat
const authRoutes = require('./routes/auth')
//const emailRoutes = require('./routes/signup') //grabs routes from signup.js for use
//const registerRoutes = require('./routes/user') //grabs routes from user.js for use

//express app 
const app = express()

//middlewear checks what requests are made and method like GET POST and shows in console
//logs request made to backend
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/constel', constelRoutes) //path for api is /api/constel/... Whatever is in constel.js
//eg /api/constel/ is what loads up all the consetllations

//chat
// Authentication routes (register, email verification) 
app.use('/api/auth', authRoutes);

//app.use('/api/email',emailRoutes) //path for api is /api/email/... Whatever is in signup.js

//app.use('/api/users',registerRoutes) //path for api is /api/register/... Whatever is in user.js


//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error) //Posted any errors for db connection to log
})



process.env
