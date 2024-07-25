const User = require("../models/user-model");
const Login = require("../models/login-model");
const sendOTP = require("../utils/otp/sendOTP");
const verifyOTP = require("../utils/otp/verifyOTP");

// Controller to register
const register = async (req, res) => {
  try {
    const { name, username, password, email, address, phone_number, otp } =
      req.body;
    const status = "unrequested";

    // Verify OTP
    const users = await User.find({ email: email });
    if (users.length === 0) {
      return res.status(400).json({ msg: "Please request OTP first." });
    }

    let isOTPValid = false;
    for (const user of users) {
        console.log(user.otp, otp);
      if (await verifyOTP(otp, user.otp)) {
        
        isOTPValid = true;
        break;
      }
    }

    if (!isOTPValid) {
      return res.status(400).json({ msg: "Invalid OTP." });
    }

    const isUserPresent = await User.findOne({ username: username });
    if (isUserPresent) {
      return res.status(400).json({ msg: "Username already exists." });
    }
    const newUser = new User({
      name,
      username,
      password,
      email,
      address,
      phone_number,
      status,
    });

    await newUser.save();
    res.status(200).json({ msg: "Registered successfully", newUser });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Controller to send OTP
const sendOTPController = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = await sendOTP(email);
    // Save OTP to the user's record in the database
    await User.updateOne({ email: email }, { otp: otp }, { upsert: true });
    res.status(200).json({ msg: "You have received OTP in your email." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Controller to Log in into the system
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUserPresent = await User.findOne({ username: username });
    if (!isUserPresent) {
      return res.status(400).json({ msg: "Credentials error" });
    }
    const isVerifiedUser = await isUserPresent.validatePassword(password);
    const token = isUserPresent.assignToken();
    const login = new Login({
      user_id: isUserPresent._id,
    });
    await login.save();
    if (!isVerifiedUser) {
      return res.status(400).json({ msg: "Password do not match." });
    }
    res.status(200).json({ msg: "Logged in Successfully", token, login });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { login, register, sendOTPController };
