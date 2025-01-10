// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const db = require('./utils/db.js')
// const authRoute = require('./router/authRoute.js');
// const userRoute = require('./router/userRoute'); // Ensure the path to userRoute is correct
// const adminRoute = require('./router/adminRoute');
// require('dotenv').config(); // Fix: .env.config() should be require('dotenv').config()

// const app = express();

// // Middleware
// // app.use(cors());
// // app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(
//     cors({
//       origin: "http://localhost:5173", // Adjust with your frontend URL
//       methods: ["GET", "POST", "PUT", "DELETE"],
//       allowedHeaders: ["Content-Type", "Authorization"]
//     })
//   );

// app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));

// // Routes
// app.use('/api/auth', authRoute);
// app.use('/api/user', userRoute);
// app.use('/api/admin', adminRoute);

// const PORT = process.env.PORT || 5000;

// // Start the server

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./utils/db.js"); // Ensure this is correctly set up to connect to your database
const authRoute = require("./router/authRoute.js"); // Ensure the file path is correct
const userRoute = require("./router/userRoute"); // Ensure the file path is correct
const adminRoute = require("./router/adminRoute"); // Ensure the file path is correct
require("dotenv").config(); // Loads environment variables from .env file

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL if needed
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies and credentials
  })
);

// Parses incoming requests with JSON payloads
app.use(express.json());

// Parses incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

// Test database connection (optional)
if (db) {
  console.log("Database connected successfully!");
} else {
  console.error("Failed to connect to the database.");
}

// Routes
app.use("/api/auth", authRoute); // Authentication routes
app.use("/api/user", userRoute); // User-specific routes
app.use("/api/admin", adminRoute); // Admin-specific routes

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
