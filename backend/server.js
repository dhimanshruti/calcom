const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const bookingRoutes = require("./routes/bookingRoutes");
const eventRoutes = require("./routes/eventRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");

app.use("/api/availability", availabilityRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/events", eventRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});