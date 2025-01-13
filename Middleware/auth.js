const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

// Verify JWT Token
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    req.user = decoded; // Attach decoded user data to request
    next();
  } catch (error) {
    return res.status(401).send("Invalid token.");
  }
};

// Authorize Admin Role
exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied. Admins only.");
  }
  next();
};

// Authorize User Role
exports.authorizeUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).send("Access denied. Users only.");
  }
  next();
};
