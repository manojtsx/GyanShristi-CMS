const jwt = require("jsonwebtoken");
require('../../configs/env')
const key = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ msg: "Access denied. No token given." });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, key);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = verifyToken;
