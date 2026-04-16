const db = require("../config/db");

// convert "09:30 AM" → "09:30:00"
const convertToSQLTime = (timeStr) => {
  let [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");

  hours = parseInt(hours);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
};

// ✅ GET AVAILABLE SLOTS
const getAvailableSlots = (req, res) => {
  const { date } = req.query;

  const allSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM",
    "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM",
    "03:30 PM", "04:00 PM"
  ];

  db.query(
    "SELECT TIME(start_time) as time FROM bookings WHERE DATE(start_time) = ?",
    [date],
    (err, results) => {
      if (err) return res.status(500).json(err);

      const bookedSlots = results.map(r => {
        let [h, m] = r.time.split(":");
        let hour = parseInt(h);
        let ampm = hour >= 12 ? "PM" : "AM";

        hour = hour % 12 || 12;

        return `${hour.toString().padStart(2, "0")}:${m} ${ampm}`;
      });

      const availableSlots = allSlots.filter(
        slot => !bookedSlots.includes(slot)
      );

      res.json(availableSlots);
    }
  );
};

// ✅ CREATE BOOKING (FINAL FIXED)
const createBooking = (req, res) => {
  const { name, email, date, time } = req.body;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sqlTime = convertToSQLTime(time);
  const startDateTime = `${date} ${sqlTime}`;

  // 🔥 STRICT CHECK
  db.query(
    "SELECT id FROM bookings WHERE start_time = ?",
    [startDateTime],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length > 0) {
        return res.status(400).json({
          message: "Slot already booked ❌"
        });
      }

      // INSERT
      db.query(
        "INSERT INTO bookings (event_type_id, name, email, start_time, end_time) VALUES (?, ?, ?, ?, ?)",
        [1, name, email, startDateTime, startDateTime],
        (err) => {
          if (err) return res.status(500).json(err);

          res.json({ message: "Booking successful ✅" });
        }
      );
    }
  );
};

// ✅ GET BOOKINGS
const getBookings = (req, res) => {
  db.query("SELECT * FROM bookings ORDER BY start_time DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// ✅ CANCEL BOOKING
const cancelBooking = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM bookings WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Booking cancelled" });
  });
};

// ✅ EXPORT
module.exports = {
  getAvailableSlots,
  createBooking,
  getBookings,
  cancelBooking
};