const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

router.post("/register", async (req, res) => {
  const { username, password } = req.body
  const user = new User({ username, password })
  await user.save()
  const token = jwt.sign({ id: user._id }, "your_jwt_secret") // TODO: use env variable instead of hardcoding!!!
  res.send({ token })
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).send("Invalid username or password")
  }
  const token = jwt.sign({ id: user._id }, "your_jwt_secret") // TODO: use env variable instead of hardcoding!!!
  res.send({ token })
})

module.exports = router
