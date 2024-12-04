const mongoose = require('mongoose');


const connection = mongoose.createConnection('mongodb+srv://root:pOOsd12group@proejectdatabase.3zzgt.mongodb.net/Database').on('open',()=>{
    console.log("MongoDB Connected");
}).on('error',()=>{
    console.log("MongoDB connection error");
});


module.exports = connection;