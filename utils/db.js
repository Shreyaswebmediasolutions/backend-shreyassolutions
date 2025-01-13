// const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// if (
//   !process.env.DB_HOST ||
//   !process.env.DB_USER ||
//   !process.env.DB_PASSWORD ||
//   !process.env.DB_NAME
// ) {
//   throw new Error("Missing required database environment variables.");
// }

// db.connect((err) => {
//   if (err) {
//     throw new Error("Error connecting to database:", err.message);
//   }
//   console.log("Connected to the database");
// });

// module.exports = db;
