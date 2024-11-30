require('dotenv').config()

const express = require('express')//express package
const mongoose = require('mongoose')//mognoose package
const cors = require('cors');

//routes reqirement
const constelRoutes = require('./routes/constel') //grabs routes from constel.js for use

const signUp = require('./routes/signup'); // grabs routes from signup.js for use
const userLogin = require('./routes/login'); // grabs routes from login.js for use
const verifyRoutes = require('./routes/verify');

//express app
const app = express()

//enable cors for all routes
app.use(cors());

//middleware - checks what requests are made and method like GET POST and shows in console
//logs request made to backend
app.use(express.json())

app.use((req,res,next)=> {
    console.log(req.path,req.method)
    next()
})

//routes
app.use('/api/constel',constelRoutes) //path for api is /api/constel/... Whatever is in constel.js
//eg /api/constel/ is what loads up all the consetllations

app.use('/api/email', verifyRoutes);
app.use('/api/register', signUp); // path for api is /api/register/... Whatever is in signup.js
app.use('/api/user', userLogin); // path for api is /api/login/... Whatever is in login.js





//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //Listen for requests once connected to db
        app.listen(process.env.PORT , () => {
        console.log('connected to db & listening on port 4000') 
        })
    })
    .catch((error) => {
        console.log(error) //Posted any errors for db connection to log
    })
 

