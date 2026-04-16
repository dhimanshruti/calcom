const express = require("express");
const cors = require("cors");

const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ADD THESE (IMPORTANT)
app.use("/events", eventRoutes);
app.use("/bookings", bookingRoutes);
app.use("/availability", availabilityRoutes);

// OPTIONAL (homepage)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔥 ADD THIS (DB IMPORT)
const db = require("./config/db");

// 🔥 CREATE TABLES AUTOMATICALLY
db.query(`
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  duration INT,
  slug VARCHAR(255)
);
`);

db.query(`
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  date DATE,
  time VARCHAR(50),
  slug VARCHAR(255),
  start_time DATETIME
);
`);

db.query(`
CREATE TABLE IF NOT EXISTS availability (
  id INT AUTO_INCREMENT PRIMARY KEY,
  days TEXT,
  start_time TIME,
  end_time TIME,
  timezone VARCHAR(100)
);
`);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});