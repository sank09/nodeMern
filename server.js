const express=require('express');
const app=express();
var cors = require('cors')
const routes = require('./routes/route.js');
const mongoose = require('mongoose');
const connectDB=require('./config/db');

const PORT =  4500 

//Cors middleware
app.use(cors())


//middleware json
app.use(express.json({limit:'1mb'}));


//Connection for DB
connectDB();


//Routes
app.use('/api',routes);



//Start and listen on port
app.listen(PORT, () => console.log(`Example app id listening on port ${PORT}!`));