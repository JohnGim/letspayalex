const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transaction");
const groupsRoutes = require("./routes/group")
const config = require("./config");

const app = express();
dotenv.config();

console.log("Url for mongo connection: ", config.mongodb.url);
console.log("Url for frontend: ", config.frontend.url);
console.log("Url for backend: ", config.backend.url);

mongoose
  .connect(config.mongodb.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  cors({
    allowedOrigins: [config.frontend.url],
    credentials: true, // Enable credentials
  }),
);
app.use(express.json());
app.use(cookieParser()); // Place cookieParser before routes
app.use("/auth", authRoutes);
app.use("/transaction", transactionRoutes);
app.use("/group", groupsRoutes)

app.listen(config.backend.port, () => console.log(`Server listening on port ${config.backend.port}`));
