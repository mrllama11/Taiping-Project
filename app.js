// app.js IS THE BACK END JAVASCRIPT
require('dotenv').config();// can use .env
const express = require("express"); // handleing https request
const cors = require("cors");// middleware in a Node.js application. This middleware allows your server to handle requests from different origins (domains, ports, or protocols) in a secure way.
const multer = require("multer");// Middleware to handle multipart/form-data for file uploads.
const path = require('path');//Built-in Node.js module to handle file paths.
const fs = require('fs');//Node.js file system module to manage files.
const cloudinary = require('cloudinary').v2;// so can use cloudinary


const mysql = require("mysql");
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors()); // Cross-Origin Resource Sharing (CORS) restrictions
// Allow OPTIONS requests on all routes
app.options('*', (req, res) => res.sendStatus(200));

const storage = multer.memoryStorage(); // Store files in memory before uploading to Cloudinary
const upload = multer({ storage });


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, // your MySQL username
  password: process.env.DB_PASS, // your MySQL password
  database: process.env.DB_NAME, // your database name
});

//Cloudinary Connection
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
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

// Route to handle form submission
app.get('/submit-form', (req, res) => {
  res.status(405).json({ message: 'This route only supports POST requests' });
});

app.post('/submit-form',upload.fields([
  { name: 'photo' }, // Single photo file use maxcount: 1
  { name: 'Kartu_Tanda_Penduduk'},   
  { name: 'AAUI' },  
  { name: 'NPWP' },  
  {name: 'Bukutabungan' }, 
  { name: 'OtherCerti' } 
]), async (req, res) => {
  // Extract text fields from req.body
  const {
    title,
    name,
    email,
    phone,
    address,
    ktp,
    npwp,
    aaui,
    certification_target,
    bank_name,
    bank_account,
    reference,
    agentRole,
    office_location
  } = req.body;

  if (!agentRole) {
    return res.status(400).json({ message: 'Agent Role is required' });
  }

  if (!office_location){
    return res.status(400).json({message: 'Office location required'})
  }

  console.log(req.body); // Check if agentRole is coming in the request

  // Array to store URLs of uploaded files
  const uploadedFileUrls = {};

  // Upload files to Cloudinary
  try {
    const fileFields = ['photo', 'Kartu_Tanda_Penduduk', 'AAUI', 'NPWP', 'Bukutabungan', 'OtherCerti'];


    for (const field of fileFields) {
      if (req.files[field]) {
        const file = req.files[field][0]; // Get the uploaded file for the current field
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
              console.error(`Failed to upload ${field}:`, error);
              return reject(error);
            }
            resolve(result);
          }).end(file.buffer); // Send file buffer to Cloudinary
        });
        uploadedFileUrls[field] = result.secure_url; // Store the URL of the uploaded file
      }
    }
  } catch (error) {
    console.error('Error uploading files to Cloudinary:', error);
    return res.status(500).json({ message: 'File upload failed', error });
  }

    // Check what's inside req.files
  console.log('Files received:', req.files);
  console.log('Uploaded Fields', upload.fields);

  // Ensure the files exist
  if (!req.files.photo) {
    console.error('Photo file is missing.');
  }
  if (!req.files.Kartu_Tanda_Penduduk) {
    console.error('Kartu_Tanda_Penduduk file is missing.');
  }
  if (!req.files.NPWP) {
    console.error('NPWP file is missing.');
  }
  if (!req.files.AAUI) {
    console.error('AAUI file is missing.');
  }
  if (!req.files.Bukutabungan) {
    console.error('Bukutabungan file is missing.');
  }
  if (!req.files.OtherCerti) {
    console.error('OtherCerti file is missing.');
  }
  
  console.log('Uploaded file URLs:', uploadedFileUrls); // Log file URLs for debugging


  // SQL query to insert data into the database
  const query = `
    INSERT INTO agent_form_info (
      Title, 
      Customer_name, 
      Customer_Email, 
      Customer_Phone_Number,
      Customer_Address, 
      Customer_KTP,
      Customer_NPWP, 
      Customer_AAUI_Number,  
      Target_Certification, 
      Customer_Bank_Name,
      Customer_Bank_Account_Number, 
      Customer_References, 
      Agent_Role,
      Office_Location,
      Photo_Url,
      KTP_Url,
      NPWP_Url,
      AAUI_Url,
      Bukutabungan_Url,
      OtherCerti_Url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title,
    name,
    email,
    phone,
    address,
    ktp,
    npwp,
    aaui,
    certification_target,
    bank_name,
    bank_account,
    reference,
    agentRole,
    office_location,
    uploadedFileUrls.photo || null,
    uploadedFileUrls.Kartu_Tanda_Penduduk || null, 
    uploadedFileUrls.NPWP || null,
    uploadedFileUrls.AAUI || null,
    uploadedFileUrls.Bukutabungan || null,
    uploadedFileUrls.OtherCerti || null
  ];
  

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error inserting data', error: err });
    }
    res.json({ message: 'Form submitted successfully', result });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
