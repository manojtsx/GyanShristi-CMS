const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT = 10;
<<<<<<< HEAD

=======
require("../configs/env");
const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRET;

class UserClass {
  // constructor for user class
  constructor(user) {
    this._id = user._id;
    this.name = user.name;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.profile_pic = user.profile_pic;
    this.phone_number = user.phone_number;
    this.role = user.role;
    this.status = user.status;
    this.created_at = user.created_at || Date.now();
  }

  //validate password during login
  async validatePassword(password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (err) {
      throw err;
    }
  }

  // assign token for logged in user for authorization
  assignToken() {
    try {
      const token = jwt.sign(
        { id: this._id, name: this.name, role: this.role },
        key,
        { expiresIn: "1d" }
      );
      return token;
    } catch (err) {
      throw err;
    }
  }
}

// mongoose schema of user
>>>>>>> beef375fb1ffbb88dffa2ed7c1053c1482bc82af
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
<<<<<<< HEAD
    default : 'viewer'
=======
    default: "viewer",
>>>>>>> beef375fb1ffbb88dffa2ed7c1053c1482bc82af
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

UserSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    return next();
  }
  try{
    this.password = await bcrypt.hash(this.password, SALT);
    next();
  }catch(err){
    next(err);
  }
})

// load Userclass in mongoose schema
UserSchema.loadClass(UserClass);
>>>>>>> beef375fb1ffbb88dffa2ed7c1053c1482bc82af

const User = mongoose.model("User", UserSchema);
module.exports = User;
