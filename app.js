const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const port = 3000;

// Body Parser middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // For parsing application/json

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // your MySQL username
  password: "1234", // your MySQL password
  database: "taipingdata", // your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the MySQL database");
  }
});

// Subscribe Endpoint
app.post("/subscribe", (req, res) => {
  console.log("Received request:", req.body);
  const { email } = req.body;

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).send("Invalid email format");
  }

  const query = "INSERT INTO newsletter_subscribers (email) VALUES (?)";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Error inserting email:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    res.send("Thank you for subscribing to our newsletter!");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
