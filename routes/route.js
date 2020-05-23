const express = require('express')
const app = express();

/* 
    @desc import controllers
*/ 
const userController = require('../controllers/UserController');

app.use('/users',userController);

module.exports=app;
