import { sign } from "jsonwebtoken";

function generateToken(username) {
  const token = sign({ username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  return token;
}

export default generateToken;
