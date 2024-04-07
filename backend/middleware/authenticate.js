const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.headers.authorization || req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Remove 'Bearer ' prefix from the token
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
  return false;
};

module.exports = authenticate;
