require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const constelRoutes = require('./routes/constel');
const signUp = require('./routes/signup'); // grabs routes from signup.js for use
//const userLogin = require('./routes/login'); // grabs routes from login.js for use
const app = express();


// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/constel', constelRoutes); // path for api is /api/constel/... Whatever is in constel.js
app.use('/api/register', signUp); // path for api is /api/register/... Whatever is in signup.js

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connected to db & listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error); // Log any errors for db connection
    });