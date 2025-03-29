const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "202.47.117.220",
  user: "dev_db",
  password: "dev@sql",
  database: "development_erp",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// API Endpoint to fetch industries and sectors
app.get("/hospital-management-job-roles", (req, res) => {
  console.log("Request Query:", req.query); // Debug log

  const { selected_sector, selected_track } = req.query;

  console.log("Selected Sector:", selected_sector); // Debug log
  console.log("Selected Track:", selected_track);   // Debug log

  if (!selected_sector || !selected_track) {
    return res.status(400).json({ error: "Missing required parameters: selected_sector and selected_track" });
  }

  const query = `
    SELECT id, industries AS title, sector, track, jobrole 
    FROM s_jobrole 
    WHERE industries = 'Hospital Management' 
      AND sector = ? 
      AND track = ?;
  `;

  db.query(query, [selected_sector, selected_track], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Failed to fetch data" });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});