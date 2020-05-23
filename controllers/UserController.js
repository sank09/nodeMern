const express = require('express');
const router = express.Router();
const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { registerValidate,loginValidate} =require('../middlewares/validate');
const {response_proto,responseObject} =require('../helpers/response');
const config=require('../config/config');

const User=require('../models/UserModel');


/* 
    @desc UserLogin
    @route {Post} api/users/login
*/
router.post('/login',loginValidate(),async (req,res)=>{

        const errors=validationResult(req);
      

        if(!errors.isEmpty()){
         
            return res.status(400).send(responseObject(false,"Bad request data",errors.array()))
        }

        const {email,password}=req.body;
      

        try{
          
            let user = await User.findOne({email});

          
            if(!user){
               return res.status(200).send(responseObject(false,"Invalid Credentials"))            
            }

 
            const isMatch =await bcrypt.compare(password,user.password);

            if(!isMatch){

                return res.status(200).send(responseObject(false,"Invalid Credentials"))
            
            }

            const payload={
                user:{
                    id:user.id
                }
            }
            
           
          
           await  jwt.sign(
                 payload,
                config.jwtSecret,
                {expiresIn:360000},
                (err,token)=>{
                    if(err) throw err;

    
                    const responseData={
                        "username":user.name,
                        "token":token
                    }
                    
                    return res.status(200).send(responseObject(true,"User logged in sucessfully",[],responseData))
      
                });
                  

        }
        catch(err){
         
           return res.status(500).send("Server Error")

        }
});

/* 
    @desc UserRegistration
    @route {Post} api/users/register
*/
router.post('/register',registerValidate(),async (req,res)=>{
  
        const errors=validationResult(req);
        const response_data={...response_proto}
        

        if(!errors.isEmpty()){
            console.log(errors.array())

            return res.status(400).send(responseObject(false,"Bad request data",errors.array()))
        }

        const {name,email,password}=req.body;

        

        try{
          
            let user = await User.findOne({email});
  
            if(user){
                response_data.message="User already exists";
                response_data.success=false;
                response_data.error=[];
               return res.status(200).send(responseObject(false,"User already exists"))
            }

            user=new User({
                name,
                email,
                password
            })

            
            const salt=await bcrypt.genSalt(10);
            
            user.password=await bcrypt.hash(password,salt);
            
            await user.save();

            return res.status(200).send(responseObject(true,"User Registered"))

        }
        catch(err){
           
            return res.status(500).send("Server Error")

        }

  
})

module.exports=router;
