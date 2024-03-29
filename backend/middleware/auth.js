const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
  const token = req.headers.authorization || req.cookies.token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded.user

    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

module.exports = authenticate
