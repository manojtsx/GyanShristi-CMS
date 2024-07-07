const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT = 10;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "editor", "author", "viewer"],
    default : 'viewer'
  },
  status: {
    type: String,
    enum: ["unrequested", "pending", "approved"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.encryptPassword = async function (password) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT);
    this.password = hashedPassword; 
  } catch (err) {
    throw new Error(err.message);
  }
};

UserSchema.methods.validatePassword = async function(password){
  try{
    return await bcrypt.compare(password,this.password);
  }catch(err){
    throw new Error(err.message);
  }
}


const User = mongoose.model("User", UserSchema);
module.exports = User;
