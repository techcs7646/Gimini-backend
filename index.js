const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Use CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Change this to your frontend's deployed URL after deployment
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

app.use(express.json());
app.use(router);

// Export the app for Vercel
module.exports = app;
