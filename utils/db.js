const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

if (!process.env.DB_HOST) {
  throw new Error("Missing required database host variables.");
}
if (!process.env.DB_USER) {
  throw new Error("Missing required database user variables.");
}
if (!process.env.DB_PASSWORD) {
  throw new Error("Missing required database password variables.");
}
if (!process.env.DB_NAME) {
  throw new Error("Missing required database name variables.");
}

db.connect((err) => {
  if (err) {
    throw new Error("Error connecting to database:", err.message);
  }
  console.log("Connected to the database");
});

module.exports = db;
