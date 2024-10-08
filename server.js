// Existing imports and configuration

// API endpoint to handle newsletter subscription
app.post("/subscribe", (req, res) => {
  const { email } = req.body; // Extract email from the request body
  const query = "INSERT INTO newsletter_subscribers (email) VALUES (?)"; // Adjust table name as needed

  // Check for email format validation (optional)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).send("Invalid email format");
  }

  db.query(query, [email], (err, res) => {
    if (err) {
      console.error("Error inserting email:", err);
      res.status(500).send("Database error");
    } else {
      res.send("Thank you for subscribing to our newsletter!");
    }
  });
});
