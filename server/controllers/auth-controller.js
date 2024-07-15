const User = require('../models/user-model');
const Login = require('../models/login-model');

// Controller to register
const register = async(req,res) =>{
    try{
        const {name, username, password, email, address, phone_number} = req.body;
        const status  = 'unrequested';
        const isUserPresent = await User.findOne({username : username});
        if(isUserPresent){
            return res.status(400).json({msg : "Username already exists."})
        }
        const user = new User({
            name, username, password, email, address, phone_number,status
        });
       
        await user.save();
        res.status(200).json({msg : "Registered successfully", user})
    }catch(err){
        res.status(500).json({msg : err.message})
    }
}

// Controller to Log in into the system
const login = async(req,res) =>{
    try{
        const {username, password} = req.body;
        const isUserPresent = await User.findOne({username : username});
        if(!isUserPresent){
            return res.status(400).json({msg : 'Credentials error'});
        }
        const isVerifiedUser = await isUserPresent.validatePassword(password);
        const token = isUserPresent.assignToken();
        const login =  new Login({
            user_id : isUserPresent._id
        })
        await login.save();
        if(!isVerifiedUser){
            return res.status(400).json({msg : "Password do not match."})
        }
        res.status(200).json({msg : "Logged in Successfully",token,login})
    }catch(err){
        res.status(500).json({msg : err.message})
    }
}


module.exports = {login,register};