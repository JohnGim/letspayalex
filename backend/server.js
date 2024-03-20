const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
const mongodbUrl =
  `${process.env.MONGO_URL}:${process.env.MONGO_PORT}/letspayalex` ||
  "mongodb://localhost:27017/letspayalex";
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/auth", authRoutes);

app.use(
  cors({
    origin: 'http://localhost:3000', // replace with your frontend server's URL
  })
);


// Registration endpoint
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Return success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.BACKEND_PORT || 6002;
app.listen(port, () => console.log("Server is running on port " + port));
