const mongoose = require('mongoose');

const db = mongoose.createConnection("mongodb://127.0.0.1:27017/users");

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){
    console.log("Connected to database :: MongoDB");
});

module.exports = db;