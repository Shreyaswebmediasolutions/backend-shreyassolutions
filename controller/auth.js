const db = require("../utils/db"); // Database connection
const jwt = require("jsonwebtoken");

// User Registration
exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if email already exists
  const emailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(emailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Insert the user into the database
    const insertQuery =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(insertQuery, [name, email, password, role], (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      res.status(201).json({
        message: "User registered successfully",
      });
    });
  });
};

// User Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Query database to find the user by email
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    // Compare the provided password with the password from the database (no hashing)
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {
      expiresIn: "365d", // Token valid for 1 year
    });

    res.status(200).json({
      token,
      email: user.email,
      role: user.role,
      id: user.id,
      message: "Login successful",
    });
  });
};
