const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // For password hashing
const cors = require('cors');
const https = require('https');
const app = express();
const port = (process.env.REACT_APP_BACKEND_PORT || 6001);

app.use(cors({
  allowedOrigins: [
      'http://localhost:3001'
  ]
}));
app.use(express.json());
app.listen(port, () => console.log(`Server listening on port ${port}`));



// Replace with your MongoDB connection string
const mongoURI = "mongodb://localhost:27017/letspayalex";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// User Schema (Mongoose Model)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Hash password before saving user
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// User Model
const User = mongoose.model("User", userSchema);

// API Route for Registration
app.post("/auth/register", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  // Check for missing fields
  if (!username || !password) {
    return res.status(400).json({ message: "Please provide username and password" });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create new user
    const newUser = new User({ username, password });
    await newUser.save();

    // Generate token (Optional)
    // You can implement JWT token generation here

    res.status(201).json({ message: "Registration successful!" });

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

