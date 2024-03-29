const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

router.post("/register", async (req, res) => {
  console.log("registering user")
  console.log(req.body)
  const { username, password } = req.body

  // Check for missing fields
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" })
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" })
    }

    // Create new user
    const newUser = new User({ username, password })
    await newUser.save()

    // Generate token (Optional)
    // You can implement JWT token generation here

    res.status(201).json({ message: "Registration successful!" })
  } catch (error) {
    console.error("Error during registration:", error)
    res.status(500).json({ message: "Server Error" })
  }
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body

  // Check for missing fields
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" })
  }

  try {
    // Check for existing user
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate token (Optional)
    // You can implement JWT token generation here

    res.status(200).json({ message: "Login successful!" })
  } catch (error) {
    console.error("Error during login:", error)
    res.status(500).json({ message: "Server Error" })
  }
})

module.exports = router
