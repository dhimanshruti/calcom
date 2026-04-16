const express = require("express");
const router = express.Router();

const {
  getAvailableSlots,
  createBooking,
  getBookings,
  cancelBooking
} = require("../controllers/bookingController");

router.get("/available-slots", getAvailableSlots);
router.post("/", createBooking);
router.get("/", getBookings);
router.delete("/:id", cancelBooking);

module.exports = router;