const mongoose = require('mongoose');
const config=require('./config');
const db=config.uri;

const connectDB = async() =>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        });

        console.log("Mongo Db connected")
    }
    catch(err){
        console.log(err.message);

        process.exit();
    }
}

module.exports = connectDB;

