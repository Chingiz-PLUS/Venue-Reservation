const jwt = require("jsonwebtoken");
const config = require("../config/config");

const jwtUtil = {
  encode: (payload) => {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
  },
  decode: (token) => {
    return jwt.verify(token, config.jwtSecret);
  },
};

module.exports = jwtUtil;
