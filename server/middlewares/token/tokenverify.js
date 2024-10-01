const jwt = require("jsonwebtoken");
require('../../configs/env')
const key = process.env.JWT_SECRET;
const User = require('../../models/user-model');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ msg: "Access denied. No token given." });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, key);
    const user = await User.findById(decoded.id).select('-password');
    req.user = user;
    console.log(req.user)
    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = verifyToken;
