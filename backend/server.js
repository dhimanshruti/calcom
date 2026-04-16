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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});