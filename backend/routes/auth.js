const express = require("express");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwt");
const authenticate = require("../middleware/authenticate");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Check for missing fields
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create new user
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "Registration successful!" });
    console.log("New user registered:", user.username);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server Error" });
  }
  return false;
});

// In your auth.js file

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check for missing fields
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken({ username: user.username });

    // Save token in session cookie
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production", // Enable in production
      sameSite: "strict",
    });

    // Return the token in the response
    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server Error" });
  }
  return false;
});

// fetch user information
router.get("/user", authenticate, async (req, res) => {
  try {
    // Retrieve user information from request
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Respond with user information
    res.status(200).json({ username: user.username });
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ message: "Server Error" });
  }
  return false;
});

module.exports = router;
