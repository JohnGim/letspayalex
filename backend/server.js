const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs") // For password hashing
const cors = require("cors")
const https = require("https")
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth")

dotenv.config()

const app = express()
const port = process.env.REACT_APP_BACKEND_PORT || 6001

const frontendUrl =
  process.env.REACT_APP_FRONTEND_URL || "http://localhost:3001"
const mongoUrl =
  process.env.REACT_APP_DB_URL || "mongodb://localhost:27017/letspayalex"

console.log("Url for mongo connection: ", mongoUrl)
console.log("Url for frontend: ", frontendUrl)

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err))

app.use(
  cors({
    allowedOrigins: [frontendUrl],
  })
)
app.use(express.json())
app.use("/auth", authRoutes)
app.listen(port, () => console.log(`Server listening on port ${port}`))
