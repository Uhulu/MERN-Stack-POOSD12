require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const constelRoutes = require('./routes/constel')

//express app 
const app = express()

//middlewear
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
//used to test the api
// app.get('/', (req, res) => {
//     res.json({mssg: 'Welcome to the app'})
// })
app.use('/api/constel', constelRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})



process.env
