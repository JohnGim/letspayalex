import { verify } from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization || req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
  return false;
};

export default authenticate;
