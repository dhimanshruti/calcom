const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent   // ✅ ADD THIS
} = require("../controllers/eventController");

router.post("/", createEvent);
router.get("/", getEvents);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent); // ✅ already present

module.exports = router;