const User = require('../models/user-model');

// Controller to register
const register = async(req,res) =>{
    try{
        const {name, username, password, email, address, phone_number, role} = req.body;
        const isUserPresent = await User.findOne({username : username});
        if(isUserPresent){
            return res.status(400).json({msg : "Username already exists."})
        }
        const user = new User({
            name, username, password, email, address, phone_number
        });
        await user.encryptPassword(password);
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
        if(!isVerifiedUser){
            return res.status(400).json({msg : "Password do not match."})
        }
        res.status(200).json({msg : "login"})
    }catch(err){
        res.status(500).json({msg : err.message})
    }
}


module.exports = {login,register};