const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();
app.use(express.json());

const PORT = 4000;
MONGODB_URI="mongodb://admin:hello123@localhost:27017/myapp?authSource=admin"// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Node.js & MongoDB Containerized Server is Running!" });
});

// Create a user
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
