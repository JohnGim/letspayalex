const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")

require("dotenv").config()

const app = express()
const mongodbUrl =
  `${process.env.MONGO_URL}:${process.env.MONGO_PORT}/letspayalex` ||
  "mongodb://localhost:27017/letspayalex"
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err))

app.use(express.json())
app.use("/auth", authRoutes)
app.use(
  cors({
    origin: frontendUrl, // replace with your frontend server's URL
  })
)
if (process.env.NODE_ENV === "production") {
} else {
  app.use(cors())
}

const port = process.env.BACKEND_PORT || 6002
app.listen(port, () => console.log("Server is running on port " + port))
