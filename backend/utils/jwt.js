const jwt = require("jsonwebtoken");

function generateToken(username) {
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  return token;
}

module.exports = generateToken;
