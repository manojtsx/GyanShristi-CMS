const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Login = mongoose.model("Login", LoginSchema);
module.exports = Login;
