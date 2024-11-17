require('dotenv').config()

const express = require('express') //express package
const mongoose = require('mongoose') //mogoose package
const constelRoutes = require('./routes/constel') //grabs routes from constel.js for use

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
