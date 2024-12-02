// app.js IS THE BACK END JAVASCRIPT

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const mysql = require("mysql");
const app = express();
const port = 3000;

// Body Parser middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // For parsing application/json
app.use(cors()); ///Cross-Origin Resource Sharing (CORS) restrictions.
app.use(express.urlencoded({ extended: true }));

// Define the storage for uploaded files using Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filenames
  },
});

const upload = multer({ storage: storage });
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// recieve the request data req.body is the data that we sent from the front end
app.post("/subscribe", (req, res) => {
  console.log("Received request:", req.body);
  const { email } = req.body;

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).send("Invalid email format");
  }

  // the databse table name
  const query = "INSERT INTO newsletter_subscribers (email) VALUES (?)";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Error inserting email:", err);
      return res.status(500).send("Database error: " + err.message);
    }
    res.send("Thank you for subscribing to our newsletter!");
  });
});

// Fetch vehicle_years from database so USE get
// database backend data
app.get("/vehicles-years", (req, res) => {
  const query = "SELECT years FROM taipingdata.tahunkendaraan ";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error Fetching vehicle years:", err);
      return res.status(500).send("database error");
    }
    res.json(results); //send result json
  });
});

// Fetching vehicles area For Modal Form
app.get("/vehicles-area", (req, res) => {
  const query = "SELECT area FROM taipingdata.wilayah";

  db.query(query, (err, results) => {
    if (err) {
      console.log("Error fetching vehicle areas:", err);
      return res.status(500).send("database error");
    }
    res.json(results);
  });
});

// Fetching vehicles area For Modal Form
app.get("/wilayah", (req, res) => {
  const query = "SELECT area, region_id FROM taipingdata.wilayah";

  db.query(query, (err, results) => {
    if (err) {
      console.log("Error fetching vehicle areas:", err);
      return res.status(500).send("database error");
    }
    res.json(results);
  });
});

app.get("/vehicle-categories", (req, res) => {
  const query =
    "SELECT id, category_name, vehicle_type, vehicle_cover_min, vehicle_cover_max FROM vehicle_category";
  db.query(query, (err, results) => {
    if (err) {
      console.log("Error Fetching Vehicles categories:", err);
      return res.status(500).send("DataBase Error 404");
    }
    res.json(results);
  });
});

app.get("/vehicles-rate-tlo", (req, res) => {
  const { vehicleCategoryId, regionId } = req.query;

  // Check for required parameters
  if (!vehicleCategoryId || !regionId) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const query = `SELECT rate FROM premium_rate_TLO WHERE vehicle_category_id = ? AND region_id = ?`;

  db.query(query, [vehicleCategoryId, regionId], (err, results) => {
    if (err) {
      console.error("Error fetching data from the database:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Check if results contain data
    if (results.length === 0) {
      return res.status(404).json({
        error: "No TLO rate found for the specified category and region",
      });
    }

    // Assuming `rate` is in the first result
    res.json(results[0]); // Return the first entry's rate
  });
});

app.get("/vehicles-rates-comprehensive", (req, res) => {
  const { vehicleCategoryId, regionId, ageColumn } = req.query;

  if (!vehicleCategoryId || !regionId || !ageColumn) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  // Using backticks to embed ageColumn as a dynamic column name
  const query = `SELECT \`${ageColumn}\` FROM premium_rate_comprehensive WHERE vehicle_category_id = ? AND region_id = ?`;

  db.query(query, [vehicleCategoryId, regionId], (err, results) => {
    if (err) {
      console.log("Error Fetching Vehicles Rate:", err);
      return res.status(500).send("DataBase Error 404");
    }
    res.json(results);
  });
});

app.post("/submit-form", upload.array("file_paths", 12), (req, res) => {
  // Destructure all required fields from req.body
  const {
    Title,
    Customer_name,
    Customer_Email,
    Customer_Phone_Number,
    Customer_Address,
    Customer_KTP,
    Customer_AAUI_Number,
    Target_Certification,
    Customer_Bank_Name,
    Customer_Bank_Account_Number,
    Customer_References,
    user_role,
  } = req.body;

  // Handle uploaded file paths
  const filePaths = req.files.map((file) => file.path); // Extract file paths from uploaded files

  // SQL query to insert data into the table
  const query = `
    INSERT INTO Agent_Form_Info (
      Title, 
      Customer_name, 
      Customer_Email, 
      Customer_Phone_Number, 
      Customer_Address, 
      Customer_KTP, 
      Customer_AAUI_Number, 
      Target_Certification, 
      Customer_Bank_Name, 
      Customer_Bank_Account_Number, 
      Customer_References, 
      user_role, 
      file_paths
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Execute the query with the values from the form and the file paths
  db.query(
    query,
    [
      Title,
      Customer_name,
      Customer_Email,
      Customer_Phone_Number,
      Customer_Address,
      Customer_KTP,
      Customer_AAUI_Number,
      Target_Certification,
      Customer_Bank_Name,
      Customer_Bank_Account_Number,
      Customer_References,
      user_role,
      JSON.stringify(filePaths), // Convert file paths array to JSON string
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving data");
      } else {
        res.status(200).send("Form submitted successfully");
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
