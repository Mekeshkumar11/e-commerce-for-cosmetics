const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("../src/pages/auth.js");
const { MongoClient } = require("mongodb");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB using mongoose
mongoose.connect("mongodb://127.0.0.1:27017/cosmetics", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB with Mongoose!");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Use auth routes
app.use("/api", authRoutes);  // Add this line to include signup and login routes

// Product routes
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db;
client.connect().then(() => {
  db = client.db("cosmetics");
  console.log("Connected to MongoDB");
});

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


app.get("/api/products/:category", async (req, res) => {
  const category = req.params.category;

  try {
    const products = await db.collection(category).find({}).toArray();
    res.json(products);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//......................................... Whishlist section .....................

const wishlistRoutes = require('../src/Routes/wishlist'); // make sure the path is correct
app.use('/api/wishlist', wishlistRoutes);

const cartRoutes = require('../src/Routes/cart'); // Adjust path if needed
app.use('/api/cart', cartRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
