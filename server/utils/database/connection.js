const mongoose = require('mongoose');
require('../../configs/env');

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnection = async()=>{
    try{
        await mongoose.connect(MONGODB_URI);
        return "Connected";
    }catch(err){
        throw new Error("Could not connect to DB")
    }
}

module.exports = dbConnection;