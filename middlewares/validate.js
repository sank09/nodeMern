const {body,query } = require('express-validator');

const registerValidate=(req)=>{

    return [
        body('name','Name is required').not().isEmpty().trim(),
        body('email','Please include a valid email').isEmail().normalizeEmail(),
        body('password','Password is a required field').not().isEmpty()
    ];
    

}

const loginValidate=(req)=>{
  
    return [
        body('email','Please include a valid email').isEmail().normalizeEmail(),
        body('password','Password is a required field').not().isEmpty()
    ]
}

module.exports={
    registerValidate,
    loginValidate
}

