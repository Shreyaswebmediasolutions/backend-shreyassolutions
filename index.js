const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./utils/db.js");
// const authRoute = require("./router/authRoute.js");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

if (db) {
  console.log("Database connected successfully!");
} else {
  console.error("Failed to connect to the database.");
}

// Routes
// app.use("/api/auth", authRoute); // Authentication routes

app.get("/server", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Fallback route for undefined endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
