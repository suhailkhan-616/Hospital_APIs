const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/hospital_Api');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in MongoDb Connection"));

db.once('open',function(){  
    
    console.log('Successfull MongoDB Connected to Server');
});

module.exports = db;